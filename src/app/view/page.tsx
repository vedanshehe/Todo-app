'use client';

import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function ViewPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('todos') || '[]');

   const safeTodos = stored.map((todo: Partial<Todo>) => ({

      ...todo,
      completed: todo.completed ?? false,
    }));

    setTodos(safeTodos);
  }, []);

  const toggleComplete = (id: number) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
    localStorage.setItem('todos', JSON.stringify(updated));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/crazywood.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-xl p-10 max-w-md w-full mx-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-6 text-center tracking-wide">
          Your To-Dos
        </h1>

        {todos.length === 0 ? (
          <p className="text-gray-600 text-center">No tasks yet. Enjoy your peace 🧘‍♂️</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center gap-3 border-2 rounded-lg px-4 py-3 shadow-sm transition ${
                  todo.completed
                    ? 'opacity-60 line-through border-gray-400 bg-white/60'
                    : 'border-emerald-500 bg-white/80'
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="accent-emerald-600 w-5 h-5"
                />
                <span className="text-gray-800 font-medium">{todo.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
