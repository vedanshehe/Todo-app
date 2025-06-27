'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPage() {
  const [task, setTask] = useState('');
  const router = useRouter();

  const handleAdd = () => {
    if (!task.trim()) {
      alert('Task cannot be empty!');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('todos') || '[]');
    const newTodo = {
      id: Date.now(),
      title: task
    };

    localStorage.setItem('todos', JSON.stringify([...existing, newTodo]));
    setTask('');
    router.push('/view');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/crazywood.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-xl p-10 max-w-md w-full mx-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-6 text-center tracking-wide">
          Add Todos
        </h1>

        <input
          type="text"
          placeholder="Write your task here..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />

        <button
          onClick={handleAdd}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-md shadow-md transition-all duration-200 transform hover:scale-105"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
