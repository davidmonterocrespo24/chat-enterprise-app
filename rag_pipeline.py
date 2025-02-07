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
        print(f"{self.name} iniciado")
        
    async def on_shutdown(self):
        print(f"{self.name} detenido")
        
    async def set_status(self, description: str, __event_emitter__: Optional[Callable[[Any], Awaitable[None]]] = None):
        if __event_emitter__:
            await __event_emitter__({"type": "status", "data": {"description": description, "done": False}})

    async def send_data(self, data: str, role: str = "assistant", __event_emitter__: Optional[Callable[[Any], Awaitable[None]]] = None):
        if __event_emitter__:
            await __event_emitter__({"type": "message", "data": {"content": data, "role": role}})
            
    async def set_status_end(self, data: str, __event_emitter__: Optional[Callable[[Any], Awaitable[None]]] = None):
        if __event_emitter__:
            await __event_emitter__({"type": "status", "data": {"description": data, "done": True}})

    async def pipe(
        self,
        body: dict,
        __user__: dict,
        __event_emitter__: Optional[Callable[[Any], Awaitable[None]]],
        __request__: Request,
        __task__=None,
    ) -> str:
        try:
            # Extract necessary information
            user_message = body.get("messages", [{}])[-1].get("content", "")
            model_id = body.get("model", self.valves.DEFAULT_MODEL)
            
            # Notify start of processing
            await self.set_status("Initializing pipeline...", __event_emitter__)
            
            # Prepare headers and message
            headers = {
                "accept": "application/json",
                "authorization": f"Bearer {self.valves.API_TOKEN}",
            }
            
            # Notify message preparation
            await self.set_status("Preparing message for processing...", __event_emitter__)
            
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
            
            form_data = {
                'chat_message': json.dumps(chat_message),
                'chat_history_id': str(body.get("chat_history_id", 0)),
                'chat_history_message': json.dumps([]),
                'configuration': json.dumps(configuration)
            }
            
            # Notify API request start
            await self.set_status("Sending request to API...", __event_emitter__)
            
            response = requests.post(
                f"{self.valves.API_URL}/chat_history/ask_question2/",
                files={key: (None, value) for key, value in form_data.items()},
                headers=headers,
                stream=True
            )
            response.raise_for_status()
            
            # Notify streaming start
            await self.set_status("Processing response stream...", __event_emitter__)
            
            accumulated_response = ""
            for chunk in response.iter_content(chunk_size=None):
                if chunk:
                    chunk_text = chunk.decode('utf-8')
                    accumulated_response += chunk_text
                    # Send chunk to user
                    await self.send_data(chunk_text, "assistant", __event_emitter__)
            
            # Notify completion
            await self.set_status_end(f"Pipeline completed successfully - Processed {len(accumulated_response)} characters", __event_emitter__)
            
            return ""
            
        except requests.exceptions.RequestException as e:
            error_msg = f"API Request Error: {str(e)}"
            await self.set_status_end(error_msg, __event_emitter__)
            return error_msg
            
        except Exception as e:
            error_msg = f"Internal Error: {str(e)}\n{traceback.format_exc()}"
            await self.set_status_end(error_msg, __event_emitter__)
            return error_msg
