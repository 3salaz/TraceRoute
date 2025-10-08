import Sidebar from "../Sidebar";
import Header from "../Header";

export default function DashboardLayout({ children, activeView, setActiveView }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}