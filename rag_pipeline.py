from typing import List, Union, Generator, Iterator, Optional, Callable, Awaitable, Any
from pydantic import BaseModel
import requests
import os
import json
import uuid
import traceback
from fastapi import Request

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
        await self.send_status_update("🚀 Iniciando pipeline...", done=False)
        print(f"{self.name} iniciado")
        
    async def on_shutdown(self):
        await self.send_status_update("🔄 Deteniendo pipeline...", done=False)
        print(f"{self.name} detenido")
        
    async def send_status_update(self, description: str, done: bool = False, __event_emitter__: Optional[Callable[[Any], Awaitable[None]]] = None):
        """Método unificado para enviar actualizaciones de estado"""
        if __event_emitter__:
            await __event_emitter__({"type": "status", "data": {"description": description, "done": done}})

    async def send_message(self, content: str, role: str = "assistant", __event_emitter__: Optional[Callable[[Any], Awaitable[None]]] = None):
        """Método unificado para enviar mensajes"""
        if __event_emitter__:
            await __event_emitter__({"type": "message", "data": {"content": content, "role": role}})

    async def pipe(
        self,
        body: dict,
        __user__: dict,
        __event_emitter__: Optional[Callable[[Any], Awaitable[None]]],
        __request__: Request,
        __task__=None,
    ) -> str:
        try:
            # Notificar inicio del proceso
            await self.send_status_update("🔍 Iniciando procesamiento de la solicitud...", False, __event_emitter__)
            
            # Extraer información necesaria
            user_message = body.get("messages", [{}])[-1].get("content", "")
            model_id = body.get("model", self.valves.DEFAULT_MODEL)
            
            # Notificar preparación de la solicitud
            await self.send_status_update("📝 Preparando la solicitud para el modelo...", False, __event_emitter__)
            
            # Preparar headers
            headers = {
                "accept": "application/json",
                "authorization": f"Bearer {self.valves.API_TOKEN}",
            }
            
            # Construir el mensaje del chat
            chat_message = {
                "message": user_message,
                "sender": "user",
                "id": 0
            }
            
            # Configurar parámetros
            configuration = {
                "model": model_id,
                "internet_access": True,
                "document_access": True
            }
            
            # Preparar form data
            form_data = {
                'chat_message': json.dumps(chat_message),
                'chat_history_id': str(body.get("chat_history_id", 0)),
                'chat_history_message': json.dumps([]),
                'configuration': json.dumps(configuration)
            }
            
            # Notificar envío de la solicitud
            await self.send_status_update("🌐 Conectando con el servicio externo...", False, __event_emitter__)
            
            try:
                response = requests.post(
                    f"{self.valves.API_URL}/chat_history/ask_question2/",
                    files={key: (None, value) for key, value in form_data.items()},
                    headers=headers,
                    stream=True
                )
                response.raise_for_status()
                
                # Notificar inicio del streaming
                await self.send_status_update("📨 Recibiendo respuesta del modelo...", False, __event_emitter__)
                
                accumulated_response = ""
                for chunk in response.iter_content(chunk_size=None):
                    if chunk:
                        chunk_text = chunk.decode('utf-8')
                        accumulated_response += chunk_text
                        # Enviar chunk al usuario
                        await self.send_message(chunk_text, "assistant", __event_emitter__)
                
                # Notificar éxito
                await self.send_status_update(
                    f"✅ Proceso completado - {len(accumulated_response)} caracteres procesados", 
                    True, 
                    __event_emitter__
                )
                
            except requests.exceptions.ConnectionError:
                error_msg = "❌ Error de conexión: No se pudo conectar al servicio externo"
                await self.send_status_update(error_msg, True, __event_emitter__)
                return error_msg
            
            except requests.exceptions.Timeout:
                error_msg = "⏰ Tiempo de espera agotado: El servicio está tardando demasiado en responder"
                await self.send_status_update(error_msg, True, __event_emitter__)
                return error_msg
            
            except requests.exceptions.RequestException as e:
                error_msg = f"🔥 Error en la solicitud API: {str(e)}"
                await self.send_status_update(error_msg, True, __event_emitter__)
                return error_msg
            
            return ""
            
        except Exception as e:
            error_msg = f"💥 Error interno: {str(e)}\n{traceback.format_exc()}"
            await self.send_status_update(error_msg, True, __event_emitter__)
            return error_msg
