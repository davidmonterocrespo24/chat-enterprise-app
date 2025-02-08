import os
import json
import traceback
from typing import List, AsyncGenerator
from pydantic import BaseModel
import httpx
import asyncio

class Pipeline:
    class Valves(BaseModel):
        API_URL: str
        API_TOKEN: str
        DEFAULT_MODEL: str = "gpt-4o"
        DEFAULT_USER_ID: str = "default_user"
        
    def __init__(self):
        self.name = "Rag Pipeline"
        self.valves = self.Valves(
            **{
                "API_URL": os.getenv("OPENWEBUI_API_URL", "https://backendchat.doodrix.com"),
                "API_TOKEN": os.getenv(
                    "OPENWEBUI_API_TOKEN", 
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXZpZG1vbnRlcm9jcmVzcG8yNEBnbWFpbC5jb20ifQ.7uCq2V-7plMKtZZWZ6OIl94we12vppXry7claNF6ylc"
                ),
                "DEFAULT_MODEL": os.getenv("DEFAULT_MODEL", "gpt-4o"),
                "DEFAULT_USER_ID": os.getenv("DEFAULT_USER_ID", "user_0"),
            }
        )

    async def on_startup(self):
        print(f"{self.name} iniciado")

    async def on_shutdown(self):
        print(f"{self.name} detenido")

    async def pipe(
        self,
        user_message: str,
        model_id: str,
        messages: List[dict],
        body: dict,
    ) -> AsyncGenerator[str, None]:
        """
        Realiza la conexión con el servicio externo y retorna un stream de respuesta que
        incluye mensajes intermedios de estado (en formato SSE) y los datos finales.

        El stream incluye:
          - Mensajes de estado formateados como SSE: 'data: {json}\n\n'
          - Los chunks de respuesta del servicio.

        Nota: Esta solución inyecta los mensajes de estado en el mismo stream de datos.
        El cliente deberá procesarlos para separarlos de los datos "puros".
        """
        # Función auxiliar para generar un mensaje SSE con estado
        def sse_status(description: str, done: bool) -> str:
            status_msg = {
                "type": "status",
                "data": {"description": description, "done": done}
            }
            # Se retorna el mensaje en formato SSE
            return f"data: {json.dumps(status_msg)}\n\n"

        # 1. Notificar inicio de conexión
        yield sse_status("Iniciando conexión al servicio externo...", done=False)

        headers = {
            "accept": "application/json",
            "authorization": f"Bearer {self.valves.API_TOKEN}",
        }

        # Preparar el mensaje y la configuración
        chat_message = {
            "message": user_message,
            "sender": "user",
            "id": 0
        }
        configuration = {
            "model": model_id or self.valves.DEFAULT_MODEL,
            "internet_access": True,
            "document_access": True
        }
        form_data = {
            'chat_message': json.dumps(chat_message),
            'chat_history_id': str(body.get("chat_history_id", 0)),
            'chat_history_message': json.dumps([]),
            'configuration': json.dumps(configuration)
        }

        try:
            # 2. Notificar envío de la solicitud
            yield sse_status("Enviando solicitud al servicio externo...", done=False)

            # Realizamos la solicitud de forma asíncrona con httpx
            async with httpx.AsyncClient(timeout=None) as client:
                response = await client.post(
                    f"{self.valves.API_URL}/chat_history/ask_question2/",
                    files={key: (None, value) for key, value in form_data.items()},
                    headers=headers,
                )
                response.raise_for_status()

                # 3. Notificar recepción de la respuesta y comienzo del streaming
                yield sse_status("Respuesta recibida. Procesando datos...", done=False)

                # 4. Iterar sobre los chunks de respuesta
                async for chunk in response.aiter_text():
                    if chunk:
                        # Se envía el chunk "crudo" sin formatear (se asume que es parte del output final)
                        yield chunk

            # 5. Notificar que el proceso ha finalizado correctamente
            yield sse_status("Proceso completado", done=True)

        except httpx.RequestError as e:
            error_msg = f"Error en la solicitud: {str(e)}"
            print(traceback.format_exc())
            yield sse_status(error_msg, done=True)
        except Exception as e:
            error_msg = f"Error interno: {str(e)}"
            print(traceback.format_exc())
            yield sse_status(error_msg, done=True)
