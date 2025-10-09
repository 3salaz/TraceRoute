import { useState } from "react";
import { ChartBarIcon, ClockIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import iconLogo from "../assets/icon-logo.png";

export default function Sidebar({ activeView, setActiveView }) {

  const menu = [
    { id: "scanner", label: "Scanner", icon: ChartBarIcon },
    { id: "history", label: "History", icon: ClockIcon },
    { id: "settings", label: "Settings", icon: Cog6ToothIcon },
  ];

  return (
    <aside className="w-16 sm:w-56 flex-shrink-0 bg-white/80 dark:bg-slate-800 backdrop-blur-md shadow-lg flex flex-col">
      <div className="p-4 text-center font-bold text-green-600 flex items-center justify-center">
        {/* Mobile: show icon only */}
        <img
          src={iconLogo}
          alt="TraceRoute Icon"
          className="w-7 h-7 inline sm:hidden rounded-md border border-slate-800 border-double drop-shadow-md transition-all duration-300 ease-in-out"
        />
        {/* Tablet & up: show full text */}
        <span className="hidden sm:inline text-green-600 font-bold transition-all duration-300 ease-in-out">TraceRoute</span>
      </div>
      <nav className="flex-1 space-y-2 p-2">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex items-center w-full px-3 py-2 rounded-lg transition ${activeView === item.id
                ? "bg-green-600 text-white"
                : "hover:bg-green-50 dark:hover:bg-slate-700"
              }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}