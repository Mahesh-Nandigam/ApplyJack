import pathlib
import sys

p = pathlib.Path('src/app/builder/page.js')
txt = p.read_text(encoding='utf-8')

# 1. Update validateStep
old_validate = """    } else if (currentStep === 5) {
      triggerStepPopup('Projects and Links verified.');
    }
    return true;"""
new_validate = """    } else if (currentStep === 5) {
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
    return true;"""
txt = txt.replace(old_validate, new_validate)

# 2. Update nextStep
old_next = """  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
      } else if (currentStep === 5) {
        handleSubmit();
      }
    }
  };"""
new_next = """  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
      } else if (currentStep === 6) {
        handleSubmit();
      }
    }
  };"""
txt = txt.replace(old_next, new_next)

# 3. Update handleSubmit
old_submit = """  const handleSubmit = () => {
    triggerStepPopup('Compiling Master Resume...');
    // A small delay to simulate processing before revealing the resume
    setTimeout(() => {
      setCurrentStep(6);
    }, 800);
  };"""
new_submit = """  const handleSubmit = () => {
    triggerStepPopup('Compiling Master Resume...');
    // A small delay to simulate processing before revealing the resume
    setTimeout(() => {
      setCurrentStep(7);
    }, 800);
  };"""
txt = txt.replace(old_submit, new_submit)

# 4. Header UI Step Tracker
old_header_step = """          {currentStep < 6 && (
            <div className="hidden md:flex text-xs font-mono text-zinc-500 tracking-wider">
              STEP {currentStep} OF 5
            </div>
          )}"""
new_header_step = """          {currentStep < 7 && (
            <div className="hidden md:flex text-xs font-mono text-zinc-500 tracking-wider">
              STEP {currentStep} OF 6
            </div>
          )}"""
txt = txt.replace(old_header_step, new_header_step)

# 5. Final Reveal Step Check
old_reveal = """        {currentStep === 6 ? ("""
new_reveal = """        {currentStep === 7 ? ("""
txt = txt.replace(old_reveal, new_reveal)

# 6. Step Indicators
old_indicators = """                <div className="flex items-center gap-2 mb-10">
                  {[1, 2, 3, 4, 5].map((step) => ("""
new_indicators = """                <div className="flex items-center gap-2 mb-10">
                  {[1, 2, 3, 4, 5, 6].map((step) => ("""
txt = txt.replace(old_indicators, new_indicators)

# 7. Next Step button logic
old_next_btn = """                >
                  {currentStep === 5 ? 'FINISH & REVEAL' : 'NEXT STEP'}
                </button>"""
new_next_btn = """                >
                  {currentStep === 6 ? 'FINISH & REVEAL' : 'NEXT STEP'}
                </button>"""
txt = txt.replace(old_next_btn, new_next_btn)

# 8. Add Step 6 UI
old_step_5_end = """                      </div>
                    </div>
                  )}

                </div>
              </div>"""

step_6_ui = """                      </div>
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
              </div>"""
txt = txt.replace(old_step_5_end, step_6_ui)

p.write_text(txt, encoding='utf-8')
print("Successfully patched page.js")
