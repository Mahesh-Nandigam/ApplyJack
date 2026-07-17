import pathlib

p = pathlib.Path('public/about.html')
txt = p.read_text(encoding='utf-8')

# Fix Left-1
txt = txt.replace('<div id="about-who-title-left-1"></div>', '<div id="about-who-title-left-1">WE BYPASS</div>')
# Fix Left-3
txt = txt.replace('<div id="about-who-title-left-3">WE BYPASS</div>', '<div id="about-who-title-left-3">YOUR MANUAL</div>')
# Fix Left-4
txt = txt.replace('<div id="about-who-title-left-4"><span>YOUR MANUAL </span><span>EFFORTS</span></div>', '<div id="about-who-title-left-4"><span>EFFORTS</span></div>')

p.write_text(txt, encoding='utf-8')
print("Successfully fixed structural text overflow")
