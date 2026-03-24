import React from 'react';
import { Icons } from './Icons';

export const DocumentGen = () => {
  const [selectedOwner, setSelectedOwner] = React.useState(null);

  const steps = [
    { id: 'first-letter', title: 'First Letter (Statutory Notice)', description: 'Initial 30-day notice of delinquency as per FL Statute 718.', status: 'completed', icon: Icons.DocumentGen },
    { id: 'second-letter', title: 'Second Letter (Intent to Lien)', description: '45-day notice of intent to record a claim of lien.', status: 'current', icon: Icons.FileClock },
    { id: 'claim-of-lien', title: 'Claim of Lien', description: 'Formal recording of the lien against the property.', status: 'pending', icon: Icons.Legal },
    { id: 'foreclosure', title: 'Foreclosure Referral', description: 'Final referral to legal counsel for foreclosure proceedings.', status: 'pending', icon: Icons.Alert },
  ];

  const matters = [
    { name: 'Della Street', unit: '402', status: 'Intent to Lien', color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Perry Mason', unit: '101', status: 'Statutory Notice', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Paul Drake', unit: '305', status: 'Foreclosure', color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Document Generation</h1>
          <p className="text-slate-500 mt-1">Automated legal workflow and document drafting.</p>
        </div>
        <div className="relative">
          <Icons.Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search owner or unit..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1F6F5C]/20 w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Active Matters</h2>
          {matters.map((owner, i) => (
            <button
              key={i}
              onClick={() => setSelectedOwner(owner.name)}
              className={`w-full p-4 rounded-2xl border transition-all text-left group ${
                selectedOwner === owner.name ? 'border-[#1F6F5C] bg-[#1F6F5C]/5 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900">{owner.name}</h3>
                <span className="text-[10px] font-bold text-slate-400">Unit {owner.unit}</span>
              </div>
              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md ${owner.bg} ${owner.color}`}>
                <div className="size-1 rounded-full bg-current animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-tighter">{owner.status}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!selectedOwner ? (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center min-h-64">
              <div className="size-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                <Icons.DocumentGen className="size-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Select a Matter</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">Choose an active matter from the list to view the legal workflow and generate documents.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Legal Workflow: {selectedOwner}</h2>
                <p className="text-slate-500 text-sm mb-8">Current Stage: <span className="text-amber-600 font-bold uppercase tracking-wider">Intent to Lien</span></p>
                <div className="space-y-4 relative">
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-100"></div>
                  {steps.map((step, i) => (
                    <div key={step.id} className="flex gap-6 relative z-10">
                      <div className={`size-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                        step.status === 'completed' ? 'bg-emerald-500 text-white' :
                        step.status === 'current' ? 'bg-[#1F6F5C] text-white ring-4 ring-[#1F6F5C]/10' :
                        'bg-white border border-slate-200 text-slate-300'
                      }`}>
                        <step.icon className="size-5" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`font-bold ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.title}</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-md">{step.description}</p>
                          </div>
                          {step.status === 'completed' ? (
                            <button className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest hover:underline">
                              <Icons.Download className="size-3" /> Download PDF
                            </button>
                          ) : step.status === 'current' ? (
                            <button className="px-4 py-2 bg-[#1F6F5C] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1F6F5C]/90 transition-all">
                              Generate Draft
                            </button>
                          ) : (
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Locked</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#F2C94C] rounded-xl text-[#1F6F5C]">
                    <Icons.AI className="size-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-widest text-xs">CondoClaw Intelligence</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Based on the uploaded ledger for <strong>{selectedOwner}</strong>, the delinquency has exceeded 45 days. I recommend generating the <strong>Intent to Lien</strong> draft immediately to maintain statutory compliance with FL Statute 718.116.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
