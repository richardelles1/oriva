'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function DonePage() {
  const { tableId } = useParams();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#fff1f8] to-[#e9ddff] px-6 py-12 flex flex-col items-center justify-center font-sans overflow-hidden">
      {/* Floating Emoji Confetti */}
      <div className="absolute inset-0 pointer-events-none animate-pulse text-3xl opacity-30 select-none">
        <div className="absolute top-10 left-10 animate-float">🎉</div>
        <div className="absolute top-20 right-12 animate-float">🥳</div>
        <div className="absolute bottom-16 left-14 animate-float">🍽️</div>
        <div className="absolute bottom-10 right-10 animate-float">✅</div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="z-10 text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Thanks for using Tabbit!
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Your table is officially wrapped. See you next meal!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
  <button
    onClick={() => router.push(`/table/${tableId}/receipt`)}
    className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-base px-6 py-3 rounded-xl shadow hover:brightness-110 h-12 leading-none"
  >
    🧾 View Receipt
  </button>

  <button
    onClick={() => router.push(`/table/${tableId}/summary`)}
    className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-base px-6 py-3 rounded-xl shadow hover:brightness-110 h-12 leading-none"
  >
    📊 View Summary
  </button>

  <button
    onClick={() => router.push(`/table/join`)}
    className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-base px-6 py-3 rounded-xl shadow hover:brightness-110 h-12 leading-none"
  >
    🚀 Start New Table
  </button>
</div>
      </motion.div>

      {/* Tabbit Mascot */}
      <div className="mt-16 text-5xl animate-bounce">🐰</div>
    </main>
  );
}
