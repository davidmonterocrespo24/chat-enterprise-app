from typing import List, Union, Generator, Iterator
from pydantic import BaseModel
import requests
import os
import uuid


class Pipeline:
    class Valves(BaseModel):
        NEURALSEEK_API_URL: str
        NEURALSEEK_API_KEY: str
        DEFAULT_USER_ID: str = "default_user"
        DEFAULT_LANGUAGE: str = "es"

    def __init__(self):
        self.name = "NeuralSeek Pipeline"
        self.valves = self.Valves(
            **{
                "NEURALSEEK_API_URL": os.getenv("NEURALSEEK_API_URL", "https://api.neuralseek.com/v1/crn%3Av1%3Abluemix%3Apublic%3Aneuralseek%3Aus-south%3Aa%2F30ee78befc544b3d9602bf8953a14b87%3A36c419e5-6324-448f-90d9-c7d0e4c9491e%3A%3A/seek"),
                "NEURALSEEK_API_KEY": os.getenv("NEURALSEEK_API_KEY", "312ce534-94c6d5b0-35aa4cd9-91a7c0be"),
                "DEFAULT_USER_ID": os.getenv("DEFAULT_USER_ID", "usuario123"),
                "DEFAULT_LANGUAGE": os.getenv("DEFAULT_LANGUAGE", "es"),
            }
        )

    async def on_startup(self):
        print(f"NeuralSeek Pipeline iniciado")

    async def on_shutdown(self):
        print(f"NeuralSeek Pipeline detenido")

    def pipe(
        self, 
        user_message: str, 
        model_id: str, 
        messages: List[dict], 
        body: dict
    ) -> Union[str, Generator, Iterator]:
        
        # Obtener parámetros del usuario
        user_id = body.get("user", {}).get("id", self.valves.DEFAULT_USER_ID)
        session_id = f"nsChat_{uuid.uuid4()}"  # Generar session_id único
        
        # Construir payload
        payload = {
            "question": user_message,
            "user_session": {
                "metadata": {"user_id": user_id},
                "system": {"session_id": session_id}
            },
            "params": [],
            "options": {
                "personalize": {"preferredName": "", "noWelcome": False},
                "language": self.valves.DEFAULT_LANGUAGE,
                "includeSourceResults": True
            }
        }

        headers = {
            "accept": "application/json",
            "apikey": self.valves.NEURALSEEK_API_KEY,
            "Content-Type": "application/json"
        }

        try:
            response = requests.post(
                self.valves.NEURALSEEK_API_URL,
                headers=headers,
                json=payload
            )
            response.raise_for_status()
            
            return response.json().get("answer", "No se encontró una respuesta.")
            
        except requests.exceptions.RequestException as e:
            return f"Error en la solicitud: {str(e)}"
        except Exception as e:
            return f"Error interno: {str(e)}"
