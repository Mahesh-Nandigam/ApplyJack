"use client";

import React, { useState } from "react";

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  
  // Empty initial state so the user can type everything manually
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    college: "",
    degree: "",
    major: "",
    gradYear: "",
    cgpa: "",
    skills: "",
    experience: [
      {
        company: "",
        role: "",
        duration: "",
        description: ""
      }
    ],
    projects: [
      {
        title: "",
        tech: "",
        description: ""
      }
    ],
    extracurricular: "",
    githubUrl: "",
    platforms: {
      linkedin: false,
      naukri: false,
      indeed: false,
      wellfound: false,
      glassdoor: false
    },
    platformUrls: {
      linkedin: "",
      naukri: "",
      indeed: "",
      wellfound: "",
      glassdoor: ""
    }
  });

  const [platformError, setPlatformError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name) => {
    setProfile(prev => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [name]: !prev.platforms[name]
      }
    }));
  };

  const handleUrlChange = (platform, value) => {
    setProfile(prev => ({
      ...prev,
      platformUrls: {
        ...prev.platformUrls,
        [platform]: value
      }
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...profile.experience];
    updated[index][field] = value;
    setProfile(prev => ({ ...prev, experience: updated }));
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...profile.projects];
    updated[index][field] = value;
    setProfile(prev => ({ ...prev, projects: updated }));
  };

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", duration: "", description: "" }]
    }));
  };

  const addProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "", tech: "", description: "" }]
    }));
  };

  const triggerStepPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!profile.firstName || !profile.lastName || !profile.email) {
        triggerStepPopup("Please fill in first name, last name, and email.");
        return false;
      }
      triggerStepPopup("Contact details saved.");
    } else if (currentStep === 2) {
      if (!profile.college || !profile.degree) {
        triggerStepPopup("Please fill in college name and degree.");
        return false;
      }
      triggerStepPopup("Education details saved.");
    } else if (currentStep === 3) {
      triggerStepPopup("Work experience saved.");
    } else if (currentStep === 4) {
      triggerStepPopup("Projects and achievements saved.");
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check that at least two platforms are selected
    const selectedPlatforms = Object.entries(profile.platforms).filter(([k, v]) => v);
    if (selectedPlatforms.length < 2) {
      setPlatformError("Please select and fill out profile links for at least two job platforms.");
      return;
    }

    // Validate that the selected platforms have URLs entered
    for (const [platform] of selectedPlatforms) {
      if (!profile.platformUrls[platform]) {
        setPlatformError(`Please enter your profile URL for ${platform}.`);
        return;
      }
    }
    
    setPlatformError("");
    triggerStepPopup("Master Resume compiled and finalized.");
    setCurrentStep(6); // Step 6 is the final resume reveal
  };

  const resetForm = () => {
    setProfile({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      college: "",
      degree: "",
      major: "",
      gradYear: "",
      cgpa: "",
      skills: "",
      experience: [{ company: "", role: "", duration: "", description: "" }],
      projects: [{ title: "", tech: "", description: "" }],
      extracurricular: "",
      githubUrl: "",
      platforms: { linkedin: false, naukri: false, indeed: false, wellfound: false, glassdoor: false },
      platformUrls: { linkedin: "", naukri: "", indeed: "", wellfound: "", glassdoor: "" }
    });
    setCurrentStep(1);
    setShowWizard(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#e2e8f0] font-sans flex flex-col relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {showPopup && (
        <div className="fixed top-6 right-6 bg-indigo-650 text-white px-5 py-3 rounded-lg shadow-xl border border-indigo-500/30 z-50 font-medium text-sm transition-all duration-300">
          {popupMessage}
        </div>
      )}

      {/* Styles for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}} />

      {/* Header */}
      <header className="border-b border-[#1e293b] bg-[#0f172a] py-4 px-8 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white">ApplyJack Dashboard</span>
          <span className="text-xs bg-[#1e293b] text-[#94a3b8] px-2.5 py-0.5 rounded-full font-mono">Profile Builder</span>
        </div>
        <div className="flex items-center gap-4">
          {!showWizard ? (
            <button 
              onClick={() => setShowWizard(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Get Started
            </button>
          ) : (
            <button 
              onClick={() => setShowWizard(false)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            >
              Back to About Us
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-emerald-400 font-medium font-mono">Autopilot Connected</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {!showWizard ? (
          /* Landing Page: 100% exact copy of Lusion About Us */
          <div className="bg-[#080b12] text-white flex flex-col">
            
            {/* Hero Section */}
            <section className="py-20 px-8 lg:px-20 border-b border-[#1e293b] flex flex-col gap-12 min-h-[80vh] justify-center relative">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">We Are</span>
                <h1 className="text-6xl lg:text-9xl font-bold tracking-tighter text-white leading-none">
                  LUSION
                </h1>
                <p className="text-xl lg:text-3xl text-zinc-400 tracking-tight font-light max-w-3xl leading-relaxed mt-2">
                  A worldwide team of specialists in design, motion, 3D, and technology working together to turn ambitious ideas into immersive digital experiences.
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#1e293b] pt-8 mt-12">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">CRAFTING UNIQUE DIGITAL EXPERIENCES</span>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider animate-bounce">SCROLL TO EXPLORE</span>
              </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-8 lg:px-20 border-b border-[#1e293b] flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3 flex flex-col gap-6">
                <h2 className="text-4xl font-bold tracking-tight text-white uppercase">TEAM</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  We combine different disciplines into one creative production process, allowing ideas to move from concept to execution with clarity and craft. The result is digital work that feels distinctive, technically refined, and built to make a lasting impact.
                </p>
              </div>

              <div className="lg:w-2/3 flex flex-col gap-6 border-l border-[#1e293b] pl-8 lg:pl-16">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 block">Key People</span>
                
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-white">Edan Kwan</span>
                      <span className="text-xs text-zinc-400">Cofounder & Creative Director</span>
                    </div>
                    <span className="text-xs font-mono text-indigo-400">[001]</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-white">Ann Kwan</span>
                      <span className="text-xs text-zinc-400">Cofounder & Producer</span>
                    </div>
                    <span className="text-xs font-mono text-indigo-400">[002]</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-white">Christophe</span>
                      <span className="text-xs text-zinc-400">Technical Lead</span>
                    </div>
                    <span className="text-xs font-mono text-indigo-400">[003]</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Brands We Work With */}
            <section className="py-16 bg-[#0b0f19] border-b border-[#1e293b] overflow-hidden">
              <div className="px-8 lg:px-20 mb-8 flex flex-col gap-2">
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">BRANDS WE WORK WITH</h3>
                <p className="text-sm text-zinc-400">Trusted by global brands, cultural institutions, and forward thinking teams.</p>
              </div>

              <div className="relative w-full overflow-hidden flex">
                <div className="flex gap-16 whitespace-nowrap animate-marquee py-4">
                  {/* First loop */}
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">COCA-COLA</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">MAXMARA</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">CALVIN KLEIN</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">PORSCHE</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">WALLPAPER</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">HYUNDAI</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">GOOGLE</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">APPLE</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">SONY</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">NVIDIA</span>
                  
                  {/* Second loop for seamless join */}
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">COCA-COLA</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">MAXMARA</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">CALVIN KLEIN</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">PORSCHE</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">WALLPAPER</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">HYUNDAI</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">GOOGLE</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">APPLE</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">SONY</span>
                  <span className="text-2xl lg:text-4xl font-bold tracking-tight text-zinc-600 uppercase">NVIDIA</span>
                </div>
              </div>
            </section>

            {/* Awards Section */}
            <section className="py-20 px-8 lg:px-20 border-b border-[#1e293b] flex flex-col gap-12">
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-6">
                <h2 className="text-4xl font-bold tracking-tight text-white uppercase">AWARDS</h2>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono font-bold text-indigo-400">58</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Total Wins</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="border border-zinc-900 p-6 rounded-xl bg-[#0f172a]/30 flex flex-col justify-between h-[220px]">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">[AWWWARDS]</span>
                    <h4 className="text-lg font-bold text-white">Developer Site of the Year</h4>
                  </div>
                  <span className="text-sm text-zinc-400">Awarded for outstanding engineering and production performance.</span>
                </div>

                <div className="border border-zinc-900 p-6 rounded-xl bg-[#0f172a]/30 flex flex-col justify-between h-[220px]">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">[FWA]</span>
                    <h4 className="text-lg font-bold text-white">Site of the Year</h4>
                  </div>
                  <span className="text-sm text-zinc-400">Recognizing cutting-edge innovation and high-fidelity creative concepts.</span>
                </div>

                <div className="border border-zinc-900 p-6 rounded-xl bg-[#0f172a]/30 flex flex-col justify-between h-[220px]">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">[CSSDA]</span>
                    <h4 className="text-lg font-bold text-white">Agency Site of the Year</h4>
                  </div>
                  <span className="text-sm text-zinc-400">Honoring excellence in design, usability, and modern code standards.</span>
                </div>
              </div>
            </section>

            {/* Area of Expertise */}
            <section className="py-20 px-8 lg:px-20 border-b border-[#1e293b] flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl font-bold tracking-tight text-white uppercase">AREA OF EXPERTISE</h2>
                <p className="text-sm text-zinc-400 max-w-xl">Multidisciplinary expertise across strategy, creative, technology, and production.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1 */}
                <div className="border border-zinc-900 p-6 rounded-xl bg-[#0f172a]/30 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
                    <span className="text-sm font-bold text-white uppercase">Strategy</span>
                    <span className="text-xs font-mono text-indigo-400">[S]</span>
                  </div>
                  <ul className="flex flex-col gap-2 text-xs text-zinc-400 font-mono">
                    <li>Digital Experience Strategy</li>
                    <li>Technology Strategy</li>
                    <li>Creative Direction</li>
                    <li>Discovery & Research</li>
                  </ul>
                </div>

                {/* Card 2 */}
                <div className="border border-zinc-900 p-6 rounded-xl bg-[#0f172a]/30 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
                    <span className="text-sm font-bold text-white uppercase">Creative</span>
                    <span className="text-xs font-mono text-indigo-400">[C]</span>
                  </div>
                  <ul className="flex flex-col gap-2 text-xs text-zinc-400 font-mono">
                    <li>Art Direction</li>
                    <li>Experience Design</li>
                    <li>Concept Development</li>
                    <li>Prototyping</li>
                  </ul>
                </div>

                {/* Card 3 */}
                <div className="border border-zinc-900 p-6 rounded-xl bg-[#0f172a]/30 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
                    <span className="text-sm font-bold text-white uppercase">Technology</span>
                    <span className="text-xs font-mono text-indigo-400">[T]</span>
                  </div>
                  <ul className="flex flex-col gap-2 text-xs text-zinc-400 font-mono">
                    <li>Creative Development</li>
                    <li>WebGL & 3D Interactive</li>
                    <li>System Engineering</li>
                    <li>Speed & Performance</li>
                  </ul>
                </div>

                {/* Card 4 */}
                <div className="border border-zinc-900 p-6 rounded-xl bg-[#0f172a]/30 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
                    <span className="text-sm font-bold text-white uppercase">3D & Motion</span>
                    <span className="text-xs font-mono text-indigo-400">[M]</span>
                  </div>
                  <ul className="flex flex-col gap-2 text-xs text-zinc-400 font-mono">
                    <li>3D Modeling</li>
                    <li>Animation</li>
                    <li>Visual Effects</li>
                    <li>Shaders & Graphics</li>
                  </ul>
                </div>

              </div>
            </section>

            {/* Talks & Articles Section */}
            <section className="py-20 px-8 lg:px-20 border-b border-[#1e293b] flex flex-col lg:flex-row gap-16">
              
              {/* Left Column: Articles */}
              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Articles</h3>
                <div className="flex flex-col gap-4">
                  <a href="https://newsroom.porsche.com" target="_blank" className="border-b border-zinc-900 pb-3 flex items-center justify-between group">
                    <span className="text-sm text-zinc-400 group-hover:text-white transition-all">Porsche Newsroom - Driven By Dreams</span>
                    <span className="text-xs font-mono text-zinc-600">[2023]</span>
                  </a>
                  <a href="https://www.wallpaper.com" target="_blank" className="border-b border-zinc-900 pb-3 flex items-center justify-between group">
                    <span className="text-sm text-zinc-400 group-hover:text-white transition-all">Wallpaper - Driven by Dreams Short Film</span>
                    <span className="text-xs font-mono text-zinc-600">[2023]</span>
                  </a>
                  <a href="https://www.operanorth.co.uk" target="_blank" className="border-b border-zinc-900 pb-3 flex items-center justify-between group">
                    <span className="text-sm text-zinc-400 group-hover:text-white transition-all">Opera North - The Turn of the Screw</span>
                    <span className="text-xs font-mono text-zinc-600">[2022]</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Talks */}
              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Talks</h3>
                <div className="flex flex-col gap-4">
                  <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
                    <span className="text-sm text-zinc-400 font-semibold">Digital Design Days</span>
                    <span className="text-xs font-mono text-zinc-500">Oct 2024 Milan</span>
                  </div>
                  <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
                    <span className="text-sm text-zinc-400 font-semibold">Awwwards Conf</span>
                    <span className="text-xs font-mono text-zinc-500">Oct 2023 Amsterdam</span>
                  </div>
                  <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
                    <span className="text-sm text-zinc-400 font-semibold">KIKK Festival</span>
                    <span className="text-xs font-mono text-zinc-500">Oct 2023 Namur</span>
                  </div>
                </div>
              </div>

            </section>

            {/* Bottom Call To Action Button (Redirects to Onboarding Wizard) */}
            <section className="py-32 px-8 lg:px-20 text-center flex flex-col items-center justify-center gap-8 bg-[#0f172a]/20">
              <div className="flex flex-col gap-3 max-w-xl">
                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white uppercase">Ready to launch Autopilot?</h2>
                <p className="text-sm text-zinc-400">Compile your master resume and start auto-applying to top tech roles instantly.</p>
              </div>

              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setShowWizard(true);
                }}
                className="mt-4 px-10 py-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-bold text-white text-lg tracking-wide shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                ENTER APPLICATION WIZARD
              </button>
            </section>

          </div>
        ) : (
          /* Onboarding Wizard Form & Preview Layout */
          <div className="flex-1 flex flex-col h-[calc(100vh-57px)] overflow-hidden">
            
            {currentStep === 6 ? (
              /* Step 6: Full Screen Resume Reveal */
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#080b12]">
                {/* Reveal Summary sidebar */}
                <div className="w-full lg:w-1/3 p-8 border-r border-[#1e293b] flex flex-col justify-between overflow-y-auto bg-[#0b0f19]">
                  <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Your brand new, very cool resume is generated!</h2>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">
                      Your master developer profile is now active on our autopilot database. We have compiled your data and mapped it to your professional portal configurations.
                    </p>
                    
                    <div className="border-t border-[#1e293b] pt-5">
                      <span className="text-xs text-[#64748b] uppercase tracking-wider font-semibold block mb-3">Sync Status</span>
                      <div className="flex flex-col gap-3">
                        {profile.githubUrl && (
                          <div className="flex items-center justify-between text-xs font-mono bg-[#0f172a] p-2.5 rounded border border-[#1e293b]">
                            <span className="text-[#94a3b8]">GitHub</span>
                            <span className="text-white truncate max-w-[150px]">{profile.githubUrl}</span>
                          </div>
                        )}
                        {Object.entries(profile.platforms).map(([platform, enabled]) => (
                          enabled && (
                            <div key={platform} className="flex items-center justify-between text-xs font-mono bg-[#0f172a] p-2.5 rounded border border-[#1e293b]">
                              <span className="text-[#94a3b8] capitalize">{platform}</span>
                              <span className="text-emerald-400 truncate max-w-[150px]">{profile.platformUrls[platform]}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-8">
                    <button
                      onClick={() => window.print()}
                      className="w-full h-11 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-semibold text-white text-sm transition-all"
                    >
                      Print / Save PDF
                    </button>
                    <button 
                      onClick={resetForm}
                      className="w-full h-11 rounded-lg bg-[#1e293b] hover:bg-zinc-800 border border-zinc-800 font-semibold transition-all text-sm"
                    >
                      Create New Profile
                    </button>
                  </div>
                </div>

                {/* Resume paper preview sheet */}
                <div className="flex-1 p-8 overflow-y-auto flex items-start justify-center">
                  <div className="w-full max-w-[595px] aspect-[1/1.414] bg-white text-black p-10 shadow-2xl rounded-sm flex flex-col justify-between select-none">
                    <div>
                      {/* Header Details */}
                      <div className="flex flex-col items-center text-center border-b border-zinc-300 pb-5 mb-5">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                          {profile.firstName} {profile.lastName}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-xs text-zinc-600 font-mono">
                          <span>{profile.email}</span>
                          {profile.phone && (
                            <>
                              <span>|</span>
                              <span>{profile.phone}</span>
                            </>
                          )}
                          {profile.location && (
                            <>
                              <span>|</span>
                              <span>{profile.location}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Education section */}
                      <div className="flex flex-col gap-2.5 mb-5">
                        <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">Education</h3>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-start text-xs font-semibold text-zinc-900">
                            <span>{profile.college}</span>
                            <span className="font-mono text-zinc-600">{profile.gradYear}</span>
                          </div>
                          <div className="flex justify-between items-start text-[11px] text-zinc-600 italic">
                            <span>{profile.degree} {profile.major && `- ${profile.major}`}</span>
                            {profile.cgpa && (
                              <span className="font-mono not-italic text-zinc-500">CGPA: {profile.cgpa}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Skills section */}
                      {profile.skills && (
                        <div className="flex flex-col gap-2.5 mb-5">
                          <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">Skills</h3>
                          <p className="text-[11px] text-zinc-700 leading-relaxed font-sans">
                            {profile.skills}
                          </p>
                        </div>
                      )}

                      {/* Experience section */}
                      {profile.experience.some(exp => exp.company) && (
                        <div className="flex flex-col gap-2.5 mb-5">
                          <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">Experience</h3>
                          <div className="flex flex-col gap-3">
                            {profile.experience.map((exp, idx) => (
                              exp.company && (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex justify-between items-start text-xs font-semibold text-zinc-900">
                                    <span>{exp.role} @ {exp.company}</span>
                                    <span className="font-mono text-zinc-600">{exp.duration}</span>
                                  </div>
                                  <p className="text-[11px] text-zinc-600 leading-relaxed font-sans">
                                    {exp.description}
                                  </p>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Projects section */}
                      {profile.projects.some(proj => proj.title) && (
                        <div className="flex flex-col gap-2.5 mb-5">
                          <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">Projects</h3>
                          <div className="flex flex-col gap-3">
                            {profile.projects.map((proj, idx) => (
                              proj.title && (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex justify-between items-start text-xs font-semibold text-zinc-900">
                                    <span>{proj.title}</span>
                                    {proj.tech && (
                                      <span className="font-mono text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                                        {proj.tech}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-zinc-600 leading-relaxed font-sans">
                                    {proj.description}
                                  </p>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Extra-curricular */}
                      {profile.extracurricular && (
                        <div className="flex flex-col gap-2.5">
                          <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">Achievements</h3>
                          <p className="text-[11px] text-zinc-600 leading-relaxed font-sans">
                            {profile.extracurricular}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer Watermark */}
                    <div className="border-t border-zinc-200 pt-3 flex items-center justify-between text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
                      <span>Verified Candidate Profile</span>
                      <span>Generated by ApplyJack Autopilot</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Steps 1-5: Full Screen Form Layout (Hidden Preview) */
              <div className="flex-grow flex items-center justify-center p-8 bg-[#0b0f19] overflow-y-auto">
                <div className="w-full max-w-[650px] bg-[#0f172a] border border-[#1e293b] rounded-2xl p-8 shadow-2xl flex flex-col justify-between min-h-[500px]">
                  
                  <div>
                    {/* Step Indicators inside the card */}
                    <div className="flex items-center gap-2 mb-8">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <div 
                          key={step}
                          className={`flex-1 h-1.5 rounded-full transition-all ${
                            currentStep >= step ? "bg-indigo-500" : "bg-[#1e293b]"
                          }`}
                        />
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      
                      {/* Step 1: Personal Details */}
                      {currentStep === 1 && (
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-white">Hey Dev, let me know about you.</h2>
                            <p className="text-xs text-[#94a3b8]">Enter your primary contact details to get started.</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-[#94a3b8]">First Name</label>
                              <input 
                                type="text" name="firstName" value={profile.firstName} onChange={handleChange} required
                                placeholder="John"
                                className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-[#94a3b8]">Last Name</label>
                              <input 
                                type="text" name="lastName" value={profile.lastName} onChange={handleChange} required
                                placeholder="Doe"
                                className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#94a3b8]">Email Address</label>
                            <input 
                              type="email" name="email" value={profile.email} onChange={handleChange} required
                              placeholder="johndoe@email.com"
                              className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-[#94a3b8]">Phone Number</label>
                              <input 
                                type="text" name="phone" value={profile.phone} onChange={handleChange}
                                placeholder="+91 99999 99999"
                                className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-[#94a3b8]">Location</label>
                              <input 
                                type="text" name="location" value={profile.location} onChange={handleChange}
                                placeholder="Mumbai, India"
                                className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Education */}
                      {currentStep === 2 && (
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-white">Academic Qualifications</h2>
                            <p className="text-xs text-[#94a3b8]">Add details of your college graduation or studies.</p>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#94a3b8]">College Name</label>
                            <input 
                              type="text" name="college" value={profile.college} onChange={handleChange} required
                              placeholder="BITS Pilani"
                              className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#94a3b8]">Degree / Course</label>
                            <input 
                              type="text" name="degree" value={profile.degree} onChange={handleChange} required
                              placeholder="Bachelor of Science"
                              className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#94a3b8]">Major / Stream</label>
                            <input 
                              type="text" name="major" value={profile.major} onChange={handleChange}
                              placeholder="Information Systems"
                              className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-[#94a3b8]">Graduation Year</label>
                              <input 
                                type="text" name="gradYear" value={profile.gradYear} onChange={handleChange}
                                placeholder="2026"
                                className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-[#94a3b8]">CGPA / Percentage</label>
                              <input 
                                type="text" name="cgpa" value={profile.cgpa} onChange={handleChange}
                                placeholder="9.2"
                                className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Work Experience */}
                      {currentStep === 3 && (
                        <div className="flex flex-col gap-5">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                              <h2 className="text-xl font-bold text-white">Work Experience</h2>
                              <p className="text-xs text-[#94a3b8]">Add past roles, internships, or freelance work.</p>
                            </div>
                            <button 
                              type="button" onClick={addExperience}
                              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                            >
                              Add Position
                            </button>
                          </div>
                          {profile.experience.map((exp, idx) => (
                            <div key={idx} className="border border-[#1e293b] rounded-xl p-4 flex flex-col gap-4 bg-[#0b0f19]">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-semibold text-[#94a3b8]">Company</label>
                                  <input 
                                    type="text" value={exp.company} onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                                    placeholder="Google"
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none placeholder:text-[#334155]"
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-semibold text-[#94a3b8]">Role</label>
                                  <input 
                                    type="text" value={exp.role} onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                                    placeholder="Frontend Intern"
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none placeholder:text-[#334155]"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#94a3b8]">Duration</label>
                                  <input 
                                    type="text" value={exp.duration} onChange={(e) => handleExperienceChange(idx, "duration", e.target.value)}
                                    placeholder="June 2025 - August 2025"
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none placeholder:text-[#334155]"
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-semibold text-[#94a3b8]">Description</label>
                                  <textarea 
                                    rows="3" value={exp.description} onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
                                    placeholder="Describe your achievements and metrics."
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none resize-none placeholder:text-[#334155]"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Step 4: Projects & Achievements */}
                        {currentStep === 4 && (
                          <div className="flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-bold text-white">Projects</h2>
                                <p className="text-xs text-[#94a3b8]">Add notable software projects you have built.</p>
                              </div>
                              <button 
                                type="button" onClick={addProject}
                                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                              >
                                Add Project
                              </button>
                            </div>
                            {profile.projects.map((proj, idx) => (
                              <div key={idx} className="border border-[#1e293b] rounded-xl p-4 flex flex-col gap-4 bg-[#0b0f19]">
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-semibold text-[#94a3b8]">Project Title</label>
                                  <input 
                                    type="text" value={proj.title} onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                                    placeholder="E-commerce Web App"
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none placeholder:text-[#334155]"
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-semibold text-[#94a3b8]">Technologies Used</label>
                                  <input 
                                    type="text" value={proj.tech} onChange={(e) => handleProjectChange(idx, "tech", e.target.value)}
                                    placeholder="React, Firebase, Stripe API"
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none placeholder:text-[#334155]"
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-semibold text-[#94a3b8]">Project Description</label>
                                  <textarea 
                                    rows="3" value={proj.description} onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                                    placeholder="Describe your design and performance gains."
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none resize-none placeholder:text-[#334155]"
                                  />
                                </div>
                              </div>
                            ))}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-[#94a3b8]">Achievements / Extra-curricular Activities</label>
                              <textarea 
                                rows="2" name="extracurricular" value={profile.extracurricular} onChange={handleChange}
                                placeholder="Hackathon wins, open source contributions, coding clubs."
                                className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none resize-none placeholder:text-[#334155]"
                              />
                            </div>
                          </div>
                        )}

                        {/* Step 5: Skills & Platforms */}
                        {currentStep === 5 && (
                          <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1.5">
                              <h2 className="text-xl font-bold text-white">Skills & Profiles</h2>
                              <p className="text-xs text-[#94a3b8] mb-1">Add technical skills and link your professional platform profiles.</p>
                              <label className="text-xs font-semibold text-[#94a3b8]">Technical Skills</label>
                              <input 
                                type="text" name="skills" value={profile.skills} onChange={handleChange}
                                placeholder="React, Next.js, Python, PostgreSQL"
                                className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-[#94a3b8]">GitHub Profile Link</label>
                              <input 
                                type="url" name="githubUrl" value={profile.githubUrl} onChange={handleChange}
                                placeholder="https://github.com/username"
                                className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]"
                              />
                            </div>

                            <div className="border-t border-[#1e293b] pt-5">
                              <span className="text-xs font-semibold text-[#94a3b8] block mb-2">Connect Job Platforms (Select at least 2)</span>
                              
                              <div className="flex flex-col gap-3">
                                {Object.keys(profile.platforms).map((platform) => (
                                  <div key={platform} className="flex flex-col gap-2">
                                    <label className="flex items-center gap-3 cursor-pointer select-none">
                                      <input 
                                        type="checkbox" 
                                        checked={profile.platforms[platform]}
                                        onChange={() => handleCheckboxChange(platform)}
                                        className="w-4 h-4 accent-indigo-500 rounded bg-[#0b0f19] border-[#1e293b]"
                                      />
                                      <span className="text-sm font-semibold capitalize font-mono">{platform}</span>
                                    </label>
                                    
                                    {profile.platforms[platform] && (
                                      <input 
                                        type="url" 
                                        value={profile.platformUrls[platform]}
                                        onChange={(e) => handleUrlChange(platform, e.target.value)}
                                        placeholder={`Enter your ${platform} profile URL`}
                                        className="bg-[#0b0f19] border border-[#1e293b] rounded-lg p-2.5 text-xs text-white focus:outline-none placeholder:text-[#334155]"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>

                              {platformError && (
                                <p className="text-xs text-rose-400 font-medium mt-3">{platformError}</p>
                              )}
                            </div>

                            <button 
                              type="submit"
                              className="mt-4 w-full h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-semibold text-white text-sm transition-all"
                            >
                              Save and Generate Resume
                            </button>
                          </div>
                        )}

                      </form>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between border-t border-[#1e293b] pt-6 mt-8">
                      <button 
                        type="button" 
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="px-4 py-2 text-sm text-[#94a3b8] hover:text-white disabled:opacity-30 transition-all font-semibold"
                      >
                        Previous
                      </button>
                      {currentStep < 5 && (
                        <button 
                          type="button" 
                          onClick={nextStep}
                          className="px-6 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-sm font-semibold transition-all text-white"
                        >
                          Next
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              )}

          </div>
        )}

      </main>
    </div>
  );
}
