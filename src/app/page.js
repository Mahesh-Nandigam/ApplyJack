"use client";

import React, { useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // State for all profile data
  const [profile, setProfile] = useState({
    firstName: "Shaurya",
    lastName: "Singh",
    email: "shaurya.singh@gmail.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    college: "Indian Institute of Technology",
    degree: "Bachelor of Technology",
    major: "Computer Science and Engineering",
    gradYear: "2026",
    cgpa: "8.9",
    skills: "React, Next.js, Node.js, Express, JavaScript, Python, PostgreSQL, REST APIs",
    experience: [
      {
        company: "TechSolutions Inc.",
        role: "Software Engineering Intern",
        duration: "May 2025 - July 2025",
        description: "Optimized database query performance by 40% using indexing and query refactoring. Built scalable REST API endpoints using Express and PostgreSQL to handle 50k monthly requests."
      }
    ],
    projects: [
      {
        title: "ApplyJack - Job Application Autopilot",
        tech: "Next.js, Node.js, Supabase, Gemini API",
        description: "Designed a Chrome extension that scrapes job descriptions and tailors resume bullet points to bypass ATS filters, reducing application time by 80%."
      }
    ],
    extracurricular: "Core Member of College Coding Club, Winner of State-level Hackathon 2024",
    platforms: {
      naukri: true,
      linkedin: true,
      indeed: false,
      glassdoor: false,
      wellfound: false
    }
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that at least one platform is selected
    const selectedPlatforms = Object.values(profile.platforms).filter(v => v);
    if (selectedPlatforms.length === 0) {
      setPlatformError("Please select at least one job platform to initialize your profile.");
      return;
    }
    
    setPlatformError("");
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#e2e8f0] font-sans flex flex-col">
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
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-57px)] overflow-hidden">
        
        {/* Left Side: Onboarding Wizard */}
        <section className="w-full lg:w-1/2 p-8 overflow-y-auto border-r border-[#1e293b] flex flex-col justify-between">
          <div>
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4, 5].map((step) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`flex-1 text-center py-2 border-b-2 font-mono text-sm font-semibold transition-all ${
                    currentStep === step 
                      ? "border-indigo-500 text-white" 
                      : "border-[#1e293b] text-[#64748b] hover:text-[#94a3b8]"
                  }`}
                >
                  Step {step}
                </button>
              ))}
            </div>

            {formSubmitted ? (
              <div className="bg-[#101b33] border border-indigo-500/30 rounded-xl p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-white">Master Resume Generated Successfully</h2>
                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  Your master profile has been initialized. ApplyJack has compiled your data into a structured format and saved it as <span className="font-mono text-white">shaurya_singh.pdf</span> on the server database.
                </p>
                <div className="border-t border-[#1e293b] pt-4 mt-2">
                  <span className="text-xs text-[#64748b] uppercase tracking-wider font-semibold block mb-2">Connected Platforms</span>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(profile.platforms).map(([platform, enabled]) => (
                      enabled && (
                        <span key={platform} className="bg-indigo-950 border border-indigo-800/30 px-3 py-1 rounded-full text-xs text-indigo-400 capitalize font-mono">
                          {platform}
                        </span>
                      )
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 font-semibold transition-all text-sm"
                >
                  Edit Profile Data
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                  <div className="flex flex-col gap-5">
                    <h2 className="text-lg font-semibold text-white">Personal Contact Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#94a3b8]">First Name</label>
                        <input 
                          type="text" name="firstName" value={profile.firstName} onChange={handleChange}
                          className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#94a3b8]">Last Name</label>
                        <input 
                          type="text" name="lastName" value={profile.lastName} onChange={handleChange}
                          className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#94a3b8]">Email Address</label>
                      <input 
                        type="email" name="email" value={profile.email} onChange={handleChange}
                        className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#94a3b8]">Phone Number</label>
                        <input 
                          type="text" name="phone" value={profile.phone} onChange={handleChange}
                          className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#94a3b8]">Location</label>
                        <input 
                          type="text" name="location" value={profile.location} onChange={handleChange}
                          className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Education */}
                {currentStep === 2 && (
                  <div className="flex flex-col gap-5">
                    <h2 className="text-lg font-semibold text-white">Academic Qualifications</h2>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#94a3b8]">College Name</label>
                      <input 
                        type="text" name="college" value={profile.college} onChange={handleChange}
                        className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#94a3b8]">Degree / Course</label>
                      <input 
                        type="text" name="degree" value={profile.degree} onChange={handleChange}
                        className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#94a3b8]">Major / Stream</label>
                      <input 
                        type="text" name="major" value={profile.major} onChange={handleChange}
                        className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#94a3b8]">Graduation Year</label>
                        <input 
                          type="text" name="gradYear" value={profile.gradYear} onChange={handleChange}
                          className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-[#94a3b8]">CGPA / Percentage</label>
                        <input 
                          type="text" name="cgpa" value={profile.cgpa} onChange={handleChange}
                          className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Work Experience */}
                {currentStep === 3 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-white">Work Experience</h2>
                      <button 
                        type="button" onClick={addExperience}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                      >
                        Add Position
                      </button>
                    </div>
                    {profile.experience.map((exp, idx) => (
                      <div key={idx} className="border border-[#1e293b] rounded-xl p-4 flex flex-col gap-4 bg-[#0f172a]/40">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#94a3b8]">Company</label>
                            <input 
                              type="text" value={exp.company} onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                              className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[#94a3b8]">Role</label>
                            <input 
                              type="text" value={exp.role} onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                              className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[#94a3b8]">Duration</label>
                          <input 
                            type="text" value={exp.duration} onChange={(e) => handleExperienceChange(idx, "duration", e.target.value)}
                            className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[#94a3b8]">Description</label>
                          <textarea 
                            rows="4" value={exp.description} onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
                            className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 4: Projects */}
                {currentStep === 4 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-white">Projects</h2>
                      <button 
                        type="button" onClick={addProject}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                      >
                        Add Project
                      </button>
                    </div>
                    {profile.projects.map((proj, idx) => (
                      <div key={idx} className="border border-[#1e293b] rounded-xl p-4 flex flex-col gap-4 bg-[#0f172a]/40">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[#94a3b8]">Project Title</label>
                          <input 
                            type="text" value={proj.title} onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                            className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[#94a3b8]">Technologies Used</label>
                          <input 
                            type="text" value={proj.tech} onChange={(e) => handleProjectChange(idx, "tech", e.target.value)}
                            className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[#94a3b8]">Project Description</label>
                          <textarea 
                            rows="4" value={proj.description} onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                            className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#94a3b8]">Extra-curricular / Achievements</label>
                      <textarea 
                        rows="3" name="extracurricular" value={profile.extracurricular} onChange={handleChange}
                        className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 5: Skills & Platforms */}
                {currentStep === 5 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                      <h2 className="text-lg font-semibold text-white">Technical Skills</h2>
                      <label className="text-xs text-[#94a3b8] mb-1">Comma-separated list of skills</label>
                      <input 
                        type="text" name="skills" value={profile.skills} onChange={handleChange}
                        className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div className="border-t border-[#1e293b] pt-5">
                      <h2 className="text-lg font-semibold text-white mb-2">Connected Platforms</h2>
                      <p className="text-xs text-[#94a3b8] mb-4">
                        Select at least one job platform where you want ApplyJack to scan notifications and auto-apply:
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {Object.keys(profile.platforms).map((platform) => (
                          <label 
                            key={platform} 
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer select-none transition-all ${
                              profile.platforms[platform] 
                                ? "bg-indigo-950/20 border-indigo-500/50 text-white" 
                                : "bg-[#0f172a]/20 border-[#1e293b] text-[#94a3b8] hover:border-zinc-800"
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              checked={profile.platforms[platform]}
                              onChange={() => handleCheckboxChange(platform)}
                              className="w-4 h-4 accent-indigo-500 rounded"
                            />
                            <span className="text-sm font-medium capitalize font-mono">{platform}</span>
                          </label>
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
            )}
          </div>

          {/* Navigation Controls */}
          {!formSubmitted && (
            <div className="flex items-center justify-between border-t border-[#1e293b] pt-6 mt-8">
              <button 
                type="button" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 py-2 text-sm text-[#94a3b8] hover:text-white disabled:opacity-30 transition-all"
              >
                Previous Step
              </button>
              <button 
                type="button" 
                onClick={nextStep}
                disabled={currentStep === 5}
                className="px-6 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-sm font-medium disabled:opacity-30 transition-all text-white"
              >
                Next Step
              </button>
            </div>
          )}
        </section>

        {/* Right Side: Real-Time Print-Style Resume Preview */}
        <section className="w-full lg:w-1/2 bg-[#080b12] p-8 overflow-y-auto flex items-start justify-center">
          <div className="w-full max-w-[595px] aspect-[1/1.414] bg-white text-black p-10 shadow-2xl rounded-sm flex flex-col justify-between select-none">
            
            {/* Header Details */}
            <div>
              <div className="flex flex-col items-center text-center border-b border-zinc-300 pb-5 mb-5">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                  {profile.firstName || "First"} {profile.lastName || "Last"}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-xs text-zinc-600 font-mono">
                  <span>{profile.email || "email@address.com"}</span>
                  <span>|</span>
                  <span>{profile.phone || "+91 XXXXX XXXXX"}</span>
                  <span>|</span>
                  <span>{profile.location || "City, Country"}</span>
                </div>
              </div>

              {/* Education section */}
              <div className="flex flex-col gap-2.5 mb-5">
                <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">Education</h3>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start text-xs font-semibold text-zinc-900">
                    <span>{profile.college || "University / College Name"}</span>
                    <span className="font-mono text-zinc-600">{profile.gradYear || "Year"}</span>
                  </div>
                  <div className="flex justify-between items-start text-[11px] text-zinc-600 italic">
                    <span>{profile.degree} - {profile.major}</span>
                    <span className="font-mono not-italic text-zinc-500">CGPA: {profile.cgpa}</span>
                  </div>
                </div>
              </div>

              {/* Skills section */}
              <div className="flex flex-col gap-2.5 mb-5">
                <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">Skills</h3>
                <p className="text-[11px] text-zinc-700 leading-relaxed">
                  {profile.skills || "Add your technical capabilities here."}
                </p>
              </div>

              {/* Experience section */}
              <div className="flex flex-col gap-2.5 mb-5">
                <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">Experience</h3>
                <div className="flex flex-col gap-3">
                  {profile.experience.map((exp, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between items-start text-xs font-semibold text-zinc-900">
                        <span>{exp.role || "Job Title"} @ {exp.company || "Company"}</span>
                        <span className="font-mono text-zinc-600">{exp.duration}</span>
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-relaxed font-sans">
                        {exp.description || "Describe your accomplishments and the metrics you achieved."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects section */}
              <div className="flex flex-col gap-2.5 mb-5">
                <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">Projects</h3>
                <div className="flex flex-col gap-3">
                  {profile.projects.map((proj, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between items-start text-xs font-semibold text-zinc-900">
                        <span>{proj.title || "Project Title"}</span>
                        <span className="font-mono text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                          {proj.tech}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-relaxed font-sans">
                        {proj.description || "Describe what you built and how it was structured."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra-curricular */}
              {profile.extracurricular && (
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-800 border-b border-zinc-200 pb-1">Achievements</h3>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
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
        </section>

      </main>
    </div>
  );
}
