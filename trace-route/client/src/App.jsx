import './App.css'
import ScanInput from './components/ScanInput';
import DashboardLayout from './components/Layout/DashboardLayout';
import { useState } from 'react';
import SettingsView from './components/SettingsView';
import HistoryView from './components/HistoryView';


function App() {
  const [activeView, setActiveView] = useState("scanner");
  const renderView = () => {
    switch (activeView) {
      case "scanner":
        return <ScanInput />;
      case "history":
        return <HistoryView />;
      case "settings":
        return <SettingsView />;
      default:
        return <ScanInput />;
    }
  }
  return (
    <DashboardLayout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </DashboardLayout>
  )
}
export default App
