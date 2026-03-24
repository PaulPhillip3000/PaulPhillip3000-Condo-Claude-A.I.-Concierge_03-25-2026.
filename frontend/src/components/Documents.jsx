import React from 'react';
import { Icons } from './Icons';

export const Documents = () => {
  const docs = [
    { id: 1, name: 'Demand_Letter_U402.pdf', type: 'Notice', association: 'Pine Ridge', status: 'Generated', version: 'v2', date: 'Oct 12, 2024' },
    { id: 2, name: 'Ledger_Audit_Report.xlsx', type: 'Ledger', association: 'Oak Hollow', status: 'In Queue', version: 'v1', date: 'Oct 11, 2024' },
    { id: 3, name: 'Mailing_Affidavit_Smith.pdf', type: 'Affidavit', association: 'Pine Ridge', status: 'Approved', version: 'v1', date: 'Oct 10, 2024' },
    { id: 4, name: 'NOLA_Pine_Ridge_402.pdf', type: 'NOLA', association: 'Pine Ridge', status: 'Archived', version: 'v1', date: 'Oct 09, 2024' },
  ];

  const handleDownload = async (doc) => {
    try {
      const response = await fetch(`/api/download/${doc.name}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Document Repository</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">Access generated documents, queues, and historical versions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
            <Icons.FileStack className="size-4" />
            Version History
          </button>
          <button className="bg-[#1F6F5C] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#1F6F5C]/90 transition-all">
            Upload New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-4">
          <div className="flex-1 relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter documents by name, association, or type..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1F6F5C]/20"
            />
          </div>
          <select className="bg-slate-50 border-none rounded-xl text-sm px-4 py-2 outline-none">
            <option>All Types</option>
            <option>Notices</option>
            <option>Ledgers</option>
            <option>Affidavits</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Association</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Version</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-slate-100 rounded flex items-center justify-center text-slate-400 group-hover:text-[#1F6F5C] transition-colors">
                        <Icons.DocumentGen className="size-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-800">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs text-slate-500">{doc.type}</span></td>
                  <td className="px-6 py-4"><span className="text-xs text-slate-500">{doc.association}</span></td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                      doc.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      doc.status === 'Generated' ? 'bg-blue-100 text-blue-700' :
                      doc.status === 'In Queue' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs font-mono text-slate-400">{doc.version}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-[#1F6F5C] transition-colors"><Icons.View className="size-4" /></button>
                      <button onClick={() => handleDownload(doc)} className="p-2 text-slate-400 hover:text-[#1F6F5C] transition-colors"><Icons.Download className="size-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Icons.Flag className="size-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
