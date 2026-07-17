import pathlib
txt = pathlib.Path('public/about.html').read_text(encoding='utf-8')
idx = txt.find('id="about-who-title-left"')
print(txt[max(0, idx-50):idx+500])
