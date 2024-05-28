import React from 'react';

interface InputSearchProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBarComponent: React.FC<InputSearchProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="my-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cards..."
                className="w-full p-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-900  font-size-inherit pl-2 pr-4 h-8 w-80 overflow-wrap break-word    rounded-full word-wrap break-word  focus:outline-none focus:ring-2 focus:ring-blue-600"
               
            />
        </div>
    );
};

export default SearchBarComponent;
