'use client';

import React, { useState } from 'react';
import { Search, Briefcase, Zap, Bell, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const [url, setUrl] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  const notifications = [
    { platform: 'LinkedIn', count: 3, role: 'Full Stack Developer', color: '#0A66C2', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
    { platform: 'Naukri', count: 5, role: 'Frontend Engineer', color: '#008bdc', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" /></svg> },
    { platform: 'Internshala', count: 2, role: 'React Developer', color: '#1295c9', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg> },
    { platform: 'Indeed', count: 8, role: 'Software Engineer', color: '#2164f3', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm-1-7a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 10z" /></svg> },
    { platform: 'Wellfound', count: 4, role: 'Backend Dev', color: '#e64a19', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 2L1 21h22L12 2zm0 3.5l7.5 13.5h-15L12 5.5z" /></svg> }
  ];
  const handleParse = (e) => {
    e.preventDefault();
    if (!url) return;
    setIsParsing(true);
    // Mock parsing delay
    setTimeout(() => {
      setIsParsing(false);
    }, 2000);
  };

  return (
    <div className="h-screen w-full bg-[#09090b] text-zinc-50 font-sans flex flex-col overflow-hidden">
      
      {/* Top 75%: Notification Cards */}
      <div className="h-[75%] p-8 lg:p-12 flex flex-col border-b border-[#27272a]">
        
        <header className="flex items-center justify-between mb-8 select-none">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-widest text-white uppercase font-sans cursor-pointer" onClick={() => window.location.href='/about'}>
              APPLY JACK <span className="text-zinc-500 font-medium">/ DASHBOARD</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
               Engine Online
             </div>
          </div>
        </header>

                <div className="flex-1 w-full flex items-center justify-center mt-4">
          <div className="w-full flex gap-4 xl:gap-6 2xl:gap-8 max-w-[1400px] mx-auto">
            {notifications.map((notif, idx) => (
              <div 
                key={idx}
                className="flex-1 min-w-[200px] h-[340px] bg-zinc-900/20 backdrop-blur-sm border border-[#27272a] rounded-3xl p-6 flex flex-col justify-between hover:border-zinc-500 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer group hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-black/50"
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl border border-[#27272a] flex items-center justify-center bg-zinc-950 group-hover:bg-zinc-900 transition-all duration-300 shadow-inner drop-shadow-md" style={{ color: notif.color }}>
                    {notif.icon}
                  </div>
                  <span className="bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 text-xs font-bold px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    {notif.count} New
                  </span>
                </div>
                
                <div className="mt-auto mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-zinc-100 transition-colors">{notif.platform}</h3>
                  <p className="text-sm text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors">{notif.count} job notifications for</p>
                  <p className="text-lg font-semibold text-zinc-300 mt-1 leading-snug group-hover:text-white transition-colors">{notif.role}</p>
                </div>

                <button className="w-full bg-zinc-900 text-white font-semibold text-sm px-4 py-3.5 rounded-xl border border-[#27272a] group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-md">
                  Auto-Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom 25%: Agent Search Interface */}
      <div className="h-[25%] bg-[#09090b] flex flex-col justify-center items-center px-8 lg:px-24 relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-4xl z-10 relative">
          <form onSubmit={handleParse} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Zap className={`w-6 h-6 ${isParsing ? 'text-indigo-400 animate-pulse' : 'text-zinc-500 group-hover:text-zinc-400'} transition-colors`} />
            </div>
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a job application link for the Agent to analyze..." 
              className="w-full bg-zinc-900/50 backdrop-blur-md border border-[#27272a] rounded-2xl py-6 pl-16 pr-32 text-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all shadow-2xl"
              required
            />
            <button 
              type="submit"
              disabled={isParsing || !url}
              className="absolute inset-y-3 right-3 bg-white text-black font-semibold px-6 rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isParsing ? 'Parsing...' : 'Analyze'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-8 text-sm font-medium text-zinc-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Extracts Requirements
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Maps Missing Skills
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Tailors Resume
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
