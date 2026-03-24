import React from 'react';
import { motion } from 'motion/react';
import { Icons } from './Icons';

export const Dashboard = () => {
  const [currentStage, setCurrentStage] = React.useState(1);
  const [extractedData, setExtractedData] = React.useState([]);
  const EMPTY_UPLOAD = { status: 'idle', name: null, step: 0, stepLabel: '', attempt: 0, startTime: null, fileSaved: false, textLength: 0, fieldsExtracted: 0, error: null };
  const [uploads, setUploads] = React.useState({
    nola:      { ...EMPTY_UPLOAD },
    ledger:    { ...EMPTY_UPLOAD },
    affidavit: { ...EMPTY_UPLOAD },
  });
  // Tick every 200 ms to drive elapsed-time display while any upload is parsing
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 200);
    return () => clearInterval(id);
  }, []);
  const [letterState, setLetterState] = React.useState({ status: 'idle', filename: null, error: null });
  const [ledgerState, setLedgerState] = React.useState({ status: 'idle', filename: null, error: null });
  const [groundTruthState, setGroundTruthState] = React.useState({ status: 'idle', ledger: null, letter: null, financials: null, error: null });
  const [generatedDocs, setGeneratedDocs] = React.useState([]);
  const [backendOffline, setBackendOffline] = React.useState(false);

  const fetchGeneratedDocs = React.useCallback(async () => {
    try {
      const res = await fetch('/api/files');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const TYPE_LABEL = {
        first_demand_letter: 'First Demand',
        ledger:              'Internal Ledger',
        audit_ledger:        'Internal Ledger',
        first_letter:        'First Demand',
      };
      const docs = (data.generated || []).slice(0, 8).map(d => ({
        name:   d.filename,
        matter: `${d.matter_id || ''}${d.owner_name ? ' • ' + d.owner_name : ''}`,
        type:   TYPE_LABEL[d.file_type] || d.file_type,
        status: 'Ready',
        color:  'bg-green-100 text-green-700',
        id:     d.id,
      }));
      setGeneratedDocs(docs);
      setBackendOffline(false);
    } catch (_) {
      setBackendOffline(true);
    }
  }, []);

  React.useEffect(() => {
    fetchGeneratedDocs();
    // Retry every 5s when backend is offline so the queue auto-populates once it restarts
    const id = setInterval(fetchGeneratedDocs, 5000);
    return () => clearInterval(id);
  }, [fetchGeneratedDocs]);

  const nolaRef = React.useRef(null);
  const ledgerRef = React.useRef(null);
  const affidavitRef = React.useRef(null);
  const refs = { nola: nolaRef, ledger: ledgerRef, affidavit: affidavitRef };

  const setStep = (type, patch) =>
    setUploads(prev => ({ ...prev, [type]: { ...prev[type], ...patch } }));

  const handleFileChange = async (type, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const MAX = 2;
    setStep(type, { ...EMPTY_UPLOAD, status: 'parsing', name: file.name, startTime: Date.now(), attempt: 1 });

    for (let attempt = 1; attempt <= MAX; attempt++) {
      try {
        // ── Phase 1: upload + extract text ──────────────────────────────
        setStep(type, { step: 1, stepLabel: `Uploading ${file.name} to server…`, attempt });
        const fd = new FormData();
        fd.append('file', file);
        fd.append('type', type);
        const r1 = await fetch('/api/parse/save', { method: 'POST', body: fd, signal: AbortSignal.timeout(15000) });
        if (!r1.ok) throw new Error(`Server ${r1.status}`);
        const d1 = await r1.json();
        if (d1.status !== 'saved') throw new Error(d1.message || 'Save failed');

        const kb = (d1.file_size_bytes / 1024).toFixed(1);
        setStep(type, {
          step: 2,
          stepLabel: `✓ Saved (${kb} KB) — ${d1.text_length} chars extracted from ${file.name.split('.').pop().toUpperCase()}`,
          fileSaved: true,
          textLength: d1.text_length,
        });

        // ── Phase 2: AI entity extraction ───────────────────────────────
        setStep(type, {
          step: 3,
          stepLabel: `✓ Text ready — AI parsing ${d1.text_length} chars…  (est. 3–12 s)`,
        });
        const r2 = await fetch('/api/parse/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: d1.filename, doc_type: type }),
          signal: AbortSignal.timeout(25000),
        });
        if (!r2.ok) throw new Error(`AI server ${r2.status}`);
        const d2 = await r2.json();

        const fields = d2.parsedData?.fields_extracted ?? Object.keys(d2.parsedData?.entities || {}).length;
        const elapsed = d2.parsedData?.elapsed_s ?? '—';
        setStep(type, {
          step: 4,
          stepLabel: `✓ AI complete in ${elapsed}s — ${fields} fields extracted`,
          fieldsExtracted: fields,
          status: 'completed',
        });

        // Fire downstream events
        setExtractedData(prev => [...prev, { id: Date.now().toString(), type, fileName: file.name, ...d2.parsedData }]);
        window.dispatchEvent(new CustomEvent('condoclaw:file_parsed', {
          detail: { type, fileName: file.name, summary: d2.parsedData.summary, details: d2.parsedData.details, similarity: d2.parsedData.similarity, entities: d2.parsedData.entities, stage: currentStage },
        }));

        // Trigger Claude document review (Step 1) after each upload
        // Claude reviews NOLA + ledger together when both are available
        try {
          const reviewRes = await fetch('/api/claude-review');
          const reviewData = await reviewRes.json();
          if (reviewData.status === 'success' && reviewData.message) {
            window.dispatchEvent(new CustomEvent('condoclaw:claude_review', {
              detail: { step: 1, message: reviewData.message, review: reviewData.review },
            }));
          } else if (reviewData.status === 'unavailable') {
            window.dispatchEvent(new CustomEvent('condoclaw:claude_review', {
              detail: { step: 1, message: '**Claude Review Unavailable**\n\nThe `ANTHROPIC_API_KEY` is not configured in your `.env` file. Claude document intelligence requires this key to analyze your NOLA and ledger.\n\n**To fix:** Add `ANTHROPIC_API_KEY=sk-ant-...` to your `.env` file in the project root, then restart the backend.' },
            }));
          } else if (reviewData.status === 'incomplete' && reviewData.message) {
            window.dispatchEvent(new CustomEvent('condoclaw:claude_review', {
              detail: { step: 1, message: `**Waiting for Documents**\n\n${reviewData.message}` },
            }));
          }
        } catch (_) { /* Claude review is optional — backend may be offline */ }

        return; // success — exit retry loop

      } catch (err) {
        if (attempt === MAX) {
          setStep(type, { step: 0, status: 'error', error: `Failed after ${MAX} attempts: ${err.message}`, stepLabel: '' });
          return;
        }
        const wait = 1500 * attempt;
        setStep(type, {
          step: 0,
          stepLabel: `⚠ Attempt ${attempt} failed (${err.message}) — retrying ${attempt + 1}/${MAX} in ${wait / 1000}s…`,
          attempt: attempt + 1,
        });
        await new Promise(r => setTimeout(r, wait));
        // Reset start time so timer is accurate for the retry
        setStep(type, { startTime: Date.now() });
      }
    }
  };

  // Disable generate buttons while any document is still parsing
  const isAnyParsing = Object.values(uploads).some(u => u.status === 'parsing');

  const handleGenerateLedger = async () => {
    setLedgerState({ status: 'generating', filename: null, error: null });
    const merged = extractedData.reduce((acc, item) => ({ ...acc, ...(item.entities || {}) }), {});
    try {
      const res = await fetch('/api/generate/ledger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entities: merged, matter_id: '#CC-8921', line_items: [] }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setLedgerState({ status: 'done', filename: data.filename, error: null });
        fetchGeneratedDocs();

        // Claude post-generation review (Step 2) — display in chat
        if (data.post_review) {
          const pr = data.post_review;
          const issues = pr.issues || [];
          const errors = issues.filter(i => i.severity === 'error');
          const warnings = issues.filter(i => i.severity === 'warning');
          let msg = `**Claude Post-Generation Review** — ${data.filename}\n\n`;
          msg += `**Status:** ${pr.status || 'unknown'}\n`;
          msg += `**NOLA Balance Verified:** ${pr.nola_balance_verified ? 'Yes' : 'No'}\n`;
          if (pr.discrepancy) msg += `**Discrepancy:** $${Number(pr.discrepancy).toFixed(2)}\n`;
          msg += `**Summary:** ${pr.summary || 'Review complete.'}\n`;
          if (errors.length) {
            msg += `\n**Errors (${errors.length}):**\n`;
            errors.forEach(e => { msg += `- Row ${e.row}: ${e.description}\n`; });
          }
          if (warnings.length) {
            msg += `\n**Warnings (${warnings.length}):**\n`;
            warnings.forEach(w => { msg += `- Row ${w.row}: ${w.description}\n`; });
          }
          window.dispatchEvent(new CustomEvent('condoclaw:claude_review', {
            detail: { step: 2, message: msg, review: pr },
          }));
        }
      } else {
        setLedgerState({ status: 'error', filename: null, error: 'Ledger generation failed.' });
      }
    } catch (err) {
      setLedgerState({ status: 'error', filename: null, error: err.message });
    }
  };

  const handleGenerateLetter = async () => {
    setLetterState({ status: 'generating', filename: null, error: null });
    // Merge all extracted entities (later docs overwrite earlier ones for the same key)
    const merged = extractedData.reduce((acc, item) => ({ ...acc, ...(item.entities || {}) }), {});
    const assocName = merged.association_name || 'The Association';
    try {
      const res = await fetch('/api/generate/first-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entities: merged, matter_id: '#CC-8921', association_name: assocName }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setLetterState({ status: 'done', filename: data.filename, error: null });
        fetchGeneratedDocs();
        // Claude comment on letter generation
        window.dispatchEvent(new CustomEvent('condoclaw:claude_review', {
          detail: {
            step: 2,
            message: `**First Demand Letter Generated:** ${data.filename}\n\nClaude reviewed the letter against the NOLA and ledger for statutory compliance. ${data.statute === '718' ? 'FL Statute §718.116' : 'FL Statute §720.3085'} requirements applied.\n\n${data.post_review?.summary || 'Review complete. Download and verify the letter matches the NOLA-anchored ledger.'}`,
          },
        }));
      } else {
        setLetterState({ status: 'error', filename: null, error: 'Generation failed.' });
      }
    } catch (err) {
      setLetterState({ status: 'error', filename: null, error: err.message });
    }
  };

  const handleGenerateGroundTruth = async () => {
    setGroundTruthState({ status: 'generating', ledger: null, letter: null, financials: null, error: null });
    const MAX = 5;
    for (let attempt = 1; attempt <= MAX; attempt++) {
      try {
        const res = await fetch('/api/generate/ground-truth', {
          method: 'POST',
          signal: AbortSignal.timeout(90000),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || `Server ${res.status}`);
        if (data.status === 'success') {
          setGroundTruthState({ status: 'done', ledger: data.ledger_filename, letter: data.letter_filename, financials: data.financials, error: null });
          fetchGeneratedDocs();
          return;
        }
        throw new Error(data.message || 'Unknown error');
      } catch (err) {
        if (attempt === MAX) {
          setGroundTruthState({ status: 'error', ledger: null, letter: null, financials: null, error: `Failed after ${MAX} attempts: ${err.message}` });
          return;
        }
        await new Promise(r => setTimeout(r, 2000 * attempt));
      }
    }
  };

  const advanceStage = () => {
    if (currentStage < 5) {
      const next = currentStage + 1;
      setCurrentStage(next);
      const labels = ['', 'Review Documents', 'Build Ledger', 'Verify Owner', 'Draft Document', 'Ready for Review'];
      window.dispatchEvent(new CustomEvent('condoclaw:stage_changed', { detail: { stage: next, label: labels[next] } }));
    }
  };

  const stages = [
    { id: 1, label: 'Review Documents' },
    { id: 2, label: 'Build Ledger' },
    { id: 3, label: 'Verify Owner' },
    { id: 4, label: 'Draft Document' },
    { id: 5, label: 'Ready for Review' },
  ].map(s => ({ ...s, status: currentStage > s.id ? 'completed' : currentStage === s.id ? 'active' : 'pending' }));

  const STEP_META = [
    { n: 1, label: 'Uploading to server',     est: '< 1 s'  },
    { n: 2, label: 'Text extraction (PDF/OCR)', est: '1–3 s' },
    { n: 3, label: 'AI entity parsing',        est: '3–12 s' },
    { n: 4, label: 'Saving to database',       est: '< 1 s'  },
  ];

  const uploadBoxes = [
    { key: 'nola',      icon: Icons.DocumentGen, label: 'Upload NOLA (PDF)',             done: 'NOLA Parsed',       badge: 'Structured Data Extracted', accept: '.pdf',                              hint: 'Drag and drop or click' },
    { key: 'ledger',    icon: Icons.Reports,     label: 'Upload Ledger (Excel/PDF/Word)', done: 'Ledger Synced',     badge: 'Tables Parsed',             accept: '.pdf,.docx,.doc,.xlsx,.xls,.csv',   hint: 'Drag and drop or click' },
    { key: 'affidavit', icon: Icons.FileCheck,   label: 'Mailing Affidavit',              done: 'Affidavit Verified', badge: 'Text Extracted',            accept: '.pdf',                              hint: 'Proof of NOLA delivery' },
  ];

  const documents = generatedDocs;

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-4">
          <div className="size-14 bg-accent rounded-xl flex items-center justify-center text-primary shadow-lg">
            <svg className="size-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 5C21 5 18 2 15 2C12 2 10 4 8 4C6 4 4 2 4 2C4 2 5 5 5 8C5 11 7 13 9 14C8.5 15.5 8 17 8 17L6 18V19H9L10 18C10 18 10.5 16.5 11 15C12 15 13 14.5 14 14C17 14 21 11 21 8C21 5 21 5 21 5Z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">CondoClaw</h2>
            <p className="text-slate-500 mt-1 text-sm font-medium tracking-wide">AI Concierge for Condos & HOAs</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Active Matter Analysis</p>
          <p className="text-sm font-bold text-primary">{(() => {
            const merged = extractedData.reduce((acc, item) => ({ ...acc, ...(item.entities || {}) }), {});
            const assoc = merged.association_name;
            const owner = merged.owner_name;
            const unit = merged.unit_number;
            if (assoc || owner) return `${assoc || 'Association'} — ${owner || 'Owner'}${unit ? `, Unit ${unit}` : ''}`;
            return '#CC-8921: New Matter';
          })()}</p>
        </div>
      </div>

      {/* Intake Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Icons.Plus className="size-5 text-primary" />
            New Matter Intake + NLP Review
          </h3>
          <button className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
            <Icons.History className="size-3" />
            AlphaCondor Review
          </button>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {uploadBoxes.map(({ key, icon: Icon, label, done, badge, accept, hint }) => {
              const s = uploads[key];
              const elapsed = s.startTime ? ((Date.now() - s.startTime) / 1000).toFixed(1) : '0.0';
              const isParsing = s.status === 'parsing';
              const isDone    = s.status === 'completed';
              const isError   = s.status === 'error';

              return (
                <div key={key} className="flex flex-col gap-0">
                  <input type="file" ref={refs[key]} className="hidden" accept={accept} onChange={(e) => handleFileChange(key, e)} />

                  {/* Drop zone */}
                  <div onClick={() => !isParsing && refs[key].current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center transition-all text-center relative overflow-hidden
                      ${isDone  ? 'border-emerald-500 bg-emerald-50/30 cursor-pointer' :
                        isError ? 'border-red-300 bg-red-50/30 cursor-pointer' :
                        isParsing ? 'border-primary bg-primary/5 cursor-default' :
                        'border-slate-200 hover:border-primary/40 hover:bg-primary/5 cursor-pointer'}`}>

                    {/* shimmer bar while parsing */}
                    {isParsing && (
                      <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    )}

                    <div className={`size-10 rounded-full flex items-center justify-center mb-2 transition-colors
                      ${isDone ? 'bg-emerald-100 text-emerald-600' : isError ? 'bg-red-100 text-red-500' : isParsing ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                      {isDone ? <Icons.Check className="size-5" /> : isError ? <span className="text-xs font-black">!</span> : <Icon className="size-5" />}
                    </div>

                    <h4 className="font-bold text-slate-700 text-xs">{isDone ? done : isError ? 'Upload Failed — click to retry' : label}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-full px-2">{s.name || hint}</p>
                    {isDone && <div className="mt-1.5 px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black rounded uppercase tracking-widest">{badge}</div>}
                  </div>

                  {/* Thinking panel — shown while parsing or on error */}
                  {(isParsing || isError) && (
                    <div className={`rounded-b-xl border border-t-0 px-3 py-2.5 text-[10px] font-mono
                      ${isError ? 'bg-red-50 border-red-200' : 'bg-slate-900 border-primary/30'}`}>

                      {/* Timer + attempt row */}
                      {!isError && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-primary/70 font-bold tracking-widest uppercase text-[9px]">
                            {s.attempt > 1 ? `Retry ${s.attempt}/5` : 'Processing'}
                          </span>
                          <span className="text-accent font-black tabular-nums">{elapsed}s</span>
                        </div>
                      )}

                      {/* Step-by-step pipeline */}
                      {!isError && STEP_META.map(({ n, label: sLabel, est }) => {
                        const done2  = s.step > n;
                        const active = s.step === n;
                        return (
                          <div key={n} className={`flex items-start gap-1.5 mb-1 ${active ? 'text-white' : done2 ? 'text-emerald-400' : 'text-slate-600'}`}>
                            <span className="shrink-0 w-3 text-center">
                              {done2 ? '✓' : active ? '▶' : '○'}
                            </span>
                            <span className="flex-1 leading-snug">
                              {active ? s.stepLabel || sLabel : done2 ? sLabel : sLabel}
                            </span>
                            {!done2 && <span className="shrink-0 text-slate-600">{est}</span>}
                          </div>
                        );
                      })}

                      {/* Retry message */}
                      {s.step === 0 && s.stepLabel && !isError && (
                        <div className="text-yellow-400 mt-1 leading-snug">{s.stepLabel}</div>
                      )}

                      {/* Error message */}
                      {isError && (
                        <div className="text-red-600 leading-snug">{s.error}</div>
                      )}
                    </div>
                  )}

                  {/* Compact done stats */}
                  {isDone && s.fieldsExtracted > 0 && (
                    <div className="text-[9px] text-center text-slate-400 font-bold mt-1 uppercase tracking-widest">
                      {s.fieldsExtracted} fields · {s.textLength.toLocaleString()} chars · {((Date.now() - s.startTime) / 1000).toFixed(1)}s
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {extractedData.length > 0 && (
            <div className="mt-8 border-t border-slate-100 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Icons.FileCheck className="size-5 text-accent" />
                  AlphaCondor Review (NLP Verification)
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">Human-in-the-loop</span>
              </div>
              <div className="space-y-3">
                {extractedData.map((item) => (
                  <div key={item.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-8 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                          {item.type === 'nola' ? <Icons.DocumentGen className="size-4 text-primary" /> : item.type === 'ledger' ? <Icons.Reports className="size-4 text-primary" /> : <Icons.FileCheck className="size-4 text-primary" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{item.fileName}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{item.type} • Similarity: {item.similarity}%</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={async () => { setExtractedData(p => p.filter(i => i.id !== item.id)); await fetch('/api/memory/correction', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fileName: item.fileName, correctedData: item.entities, type: item.type }) }); window.dispatchEvent(new CustomEvent('condoclaw:correction', { detail: { type: 'verification', item } })); }}
                          className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-600 transition-colors">VERIFY</button>
                        <button onClick={async () => { const c = prompt(`Correct data for ${item.fileName}:`, JSON.stringify(item.entities)); if (c) { try { const parsed = JSON.parse(c); await fetch('/api/memory/correction', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fileName: item.fileName, correctedData: parsed, type: item.type }) }); window.dispatchEvent(new CustomEvent('condoclaw:correction', { detail: { type: 'correction', item, correctedData: parsed } })); setExtractedData(p => p.map(i => i.id === item.id ? { ...i, entities: parsed } : i)); } catch { alert('Invalid JSON'); } } }}
                          className="px-3 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-300 transition-colors">CORRECT</button>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {item.entities && Object.entries(item.entities).map(([k, v]) => (
                        <div key={k} className="bg-white p-2 rounded-lg border border-slate-100">
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{k.replace('_', ' ')}</p>
                          <p className="text-[10px] font-bold text-slate-700 truncate">{String(v)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {extractedData.length > 0 && (
            <div className="mt-8 border-t border-slate-100 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Icons.DocumentGen className="size-5 text-primary" />
                  Generate First Demand Letter
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                  FL Statute Ch. {extractedData.find(d => d.entities?.statute_type)?.entities?.statute_type === '720' ? '720' : '718'}
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex items-center justify-between gap-6">
                <div className="text-sm text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">
                    {extractedData.find(d => d.entities?.owner_name)?.entities?.owner_name || 'Owner'} — Unit {extractedData.find(d => d.entities?.unit_number)?.entities?.unit_number || '—'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Balance: ${extractedData.find(d => d.entities?.total_amount_owed || d.entities?.total_balance)?.entities?.total_amount_owed || extractedData.find(d => d.entities?.total_balance)?.entities?.total_balance || '—'} • {extractedData.length} document{extractedData.length !== 1 ? 's' : ''} parsed
                  </p>
                  {letterState.status === 'done' && (
                    <p className="text-[11px] text-emerald-600 font-bold">
                      Generated: {letterState.filename}
                    </p>
                  )}
                  {letterState.status === 'error' && (
                    <p className="text-[11px] text-red-500 font-bold">Error: {letterState.error}</p>
                  )}
                  {ledgerState.status === 'done' && (
                    <p className="text-[11px] text-emerald-600 font-bold">Ledger: {ledgerState.filename}</p>
                  )}
                  {ledgerState.status === 'error' && (
                    <p className="text-[11px] text-red-500 font-bold">Ledger Error: {ledgerState.error}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {letterState.status === 'done' ? (
                    <a href={`/api/download/${letterState.filename}`} download
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow transition-all">
                      <Icons.Download className="size-4" />
                      DOWNLOAD LETTER
                    </a>
                  ) : (
                    <button onClick={handleGenerateLetter} disabled={letterState.status === 'generating' || isAnyParsing}
                      className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl shadow transition-all ${letterState.status === 'generating' || isAnyParsing ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 text-white'}`}>
                      <Icons.DocumentGen className="size-4" />
                      {isAnyParsing ? 'WAITING FOR PARSING...' : letterState.status === 'generating' ? 'GENERATING...' : 'GENERATE FIRST LETTER'}
                    </button>
                  )}
                  {ledgerState.status === 'done' ? (
                    <a href={`/api/download/${ledgerState.filename}`} download
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow transition-all">
                      <Icons.Download className="size-4" />
                      DOWNLOAD LEDGER
                    </a>
                  ) : (
                    <button onClick={handleGenerateLedger} disabled={ledgerState.status === 'generating' || isAnyParsing}
                      className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl shadow transition-all ${ledgerState.status === 'generating' || isAnyParsing ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-800 text-white'}`}>
                      <Icons.Reports className="size-4" />
                      {isAnyParsing ? 'WAITING FOR PARSING...' : ledgerState.status === 'generating' ? 'BUILDING...' : 'GENERATE LEDGER (.xlsx)'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Ground Truth Generator */}
          <div className="mt-8 border-t border-slate-100 pt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Icons.Run className="size-5 text-accent" />
                Generate Ground Truth (Ledger + First Demand Letter)
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-accent/10 text-accent px-2 py-1 rounded">
                18% Interest Calculated
              </span>
            </div>
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
              <p className="text-[11px] text-slate-600 mb-4">
                Scans all uploaded files, merges extracted data, calculates 18% p.a. interest, and generates a
                4-sheet audit Excel ledger + statute-correct First Demand Letter from the real documents.
              </p>
              {groundTruthState.status === 'done' ? (
                <div className="space-y-3">
                  {groundTruthState.financials && (
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {[
                        ['Principal', `$${groundTruthState.financials.principal_balance}`],
                        ['Interest (18%)', `$${groundTruthState.financials.interest_accrued}`],
                        ['TOTAL DUE', `$${groundTruthState.financials.total_amount_owed}`],
                      ].map(([label, val]) => (
                        <div key={label} className="bg-white rounded-lg p-3 border border-slate-200 text-center">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                          <p className="text-sm font-black text-primary">{val}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3">
                    {groundTruthState.ledger && (
                      <a href={`/api/download/${groundTruthState.ledger}`} download
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow transition-all">
                        <Icons.Download className="size-4" />
                        DOWNLOAD LEDGER (.xlsx)
                      </a>
                    )}
                    {groundTruthState.letter && (
                      <a href={`/api/download/${groundTruthState.letter}`} download
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow transition-all">
                        <Icons.Download className="size-4" />
                        DOWNLOAD LETTER (.docx)
                      </a>
                    )}
                    <button onClick={handleGenerateGroundTruth}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all">
                      REGENERATE
                    </button>
                  </div>
                </div>
              ) : groundTruthState.status === 'error' ? (
                <div className="space-y-3">
                  <p className="text-[11px] text-red-600 font-bold">{groundTruthState.error}</p>
                  <button onClick={handleGenerateGroundTruth}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow transition-all">
                    <Icons.Run className="size-4" />
                    RETRY GROUND TRUTH
                  </button>
                </div>
              ) : (
                <button onClick={handleGenerateGroundTruth} disabled={groundTruthState.status === 'generating' || isAnyParsing}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl shadow transition-all ${groundTruthState.status === 'generating' || isAnyParsing ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 text-white'}`}>
                  <Icons.Run className="size-4" />
                  {isAnyParsing ? 'WAITING FOR PARSING...' : groundTruthState.status === 'generating' ? 'RUNNING GROUND TRUTH (up to 90s)…' : 'RUN GROUND TRUTH PIPELINE'}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button onClick={advanceStage} className="bg-accent hover:bg-accent/90 text-primary font-black px-12 py-4 rounded-xl shadow-lg flex flex-col items-center gap-1 transition-all active:scale-95 group min-w-[320px]">
              <div className="flex items-center gap-3 text-lg">
                <Icons.Run className="size-6 group-hover:animate-pulse" />
                {currentStage === 5 ? 'FINALIZE MATTER' : currentStage === 1 ? 'RUN AI CONCIERGE' : `PROCEED TO STAGE ${currentStage + 1}`}
              </div>
              <span className="text-[10px] opacity-70 font-bold uppercase tracking-widest">
                {currentStage === 5 ? 'Complete Analysis' : `Next: ${stages[currentStage]?.label || 'Done'}`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline */}
      <div className="relative px-4 py-4">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2"></div>
        <div className="relative z-10 flex justify-between">
          {stages.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-3">
              <div className={`size-10 rounded-full flex items-center justify-center font-bold shadow-md transition-all ${s.status === 'completed' ? 'bg-primary text-white' : s.status === 'active' ? 'bg-primary text-white ring-4 ring-primary/20 animate-pulse' : 'bg-slate-100 text-slate-400 border-2 border-white'}`}>
                {s.status === 'completed' ? <Icons.Check className="size-5" /> : <span className="text-sm">{s.id}</span>}
              </div>
              <span className={`text-[10px] font-bold text-center w-20 ${s.status === 'pending' ? 'text-slate-400' : 'text-primary'}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><Icons.Schedule className="size-4 text-primary" />Upcoming Deadlines</h3>
          </div>
          <div className="p-5 space-y-4">
            {[{ color: 'red', time: 'Today - 4:00 PM', title: 'Final Notice: Smith, Unit 402', desc: 'Wait for ledger sync' }, { color: 'slate', time: 'Tomorrow', title: 'Board Meeting Prep', desc: 'Export report for associations' }, { color: 'slate', time: 'Oct 24', title: 'Lien Filing: Unit 102B', desc: 'AlphaCondor review pending' }].map((d, i) => (
              <div key={i} className={`p-3 ${d.color === 'red' ? 'bg-red-50 border-red-500' : 'bg-slate-50 border-slate-300'} border-l-4 rounded-r-lg`}>
                <p className={`text-[9px] font-bold ${d.color === 'red' ? 'text-red-600' : 'text-slate-500'} uppercase tracking-wider`}>{d.time}</p>
                <p className="text-xs font-bold text-slate-800 mt-1">{d.title}</p>
                <p className="text-[10px] text-slate-500">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><Icons.Documents className="size-4 text-primary" />Generated Documents / Queue</h3>
            <button className="text-primary text-[10px] font-bold hover:underline uppercase tracking-widest">View All Queue</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Document</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {backendOffline ? (
                  <tr><td colSpan={3} className="px-5 py-8 text-center text-xs text-red-500 font-semibold">
                    Backend offline — run LAUNCH_APP.bat, then this list will refresh automatically.
                  </td></tr>
                ) : documents.length === 0 ? (
                  <tr><td colSpan={3} className="px-5 py-8 text-center text-xs text-slate-400">No documents generated yet. Upload files and generate above.</td></tr>
                ) : documents.map((doc, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4"><p className="text-xs font-bold text-slate-800">{doc.name}</p><p className="text-[10px] text-slate-500">{doc.matter}</p></td>
                    <td className="px-5 py-4"><span className={`inline-block px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${doc.color}`}>{doc.status}</span></td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-primary transition-colors"><Icons.View className="size-4" /></button>
                        <a href={`/api/download/${encodeURIComponent(doc.name)}`} className="p-1.5 text-slate-400 hover:text-primary transition-colors"><Icons.Download className="size-4" /></a>
                        <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"><Icons.Flag className="size-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
