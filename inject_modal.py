import pathlib

file_path = 'src/app/dashboard/page.js'
content = pathlib.Path(file_path).read_text(encoding='utf-8')

# 1. Add imports for Supabase and useEffect
content = content.replace(
    "import React, { useState } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { supabase } from '../../lib/supabase';"
)

# 2. Add state variables for the modal and user profile
state_vars = """
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
  }, []);

  const handleAutoApply = (platform) => {
    const cookieKey = platform.toLowerCase() + '_cookie';
    if (!userProfile || !userProfile[cookieKey]) {
      setActivePlatform(platform);
      setShowConnectModal(true);
    } else {
      // Trigger API / Modal webhook logic here
      alert(`Initiating AI Agents for ${platform}...`);
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
"""
content = content.replace(
    "const [aiResponse, setAiResponse] = useState('');",
    "const [aiResponse, setAiResponse] = useState('');\n" + state_vars
)

# 3. Add the Auto-Apply click handler to the button
content = content.replace(
    "<button className=\"w-full bg-zinc-900 text-white font-semibold text-sm px-4 py-3.5 rounded-xl border border-[#27272a] group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-md\">",
    "<button onClick={() => handleAutoApply(notif.platform)} className=\"w-full bg-zinc-900 text-white font-semibold text-sm px-4 py-3.5 rounded-xl border border-[#27272a] group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-md\">"
)

# 4. Add the Connect Modal UI inside the top-level div
connect_modal_ui = """
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
"""

# Place it right after the opening wrapper div
content = content.replace(
    '<div className="min-h-screen w-full bg-[#09090b] text-zinc-50 font-sans flex flex-col overflow-x-hidden overflow-y-auto custom-scrollbar">',
    '<div className="min-h-screen w-full bg-[#09090b] text-zinc-50 font-sans flex flex-col overflow-x-hidden overflow-y-auto custom-scrollbar">\n' + connect_modal_ui
)

pathlib.Path(file_path).write_text(content, encoding='utf-8')
print("Successfully added Connect Modal and Supabase integration to Dashboard!")
