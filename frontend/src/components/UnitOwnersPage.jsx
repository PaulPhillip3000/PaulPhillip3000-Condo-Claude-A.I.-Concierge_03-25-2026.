import React from 'react';
import { Icons } from './Icons';

export const UnitOwnersPage = () => {
  const [owners, setOwners] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [copiedId, setCopiedId] = React.useState(null);

  const fetchOwners = async () => {
    try {
      const response = await fetch('/api/unit-owners');
      const data = await response.json();
      setOwners(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching unit owners:', error);
      setOwners([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyData = (owner) => {
    const dataString = `Owner: ${owner.name}\nUnit: ${owner.unit_number}\nAssociation: ${owner.association_name}\nAddress: ${owner.address}\nMonthly Assessment: $${Number(owner.monthly_assessment).toFixed(2)}\nOccupancy: ${owner.occupancy_status}`;
    navigator.clipboard.writeText(dataString);
    setCopiedId(owner.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  React.useEffect(() => { fetchOwners(); }, []);

  const filteredOwners = owners.filter(owner =>
    (owner.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (owner.unit_number || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (owner.association_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Owners', value: owners.length, icon: Icons.UnitOwners, color: 'text-[#1F6F5C]' },
    { label: 'Leased Units', value: owners.filter(o => o.occupancy_status === 'Leased').length, icon: Icons.Documents, color: 'text-[#F2C94C]' },
    { label: 'Owner Occupied', value: owners.filter(o => o.occupancy_status === 'Owner Occupied').length, icon: Icons.ShieldCheck, color: 'text-emerald-500' },
    { label: 'Pending Updates', value: 0, icon: Icons.Time, color: 'text-amber-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-4">
          <div className="size-14 bg-[#1F6F5C] rounded-xl flex items-center justify-center text-[#F2C94C] shadow-lg">
            <Icons.UnitOwners className="size-8" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Unit Owners</h2>
            <p className="text-slate-500 mt-1 text-sm font-medium tracking-wide">Manage and monitor unit owner profiles</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search owners, units..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-[#1F6F5C]/5 focus:border-[#1F6F5C] transition-all w-64"
            />
          </div>
          <button className="bg-[#1F6F5C] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#1F6F5C]/90 transition-all">
            <Icons.Plus className="size-4" /> Add Owner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`size-5 ${stat.color}`} />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Icons.Documents className="size-5 text-[#1F6F5C]" /> Owner Profiles
          </h3>
        </div>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <div className="size-12 border-4 border-[#1F6F5C]/20 border-t-[#1F6F5C] rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-500 animate-pulse">Accessing CondoClaw Database...</p>
          </div>
        ) : filteredOwners.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <Icons.UnitOwners className="size-10" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">No Owners Found</h4>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">Upload a NOLA, Ledger, or Affidavit on the Dashboard to automatically generate owner profiles.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Owner & Property</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Association</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assessments</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Occupancy</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOwners.map((owner) => (
                  <tr key={owner.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-[#1F6F5C]/10 group-hover:text-[#1F6F5C] transition-colors">
                          <Icons.UnitOwners className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{owner.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{owner.address} • Unit {owner.unit_number}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5"><span className="text-xs font-bold text-slate-700">{owner.association_name}</span></td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-bold text-slate-700">${Number(owner.monthly_assessment || 0).toFixed(2)}/mo</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        owner.occupancy_status === 'Owner Occupied' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {owner.occupancy_status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleCopyData(owner)} className={`p-2 rounded-lg transition-all flex items-center gap-2 ${copiedId === owner.id ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:text-[#1F6F5C] hover:bg-[#1F6F5C]/5'}`}>
                          {copiedId === owner.id ? <Icons.Copied className="size-4" /> : <Icons.Copy className="size-4" />}
                        </button>
                        <button className="p-2 text-slate-400 hover:text-[#1F6F5C] hover:bg-[#1F6F5C]/5 rounded-lg transition-all"><Icons.View className="size-4" /></button>
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Icons.Flag className="size-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
