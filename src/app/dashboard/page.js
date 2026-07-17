'use client';

import React, { useState } from 'react';
import { Search, Briefcase, Zap, Bell, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const [url, setUrl] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  const notifications = [
    { platform: 'LinkedIn', count: 3, role: 'Full Stack Developer', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { platform: 'Naukri', count: 5, role: 'Frontend Engineer', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4h-2v-6h2v1.1c.6-1.1 2.4-1.2 3.2-.2.8.9.8 2.2.8 3.1v4z' },
    { platform: 'Wellfound', count: 2, role: 'React Developer', icon: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.7-.71 2.992-1.17 2.992 1.284v3.623z' },
    { platform: 'Indeed', count: 8, role: 'Software Engineer', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4h-2v-6h2v1.1c.6-1.1 2.4-1.2 3.2-.2.8.9.8 2.2.8 3.1v4z' },
    { platform: 'Instahyre', count: 1, role: 'Backend Dev', icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 17H8v-7h2v7zm-1-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 8h-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4H9v-7h2v1.2c.6-1.1 2.4-1.2 3.2-.2.8.9.8 2.3.8 3.2v3.8z' }
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

        <div className="flex-1 overflow-x-auto custom-scrollbar flex items-center">
          <div className="flex gap-6 min-w-max pb-4">
            {notifications.map((notif, idx) => (
              <div 
                key={idx}
                className="w-80 h-96 bg-transparent border border-[#27272a] rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-500 hover:bg-zinc-900/30 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-[#27272a] flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                      <path d={notif.icon} />
                    </svg>
                  </div>
                  <span className="bg-white text-black text-xs font-bold px-2.5 py-1 rounded-full">
                    {notif.count} New
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{notif.platform}</h3>
                  <p className="text-sm text-zinc-400 font-medium">{notif.count} job notifications for</p>
                  <p className="text-lg font-semibold text-zinc-200 mt-1">{notif.role}</p>
                </div>

                <button className="w-full bg-zinc-900 text-white font-medium text-sm px-4 py-3 rounded-xl border border-[#27272a] group-hover:bg-white group-hover:text-black transition-all">
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
