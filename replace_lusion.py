import pathlib
import re

files_to_check = [
    'src/app/dashboard/page.js',
    'src/app/builder/page.js',
    'public/about.html'
]

for file_path in files_to_check:
    path = pathlib.Path(file_path)
    if not path.exists(): continue
    
    txt = path.read_text(encoding='utf-8')
    
    # Replace LUSION with APPLY JACK
    txt = txt.replace('LUSION', 'APPLY JACK')
    
    # Replace Lusion with Apply Jack ONLY if it's not part of lusion.co or similar URL
    # We can use regex with negative lookahead to ignore .co
    txt = re.sub(r'Lusion(?!\.co)', 'Apply Jack', txt)
    
    # Also replace lusion.co emails if they are visible text or mailto
    txt = txt.replace('hello@lusion.co', 'hello@applyjack.com')
    txt = txt.replace('business@lusion.co', 'business@applyjack.com')
    txt = txt.replace('labs.lusion.co', 'labs.applyjack.com')
    
    path.write_text(txt, encoding='utf-8')
    print(f"Processed {file_path}")

print("Replacements complete.")
