import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configura el worker de pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerComponentProps {
    pdfUrl: string; // Especifica que pdfUrl es de tipo string
}

const PDFViewerComponent: React.FC<PDFViewerComponentProps> = ({ pdfUrl }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(0);

    // Función para manejar el éxito de la carga del documento
    const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        console.log(`El documento tiene ${numPages} páginas.`);
    };

    // Función para manejar el cambio de página con el scroll
    const handlePageChange = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        const scrollTop = element.scrollTop;
        const height = element.clientHeight;
        const scrollHeight = element.scrollHeight;

        const currentPage = Math.ceil(scrollTop / height) + 1;
        setPageNumber(currentPage);
    };

    // Componente de carga
    const LoadingIcon = () => (
        <div className="flex items-center justify-center h-full">
            <svg className="w-6 h-6 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2a10 10 0 100 20v-2a8 8 0 01-8-8z" />
            </svg>
            <span className="ml-2 text-blue-500">Cargando...</span>
        </div>
    );

    return (
        <div className="pdf-viewer h-full w-full overflow-auto" onScroll={handlePageChange}>
            {/* Cargar y visualizar el archivo PDF */}
            <Document file={pdfUrl} onLoadSuccess={handleDocumentLoadSuccess} loading={<LoadingIcon />}>
                {/* Especifica el número de páginas a visualizar */}
                {Array.from({ length: numPages }, (_, index) => (
                    <Page
                        key={index}
                        pageNumber={index + 1}
                        scale={1} // Ajusta la escala según tus necesidades
                        renderMode="canvas"
                        className="pdf-page"
                    />
                ))}
            </Document>
        </div>
    );
};

export default PDFViewerComponent;
