export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              ApplyJack ⚡
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-800/30 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-emerald-400 font-medium font-mono">Extension Active</span>
            </div>
            <a 
              href="https://github.com/Mahesh-Nandigam/ApplyJack" 
              target="_blank" 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
        {/* Hero Section */}
        <section className="text-center md:text-left flex flex-col md:flex-row items-center gap-12 py-8">
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex self-center md:self-start items-center gap-2 bg-indigo-950/40 border border-indigo-800/30 px-3 py-1 rounded-full text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              🚀 Hackathon Z Submission
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Autopilot for your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Job Applications
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl">
              Bypass the tedious copy-paste routine on Naukri and LinkedIn. ApplyJack uses Gemini to tailor your resume's bullet points to the exact job description and autofills the form in one click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a 
                href="#extension" 
                className="h-12 px-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-semibold flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Download Extension
              </a>
              <a 
                href="#dashboard" 
                className="h-12 px-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 font-semibold flex items-center justify-center transition-all"
              >
                Launch Dashboard
              </a>
            </div>
          </div>
          
          {/* Dashboard Preview Mockup */}
          <div className="flex-1 w-full max-w-xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-transparent opacity-50"></div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-800"></span>
                <span className="w-3 h-3 rounded-full bg-zinc-800"></span>
                <span className="w-3 h-3 rounded-full bg-zinc-800"></span>
              </div>
              <span className="text-xs font-mono text-zinc-500">ApplyJack Console v1.0</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-zinc-900/50 border border-zinc-800/50 p-4 rounded-xl">
                <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Match Score</div>
                <div className="text-2xl font-bold text-indigo-400 font-mono">92%</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800/50 p-4 rounded-xl">
                <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Applied</div>
                <div className="text-2xl font-bold text-purple-400 font-mono">24</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800/50 p-4 rounded-xl">
                <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Saves (Hrs)</div>
                <div className="text-2xl font-bold text-pink-400 font-mono">8.2h</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-zinc-900/20 border border-zinc-800/40 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span className="text-sm font-medium">Software Engineer @ Google</span>
                </div>
                <span className="text-xs text-zinc-500">Autofilled</span>
              </div>
              <div className="flex items-center justify-between bg-zinc-900/20 border border-zinc-800/40 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span className="text-sm font-medium">Frontend Developer @ Stripe</span>
                </div>
                <span className="text-xs text-zinc-500">ATS Optimized</span>
              </div>
              <div className="flex items-center justify-between bg-zinc-900/20 border border-zinc-800/40 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                  <span className="text-sm font-medium">React Architect @ Vercel</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium">Ready</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
