import React from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { AIConcierge } from './components/AIConcierge';
import { Schedule } from './components/Schedule';
import { Documents } from './components/Documents';
import { MemoryPage } from './components/MemoryPage';
import { UnitOwnersPage } from './components/UnitOwnersPage';
import { DocumentGen } from './components/DocumentGen';

export default function App() {
  const [activePage, setActivePage] = React.useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':    return <Dashboard />;
      case 'document-gen': return <DocumentGen />;
      case 'unit-owners':  return <UnitOwnersPage />;
      case 'schedule':     return <Schedule />;
      case 'documents':    return <Documents />;
      case 'memory':       return <MemoryPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <p className="text-lg font-bold uppercase tracking-widest">Coming Soon</p>
            <p className="text-sm mt-2">The {activePage} module is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg-light font-sans">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col min-w-0 bg-white shadow-2xl">
        <TopBar />
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            {renderPage()}
          </main>
          <AIConcierge />
        </div>
      </div>
    </div>
  );
}
