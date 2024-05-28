import React from 'react';
import { CardData } from '../Entity/CardData';
import defaultImage from '../path-to-public-folder/pdf.jpg';

interface CardProps {
    card: CardData;
}


const CardComponent: React.FC<CardProps> = ({ card }) => {
    return (
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg dark:shadow-gray-700/25  dark:bg-gray-900" style={{ overflowY: 'auto' }}>
            <img
                alt={card.title}
                src={card.image}
                className="h-32 w-full object-cover" // Ajusta la altura de la imagen a 32vh
            />
            <div className="bg-white p-4 sm:p-6 dark:bg-gray-900">
                <time className="block text-xs text-gray-500 dark:text-gray-400">
                    {card.date}
                </time>
                <h3 className="mt-0.5 text-sm text-gray-900 dark:text-white"> {/* Cambia a text-sm */}
                    {card.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                    {card.content}
                </p>
            </div>
        </article>
    );
};


export default CardComponent;




