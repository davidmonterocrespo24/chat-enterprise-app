import React, { useState, useRef, useEffect } from "react";
import PromptMessageComponent from "./PromptMessageComponent";
import PromptInputComponent from "./PromptInputComponent";
import NavBarComponent from "./NavBarComponent";
import { ChatMessage } from "../Entity/ChatMessage";
import { EventSourcePolyfill } from 'event-source-polyfill';
import { PromptTemplate } from "../Entity/PromptTemplate";

interface ChatComponentProps {
    promptTemplates: PromptTemplate[];
    setPromptTemplates: React.Dispatch<React.SetStateAction<PromptTemplate[]>>;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ promptTemplates, setPromptTemplates }) => {
    // Resto del código del componente

    const initialMessages: ChatMessage[] = [
        {
            role: "user",
            content: "What are three great applications of quantum computing?",
        },
        {
            role: "assistant",
            content: "Three great applications of quantum computing are: Optimization of complex problems, Drug Discovery, and Cryptography.",
        },
    ];

    // Define el estado `messages` e inicialízalo con `initialMessages`
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    // Crear una referencia para la última respuesta para mover el scroll
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    // Mueve el scroll después de agregar un mensaje
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    // Función para manejar el envío de un nuevo mensaje
    const handleSendMessage = async (newMessage: string) => {
        // Agregar el nuevo mensaje del usuario a los mensajes
        setMessages((prevMessages) => [...prevMessages, { role: "user", content: newMessage }]);

        try {
            // Realizar la petición a la API de OpenAI con el nuevo mensaje
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer `, // Usa tu clave API de OpenAI como variable de entorno
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: newMessage }],
                    stream: true, // Activa el streaming de respuestas
                }),
            });

            if (!response.body) return;
            //insertar un nuevo mensaje de assintente en blanco
            setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: "" }]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let currentAssistantMessage = '';
            let finished = false; // Variable para controlar si la transmisión ha terminado

            while (!finished) {
                const { done, value } = await reader.read();

                if (done) {
                    finished = true;
                    continue;
                }

                // Decodifica el valor leído
                const chunk = decoder.decode(value);

                // Divide los datos en líneas, ya que cada mensaje parcial viene en una línea separada
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    // Si la línea indica el final de la transmisión, marca como terminado
                    if (line === 'data: [DONE]') {
                        finished = true;
                        break;
                    }

                    // Procesa cada línea JSON para obtener el contenido
                    if (line.startsWith('data: ')) {
                        const data = JSON.parse(line.slice(6)); // Quita 'data: ' antes de parsear

                        // Verifica si hay contenido y lo agrega al mensaje parcial
                        if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                            const deltaContent = data.choices[0].delta.content;
                            currentAssistantMessage += deltaContent;

                            // Actualiza el estado `messages` para incluir la respuesta parcial
                            // Actualiza el estado `messages` para incluir la respuesta parcial
                            setMessages((prevMessages) => {
                                // Busca el primer mensaje assistant para actualizarlo desde el final de la lista
                                const reversedMessages = [...prevMessages].reverse();
                                const reversedIndex = reversedMessages.findIndex((message) => message.role === "assistant");

                                // Calcula el índice real en el array original
                                const firstAssistantMessageIndex = reversedMessages.length - 1 - reversedIndex;

                                if (firstAssistantMessageIndex !== -1) {
                                    // Actualiza el primer mensaje assistant
                                    const updatedMessages = [...prevMessages];
                                    updatedMessages[firstAssistantMessageIndex].content = currentAssistantMessage;
                                    return updatedMessages;
                                } else {
                                    // Si no hay un mensaje assistant previo, crea uno nuevo
                                    return [...prevMessages, { role: "assistant", content: currentAssistantMessage }];
                                }
                            });

                            // Mueve el scroll a la última respuesta
                            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error al manejar el streaming de OpenAI:", error);
        }
    };




    return (
        <div className="flex h-[100vh] w-full flex-col rounded-lg">
            <PromptMessageComponent messages={messages} lastMessageRef={lastMessageRef} />
            <PromptInputComponent
                onSendMessage={handleSendMessage}
                promptTemplates={promptTemplates}
                setPromptTemplates={setPromptTemplates}
            />
        </div>

    );
};

export default ChatComponent;
