import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';
import SearchBarComponent from './SearchBarComponent';
import { CardData } from '../Entity/CardData';


const Documentos = () => {
    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para almacenar las tarjetas obtenidas de Odoo
    const [cardData, setCardData] = useState<CardData[]>([]);

    // Configura la conexión con Odoo
    const odooConfig = {
        host: 'http://localhost:8015', // Reemplaza con tu URL de Odoo
        database: 'odoo15', // Reemplaza con tu base de datos de Odoo
        username: 'react', // Reemplaza con tu nombre de usuario de Odoo
        password: 'react' // Reemplaza con tu contraseña de Odoo
    };

    // Función para realizar una llamada JSON-RPC a Odoo
    const callOdoo = async (method: string) => {
        try {
            const response = await axios.post(`${odooConfig.host}/jsonrpc`, {               
                jsonrpc: "2.0",
                method: "call",
                params: {
                    service: "object",
                    method: "execute_kw",
                    args: [odooConfig.database, 8, odooConfig.password, 'documents.document', 'search_read', [[]]],
                },                
                id: new Date().getTime(),
            });
            return response.data.result;
        } catch (error) {
            console.error('Error calling Odoo JSON-RPC:', error);
            throw error;
        }
    };
    

    // Función para obtener la lista de documentos
    const fetchDocuments = async () => {
        try {
            // Llama a Odoo para obtener documentos
            const documents = await callOdoo('execute_kw');
            
            if (documents && Array.isArray(documents)) {
                // Procesa los documentos y asegúrate de incluir la propiedad 'thumbnail'
                const cards = documents.map((doc) => ({
                    id: doc.id,
                    title: doc.name,
                    date: new Date(doc.create_date).toLocaleDateString(),
                    content: doc.data,
                    image: doc.thumbnail ? `data:image/png;base64,${doc.thumbnail}` : "/pdf.jpg", // Usar el campo 'thumbnail' para la imagen base64
                    thumbnail: doc.thumbnail, // Incluir 'thumbnail' para cumplir con 'CardData'
                }));                
                setCardData(cards);
            } else {
                console.error('No valid documents found:', documents);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };
    

    // Llama a la función para obtener documentos cuando el componente se monte
    useEffect(() => {
        fetchDocuments();
    }, []);

    // Filtra las tarjetas según el término de búsqueda
    const filteredCards = cardData.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
            <div className="container mx-auto p-4 "  >
                {/* Campo de búsqueda */}
                <SearchBarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
                {/* Contenedor de las tarjetas */}
                <div className="h-[100vh] flex  w-full flex-col rounded-lg" style={{ overflowY: 'auto'  }}>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4  rounded-lg"
                style={{ marginRight: '12px', marginBottom: '12px' }}
                     >
                    {/* Mapeo de las tarjetas filtradas */}
                    {filteredCards.map(card => (
                        <CardComponent key={card.id} card={card} />
                    ))}
                </div>
                </div>
            </div>
        );
        
   
};

export default Documentos;
