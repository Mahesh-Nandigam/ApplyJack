import pathlib
import re

txt = pathlib.Path('src/app/builder/page.js').read_text(encoding='utf-8')

# Global Theme
txt = txt.replace('bg-[#0b0f19]', 'bg-[#09090b]')
txt = txt.replace('bg-[#080b12]', 'bg-[#09090b]')
txt = txt.replace('text-[#e2e8f0]', 'text-zinc-50')
txt = txt.replace('text-[#94a3b8]', 'text-zinc-400')
txt = txt.replace('text-[#64748b]', 'text-zinc-500')
txt = txt.replace('border-[#1e293b]', 'border-[#27272a]')

# Form Inputs
old_input = 'bg-[#09090b] border border-[#27272a] rounded focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none text-zinc-50 px-3 py-2 text-sm transition-all'
new_input = 'bg-transparent border border-[#27272a] rounded-lg focus:border-white focus:ring-0 outline-none text-zinc-50 px-4 py-3 text-sm transition-all placeholder-zinc-500'

# Need to replace variations of input classes. Let's use regex for safer replacement.
txt = re.sub(
    r'w-full bg-\[\#09090b\] border border-\[\#27272a\] rounded focus:border-\[\#38bdf8\] focus:ring-1 focus:ring-\[\#38bdf8\] outline-none text-zinc-50 px-3 py-2 text-sm transition-all(\w*)',
    r'w-full bg-transparent border border-[#27272a] rounded-lg focus:border-zinc-500 focus:ring-0 outline-none text-zinc-50 px-4 py-3 text-sm transition-all placeholder-zinc-500\1',
    txt
)

txt = re.sub(
    r'w-full bg-white border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-gray-900 px-3 py-2 text-sm transition-all',
    r'w-full bg-transparent border border-[#27272a] rounded-lg focus:border-zinc-500 focus:ring-0 outline-none text-zinc-50 px-4 py-3 text-sm transition-all placeholder-zinc-500',
    txt
)


# Revert bg back to transparent in general inputs
txt = txt.replace('bg-[#09090b] border border-[#27272a] rounded focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none text-zinc-50 px-3 py-2 text-sm transition-all', 
                 'bg-transparent border border-[#27272a] rounded-lg focus:border-zinc-500 focus:ring-0 outline-none text-zinc-50 px-4 py-3 text-sm transition-all placeholder-zinc-500')


# Textareas
txt = txt.replace('min-h-[100px] bg-[#09090b] border border-[#27272a] rounded focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] outline-none text-zinc-50 px-3 py-2 text-sm transition-all',
                  'min-h-[120px] bg-transparent border border-[#27272a] rounded-lg focus:border-zinc-500 focus:ring-0 outline-none text-zinc-50 px-4 py-3 text-sm transition-all placeholder-zinc-500')

# Labels
txt = txt.replace('text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block', 'text-sm font-medium text-white mb-2 block')
txt = txt.replace('text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block', 'text-sm font-medium text-white mb-2 block')

# Asterisk for required
# The user wants red asterisks on labels, let's append <span className="text-red-500 ml-1">*</span> to standard labels (like First Name, Email, etc.)
# It's easier to just do it via regex
txt = re.sub(
    r'(<label className="text-sm font-medium text-white mb-2 block">)(First Name|Last Name|Email address|College/University Name|Degree|Company Name|Role/Title|Skill Categories|Username)',
    r'\1\2<span className="text-red-500 ml-1">*</span>',
    txt
)

# Checkboxes / Cards
txt = txt.replace('bg-[#0f172a] border border-[#27272a] p-4 rounded cursor-pointer transition-all hover:border-[#38bdf8]', 'bg-transparent border border-[#27272a] p-5 rounded-xl cursor-pointer transition-all hover:border-zinc-600')
txt = txt.replace('text-sm font-medium text-white block mb-1', 'text-base font-medium text-white block mb-1')

# Buttons
txt = txt.replace('w-full bg-[#38bdf8] text-[#0f172a] font-bold uppercase tracking-wider text-xs px-6 py-4 rounded hover:bg-[#7dd3fc] transition-all', 'w-full bg-white text-black font-semibold text-sm px-6 py-3 rounded-lg hover:bg-zinc-200 transition-all')
txt = txt.replace('w-full bg-indigo-600 text-white font-bold uppercase tracking-wider text-xs px-6 py-4 rounded hover:bg-indigo-700 transition-all', 'w-full bg-white text-black font-semibold text-sm px-6 py-3 rounded-lg hover:bg-zinc-200 transition-all')

txt = txt.replace('w-full bg-transparent border-2 border-[#27272a] text-zinc-400 font-bold uppercase tracking-wider text-xs px-6 py-4 rounded hover:bg-[#27272a] hover:text-white transition-all', 'w-full bg-transparent text-zinc-400 font-semibold text-sm px-6 py-3 rounded-lg hover:text-white transition-all')
txt = txt.replace('w-full bg-transparent border-2 border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-xs px-6 py-4 rounded hover:bg-gray-50 hover:text-gray-700 transition-all', 'w-full bg-transparent text-zinc-400 font-semibold text-sm px-6 py-3 rounded-lg hover:text-white transition-all')

# Titles
txt = txt.replace('text-xl font-bold text-white mb-6', 'text-2xl font-semibold text-white mb-2')
txt = txt.replace('text-gray-900', 'text-white')
txt = txt.replace('text-gray-500', 'text-zinc-400')
txt = txt.replace('text-indigo-600', 'text-zinc-500')
txt = txt.replace('border-indigo-500', 'border-zinc-500')
txt = txt.replace('bg-indigo-50', 'bg-zinc-900')
txt = txt.replace('bg-[#0f172a]', 'bg-[#09090b]')

pathlib.Path('src/app/builder/page.js').write_text(txt, encoding='utf-8')
print("Successfully processed page.js")
