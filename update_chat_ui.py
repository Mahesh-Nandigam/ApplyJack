import pathlib

file_path = 'src/app/dashboard/page.js'
txt = pathlib.Path(file_path).read_text(encoding='utf-8')

new_imports = "import React, { useState } from 'react';\nimport { Search, Briefcase, Zap, Bell, CheckCircle2, User, Bot } from 'lucide-react';"
txt = txt.replace("import React, { useState } from 'react';\nimport { Search, Briefcase, Zap, Bell, CheckCircle2 } from 'lucide-react';", new_imports)

# Add AI Response state
start_state = txt.find('const [isParsing, setIsParsing] = useState(false);')
end_state = start_state + len('const [isParsing, setIsParsing] = useState(false);')
txt = txt[:start_state] + '''  const [isParsing, setIsParsing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');''' + txt[end_state:]

# Update handleParse
start_handle = txt.find('const handleParse = ')
end_handle = txt.find('};', start_handle) + 2

new_handle = '''  const handleParse = async (e) => {
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
  };'''

txt = txt[:start_handle] + new_handle + txt[end_handle:]

# Add UI for response
start_ui = txt.find('<div className="mt-6 flex items-center justify-center')
end_ui = txt.find('</div>\n\n        </div>\n      </div>', start_ui) + 6

new_ui = '''<div className="mt-6 flex items-center justify-center gap-8 text-sm font-medium text-zinc-500 transition-all">
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
                    <div dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\\n/g, '<br/>') }} />
                  )}
                </div>
              </div>
            </div>
          )}
'''
txt = txt[:start_ui] + new_ui + txt[end_ui:]

pathlib.Path(file_path).write_text(txt, encoding='utf-8')
print("Dashboard updated with AI Chat UI.")
