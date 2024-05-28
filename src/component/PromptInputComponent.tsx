import React, { useState } from 'react';
import PromptTemplateDialog from './PromptTemplateDialog';
import { PromptTemplate } from '../Entity/PromptTemplate';

interface PromptInputProps {
    onSendMessage: (newMessage: string) => void;
    promptTemplates: PromptTemplate[]; // Agrega promptTemplates
    setPromptTemplates: React.Dispatch<React.SetStateAction<PromptTemplate[]>>; // Agrega setPromptTemplates
}

const PromptInputComponent: React.FC<PromptInputProps> = ({ onSendMessage, promptTemplates, setPromptTemplates }) => {
    const [inputValue, setInputValue] = useState('');
    const [showList, setShowList] = useState(false);
    const allItems = promptTemplates.map(template => template.name);
    const filteredItems = allItems.filter(item => item.toLowerCase().includes(inputValue.toLowerCase().substring(1)));
   

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setShowList(newValue.startsWith('/'));
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputValue.trim() !== '') {
            onSendMessage(inputValue.trim());
            setInputValue('');
            setShowList(false);
        }
    };


    return (
        <div>            

            <form className="mt-2" onSubmit={handleFormSubmit}>
                <label htmlFor="chat-input" className="sr-only">Enter your prompt</label>
                <div className="relative" style={{ marginLeft: '12px', marginRight: '12px', marginBottom: '12px' }}>
                    {/* Lista que se muestra cuando showList es verdadero */}
                    {showList && (
                        <div className="top-0 left-0 right-0 bg-white rounded shadow-md z-10" style={{ marginLeft: '12px', marginRight: '12px', marginBottom: '12px', overflowY: 'auto', maxHeight: '200px' }}>
                            <div className="px-1 py-2 bg-gray-900 text-slate-200">Prompt Template</div>
                            <ul className="p-2 dark:bg-gray-700">
                                {filteredItems.map((item: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, index: React.Key | null | undefined) => (
                                    <li
                                        key={index}
                                        className="py-1 px-2 hover:bg-gray-500 dark:hover:bg-gray-600 border-b border-white-200 dark:border-white-500"
                                        onClick={() => {
                                            setInputValue('/' + item);
                                            setShowList(false);
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Textarea */}
                    <textarea
                        id="chat-input"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="block w-full resize-none rounded-xl border-none bg-slate-200 p-4 pl-10 pr-20 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-200  dark:bg-slate-900 dark:placeholder-slate-400 dark:focus:ring-blue-500 sm:text-base"
                        placeholder="Enter your prompt"
                        rows={3}
                        required
                    ></textarea>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
                    >
                        Send <span className="sr-only">Send message</span>
                    </button>

                    {/* Botón para abrir el diálogo de creación de plantillas de prompts */}
                   
                </div>
            </form>
        </div>
    );
};

export default PromptInputComponent;
