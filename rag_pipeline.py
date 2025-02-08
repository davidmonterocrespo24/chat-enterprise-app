from typing import List, Union, Generator, Iterator
from pydantic import BaseModel
import requests
import os
import json
import uuid
import traceback
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
        if self.__event_emitter__:
            await self.__event_emitter__({
                "type": "status",
                "data": {"description": "Pipeline iniciado correctamente", "done": True}
            })

    async def on_shutdown(self):
        print(f"{self.name} detenido")
        if self.__event_emitter__:
            await self.__event_emitter__({
                "type": "status",
                "data": {"description": "Pipeline detenido correctamente", "done": True}
            })

    async def pipe(
        self,
        user_message: str,
        model_id: str,
        messages: List[dict],
        body: dict,
        __event_emitter__=None
    ) -> Union[str, Generator, Iterator]:
        
        self.__event_emitter__ = __event_emitter__
        
        try:
            # Notificar inicio de proceso
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": "Iniciando procesamiento de mensaje...", "done": False}
                })
            
            print(f"user_message: {user_message}")
            print(f"model_id: {model_id}")
            print(f"messages: {messages}")
            print(f"body: {body}")
            
            # Notificar preparación de headers
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": "Preparando headers de la solicitud...", "done": False}
                })

            headers = {
                "accept": "application/json",
                "authorization": f"Bearer {self.valves.API_TOKEN}",
            }

            # Notificar preparación del mensaje
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": "Preparando mensaje para el modelo...", "done": False}
                })

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

            # Notificar preparación del form data
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": "Preparando datos del formulario...", "done": False}
                })

            form_data = {
                'chat_message': json.dumps(chat_message),
                'chat_history_id': str(body.get("chat_history_id", 0)),
                'chat_history_message': json.dumps([]),
                'configuration': json.dumps(configuration)
            }

            # Notificar inicio de la solicitud
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": "Enviando solicitud al servicio...", "done": False}
                })

            response = requests.post(
                f"{self.valves.API_URL}/chat_history/ask_question2/",
                files={key: (None, value) for key, value in form_data.items()},
                headers=headers,
                stream=True
            )
            response.raise_for_status()
            
            # Notificar inicio de procesamiento de respuesta
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": "Procesando respuesta del modelo...", "done": False}
                })

            for chunk in response.iter_content(chunk_size=None):
                if chunk:
                    # Notificar cada chunk recibido
                    if __event_emitter__:
                        await __event_emitter__({
                            "type": "status",
                            "data": {"description": "Recibiendo respuesta...", "done": False}
                        })
                    yield chunk.decode('utf-8')
            
            # Notificar finalización exitosa
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": "Procesamiento completado con éxito", "done": True}
                })
                
        except requests.exceptions.RequestException as e:
            error_msg = f"Error en la solicitud: {str(traceback.print_exc())}"
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": error_msg, "done": True}
                })
            return error_msg
        except Exception as e:
            error_msg = f"Error interno: {str(traceback.print_exc())}"
            if __event_emitter__:
                await __event_emitter__({
                    "type": "status",
                    "data": {"description": error_msg, "done": True}
                })
            return error_msg
