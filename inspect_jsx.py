import pathlib
txt = pathlib.Path('src/app/builder/page.js').read_text(encoding='utf-8')
idx = txt.find('return (')
print(txt[max(0, idx-100):idx+2500])
