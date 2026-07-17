import pathlib

txt = pathlib.Path('public/about.html').read_text(encoding='utf-8')
idx = txt.find('id="end-bottom"')
if idx != -1:
    print(txt[max(0, idx-20):idx+100])
else:
    print("Not found")
