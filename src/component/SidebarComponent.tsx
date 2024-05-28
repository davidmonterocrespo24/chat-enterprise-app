import React, { useState } from 'react';
import PromptTemplateDialog from './PromptTemplateDialog';
import { PromptTemplate } from '../Entity/PromptTemplate';
import HistoryComponent from './HistoryComponent';


interface PromptSideTemplateDialogProps {
  onSave: (template: PromptTemplate) => void;
}

const SidebarComponent: React.FC<PromptSideTemplateDialogProps> = ({ onSave }) => {
  // Estado para controlar la visibilidad de PromptTemplateDialog y HistoryComponent
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // Función para alternar la visibilidad de HistoryComponent
  const toggleHistoryVisibility = () => {
      setIsHistoryVisible(!isHistoryVisible);
  };


  return (
    <aside className="flex">
      <div
        className="flex h-screen w-12 flex-col items-center space-y-8 border-r border-slate-300 bg-slate-50 py-8 dark:border-slate-700 dark:bg-slate-900 sm:w-16"
      >
        {isDialogOpen && (
          <PromptTemplateDialog
            onSave={onSave}
            onClose={() => setIsDialogOpen(false)}
          />
        )}

        <div className="flex h-screen w-12 flex-col items-center space-y-8 border-r border-slate-300 bg-slate-50 py-8 dark:border-slate-700 dark:bg-slate-900 sm:w-16">
          {/* Otros botones y elementos en SidebarComponent */}


        </div>

        {/* Logo */}
        <a href="#" className="mb-1">
        </a>
        {/* New conversation */}
        <a
          onClick={() => setIsDialogOpen(true)}
          className="rounded-lg p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"            
            className="h-6 w-6"
          >
            <path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-40 824H232V687h97.9c11.6 32.8 32 62.3 59.1 84.7 34.5 28.5 78.2 44.3 123 44.3s88.5-15.7 123-44.3c27.1-22.4 47.5-51.9 59.1-84.7H792v-63H643.6l-5.2 24.7C626.4 708.5 573.2 752 512 752s-114.4-43.5-126.5-103.3l-5.2-24.7H232V136h560v752zM320 341h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 160h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" />
          </svg>
        </a>

        {/* New conversation */}
        <a
          className="rounded-lg p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 9h8"></path>
            <path d="M8 13h6"></path>
            <path
              d="M12.01 18.594l-4.01 2.406v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5"
            ></path>
            <path d="M16 19h6"></path>
            <path d="M19 16v6"></path>
          </svg>
        </a>

        {/* Conversations */}
        <a
          href="#"
          onClick={toggleHistoryVisibility}
          className="rounded-lg p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"
            ></path>
            <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
          </svg>
        </a>
        {/* Discover */}
        <a
          href="#"
          
           
          className="rounded-lg p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
            <path d="M21 21l-6 -6"></path>
          </svg>
        </a>
        {/* User */}
        <a
          href="#"
          className="rounded-lg p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path
              d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
            ></path>
          </svg>
        </a>
        {/* Settings */}
        <a
          href="#"
          className="rounded-lg p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"
            ></path>
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          </svg>
        </a>
      </div>
      {/* Second Column - Hidden - Add JS to toggle the hidden and shown states */}
      <div
        className="hidden h-screen w-52 overflow-y-auto bg-slate-50 py-8 dark:bg-slate-900 sm:w-60"
      >
        <h2
          className="inline px-5 text-lg font-medium text-slate-800 dark:text-slate-200"
        >
          Chats
        </h2>
        <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-slate-200" >24</span
        >

        <div className="mx-2 mt-8 space-y-4">
          <form>
            <label htmlFor="chat-input" className="sr-only">Search chats</label>
            <div className="relative">
              <input
                id="search-chats"
                type="text"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 pr-10 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                placeholder="Search chats"

                required
              />
              <button
                type="submit"
                className="absolute bottom-2 right-2.5 rounded-lg p-2 text-sm text-slate-500 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 9h8"></path>
                  <path d="M8 13h5"></path>
                  <path
                    d="M11.008 19.195l-3.008 1.805v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"
                  ></path>
                  <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                  <path d="M20.2 20.2l1.8 1.8"></path>
                </svg>
                <span className="sr-only">Search chats</span>
              </button>
            </div>
          </form>

          <button
            className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800"
          >
            <h1
              className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
            >
              Tailwind Classes
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">12 Mar</p>
          </button>

          <button
            className="flex w-full flex-col gap-y-2 rounded-lg bg-slate-200 px-3 py-2 text-left transition-colors duration-200 focus:outline-none dark:bg-slate-800"
          >
            <h1
              className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
            >
              explain quantum computing
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">10 Feb</p>
          </button>
          <button
            className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800"
          >
            <h1
              className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
            >
              How to create ERP Diagram
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">22 Jan</p>
          </button>
          <button
            className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800"
          >
            <h1
              className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
            >
              API Scaling Strategies
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">1 Jan</p>
          </button>
        </div>
      </div>
      {isHistoryVisible && <HistoryComponent />}
    </aside>
  );
};

export default SidebarComponent;




