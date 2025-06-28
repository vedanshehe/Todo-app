'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-rose-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 font-serif">Welcome to TODO App</h1>

      <div className="space-x-6">
        <Link href="/add">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow transition">
            ➕ Add Task
          </button>
        </Link>
        <Link href="/view">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition">
            📋 View Tasks
          </button>
        </Link>
      </div>
    </div>
  );
}
