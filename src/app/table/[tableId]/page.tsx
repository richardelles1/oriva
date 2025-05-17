'use client';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10 bg-gradient-to-b from-white to-indigo-50 text-center">
      <div className="text-4xl mb-6">🎉🍕🥗🍰🍹🎉</div>

      <h1 className="text-4xl font-bold mb-4">
        Scan & Split Your Bill <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">with Tabbit</span>
      </h1>

      <p className="text-gray-700 text-lg max-w-xl mb-10">
        Built for large parties, designed for fun. Tap what you ate, pay what you owe — no downloads, no drama.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md text-left">
          <h3 className="text-lg font-semibold mb-1">🍽️ Item-by-item Claims</h3>
          <p className="text-sm text-gray-600">Each diner taps what they ate — simple, visual, and fair.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-left">
          <h3 className="text-lg font-semibold mb-1">⚡ Fast & Fair Checkout</h3>
          <p className="text-sm text-gray-600">Splits are instant. No math. No awkward convos.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-left">
          <h3 className="text-lg font-semibold mb-1">📱 No App Download Needed</h3>
          <p className="text-sm text-gray-600">Scan the QR. Claim your meal. Pay and go.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-left">
          <h3 className="text-lg font-semibold mb-1">🧾 Receipts for Everyone</h3>
          <p className="text-sm text-gray-600">Instant digital receipts, emailed or saved on the spot.</p>
        </div>
      </div>

      <section className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4 text-center">
        <h2 className="text-xl font-bold text-gray-900">How It Works</h2>
        <ol className="list-decimal list-inside text-left text-gray-700 text-sm space-y-1">
          <li>Scan your table’s QR code to load the live bill.</li>
          <li>Tap your items. Add a name or emoji.</li>
          <li>Pay your share. Get a receipt. You’re done!</li>
        </ol>

        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg shadow hover:opacity-90 transition">
          🚀 Try Tabbit Now
        </button>
      </section>
    </main>
  );
}
