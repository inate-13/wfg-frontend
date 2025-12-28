export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Call Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time insights for AI voice agents
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Powered by AI
        </div>
      </div>
    </header>
  );
}
