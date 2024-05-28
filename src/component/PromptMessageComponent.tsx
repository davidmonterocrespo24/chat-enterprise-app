import React from "react";
import { ChatMessage } from "../Entity/ChatMessage";

interface PromptMessageComponentProps {
  messages: ChatMessage[];
  lastMessageRef: React.MutableRefObject<HTMLDivElement | null>;
}

const PromptMessageComponent: React.FC<PromptMessageComponentProps> = ({ messages, lastMessageRef }) => {
  return (
      <div className="flex-1 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7 " >
          {messages.map((message, index) => {
              // Determina si el mensaje actual es el último en la lista
              const isLastMessage = index === messages.length - 1;

              // Referencia para el último mensaje, usa `lastMessageRef` si es el último mensaje
              const messageRef = isLastMessage ? lastMessageRef : null;

              // Muestra mensajes del usuario
              if (message.role === "user") {
                  return (
                      <div key={index} className="flex px-2 py-4 sm:px-4" ref={messageRef}>
                          <img
                              className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                              src="https://dummyimage.com/256x256/363536/ffffff&text=U"
                          />
                          <div className="flex max-w-3xl items-center">
                              <p>{message.content}</p>
                          </div>
                      </div>
                  );
              }
              // Muestra respuestas del modelo de OpenAI
              if (message.role === "assistant") {
                  return (
                      <div key={index} className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 dark:bg-slate-900 sm:px-4" ref={messageRef}>
                          <img
                              className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                              src="https://dummyimage.com/256x256/354ea1/ffffff&text=G"
                          />
                          <div className="flex max-w-3xl items-center rounded-xl">
                              <p>{message.content}</p>
                          </div>
                      </div>
                  );
              }
              return null;
          })}
      </div>
  );
};

export default PromptMessageComponent;
