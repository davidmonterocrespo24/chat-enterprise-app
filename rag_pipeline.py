from typing import List, Union, Generator, Iterator
from pydantic import BaseModel
import requests
import os
import json
import uuid
import traceback

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

    def pipe(
        self,
        user_message: str,
        model_id: str,
        messages: List[dict],
        body: dict
    ) -> Union[str, Generator, Iterator]:
        
        print(f"user_message: {user_message}")
        print(f"model_id: {model_id}")
        print(f"messages: {messages}")
        print(f"body: {body}")
        
        # Aquí podrías tener la lógica de la función
        result = f"Processing message '{user_message}' with model '{model_id}'"
        headers = {
            "accept": "application/json",
            "authorization": f"Bearer {self.valves.API_TOKEN}",
           
        }

        # Preparar el mensaje
        chat_message = {
            "message": user_message,
            "sender": "user",
            "id": 0
        }

        # Configuración
        configuration = {
            "model": model_id or self.valves.DEFAULT_MODEL,
            "internet_access": True,
            "document_access": True
        }

        # Crear el form data
        form_data = {
            'chat_message': json.dumps(chat_message),
            'chat_history_id': str(body.get("chat_history_id", 0)),
            'chat_history_message': json.dumps([]),
            'configuration': json.dumps(configuration)
        }

        try:
            # Realizar la solicitud POST
            response = requests.post(
                f"{self.valves.API_URL}/chat_history/ask_question2/",
                files={key: (None, value) for key, value in form_data.items()},
                headers=headers,
                  stream=True
            )
            response.raise_for_status()
            
            for chunk in response.iter_content(chunk_size=None):
                if chunk:
                    yield chunk.decode('utf-8')
            
        except requests.exceptions.RequestException as e:
            return f"Error en la solicitud: {str(traceback.print_exc())}"
        except Exception as e:
            return f"Error interno: {str(traceback.print_exc())}"
