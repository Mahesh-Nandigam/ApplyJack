import pathlib

txt = pathlib.Path('src/app/builder/page.js').read_text(encoding='utf-8')

old_btn = '''                <button 
                  onClick={resetForm}
                  className="w-full h-11 rounded-lg bg-[#1e293b] hover:bg-zinc-800 border border-zinc-800 font-semibold transition-all text-sm"
                >'''

new_btn = '''                <button 
                  onClick={() => window.location.href='/dashboard'}
                  className="w-full h-11 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-[#27272a] text-white font-semibold transition-all text-sm"
                >
                  GO TO DASHBOARD
                </button>
                <button 
                  onClick={resetForm}
                  className="w-full h-11 rounded-lg bg-transparent border-2 border-[#27272a] text-zinc-400 font-semibold transition-all text-sm hover:text-white"
                >'''

txt = txt.replace(old_btn, new_btn)

pathlib.Path('src/app/builder/page.js').write_text(txt, encoding='utf-8')
