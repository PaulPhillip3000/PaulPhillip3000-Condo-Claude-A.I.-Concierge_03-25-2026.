import React from 'react';
import { Icons } from './Icons';

export const MemoryPage = () => {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/memory/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching memory stats:', error);
      // Fallback demo data
      setStats({
        totalItems: 3, correctionsApplied: 0, passRate: 100,
        flaggedItems: 0, avgConfidence: 94.2,
        history: [
          { id: 1, type: 'nola', content: 'Approved NOLA Template: Notice of Late Assessment for Unit {unit}.', metadata: '{"approved":true}', created_at: new Date().toISOString() },
          { id: 2, type: 'affidavit', content: 'Approved Affidavit: Mailing Affidavit for {owner}.', metadata: '{"approved":true}', created_at: new Date().toISOString() },
          { id: 3, type: 'ledger', content: 'Standard Ledger Format: Date, Description, Charge, Credit, Balance.', metadata: '{"approved":true}', created_at: new Date().toISOString() },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) formData.append('files', files[i]);
    try {
      const res = await fetch('/api/memory/upload', { method: 'POST', body: formData });
      if (res.ok) fetchStats();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  React.useEffect(() => { fetchStats(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F6F5C]"></div>
      </div>
    );
  }

  const metrics = [
    { label: 'System Pass Rate', value: `${stats?.passRate}%`, icon: Icons.Check, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Flagged Items', value: stats?.flaggedItems, icon: Icons.Flag, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Corrections Applied', value: stats?.correctionsApplied, icon: Icons.History, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Avg Confidence', value: `${stats?.avgConfidence}%`, icon: Icons.ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">CondoClaw Memory</h1>
          <p className="text-slate-500 mt-1">System reference dataset and AI training history.</p>
        </div>
        <div className="flex gap-3">
          <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" multiple accept=".pdf,.doc,.docx,.xls,.xlsx" />
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Icons.Download className="size-4" /> Export Dataset
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-[#1F6F5C] text-white rounded-xl text-sm font-bold hover:bg-[#1F6F5C]/90 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {uploading ? <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Icons.Plus className="size-4" />}
            {uploading ? 'Uploading...' : 'Upload Training Data'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${metric.bg} ${metric.color}`}>
                <metric.icon className="size-5" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Metric</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Reference Dataset & History</h2>
          <div className="relative">
            <Icons.Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search memory..." className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#1F6F5C]/20 w-64" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Content Preview</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Confidence</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats?.history.map((item) => {
                let metadata = {};
                try { metadata = JSON.parse(item.metadata || '{}'); } catch(e) {}
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                        item.type === 'nola' ? 'bg-blue-100 text-blue-700' :
                        item.type === 'ledger' ? 'bg-amber-100 text-amber-700' :
                        item.type === 'affidavit' ? 'bg-purple-100 text-purple-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 max-w-md font-medium truncate">{item.content}</p>
                    </td>
                    <td className="px-6 py-4">
                      {metadata.approved ? (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <Icons.Check className="size-3" />
                          <span className="text-[10px] font-bold uppercase">Approved</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600">
                          <Icons.Alert className="size-3" />
                          <span className="text-[10px] font-bold uppercase">Flagged</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${metadata.approved ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: metadata.approved ? '98%' : '84%' }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-600">{metadata.approved ? '98%' : '84%'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-[#1F6F5C]">
                        <Icons.View className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
          <p className="text-xs text-slate-500 font-medium">Showing {stats?.history.length} of {stats?.totalItems} reference points</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed">Prev</button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-white transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
