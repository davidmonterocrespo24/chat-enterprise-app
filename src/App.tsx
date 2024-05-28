import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatComponent from "./component/ChatComponent";
import HistoryComponent from "./component/HistoryComponent";
import Documents from "./component/DocumentComponent";
import SidebarComponent from "./component/SidebarComponent";
import DocumentsWithChat from "./component/DocumentsWithChat"; // Importa el nuevo componente
import NavBarComponent from "./component/NavBarComponent";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ChatViewer from "./component/ChatViewer";
import { PromptTemplate } from "./Entity/PromptTemplate";

function App() {
  const [promptTemplates, setPromptTemplates] = useState<PromptTemplate[]>([]);

  const handleSavePromptTemplate = (newTemplate: PromptTemplate) => {
    setPromptTemplates(prevTemplates => [...prevTemplates, newTemplate]);
  };
  return (
    <Router>
       
      <div className="flex flex-row  h-screen bg-slate-300 dark:bg-slate-800 text-slate-900 dark:text-slate-300 sm:text-base sm:leading-7 dark">
      <SidebarComponent 
       onSave={handleSavePromptTemplate}      
      />
        <Routes>
          <Route path="/" element={<HistoryComponent />} />
        </Routes>
        <div className="flex w-full flex-col">
        {/*  <NavBarComponent />*/}
          <Routes>
            {/* Ruta a ChatComponent */}
            <Route path="/chat" element={<ChatComponent 
                promptTemplates={promptTemplates}
                setPromptTemplates={setPromptTemplates}
            />} />
            <Route path="/documents" element={<Documents />} />
            {/* Nueva ruta para documentos con chat */}
            <Route path="/documents-chat" element={<DocumentsWithChat 
            promptTemplates={promptTemplates}
            setPromptTemplates={setPromptTemplates}/>} />
            <Route path="/chat-viewer" element={<ChatViewer  pdfUrl="/PRESUPUESTO OdooNext Wnyexteriors[184].pdf" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
