import React from 'react';
import { Icons } from './Icons';

export const TopBar = () => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between z-10">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-96">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search matters, owners, or documents..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
          <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">System: Online / Synced</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg relative transition-colors">
          <Icons.Notification className="size-5" />
          <span className="absolute top-2 right-2 size-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">Della Street</span>
          <div className="size-9 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
              alt="Della Street"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
