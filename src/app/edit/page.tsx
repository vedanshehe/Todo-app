'use client';

import { useEffect, useState, useRef } from 'react';

interface Todo {
  id: number;
  title: string;
}

export default function EditPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deleted, setDeleted] = useState<Todo | null>(null);
  const undoTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(stored);
  }, []);

  const updateTodos = (updated: Todo[]) => {
    setTodos(updated);
    localStorage.setItem('todos', JSON.stringify(updated));
  };

  const handleEdit = (id: number, newTitle: string) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    updateTodos(updated);
  };

  const handleDelete = (id: number) => {
    const toDelete = todos.find(todo => todo.id === id);
    const updated = todos.filter(todo => todo.id !== id);

    if (toDelete) {
      setDeleted(toDelete);
      undoTimeout.current = setTimeout(() => {
        setDeleted(null);
      }, 4000);
    }

    updateTodos(updated);
  };

  const handleUndo = () => {
    if (deleted) {
      updateTodos([deleted, ...todos]);
      setDeleted(null);
      if (undoTimeout.current) clearTimeout(undoTimeout.current);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/crazywood.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-xl p-10 max-w-md w-full mx-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-6 text-center tracking-wide">
          Edit Todos
        </h1>

        {todos.length === 0 ? (
          <p className="text-gray-600 text-center">No tasks to edit. All done! 🚀</p>
        ) : (
          <ul className="space-y-4 transition-all duration-300">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="flex items-center gap-3 border-2 border-emerald-500 bg-white bg-opacity-70 px-4 py-3 rounded-lg shadow-sm transition-all duration-300 hover:scale-[1.01]"
              >
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                  className="flex-grow border border-gray-300 rounded-md p-2 text-gray-800 bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  autoFocus
                />
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition"
                  title="Delete"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Undo Snackbar */}
        {deleted && (
          <div className="mt-6 text-center animate-fade-in">
            <span className="text-sm text-gray-700">
  Deleted &quot;<strong>{deleted.title}</strong>&quot;
</span>

            <button
              onClick={handleUndo}
              className="ml-3 text-emerald-700 font-semibold underline hover:text-emerald-800 transition"
            >
              Undo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
