import pathlib
txt = pathlib.Path('public/about.html').read_text(encoding='utf-8')
old_btn = 'margin-left: 10px; pointer-events: auto; z-index: 100;">\n  ENTER WIZARD\n</button>'
new_btn = 'margin-left: 10px; pointer-events: auto; z-index: 100;" onclick="window.location.href=\'/builder\'">\n  ENTER WIZARD\n</button>'
if old_btn in txt:
    txt = txt.replace(old_btn, new_btn)
    pathlib.Path('public/about.html').write_text(txt, encoding='utf-8')
    print('Updated about.html')
else:
    print('Could not find exact button string')
