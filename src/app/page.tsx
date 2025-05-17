'use client';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-indigo-50 to-white px-6 py-16 text-gray-900 font-sans overflow-hidden">
      {/* 🎊 Floating Confetti Emojis */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => {
          const left = Math.floor(Math.random() * 100);
          const delay = Math.random() * 10;
          const duration = 8 + Math.random() * 8;
          const emoji = ['🎉', '🍕', '🍻', '💸'][i % 4];

          return (
            <span
              key={i}
              className="absolute text-2xl animate-tabbit-float"
              style={{
                left: `${left}%`,
                bottom: '-50px',
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            >
              {emoji}
            </span>
          );
        })}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 text-center mb-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
          <span className="block mb-2">Scan & Split Your Bill</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow">
            with Tabbit
          </span>
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
          Built for large parties, designed for fun. Tap what you ate, pay what you owe — no downloads, no drama.
        </p>
        <div className="mt-10 border-t border-gray-200 w-24 mx-auto"></div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-4xl mx-auto grid gap-8 sm:grid-cols-2">
        {[
          { icon: '🍽️', title: 'Item-by-item Claims', desc: 'Each diner taps what they ate — simple, visual, and fair.' },
          { icon: '⚡', title: 'Fast & Fair Checkout', desc: 'Splits are instant. No math. No awkward convos.' },
          { icon: '📱', title: 'No App Download Needed', desc: 'Scan the QR. Claim your meal. Pay and go.' },
          { icon: '🧾', title: 'Receipts for Everyone', desc: 'Instant digital receipts, emailed or saved on the spot.' },
        ].map((f, i) => (
          <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="text-3xl">{f.icon}</div>
            <div>
              <h2 className="text-xl font-bold">{f.title}</h2>
              <p className="text-gray-600 mt-1">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* How It Works + CTA */}
      <section className="relative z-10 mt-24 bg-indigo-50 border border-indigo-200 rounded-3xl px-8 py-10 max-w-3xl mx-auto shadow-inner text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4 text-lg text-gray-800 text-left max-w-xl mx-auto">
          <li>Scan your table's QR code to load the live bill.</li>
          <li>Tap your items. Add a name or an emoji avatar.</li>
          <li>Pay your share. Get a receipt. You're done!</li>
        </ol>

        <div className="mt-12 relative flex justify-center">
          {/* Glowing animated ring */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="animate-spin-slow w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-40 blur-3xl" />
          </div>

          {/* CTA Button */}
          <button className="relative z-10 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold text-lg shadow-lg transform hover:scale-105 transition duration-300">
            🚀 Try Tabbit Now
          </button>
        </div>
      </section>
    </main>
  );
}
