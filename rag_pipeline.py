from typing import List, Optional, AsyncGenerator
from pydantic import BaseModel
import os
import json
import traceback
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
        __event_emitter__: Optional[callable] = None,
    ) -> AsyncGenerator[str, None]:
        """
        Conecta al servicio externo y notifica al usuario los pasos a través del event emitter.

        Parámetros:
          - user_message: mensaje enviado por el usuario.
          - model_id: identificador del modelo a utilizar.
          - messages: historial de mensajes.
          - body: diccionario con información adicional (por ejemplo, chat_history_id).
          - __event_emitter__: función asíncrona que, al ser llamada, enviará una notificación de estado.
        
        La función realiza lo siguiente:
          1. Notifica el inicio de la conexión.
          2. Prepara los datos y envía la solicitud al servicio externo.
          3. Notifica cuando se ha enviado la solicitud y cuando se recibe la respuesta.
          4. Va transmitiendo (streaming) la respuesta recibida.
          5. Notifica la finalización del proceso.
        """
        # Información de depuración
        print(f"user_message: {user_message}")
        print(f"model_id: {model_id}")
        print(f"messages: {messages}")
        print(f"body: {body}")
        
        # 1. Notificar inicio de conexión
        if __event_emitter__:
            await __event_emitter__({
                "type": "status",
                "data": {"description": "Iniciando conexión al servicio externo...", "done": False}
            })

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
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": "Enviando solicitud al servicio externo...", "done": False}
                })

            # Se utiliza httpx.AsyncClient para realizar la solicitud de forma asíncrona
            async with httpx.AsyncClient(timeout=None) as client:
                response = await client.post(
                    f"{self.valves.API_URL}/chat_history/ask_question2/",
                    files={key: (None, value) for key, value in form_data.items()},
                    headers=headers,
                )
                response.raise_for_status()

                # 3. Notificar recepción de la respuesta
                if __event_emitter__:
                    await __event_emitter__({
                        "type": "status",
                        "data": {"description": "Respuesta recibida. Procesando datos...", "done": False}
                    })

                # 4. Transmitir en streaming la respuesta recibida
                async for chunk in response.aiter_text():
                    if chunk:
                        yield chunk

            # 5. Notificar que el proceso ha finalizado correctamente
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": "Proceso completado", "done": True}
                })

        except httpx.RequestError as e:
            error_msg = f"Error en la solicitud: {str(e)}"
            print(traceback.format_exc())
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": error_msg, "done": True}
                })
            yield error_msg

        except Exception as e:
            error_msg = f"Error interno: {str(e)}"
            print(traceback.format_exc())
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": error_msg, "done": True}
                })
            yield error_msg
