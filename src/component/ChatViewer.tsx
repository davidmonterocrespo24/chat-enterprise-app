import React from "react";
import ChatComponent from "./ChatComponent";
import PDFViewerComponent from "./PDFViewerComponent";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface ChatViewerProps {
  pdfUrl: string; // Especifica que pdfUrl es de tipo string
}

const ChatViewer: React.FC<ChatViewerProps> = ({ pdfUrl }) => {
  return (
    <PanelGroup
      autoSaveId="chat-viewer-layout"
      direction="horizontal"
      style={{ height: "100vh", width: "100%" }}
    >
      <Panel defaultSize={50} minSize={30} maxSize={70}>
        <PDFViewerComponent pdfUrl={pdfUrl} />
      </Panel>
      <PanelResizeHandle className="w-2 bg-gray-200 dark:bg-gray-700" />

      <Panel defaultSize={50} minSize={30} maxSize={70}>
          {/* <ChatComponent />*/}
      </Panel>
    </PanelGroup>
  );
};

export default ChatViewer;
