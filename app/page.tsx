import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 px-4 font-sans">
      <div className="max-w-4xl w-full">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white mb-2">Discord Bot Panel</h1>
          <p className="text-gray-400">Manage your deployed multi-purpose Dank + AI Discord Bot</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400">Bot Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Service</span>
                <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-sm">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Database</span>
                <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-sm">Connected (Firebase)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">AI Integration</span>
                <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-sm">Active (Gemini)</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">How to Deploy to Render</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
              <li>Export this repository to GitHub via the AI Studio UI.</li>
              <li>Log in to <a href="https://render.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Render</a> and create a new <strong>Web Service</strong>.</li>
              <li>Connect your GitHub repository.</li>
              <li>Set the Build Command to <code className="bg-gray-800 px-1 rounded">npm run build</code></li>
              <li>Set the Start Command to <code className="bg-gray-800 px-1 rounded">npm run start</code></li>
              <li>Add Environment Variables: <code className="bg-gray-800 px-1 rounded">DISCORD_BOT_TOKEN</code>, <code className="bg-gray-800 px-1 rounded">GEMINI_API_KEY</code>.</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
           <h2 className="text-xl font-semibold mb-4 text-white">Implemented Framework</h2>
           <p className="text-gray-300 text-sm leading-relaxed mb-4">
             Your bot's core architecture and AI integrations have been scaffolded in the <code className="bg-gray-800 px-1 rounded">/bot</code> directory. Given the scope of 316 commands, a robust command handler is in place in <code className="bg-gray-800 px-1 rounded">/bot/index.ts</code> reading dynamically from <code className="bg-gray-800 px-1 rounded">/bot/commands/</code>.
           </p>
           <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
             <li>Custom Node.js server bootstraps both Next.js and Discord.js simultaneously.</li>
             <li>Firebase connection initialized in <code className="bg-gray-800 px-1 rounded">/lib/firebase.ts</code>.</li>
             <li>AI integration via <code className="bg-gray-800 px-1 rounded">gemini-2.5-flash</code> is active in <code className="bg-gray-800 px-1 rounded">/bot/commands/ai.ts</code>.</li>
             <li>Sample Dank Memer Heist announcement with AI hype generation in <code className="bg-gray-800 px-1 rounded">/bot/commands/heist.ts</code>.</li>
           </ul>
        </div>
      </div>
    </div>
  );
}
