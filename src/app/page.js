"use client";

import React, { useState } from "react";

export default function Home() {
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
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#e2e8f0] font-sans flex flex-col relative">
      
      {/* Toast Notification */}
      {showPopup && (
        <div className="fixed top-6 right-6 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-xl border border-indigo-500/30 z-50 font-medium text-sm transition-all duration-300">
          {popupMessage}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-[#1e293b] bg-[#0f172a] py-4 px-8 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white">ApplyJack Dashboard</span>
          <span className="text-xs bg-[#1e293b] text-[#94a3b8] px-2.5 py-0.5 rounded-full font-mono">Profile Builder</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-emerald-400 font-medium font-mono">Autopilot Connected</span>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 flex flex-col h-[calc(100vh-57px)] overflow-hidden">
        
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

      </main>
    </div>
  );
}
