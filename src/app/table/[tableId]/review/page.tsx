'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const mockClaims = [
  {
    name: 'Alice 🍕',
    items: ['Margherita Pizza', 'Glass of Wine'],
  },
  {
    name: 'Bob 🥗',
    items: ['Caesar Salad', 'Cheeseburger'],
  },
  {
    name: 'You 🍰',
    items: ['Fries', 'Chocolate Cake'],
  },
];

export default function ReviewPage() {
  const router = useRouter();

  const handleConfirm = () => {
    router.push('/table/checkout');
  };

  const handleRestart = () => {
    router.push('/table/join');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-6 py-20 font-sans text-gray-900 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-4 text-center">Review Your Table</h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-md">
        Here’s what everyone claimed. Ready to check out?
      </p>

      <div className="w-full max-w-2xl flex flex-col gap-6 mb-10">
        {mockClaims.map((person, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-3xl px-6 py-5 shadow-md"
          >
            <h2 className="text-xl font-bold mb-2">{person.name}</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {person.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={handleConfirm}
          className="w-full px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition"
        >
          ✅ Looks Good — Proceed to Checkout
        </button>
        <button
          onClick={handleRestart}
          className="w-full px-8 py-3 rounded-full bg-gray-200 text-gray-800 font-semibold text-lg shadow hover:scale-105 transition"
        >
          🔄 Start Over
        </button>
      </div>
    </main>
  );
}
