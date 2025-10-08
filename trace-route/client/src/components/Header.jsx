export default function Header() {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
      <h1 className="text-lg font-semibold tracking-wide">Dashboard</h1>
      <div className="text-sm opacity-70">v1.0.0</div>
    </header>
  );
}