'use client';

import React, { useState, useEffect } from 'react';

export default function BuilderPage() {
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  
  // Super detailed professional state
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    portfolioUrl: '',
    summary: '',
    
    college: '',
    degree: '',
    major: '',
    gradYear: '',
    cgpa: '',
    coursework: '',
    
    experience: [
      {
        company: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    
    skills: {
      languages: '',
      frontend: '',
      backend: '',
      tools: '',
      softSkills: ''
    },
    
    projects: [
      {
        title: '',
        tech: '',
        github: '',
        live: '',
        description: ''
      }
    ],
    
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
    },
    githubUrl: ''
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

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [name]: value
      }
    }));
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
      experience: [...prev.experience, { company: '', role: '', location: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const addProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', tech: '', github: '', live: '', description: '' }]
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
      triggerStepPopup('Basic details saved. Good job!');
    } else if (currentStep === 2) {
      triggerStepPopup('Experience details saved.');
    } else if (currentStep === 3) {
      if (!profile.college || !profile.degree) {
        triggerStepPopup('Please fill in college name and degree.');
        return false;
      }
      triggerStepPopup('Education details saved.');
    } else if (currentStep === 4) {
      triggerStepPopup('Skills logged securely.');
    } else if (currentStep === 5) {
      triggerStepPopup('Projects and Links verified.');
    } else if (currentStep === 6) {
      const selectedPlatforms = Object.entries(profile.platforms).filter(([k, v]) => v);
      if (selectedPlatforms.length === 0) {
        triggerStepPopup('Please select at least one platform.');
        return false;
      }
      for (const [platform] of selectedPlatforms) {
        if (!profile.platformUrls[platform]) {
          triggerStepPopup(`Please enter your profile URL for ${platform}.`);
          return false;
        }
      }
      triggerStepPopup('Platforms configured.');
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
      } else if (currentStep === 6) {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    triggerStepPopup('Compiling Master Resume...');
    // A small delay to simulate processing before revealing the resume
    setTimeout(() => {
      setCurrentStep(7);
    }, 800);
  };

  const resetForm = () => {
    window.location.reload();
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
    <div className="min-h-screen bg-[#0b0f19] text-[#e2e8f0] font-sans flex flex-col relative overflow-hidden">
      
      {/* Toast Notification */}
      {showPopup && (
        <div className="fixed top-6 right-6 bg-indigo-650 text-white px-5 py-3 rounded-lg shadow-xl border border-indigo-500/30 z-50 font-medium text-sm transition-all duration-300">
          {popupMessage}
        </div>
      )}

      {/* Header */}
      <header className="print:hidden bg-[#0b0f19]/80 backdrop-blur-md border-b border-[#1e293b] py-6 px-8 lg:px-16 sticky top-0 z-40 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-widest text-white uppercase font-sans cursor-pointer" onClick={() => window.location.href='/about'}>
            LUSION
          </span>
        </div>
        <div className="flex items-center gap-4">
          {currentStep < 7 && (
            <div className="hidden md:flex text-xs font-mono text-zinc-500 tracking-wider">
              STEP {currentStep} OF 6
            </div>
          )}
          <button 
            onClick={() => window.location.href='/about'}
            className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all"
          >
            EXIT WIZARD
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 flex flex-col h-[calc(100vh-77px)] overflow-hidden">
        
        {currentStep === 7 ? (
          /* Step 6: Full Screen Resume Reveal */
          <div className="flex-grow flex flex-col lg:flex-row overflow-hidden bg-[#080b12] print:overflow-visible">
            {/* Reveal Summary sidebar */}
            <div className="print:hidden w-full lg:w-1/3 p-8 border-r border-[#1e293b] flex flex-col justify-between overflow-y-auto bg-[#0b0f19]">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Your master resume is ready.</h2>
                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  We have mapped your data into a highly-optimized, ATS-friendly professional format.
                </p>
                
                <div className="border-t border-[#1e293b] pt-5">
                  <span className="text-xs text-[#64748b] uppercase tracking-wider font-semibold block mb-3">Linked Accounts</span>
                  <div className="flex flex-col gap-3">
                    {profile.githubUrl && (
                      <div className="flex items-center justify-between text-xs font-mono bg-[#0f172a] p-2.5 rounded border border-[#1e293b]">
                        <span className="text-[#94a3b8]">GitHub</span>
                        <span className="text-white truncate max-w-[150px]">{profile.githubUrl}</span>
                      </div>
                    )}
                    {profile.portfolioUrl && (
                      <div className="flex items-center justify-between text-xs font-mono bg-[#0f172a] p-2.5 rounded border border-[#1e293b]">
                        <span className="text-[#94a3b8]">Portfolio</span>
                        <span className="text-white truncate max-w-[150px]">{profile.portfolioUrl}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <button
                  onClick={() => window.print()}
                  className="w-full h-11 rounded-lg bg-white text-black hover:bg-zinc-200 font-bold tracking-wider text-sm transition-all shadow-lg"
                >
                  DOWNLOAD PDF
                </button>
                <button 
                  onClick={resetForm}
                  className="w-full h-11 rounded-lg bg-[#1e293b] hover:bg-zinc-800 border border-zinc-800 font-semibold transition-all text-sm"
                >
                  START OVER
                </button>
              </div>
            </div>

            {/* Resume paper preview sheet */}
            <div className="flex-1 p-8 overflow-y-auto flex items-start justify-center bg-[#1a2ffb] print:p-0 print:bg-white print:overflow-visible">
              <div id="resume-preview-sheet" className="w-full max-w-[800px] bg-white text-black p-12 shadow-2xl rounded-sm flex flex-col justify-start select-none min-h-[1100px] print:w-[210mm] print:h-[297mm] print:min-h-0 print:p-0 print:shadow-none print:m-0">
                
                {/* Header Details */}
                <div className="flex flex-col items-center text-center pb-6 mb-6 border-b border-zinc-300">
                  <h1 className="text-3xl font-black tracking-tight text-zinc-900 uppercase">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-3 text-sm text-zinc-800 font-medium">
                    <span>{profile.email}</span>
                    {profile.phone && <><span className="text-zinc-400">•</span><span>{profile.phone}</span></>}
                    {profile.location && <><span className="text-zinc-400">•</span><span>{profile.location}</span></>}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-x-3 mt-1 text-xs text-blue-600 font-semibold">
                    {profile.portfolioUrl && <a href={profile.portfolioUrl}>{profile.portfolioUrl}</a>}
                    {profile.portfolioUrl && profile.githubUrl && <span className="text-zinc-400">•</span>}
                    {profile.githubUrl && <a href={profile.githubUrl}>{profile.githubUrl}</a>}
                  </div>
                </div>

                {/* Professional Summary */}
                {profile.summary && (
                  <div className="flex flex-col mb-6">
                    <p className="text-[13px] text-zinc-800 leading-relaxed font-serif">
                      {profile.summary}
                    </p>
                  </div>
                )}

                {/* Experience section */}
                {profile.experience.some(exp => exp.company) && (
                  <div className="flex flex-col mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 mb-3">Professional Experience</h3>
                    <div className="flex flex-col gap-4">
                      {profile.experience.map((exp, idx) => (
                        exp.company && (
                          <div key={idx} className="flex flex-col gap-1">
                            <div className="flex justify-between items-baseline">
                              <span className="text-[14px] font-bold text-zinc-900">{exp.role}</span>
                              <span className="text-xs font-bold text-zinc-700">{exp.startDate} – {exp.endDate || 'Present'}</span>
                            </div>
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="text-xs font-semibold text-zinc-800 italic">{exp.company}</span>
                              <span className="text-xs text-zinc-600">{exp.location}</span>
                            </div>
                            <div className="text-[12px] text-zinc-800 leading-relaxed font-serif pl-3 border-l-2 border-zinc-200" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }} />
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects section */}
                {profile.projects.some(proj => proj.title) && (
                  <div className="flex flex-col mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 mb-3">Key Projects</h3>
                    <div className="flex flex-col gap-4">
                      {profile.projects.map((proj, idx) => (
                        proj.title && (
                          <div key={idx} className="flex flex-col gap-1">
                            <div className="flex justify-between items-baseline">
                              <span className="text-[14px] font-bold text-zinc-900">
                                {proj.title}
                                {proj.live && <span className="text-xs font-normal text-blue-600 ml-2">({proj.live})</span>}
                              </span>
                              {proj.tech && <span className="text-[11px] font-mono text-zinc-600">{proj.tech}</span>}
                            </div>
                            <div className="text-[12px] text-zinc-800 leading-relaxed font-serif pl-3 border-l-2 border-zinc-200" dangerouslySetInnerHTML={{ __html: proj.description.replace(/\n/g, '<br/>') }} />
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Education section */}
                <div className="flex flex-col mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 mb-3">Education</h3>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[14px] font-bold text-zinc-900">{profile.college}</span>
                      <span className="text-xs font-bold text-zinc-700">{profile.gradYear}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[13px] text-zinc-800 italic">{profile.degree} {profile.major && `in ${profile.major}`}</span>
                      {profile.cgpa && <span className="text-xs font-semibold text-zinc-800">GPA: {profile.cgpa}</span>}
                    </div>
                    {profile.coursework && (
                      <p className="text-[11px] text-zinc-600 mt-1"><span className="font-semibold">Relevant Coursework:</span> {profile.coursework}</p>
                    )}
                  </div>
                </div>

                {/* Skills section */}
                <div className="flex flex-col mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 mb-3">Technical Skills</h3>
                  <div className="flex flex-col gap-1.5 text-[12px]">
                    {profile.skills.languages && (
                      <div><span className="font-bold text-zinc-900 w-24 inline-block">Languages:</span> <span className="text-zinc-800">{profile.skills.languages}</span></div>
                    )}
                    {profile.skills.frontend && (
                      <div><span className="font-bold text-zinc-900 w-24 inline-block">Frontend:</span> <span className="text-zinc-800">{profile.skills.frontend}</span></div>
                    )}
                    {profile.skills.backend && (
                      <div><span className="font-bold text-zinc-900 w-24 inline-block">Backend:</span> <span className="text-zinc-800">{profile.skills.backend}</span></div>
                    )}
                    {profile.skills.tools && (
                      <div><span className="font-bold text-zinc-900 w-24 inline-block">Tools:</span> <span className="text-zinc-800">{profile.skills.tools}</span></div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* Steps 1-5: Full Screen Form Layout (Hidden Preview) */
          <div className="flex-grow flex items-center justify-center p-4 lg:p-8 bg-[#0b0f19] overflow-y-auto">
            <div className="w-full max-w-[800px] bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 lg:p-10 shadow-2xl flex flex-col justify-between my-auto">
              
              <div>
                {/* Step Indicators inside the card */}
                <div className="flex items-center gap-2 mb-10">
                  {[1, 2, 3, 4, 5, 6].map((step) => (
                    <div 
                      key={step}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        currentStep >= step ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-[#1e293b]'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-6 w-full">
                  
                  {/* Step 1: Personal Details */}
                  {currentStep === 1 && (
                    <div className="flex flex-col gap-6 animate-fadeIn">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Let us know more about you.</h2>
                        <p className="text-sm text-[#94a3b8]">Enter your primary contact details and a strong professional summary to get started.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">First Name *</label>
                          <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} placeholder="John" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Last Name *</label>
                          <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Doe" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Email Address *</label>
                          <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="johndoe@email.com" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Phone Number</label>
                          <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="+1 234 567 8900" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Location</label>
                          <input type="text" name="location" value={profile.location} onChange={handleChange} placeholder="San Francisco, CA" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Portfolio URL</label>
                          <input type="text" name="portfolioUrl" value={profile.portfolioUrl} onChange={handleChange} placeholder="johndoe.dev" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Professional Summary</label>
                        <textarea name="summary" value={profile.summary} onChange={handleChange} rows={4} placeholder="Creative and detail-oriented Software Engineer with 3+ years of experience building scalable web applications..." className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155] resize-none"></textarea>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Work Experience */}
                  {currentStep === 2 && (
                    <div className="flex flex-col gap-6 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <h2 className="text-3xl font-bold text-white tracking-tight">Professional Experience</h2>
                          <p className="text-sm text-[#94a3b8]">Add your past roles, highlighting achievements and impact.</p>
                        </div>
                        <button onClick={addExperience} className="text-sm px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-all font-semibold">
                          + Add Role
                        </button>
                      </div>
                      
                      <div className="flex flex-col gap-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                        {profile.experience.map((exp, idx) => (
                          <div key={idx} className="border border-[#1e293b] rounded-xl p-5 flex flex-col gap-5 bg-[#0b0f19]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Company</label>
                                <input type="text" value={exp.company} onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)} placeholder="Google" className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-[#334155]" />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Role / Title</label>
                                <input type="text" value={exp.role} onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)} placeholder="Senior Software Engineer" className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-[#334155]" />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Location</label>
                                <input type="text" value={exp.location} onChange={(e) => handleExperienceChange(idx, 'location', e.target.value)} placeholder="Remote" className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-[#334155]" />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Start Date</label>
                                <input type="text" value={exp.startDate} onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)} placeholder="Jan 2021" className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-[#334155]" />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">End Date</label>
                                <input type="text" value={exp.endDate} onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)} placeholder="Present" className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-[#334155]" />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Achievements / Bullet Points (Use bullet lists)</label>
                              <textarea value={exp.description} onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)} rows={4} placeholder="• Spearheaded the migration of legacy monolith to microservices...&#10;• Reduced load times by 40%..." className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-[#334155] resize-none"></textarea>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Education */}
                  {currentStep === 3 && (
                    <div className="flex flex-col gap-6 animate-fadeIn">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Academic Background</h2>
                        <p className="text-sm text-[#94a3b8]">Detail your university studies, degrees, and coursework.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">College / University *</label>
                          <input type="text" name="college" value={profile.college} onChange={handleChange} placeholder="Massachusetts Institute of Technology" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Degree *</label>
                          <input type="text" name="degree" value={profile.degree} onChange={handleChange} placeholder="Bachelor of Science" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Major / Specialization</label>
                          <input type="text" name="major" value={profile.major} onChange={handleChange} placeholder="Computer Science" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Graduation Year</label>
                          <input type="text" name="gradYear" value={profile.gradYear} onChange={handleChange} placeholder="2026" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">CGPA / Percentage</label>
                          <input type="text" name="cgpa" value={profile.cgpa} onChange={handleChange} placeholder="3.8 / 4.0" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Relevant Coursework / Honors</label>
                        <input type="text" name="coursework" value={profile.coursework} onChange={handleChange} placeholder="Data Structures, Algorithms, Distributed Systems, Dean's List..." className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Skills */}
                  {currentStep === 4 && (
                    <div className="flex flex-col gap-6 animate-fadeIn">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Technical Skills</h2>
                        <p className="text-sm text-[#94a3b8]">Categorize your tech stack so recruiters can easily parse your capabilities.</p>
                      </div>
                      
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Languages</label>
                          <input type="text" name="languages" value={profile.skills.languages} onChange={handleSkillChange} placeholder="JavaScript, Python, C++, Go, Rust" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Frontend Frameworks & Libs</label>
                          <input type="text" name="frontend" value={profile.skills.frontend} onChange={handleSkillChange} placeholder="React, Next.js, Vue, Tailwind CSS, Three.js" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Backend & Databases</label>
                          <input type="text" name="backend" value={profile.skills.backend} onChange={handleSkillChange} placeholder="Node.js, Express, PostgreSQL, MongoDB, Redis" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Tools & DevOps</label>
                          <input type="text" name="tools" value={profile.skills.tools} onChange={handleSkillChange} placeholder="Git, Docker, AWS, Vercel, Figma" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Projects & Links */}
                  {currentStep === 5 && (
                    <div className="flex flex-col gap-6 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <h2 className="text-3xl font-bold text-white tracking-tight">What have you been building?</h2>
                          <p className="text-sm text-[#94a3b8]">Add notable projects and your GitHub link.</p>
                        </div>
                        <button onClick={addProject} className="text-sm px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-all font-semibold">
                          + Add Project
                        </button>
                      </div>
                      
                      <div className="flex flex-col gap-2 mb-2">
                        <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Primary GitHub URL</label>
                        <input type="text" name="githubUrl" value={profile.githubUrl} onChange={handleChange} placeholder="github.com/johndoe" className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" />
                      </div>

                      <div className="flex flex-col gap-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                        {profile.projects.map((proj, idx) => (
                          <div key={idx} className="border border-[#1e293b] rounded-xl p-5 flex flex-col gap-5 bg-[#0b0f19]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Project Name</label>
                                <input type="text" value={proj.title} onChange={(e) => handleProjectChange(idx, 'title', e.target.value)} placeholder="ApplyJack AI Wizard" className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-[#334155]" />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Tech Stack</label>
                                <input type="text" value={proj.tech} onChange={(e) => handleProjectChange(idx, 'tech', e.target.value)} placeholder="Next.js, Tailwind, OpenAI" className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-[#334155]" />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Live Demo URL</label>
                                <input type="text" value={proj.live} onChange={(e) => handleProjectChange(idx, 'live', e.target.value)} placeholder="applyjack.vercel.app" className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-[#334155]" />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">Description (Bullet points)</label>
                              <textarea value={proj.description} onChange={(e) => handleProjectChange(idx, 'description', e.target.value)} rows={3} placeholder="• Engineered a dynamic multi-step form...&#10;• Integrated automated PDF generation..." className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-[#334155] resize-none"></textarea>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 6: Platforms */}
                  {currentStep === 6 && (
                    <div className="flex flex-col gap-6 animate-fadeIn">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Where are you applying?</h2>
                        <p className="text-sm text-[#94a3b8]">Select the job platforms you use and provide your profile links.</p>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        {['linkedin', 'naukri', 'indeed', 'wellfound', 'glassdoor'].map((platform) => (
                          <div key={platform} className="flex flex-col gap-3 p-4 rounded-xl border border-[#1e293b] bg-[#0b0f19]">
                            <div className="flex items-center gap-3">
                              <input 
                                type="checkbox" 
                                checked={profile.platforms[platform]}
                                onChange={() => handleCheckboxChange(platform)}
                                className="w-5 h-5 accent-indigo-500 cursor-pointer"
                              />
                              <label className="text-sm font-semibold tracking-wider text-white uppercase capitalize">{platform}</label>
                            </div>
                            
                            {profile.platforms[platform] && (
                              <div className="flex flex-col gap-2 pl-8 mt-2 animate-fadeIn">
                                <label className="text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">{platform} Profile URL *</label>
                                <input 
                                  type="text" 
                                  value={profile.platformUrls[platform]} 
                                  onChange={(e) => handleUrlChange(platform, e.target.value)} 
                                  placeholder={`https://${platform}.com/in/yourprofile`} 
                                  className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-[#334155]" 
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#1e293b]">
                <button 
                  onClick={prevStep}
                  className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                    currentStep > 1 
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700' 
                      : 'bg-transparent text-transparent cursor-default pointer-events-none'
                  }`}
                >
                  PREVIOUS
                </button>
                <button 
                  onClick={nextStep}
                  className="px-10 py-3 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-sm tracking-wider transition-all shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  {currentStep === 6 ? 'FINISH & REVEAL' : 'NEXT STEP'}
                </button>
              </div>

            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 10px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}
        @media print {
          body, html {
            margin: 0;
            padding: 0;
            background: white !important;
            height: auto !important;
          }
          /* Hide everything except the resume sheet */
          body * {
            visibility: hidden;
          }
          #resume-preview-sheet, #resume-preview-sheet * {
            visibility: visible;
          }
          #resume-preview-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 10mm !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      </style>
    </div>
  );
}
