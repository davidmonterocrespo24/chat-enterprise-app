from typing import List, Union, Generator, Iterator, Optional, Callable, Awaitable, Any
from pydantic import BaseModel
import aiohttp
import os
import json
import uuid
import traceback
import asyncio
from fastapi import Request

class Pipeline:
    class Valves(BaseModel):
        API_URL: str
        API_TOKEN: str
        DEFAULT_MODEL: str = "gpt-4o"
        DEFAULT_USER_ID: str = "default_user"
        CHUNK_SIZE: int = 1024  # Tamaño del chunk para streaming
        TIMEOUT: int = 30  # Timeout en segundos
        
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
                "CHUNK_SIZE": int(os.getenv("CHUNK_SIZE", "1024")),
                "TIMEOUT": int(os.getenv("TIMEOUT", "30")),
            }
        )
        self.session = None
        
    async def on_startup(self):
        """Inicializar la sesión de aiohttp al iniciar"""
        self.session = aiohttp.ClientSession()
        print(f"{self.name} iniciado")
        
    async def on_shutdown(self):
        """Cerrar la sesión de aiohttp al detener"""
        if self.session:
            await self.session.close()
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
        if not self.session:
            self.session = aiohttp.ClientSession()
            
        try:
            # Notificar inicio del proceso
            await self.send_status_update("🔍 Iniciando procesamiento...", False, __event_emitter__)
            
            # Extraer información necesaria
            user_message = body.get("messages", [{}])[-1].get("content", "")
            model_id = body.get("model", self.valves.DEFAULT_MODEL)
            
            # Preparar headers y datos
            headers = {
                "accept": "application/json",
                "authorization": f"Bearer {self.valves.API_TOKEN}",
            }
            
            chat_message = {
                "message": user_message,
                "sender": "user",
                "id": 0
            }
            
            configuration = {
                "model": model_id,
                "internet_access": True,
                "document_access": True
            }
            
            form_data = aiohttp.FormData()
            form_data.add_field('chat_message', json.dumps(chat_message))
            form_data.add_field('chat_history_id', str(body.get("chat_history_id", 0)))
            form_data.add_field('chat_history_message', json.dumps([]))
            form_data.add_field('configuration', json.dumps(configuration))
            
            # Notificar envío de la solicitud
            await self.send_status_update("🌐 Conectando con el servicio...", False, __event_emitter__)
            
            try:
                timeout = aiohttp.ClientTimeout(total=self.valves.TIMEOUT)
                async with self.session.post(
                    f"{self.valves.API_URL}/chat_history/ask_question2/",
                    data=form_data,
                    headers=headers,
                    timeout=timeout
                ) as response:
                    response.raise_for_status()
                    
                    # Notificar inicio del streaming
                    await self.send_status_update("📨 Recibiendo respuesta...", False, __event_emitter__)
                    
                    accumulated_response = ""
                    async for chunk in response.content.iter_chunked(self.valves.CHUNK_SIZE):
                        if chunk:
                            try:
                                chunk_text = chunk.decode('utf-8')
                                accumulated_response += chunk_text
                                await self.send_message(chunk_text, "assistant", __event_emitter__)
                            except UnicodeDecodeError:
                                continue
                    
                    # Notificar éxito
                    await self.send_status_update(
                        f"✅ Proceso completado - {len(accumulated_response)} caracteres procesados", 
                        True, 
                        __event_emitter__
                    )
                    
            except aiohttp.ClientConnectorError:
                error_msg = "❌ Error de conexión: No se pudo conectar al servicio"
                await self.send_status_update(error_msg, True, __event_emitter__)
                return error_msg
                
            except asyncio.TimeoutError:
                error_msg = "⏰ Tiempo de espera agotado"
                await self.send_status_update(error_msg, True, __event_emitter__)
                return error_msg
                
            except aiohttp.ClientPayloadError as e:
                error_msg = f"🔥 Error en la transferencia de datos: {str(e)}"
                await self.send_status_update(error_msg, True, __event_emitter__)
                return error_msg
                
            except aiohttp.ClientError as e:
                error_msg = f"🔥 Error en la solicitud: {str(e)}"
                await self.send_status_update(error_msg, True, __event_emitter__)
                return error_msg
            
            return ""
            
        except Exception as e:
            error_msg = f"💥 Error interno: {str(e)}\n{traceback.format_exc()}"
            await self.send_status_update(error_msg, True, __event_emitter__)
            return error_msg
            
        finally:
            # No cerramos la sesión aquí para reutilizarla
            pass
