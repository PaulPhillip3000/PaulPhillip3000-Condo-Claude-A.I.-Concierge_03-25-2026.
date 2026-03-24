import React from 'react';
import { Icons } from './Icons';

export const Sidebar = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', icon: Icons.Dashboard, label: 'Dashboard' },
    { id: 'document-gen', icon: Icons.DocumentGen, label: 'Document Generation' },
    { id: 'associations', icon: Icons.Associations, label: 'Associations' },
    { id: 'unit-owners', icon: Icons.UnitOwners, label: 'Unit Owners' },
    { id: 'schedule', icon: Icons.Schedule, label: 'Schedule' },
    { id: 'documents', icon: Icons.Documents, label: 'Documents' },
    { id: 'memory', icon: Icons.Memory, label: 'CondoClaw Memory' },
    { id: 'reports', icon: Icons.Reports, label: 'Reports' },
  ];

  return (
    <aside className="w-64 bg-[#1F6F5C] text-white flex flex-col flex-shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-[#F2C94C] rounded-lg flex items-center justify-center shadow-lg">
          <svg className="size-8 text-[#1F6F5C]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 5C21 5 18 2 15 2C12 2 10 4 8 4C6 4 4 2 4 2C4 2 5 5 5 8C5 11 7 13 9 14C8.5 15.5 8 17 8 17L6 18V19H9L10 18C10 18 10.5 16.5 11 15C12 15 13 14.5 14 14C17 14 21 11 21 8C21 5 21 5 21 5Z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg leading-tight tracking-tight">CondoClaw</h1>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/70">AI Concierge</span>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              activePage === item.id ? 'sidebar-active' : 'hover:bg-white/10'
            }`}
          >
            <item.icon className={`size-5 ${activePage === item.id ? 'text-[#F2C94C]' : 'text-white/70 group-hover:text-white'}`} />
            <span className={`text-sm font-medium ${activePage === item.id ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white">
          <Icons.Settings className="size-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>
        <div className="flex items-center gap-3 px-4 py-3 mt-2">
          <div className="size-9 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border border-white/20">
            <img src="https://i.pravatar.cc/150?img=47" alt="Della Street" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-semibold truncate">Della Street</p>
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Admin Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
