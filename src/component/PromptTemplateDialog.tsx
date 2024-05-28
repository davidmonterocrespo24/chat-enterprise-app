import React, { useState } from 'react';
import { PromptTemplate } from '../Entity/PromptTemplate';


interface PromptTemplateDialogProps {
    onSave: (template: PromptTemplate) => void;
    onClose: () => void;
}

const PromptTemplateDialog: React.FC<PromptTemplateDialogProps> = ({ onSave, onClose }) => {
    // Estados para el nombre, descripción y contenido de la plantilla de prompt
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    const handleSave = () => {
        if (name.trim() !== '' && content.trim() !== '') {
            const newTemplate: PromptTemplate = { name, description, content };
            onSave(newTemplate);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0   bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg shadow-sm p-6 max-w-md w-full ">
                <h2 className="text-xl font-semibold mb-4">New Prompt Template</h2>
                <p className="mb-4">To use a prompt you need to be inside of a chat you can join.</p>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="name">Name (Shortcut):</label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="description">Description:</label>
                    <input 
                        id="description"
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="content">Prompt content:</label>
                    <textarea
                        id="content"
                        className="w-full px-3 py-2 border rounded-lg dark:bg-slate-900"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter prompt content here. Use {{}} to create a variable."
                        rows={3}
                        required
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        className="mr-2 px-4 py-2 bg-gray-300 rounded-lg dark:bg-slate-900"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptTemplateDialog;
