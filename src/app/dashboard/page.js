'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Briefcase, Zap, Bell, CheckCircle2, User, Bot } from 'lucide-react';

export default function DashboardPage() {
  const [url, setUrl] = useState('');
    const [isParsing, setIsParsing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [activePlatform, setActivePlatform] = useState(null);
  const [cookieValue, setCookieValue] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', 'mahesh@applyjack.ai')
        .single();
      if (data) setUserProfile(data);
    };
    fetchProfile();

    // LISTEN FOR CHROME EXTENSION SYNC
    const handleExtensionSync = async (e) => {
      const { platform, cookie } = e.detail;
      const cookieKey = platform.toLowerCase() + '_cookie';
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ [cookieKey]: cookie })
        .eq('email', 'mahesh@applyjack.ai');

      if (!error) {
        setUserProfile(prev => ({ ...prev, [cookieKey]: cookie }));
        triggerStepPopup(`${platform} account was magically synced by the Extension!`);
      }
    };
    
    window.addEventListener('ApplyJackExtensionSync', handleExtensionSync);
    return () => window.removeEventListener('ApplyJackExtensionSync', handleExtensionSync);
  }, []);

  const handleAutoApply = (platform) => {
    const cookieKey = platform.toLowerCase() + '_cookie';
    if (!userProfile || !userProfile[cookieKey]) {
      setActivePlatform(platform);
      setShowConnectModal(true);
    } else {
      // Trigger API / Modal webhook logic here
      // Alert the user that scraping is starting
      triggerStepPopup(`Initiating Playwright Scraping for ${platform}...`);
      
      // Trigger Modal Webhook
      fetch('https://mahesh-nandigam--applyjack-backend-fastapi-app.modal.run/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            cookie: userProfile[cookieKey],
            role: "Frontend Engineer" // Mock role for the demo
        })
      })
      .then(res => res.json())
      .then(data => {
          if (data.status === "success") {
              triggerStepPopup(data.message + " | Reached: " + data.page_title);
          } else {
              triggerStepPopup("Scraping error: " + JSON.stringify(data));
          }
      })
      .catch(err => {
          triggerStepPopup("Failed to trigger webhook: " + err.message);
      });
    }
  };

  const handleSaveCookie = async () => {
    setIsSaving(true);
    const cookieKey = activePlatform.toLowerCase() + '_cookie';
    
    const { error } = await supabase
      .from('user_profiles')
      .update({ [cookieKey]: cookieValue })
      .eq('email', 'mahesh@applyjack.ai');

    if (!error) {
      setUserProfile(prev => ({ ...prev, [cookieKey]: cookieValue }));
      setShowConnectModal(false);
      setCookieValue('');
      alert(`${activePlatform} connected successfully!`);
    }
    setIsSaving(false);
  };


  const notifications = [
    { platform: 'LinkedIn', count: 3, role: 'Full Stack Developer', color: '#0A66C2', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
    { platform: 'Naukri', count: 5, role: 'Frontend Engineer', color: '#008bdc', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" /></svg> },
    { platform: 'Internshala', count: 2, role: 'React Developer', color: '#1295c9', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg> },
    { platform: 'Indeed', count: 8, role: 'Software Engineer', color: '#2164f3', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm-1-7a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 10z" /></svg> },
    { platform: 'Wellfound', count: 4, role: 'Backend Dev', color: '#e64a19', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 2L1 21h22L12 2zm0 3.5l7.5 13.5h-15L12 5.5z" /></svg> }
  ];
    const handleParse = async (e) => {
    e.preventDefault();
    if (!url) return;
    setIsParsing(true);
    setAiResponse('');
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.success) {
        setAiResponse(data.response);
      } else {
        setAiResponse("Oops, something went wrong with the engine: " + data.error);
      }
    } catch (err) {
      setAiResponse("Error connecting to the AI Engine.");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-50 font-sans flex flex-col overflow-x-hidden overflow-y-auto custom-scrollbar">

      {/* Connect Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#09090b] border border-[#27272a] p-8 rounded-3xl w-full max-w-md relative shadow-2xl">
            <button onClick={() => setShowConnectModal(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Connect {activePlatform}</h2>
            <p className="text-sm text-zinc-400 mb-6">
              To enable Auto-Apply, paste your {activePlatform} Session Cookie (li_at). We need this to securely automate your applications.
            </p>
            <input 
              type="text" 
              value={cookieValue}
              onChange={(e) => setCookieValue(e.target.value)}
              placeholder={`Paste your ${activePlatform} cookie here...`}
              className="w-full bg-zinc-900 border border-[#27272a] text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors mb-6"
            />
            <button 
              onClick={handleSaveCookie}
              disabled={isSaving || !cookieValue}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Connecting...' : 'Securely Connect Account'}
            </button>
          </div>
        </div>
      )}

      
      {/* Top 75%: Notification Cards */}
      <div className="flex-none min-h-[60vh] p-8 lg:p-12 flex flex-col border-b border-[#27272a] justify-center">
        
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

                <button onClick={() => handleAutoApply(notif.platform)} className="w-full bg-zinc-900 text-white font-semibold text-sm px-4 py-3.5 rounded-xl border border-[#27272a] group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-md">
                  Auto-Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom 25%: Agent Search Interface */}
      <div className="flex-1 min-h-[40vh] bg-[#09090b] flex flex-col justify-center items-center px-8 lg:px-24 py-16 relative">
        
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

          <div className="mt-6 flex items-center justify-center gap-8 text-sm font-medium text-zinc-500 transition-all">
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

          {/* AI Response Chat UI */}
          {(isParsing || aiResponse) && (
            <div className="mt-8 bg-zinc-900/60 backdrop-blur-md border border-[#27272a] rounded-2xl p-6 text-zinc-200 shadow-2xl animate-in slide-in-from-bottom-4 duration-500 max-h-[40vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-start gap-4 mb-4 border-b border-zinc-800 pb-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                   <User className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white mb-1">Mahesh</p>
                  <p className="text-zinc-400 text-sm break-all">{url}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                   <Bot className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 text-sm leading-relaxed whitespace-pre-wrap">
                  <p className="text-sm font-bold text-indigo-400 mb-2">Apply Jack AI <span className="text-xs font-normal text-zinc-500 ml-2">powered by Llama 3.1 70B</span></p>
                  {isParsing ? (
                    <div className="flex items-center gap-2 text-indigo-300">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                      </span>
                      Analyzing requirements and mapping to your profile...
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br/>') }} />
                  )}
                </div>
              </div>
            </div>
          )}


        </div>
      </div>

    </div>
  );
}
