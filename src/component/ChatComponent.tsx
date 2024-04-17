import React from 'react';

const ChatComponent = () => {
  return (
    <div>
<div className="flex flex-row h-screen bg-slate-300 dark:bg-slate-800 text-slate-900 dark:text-slate-300 sm:text-base sm:leading-7">
<div
  className="max-w-xl rounded-lg border border-slate-300 bg-slate-50 py-8 dark:border-slate-200/10 dark:bg-slate-900"
>
  <div className="flex items-start">
    <h2
      className="inline px-5 text-lg font-medium text-slate-800 dark:text-slate-200"
    >
      Chats
    </h2>
    <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-slate-200"
      >24</span
    >
  </div>
  <form className="mx-2 mt-8">
    <label htmlFor="chat-input" className="sr-only">Search chats</label>
    <div className="relative">
      <input
        id="search-chats"
        type="text"
        className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 pr-10 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        placeholder="Search chats"
       
        required
      />
      <button
        type="button"
        className="absolute bottom-2 right-2.5 rounded-lg p-2 text-sm text-slate-500 hover:text-blue-700 focus:outline-none sm:text-base"
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

  <div className="my-4 h-80 space-y-4 overflow-y-auto px-2">
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
    <button
      className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800"
    >
      <h1
        className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
      >
        What is GPT UI?
      </h1>
      <p className="text-xs text-slate-500 dark:text-slate-400">1 Jan</p>
    </button>
    <button
      className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800"
    >
      <h1
        className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
      >
        How to use Tailwind components?
      </h1>
      <p className="text-xs text-slate-500 dark:text-slate-400">1 Jan</p>
    </button>
  </div>
  <div className="mx-2 mt-8">
    <button
      className="flex w-full flex-row-reverse justify-between rounded-lg bg-slate-600 p-4 text-sm font-medium text-slate-200 transition-colors duration-200 hover:bg-blue-600 focus:outline-none dark:bg-slate-800 dark:hover:bg-blue-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 5l0 14"></path>
        <path d="M5 12l14 0"></path>
      </svg>
      <span>New Chat</span>
    </button>
  </div>
</div>

    <div
  className="flex-1 overflow-y-auto bg-slate-300 text-sm leading-6 text-slate-900 shadow-md dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7"
>
    
  <div className="flex flex-row px-4 py-8 sm:px-6">
    <img
      className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
      src="https://dummyimage.com/256x256/363536/ffffff&text=U"
    />

    <div className="flex max-w-3xl items-center">
      <p>Explain quantum computing in simple terms</p>
    </div>
  </div>

  <div className="flex bg-slate-100 px-4 py-8 dark:bg-slate-900 sm:px-6">
    <img
      className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
      src="https://dummyimage.com/256x256/354ea1/ffffff&text=G"
    />

    <div
      className="flex w-full flex-col items-start lg:flex-row lg:justify-between"
    >
      <p className="max-w-3xl">
        Certainly! Quantum computing is a new type of computing that relies on
        the principles of quantum physics. Traditional computers, like the one
        you might be using right now, use bits to store and process information.
        These bits can represent either a 0 or a 1. In contrast, quantum
        computers use quantum bits, or qubits.<br /><br />
        Unlike bits, qubits can represent not only a 0 or a 1 but also a
        superposition of both states simultaneously. This means that a qubit can
        be in multiple states at once, which allows quantum computers to perform
        certain calculations much faster and more efficiently.
      </p>
      <div
        className="mt-4 flex flex-row justify-start gap-x-2 text-slate-500 lg:mt-0"
      >
        <button className="hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"
            ></path>
          </svg>
        </button>
        <button className="hover:text-blue-600" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"
            ></path>
          </svg>
        </button>
        <button className="hover:text-blue-600" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
            ></path>
            <path
              d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div className="flex px-4 py-8 sm:px-6">
    <img
      className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
      src="https://dummyimage.com/256x256/363536/ffffff&text=U"
    />

    <div className="flex max-w-3xl items-center">
      <p>What are three great applications of quantum computing?</p>
    </div>
  </div>

  <div className="flex bg-slate-100 px-4 py-8 dark:bg-slate-900 sm:px-6">
    <img
      className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
      src="https://dummyimage.com/256x256/354ea1/ffffff&text=G"
    />

    <div
      className="flex w-full flex-col items-start lg:flex-row lg:justify-between"
    >
      <p className="max-w-3xl">
        Three great applications of quantum computing are: Optimization of
        complex problems, Drug Discovery and Cryptography.
      </p>
      <div className="mt-4 flex flex-row gap-x-2 text-slate-500 lg:mt-0">
        <button className="hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"
            ></path>
          </svg>
        </button>
        <button className="hover:text-blue-600" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"
            ></path>
          </svg>
        </button>
        <button className="hover:text-blue-600" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
            ></path>
            <path
              d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  {/* Suggestions pannel above input */}
  <div
  className="mt-4 flex w-full gap-x-2 overflow-x-auto whitespace-nowrap text-xs text-slate-600 dark:text-slate-300 sm:text-sm"
>
  <button
    className="rounded-lg bg-slate-200 p-2 hover:bg-blue-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-blue-600 dark:hover:text-slate-50"
  >
    Regenerate response
  </button>
  <button
    className="rounded-lg bg-slate-200 p-2 hover:bg-blue-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-blue-600 dark:hover:text-slate-50"
  >
    Use prompt suggestions
  </button>
  <button
    className="rounded-lg bg-slate-200 p-2 hover:bg-blue-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-blue-600 dark:hover:text-slate-50"
  >
    Toggle web search
  </button>
  <button
    className="rounded-lg bg-slate-200 p-2 hover:bg-blue-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-blue-600 dark:hover:text-slate-50"
  >
    Select a tone
  </button>
  <button
    className="rounded-lg bg-slate-200 p-2 hover:bg-blue-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-blue-600 dark:hover:text-slate-50"
  >
    Improve
  </button>
  <button
    className="rounded-lg bg-slate-200 p-2 hover:bg-blue-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-blue-600 dark:hover:text-slate-50"
  >
    Make longer
  </button>
  <button
    className="rounded-lg bg-slate-200 p-2 hover:bg-blue-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-blue-600 dark:hover:text-slate-50"
  >
    Explain in simple words
  </button>
  <button
    className="rounded-lg bg-slate-200 p-2 hover:bg-blue-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-blue-600 dark:hover:text-slate-50"
  >
    Summarize in three lines
  </button>
  <button
    className="rounded-lg bg-slate-200 p-2 hover:bg-blue-600 hover:text-slate-200 dark:bg-slate-800 dark:hover:bg-blue-600 dark:hover:text-slate-50"
  >
    Translate content
  </button>
</div>
{/* Rounded input */}
<form>
  <label htmlFor="chat-input" className="sr-only">Enter your prompt</label>
  <div className="relative">
    <button
      type="button"
      className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600"
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"
        ></path>
        <path d="M5 10a7 7 0 0 0 14 0"></path>
        <path d="M8 21l8 0"></path>
        <path d="M12 17l0 4"></path>
      </svg>
      <span className="sr-only">Use voice input</span>
    </button>
    <textarea
      id="chat-input"
      className="mt-2 block w-full resize-none rounded-xl border-none bg-slate-200 p-4 pl-10 pr-20 text-sm text-slate-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-blue-600 sm:text-base"
      placeholder="Enter your prompt"
        rows={1}
      required
    ></textarea>
    <button
      type="submit"
      className="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
    >
      Send <span className="sr-only">Send message</span>
    </button>
  </div>
</form>
</div>

</div>
</div>
  );
};

export default ChatComponent;
