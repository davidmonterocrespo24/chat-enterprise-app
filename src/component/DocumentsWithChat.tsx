import React from 'react';
import DocumentComponent from './DocumentComponent';
import ChatComponent from './ChatComponent';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { PromptTemplate } from '../Entity/PromptTemplate';

interface ChatComponentProps {
    promptTemplates: PromptTemplate[];
    setPromptTemplates: React.Dispatch<React.SetStateAction<PromptTemplate[]>>;
}


const DocumentsWithChat : React.FC<ChatComponentProps> = ({ promptTemplates, setPromptTemplates }) => {   

    return (
        <PanelGroup
            autoSaveId="documents-chat"
            direction="horizontal"
            style={{ height: '1000vh', width: '100%' }} // Ajusta la altura y el ancho de los paneles
        >
            {/* Sección izquierda para la lista de tarjetas */}
            <Panel defaultSize={55} minSize={30} maxSize={70}   >
                <DocumentComponent  />
            </Panel>
            
            {/* Controlador de tamaño entre los paneles */}
            <PanelResizeHandle className="w-2 bg-gray-200 dark:bg-gray-700" />
            
            {/* Sección derecha para el chat */}
            <Panel defaultSize={45} minSize={30} maxSize={70}>
            <ChatComponent 
                promptTemplates={promptTemplates}
                setPromptTemplates={setPromptTemplates}
            />
            </Panel>
        </PanelGroup>
    );
};

export default DocumentsWithChat;
