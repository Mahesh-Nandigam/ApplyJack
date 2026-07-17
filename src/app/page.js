'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  
  // Empty initial state so the user can type everything manually
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    college: '',
    degree: '',
    major: '',
    gradYear: '',
    cgpa: '',
    skills: '',
    experience: [
      {
        company: '',
        role: '',
        duration: '',
        description: ''
      }
    ],
    projects: [
      {
        title: '',
        tech: '',
        description: ''
      }
    ],
    extracurricular: '',
    githubUrl: '',
    platforms: {
      linkedin: false,
      naukri: false,
      indeed: false,
      wellfound: false,
      glassdoor: false
    },
    platformUrls: {
      linkedin: '',
      naukri: '',
      indeed: '',
      wellfound: '',
      glassdoor: ''
    }
  });

  const [platformError, setPlatformError] = useState('');

  // Preloader counter
  useEffect(() => {
    if (percent < 100) {
      const timer = setTimeout(() => {
        setPercent(prev => prev + 1);
      }, 15);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [percent]);

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
      experience: [...prev.experience, { company: '', role: '', duration: '', description: '' }]
    }));
  };

  const addProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', tech: '', description: '' }]
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
        triggerStepPopup('Please fill in first name, last name, and email.');
        return false;
      }
      triggerStepPopup('Contact details saved.');
    } else if (currentStep === 2) {
      if (!profile.college || !profile.degree) {
        triggerStepPopup('Please fill in college name and degree.');
        return false;
      }
      triggerStepPopup('Education details saved.');
    } else if (currentStep === 3) {
      triggerStepPopup('Work experience saved.');
    } else if (currentStep === 4) {
      triggerStepPopup('Projects and achievements saved.');
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
      setPlatformError('Please select and fill out profile links for at least two job platforms.');
      return;
    }

    // Validate that the selected platforms have URLs entered
    for (const [platform] of selectedPlatforms) {
      if (!profile.platformUrls[platform]) {
        setPlatformError(`Please enter your profile URL for ${platform}.`);
        return;
      }
    }
    
    setPlatformError('');
    triggerStepPopup('Master Resume compiled and finalized.');
    setCurrentStep(6); // Step 6 is the final resume reveal
  };

  const resetForm = () => {
    setProfile({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      college: '',
      degree: '',
      major: '',
      gradYear: '',
      cgpa: '',
      skills: '',
      experience: [{ company: '', role: '', duration: '', description: '' }],
      projects: [{ title: '', tech: '', description: '' }],
      extracurricular: '',
      githubUrl: '',
      platforms: { linkedin: false, naukri: false, indeed: false, wellfound: false, glassdoor: false },
      platformUrls: { linkedin: '', naukri: '', indeed: '', wellfound: '', glassdoor: '' }
    });
    setCurrentStep(1);
    setShowWizard(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col justify-end p-12 text-white select-none">
        <div className="text-[15vw] font-bold leading-none font-mono tracking-tighter">
          {String(percent).padStart(3, '0')}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#e2e8f0] font-sans flex flex-col relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {showPopup && (
        <div className="fixed top-6 right-6 bg-indigo-650 text-white px-5 py-3 rounded-lg shadow-xl border border-indigo-500/30 z-50 font-medium text-sm transition-all duration-300">
          {popupMessage}
        </div>
      )}

      {/* Header */}
      <header className="bg-[#0b0f19]/80 backdrop-blur-md border-b border-[#1e293b] py-6 px-8 lg:px-16 sticky top-0 z-40 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-widest text-white uppercase font-sans">LUSION</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="border border-zinc-800 bg-[#0f172a] hover:bg-zinc-800 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all">
            LET'S TALK
          </button>
          
          {!showWizard ? (
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setShowWizard(true);
              }}
              className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-4 py-2.5 rounded-full transition-all"
            >
              MENU ••
            </button>
          ) : (
            <button 
              onClick={() => setShowWizard(false)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all"
            >
              CLOSE
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 flex flex-col">
        
        {!showWizard ? (
          /* Landing Page: 100% exact copy of Lusion About Us */
          <div className="bg-[#080b12] text-white flex flex-col">
            
            {/* Hero Section */}
            <section className="py-32 px-8 lg:px-16 border-b border-zinc-900 flex flex-col gap-12 min-h-[85vh] justify-center relative">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">WE ARE</span>
                <h1 className="text-7xl lg:text-9xl font-bold tracking-tighter text-white leading-none">
                  LUSION
                </h1>
                <p className="text-xl lg:text-3xl text-zinc-400 tracking-tight font-light max-w-4xl leading-relaxed mt-4">
                  A worldwide team of specialists in design, motion, 3D, and technology working together to turn ambitious ideas into immersive digital experiences.
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-900 pt-8 mt-16 text-zinc-500 font-mono text-xs tracking-wider">
                <span>CRAFTING UNIQUE DIGITAL EXPERIENCES</span>
                <span className="animate-bounce">SCROLL TO EXPLORE</span>
              </div>
            </section>

            {/* Team Section */}
            <section className="py-24 px-8 lg:px-16 border-b border-zinc-900 flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3 flex flex-col gap-6">
                <h2 className="text-4xl font-bold tracking-tight text-white uppercase">TEAM</h2>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                  We combine different disciplines into one creative production process, allowing ideas to move from concept to execution with clarity and craft. The result is digital work that feels distinctive, technically refined, and built to make a lasting impact.
                </p>
              </div>

              <div className="lg:w-2/3 flex flex-col gap-6 border-l border-zinc-900 pl-8 lg:pl-16">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 block">Key People</span>
                
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-white font-sans">Edan Kwan</span>
                      <span className="text-xs text-zinc-400 font-mono">Cofounder & Creative Director</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">[[ 001 ]]</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-white font-sans">Ann Kwan</span>
                      <span className="text-xs text-zinc-400 font-mono">Cofounder & Producer</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">[[ 002 ]]</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-white font-sans">Christophe</span>
                      <span className="text-xs text-zinc-400 font-mono">Technical Lead</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">[[ 003 ]]</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Area of Expertise (100% exact styling matching user screenshot) */}
            <section className="py-24 px-8 lg:px-16 bg-[#1a2ffb] text-black flex flex-col gap-12 relative">
              
              {/* Logo background decoration or title */}
              <div className="flex items-center justify-between select-none">
                <span className="text-white text-2xl font-bold tracking-widest uppercase">LUSION</span>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white font-mono text-sm">—</span>
                  <button className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-full font-sans">LET'S TALK •</button>
                  <button className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-full font-sans">MENU ••</button>
                </div>
              </div>

              {/* Card Grid matching screenshot */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                
                {/* STRATEGY CARD */}
                <div className="bg-[#ffffff] rounded-[24px] p-8 flex flex-col justify-between min-h-[460px] shadow-2xl relative">
                  <div>
                    <div className="flex items-center justify-between mb-8 select-none">
                      <h3 className="text-xl font-bold tracking-wider text-black font-sans">STRATEGY</h3>
                      {/* stylized block logo */}
                      <span className="text-xl font-black text-black font-mono">S</span>
                    </div>
                    
                    <ul className="flex flex-col gap-3 font-sans text-[13px] text-zinc-800">
                      <li className="pb-3 border-b border-dashed border-zinc-200">Digital Experience Strategy</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">Technology Strategy</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">Creative Direction</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">Discovery</li>
                      <li className="pb-3">Research</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-8 border-t border-zinc-100 pt-4 select-none">
                    <span className="text-sm font-black text-zinc-300 font-mono">S</span>
                    <span className="rotate-180 text-xs font-mono text-zinc-400 tracking-widest uppercase">STRATEGY</span>
                  </div>
                </div>

                {/* CREATIVE CARD */}
                <div className="bg-[#ffffff] rounded-[24px] p-8 flex flex-col justify-between min-h-[460px] shadow-2xl relative">
                  <div>
                    <div className="flex items-center justify-between mb-8 select-none">
                      <h3 className="text-xl font-bold tracking-wider text-black font-sans">CREATIVE</h3>
                      <span className="text-xl font-black text-black font-mono">C</span>
                    </div>
                    
                    <ul className="flex flex-col gap-3 font-sans text-[13px] text-zinc-800">
                      <li className="pb-3 border-b border-dashed border-zinc-200">Art Direction</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">UX/UI Design</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">Motion Design</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">Interactive Design</li>
                      <li className="pb-3">Illustration</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-8 border-t border-zinc-100 pt-4 select-none">
                    <span className="text-sm font-black text-zinc-300 font-mono">C</span>
                    <span className="rotate-180 text-xs font-mono text-zinc-400 tracking-widest uppercase">CREATIVE</span>
                  </div>
                </div>

                {/* TECH CARD */}
                <div className="bg-[#ffffff] rounded-[24px] p-8 flex flex-col justify-between min-h-[460px] shadow-2xl relative">
                  <div>
                    <div className="flex items-center justify-between mb-8 select-none">
                      <h3 className="text-xl font-bold tracking-wider text-black font-sans">TECH</h3>
                      <span className="text-xl font-black text-black font-mono">T</span>
                    </div>
                    
                    <ul className="flex flex-col gap-3 font-sans text-[13px] text-zinc-800">
                      <li className="pb-3 border-b border-dashed border-zinc-200">WebGL Development</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">Front End Development</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">Unity/Unreal</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">Interactive Installations</li>
                      <li className="pb-3">AR and VR Experiences</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-8 border-t border-zinc-100 pt-4 select-none">
                    <span className="text-sm font-black text-zinc-300 font-mono">T</span>
                    <span className="rotate-180 text-xs font-mono text-zinc-400 tracking-widest uppercase">TECH</span>
                  </div>
                </div>

                {/* PRODUCTION CARD */}
                <div className="bg-[#ffffff] rounded-[24px] p-8 flex flex-col justify-between min-h-[460px] shadow-2xl relative">
                  <div>
                    <div className="flex items-center justify-between mb-8 select-none">
                      <h3 className="text-xl font-bold tracking-wider text-black font-sans">PRODUCTION</h3>
                      <span className="text-xl font-black text-black font-mono">P</span>
                    </div>
                    
                    <ul className="flex flex-col gap-3 font-sans text-[13px] text-zinc-800">
                      <li className="pb-3 border-b border-dashed border-zinc-200">Procedural Modeling</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">3D Asset Creation</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">3D Optimization</li>
                      <li className="pb-3 border-b border-dashed border-zinc-200">Animation</li>
                      <li className="pb-3">3D Pipeline Development</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-8 border-t border-zinc-100 pt-4 select-none">
                    <span className="text-sm font-black text-zinc-300 font-mono">P</span>
                    <span className="rotate-180 text-xs font-mono text-zinc-400 tracking-widest uppercase">PRODUCTION</span>
                  </div>
                </div>

              </div>

              {/* Call To Action Transition Button */}
              <div className="flex flex-col items-center justify-center pt-20 pb-8">
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setShowWizard(true);
                  }}
                  className="px-10 py-5 rounded-full bg-black text-white hover:bg-zinc-900 font-bold text-lg tracking-wider transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  ENTER WIZARD PROCESS
                </button>
              </div>

            </section>

          </div>
        ) : (
          /* Onboarding Wizard Form & Preview Layout */
          <div className="flex-grow flex flex-col h-[calc(100vh-77px)] overflow-hidden bg-[#0b0f19]">
            
            {currentStep === 6 ? (
              /* Step 6: Full Screen Resume Reveal */
              <div className="flex-grow flex flex-col lg:flex-row overflow-hidden bg-[#080b12]">
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
                            currentStep >= step ? 'bg-indigo-500' : 'bg-[#1e293b]'
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
                                    type="text" value={exp.company} onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
                                    placeholder="Google"
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none placeholder:text-[#334155]"
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-semibold text-[#94a3b8]">Role</label>
                                  <input 
                                    type="text" value={exp.role} onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                                    placeholder="Frontend Intern"
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none placeholder:text-[#334155]"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#94a3b8]">Duration</label>
                                <input 
                                  type="text" value={exp.duration} onChange={(e) => handleExperienceChange(idx, 'duration', e.target.value)}
                                  placeholder="June 2025 - August 2025"
                                  className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none placeholder:text-[#334155]"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#94a3b8]">Description</label>
                                <textarea 
                                  rows="3" value={exp.description} onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
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
                                    type="text" value={proj.title} onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                                    placeholder="E-commerce Web App"
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none placeholder:text-[#334155]"
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-semibold text-[#94a3b8]">Technologies Used</label>
                                  <input 
                                    type="text" value={proj.tech} onChange={(e) => handleProjectChange(idx, 'tech', e.target.value)}
                                    placeholder="React, Firebase, Stripe API"
                                    className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none placeholder:text-[#334155]"
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-semibold text-[#94a3b8]">Project Description</label>
                                  <textarea 
                                    rows="3" value={proj.description} onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
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
