import React from 'react';
import { Icons } from './Icons';

export const Schedule = () => {
  const deadlines = [
    { id: 1, title: 'Final Notice: Smith, Unit 402', association: 'Pine Ridge', time: 'Today, 4:00 PM', priority: 'high', action: 'Verify Ledger' },
    { id: 2, title: 'Board Meeting Prep', association: 'Oak Hollow', time: 'Tomorrow, 10:00 AM', priority: 'medium', action: 'Export Reports' },
    { id: 3, title: 'Lien Filing: Unit 102B', association: 'Sunset Terrace', time: 'Oct 24, 2024', priority: 'high', action: 'AlphaCondor Review' },
    { id: 4, title: 'Compliance Audit', association: 'Riverbend', time: 'Oct 26, 2024', priority: 'low', action: 'Document Review' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Schedule & Deadlines</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage your upcoming tasks and legal deadlines.</p>
        </div>
        <button className="bg-[#1F6F5C] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#1F6F5C]/90 transition-all">
          <Icons.Plus className="size-4" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Icons.Time className="size-5 text-[#1F6F5C]" />
                What to do next
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Priority View</span>
            </div>
            <div className="divide-y divide-slate-100">
              {deadlines.map((item) => (
                <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 size-3 rounded-full ${
                      item.priority === 'high' ? 'bg-red-500' :
                      item.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.association} • {item.time}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                          {item.action}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                    Execute Task
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1F6F5C] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <h3 className="font-bold text-lg mb-2">Legal Compliance</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              3 matters require immediate attention to meet the 30-day statutory notice period.
            </p>
            <button className="mt-6 w-full bg-[#F2C94C] text-[#1F6F5C] font-black py-3 rounded-xl text-sm hover:bg-[#F2C94C]/90 transition-all">
              VIEW COMPLIANCE REPORT
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Calendar Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Total Tasks</span>
                <span className="text-xs font-bold text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Critical Deadlines</span>
                <span className="text-xs font-bold text-red-600">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Completed this week</span>
                <span className="text-xs font-bold text-green-600">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
