import React from 'react';
import { motion } from 'motion/react';
import { Icons } from './Icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const AIConcierge = () => {
  const [messages, setMessages] = React.useState([
    {
      id: '1',
      role: 'ai',
      text: "Welcome to **CondoClaw**. I am your intelligence layer.\n\nI've already begun cross-referencing your active matter (#CC-8921) against **CondoClaw Memory**.\n\nYou can now upload historical ledgers, notices, and affidavits directly to the **CondoClaw Memory** module to train my NLP engine on your specific association's history.\n\nHow can I assist you with this matter today?",
      reasoning: "NLP comparison against 450+ approved affidavits shows a discrepancy in the 'Verification' section.",
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [parsedFiles, setParsedFiles] = React.useState([]);
  const [currentStage, setCurrentStage] = React.useState(1);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    const handleFileParsed = (e) => {
      const { type, fileName, summary, details, stage, similarity, entities } = e.detail;
      setParsedFiles(prev => [...prev, { type, fileName, summary, details, similarity, entities }]);
      // Show brief upload confirmation — Claude's real analysis comes via condoclaw:claude_review
      const owner = entities?.owner_name || 'Detected';
      const unit = entities?.unit_number || 'Detected';
      const balance = entities?.total_amount_owed || entities?.balance || 'Pending';
      setMessages(prev => [...prev, {
        id: Date.now().toString(), role: 'ai',
        text: `**${type.toUpperCase()} Uploaded:** ${fileName}\n\n**Owner:** ${owner} | **Unit:** ${unit} | **Balance:** $${balance}\n\n${summary || ''}\n\n_Claude is reviewing this document..._`,
        reasoning: `Document parsed. Extracted ${Object.keys(entities || {}).length} fields. Claude document review triggered.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    };
    const handleStageChanged = (e) => {
      const { stage, label } = e.detail;
      setCurrentStage(stage);
      setMessages(prev => [...prev, {
        id: Date.now().toString(), role: 'ai',
        text: `### 🚀 Pipeline Advanced: Stage ${stage} - ${label}\n\nI am now shifting focus to **${label}**.\n\n${stage === 2 ? "Building the financial ledger by aggregating all line items." : stage === 3 ? "Verifying owner identity and unit details against CondoClaw Memory." : stage === 4 ? "Drafting final legal documents based on verified data." : stage === 5 ? "Matter ready for final review. All data structured and validated." : "Reviewing uploaded documents for statutory compliance."}`,
        reasoning: `Pipeline transition to ${label}. Context updated.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    };
    const handleCorrection = (e) => {
      const { type, item, correctedData } = e.detail;
      if (correctedData) setParsedFiles(prev => prev.map(f => f.fileName === item.fileName ? { ...f, entities: correctedData } : f));
      setMessages(prev => [...prev, {
        id: Date.now().toString(), role: 'ai',
        text: `### 🛠️ AlphaCondor Review: ${type === 'verification' ? 'Verified' : 'Corrected'}\n\n**File:** ${item.fileName}\n\n${type === 'verification' ? 'Added to **CondoClaw Memory** as a high-confidence approved sample.' : 'Corrected data indexed in **CondoClaw Memory** to improve future NLP accuracy.'}`,
        reasoning: 'Human-in-the-loop feedback received. Updating CondoClaw Memory.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    };
    const handleClaudeReview = (e) => {
      const { step, message } = e.detail;
      const stepLabel = step === 1 ? 'Upload Review' : 'Post-Generation Review';
      setMessages(prev => [...prev, {
        id: Date.now().toString(), role: 'ai',
        text: message,
        reasoning: `Claude Document Intelligence — Step ${step}: ${stepLabel}. FL statute analysis and NOLA-ledger reconciliation complete.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    };
    window.addEventListener('condoclaw:file_parsed', handleFileParsed);
    window.addEventListener('condoclaw:stage_changed', handleStageChanged);
    window.addEventListener('condoclaw:correction', handleCorrection);
    window.addEventListener('condoclaw:claude_review', handleClaudeReview);
    return () => {
      window.removeEventListener('condoclaw:file_parsed', handleFileParsed);
      window.removeEventListener('condoclaw:stage_changed', handleStageChanged);
      window.removeEventListener('condoclaw:correction', handleCorrection);
      window.removeEventListener('condoclaw:claude_review', handleClaudeReview);
    };
  }, []);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    const savedInput = input;
    setInput('');
    setIsTyping(true);
    const aiId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiId, role: 'ai', text: '', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isStreaming: true }]);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: savedInput, context: { matter_id: '#CC-8921', association: 'Pine Ridge', stage: currentStage, documents: parsedFiles.map(f => f.fileName) } })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setMessages(prev => prev.map(m => m.id === aiId ? { ...m, text: data.response || 'Error processing request.', isStreaming: false, reasoning: data.reasoning || 'Context-aware reasoning complete.' } : m));
    } catch (err) {
      setMessages(prev => prev.map(m => m.id === aiId ? { ...m, text: `**Error:** ${err.message || 'The Condor is offline.'}`, isStreaming: false, reasoning: 'Backend failed to respond.' } : m));
    } finally { setIsTyping(false); }
  };

  return (
    <aside className="w-96 border-l border-slate-200 bg-white flex flex-col h-full shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-5 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-11 bg-primary rounded-2xl flex items-center justify-center text-accent shadow-lg shadow-primary/20">
              <Icons.AI className="size-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">AI Concierge</h3>
              <div className="flex items-center gap-1.5">
                <div className={`size-1.5 rounded-full ${isTyping ? 'bg-accent animate-pulse' : 'bg-emerald-500'}`}></div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{isTyping ? 'Accessing Memory...' : 'System Synced'}</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
            <Icons.Settings className="size-4" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
        <div className="p-6 space-y-8">
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`group relative p-4 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[92%] ${msg.role === 'ai' ? 'bg-white border border-slate-100 text-slate-800 rounded-tl-none' : 'bg-primary text-white rounded-tr-none'}`}>
                {msg.role === 'ai' && (
                  <div className="absolute -left-3 -top-3 size-6 bg-primary rounded-lg flex items-center justify-center text-accent shadow-md border border-white/10">
                    <Icons.AI className="size-3.5" />
                  </div>
                )}
                <div className="markdown-body prose prose-slate prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text || (msg.isStreaming ? '...' : '')}</ReactMarkdown>
                </div>
                {msg.reasoning && (
                  <div className="mt-4 p-3 bg-accent/5 rounded-xl border border-accent/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Icons.History className="size-3 text-primary" />
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest">CondoClaw Logic</span>
                    </div>
                    <p className="text-[11px] text-slate-600 italic leading-relaxed">{msg.reasoning}</p>
                  </div>
                )}
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest px-1">
                {msg.role === 'ai' ? 'The Condor' : 'You'} • {msg.timestamp}
              </span>
            </motion.div>
          ))}
          {isTyping && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-1.5 items-center px-2 py-4">
              <div className="size-1.5 bg-primary/30 rounded-full animate-bounce"></div>
              <div className="size-1.5 bg-primary/30 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="size-1.5 bg-primary/30 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 bg-white border-t border-slate-100">
        <div className="relative">
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            className="w-full p-4 pr-14 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary text-sm resize-none h-28 outline-none transition-all placeholder:text-slate-400"
            placeholder="Ask The Condor about statutes, ledgers, or NOLA compliance..." disabled={isTyping} />
          <button onClick={handleSend} disabled={isTyping || !input.trim()}
            className={`absolute bottom-4 right-4 p-2.5 rounded-xl transition-all shadow-lg ${isTyping || !input.trim() ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-primary/20'}`}>
            <Icons.Send className="size-5" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Icons.ShieldCheck className="size-3 text-emerald-500" />
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Secured by CondoClaw Intelligence</p>
        </div>
      </div>
    </aside>
  );
};
