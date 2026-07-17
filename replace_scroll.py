import pathlib

file_path = 'public/about.html'
path = pathlib.Path(file_path)

if path.exists():
    txt = path.read_text(encoding='utf-8')
    txt = txt.replace('CONTINUE TO SCROLL', 'INSPECT ELEMENT')
    path.write_text(txt, encoding='utf-8')
    print("Replaced 'CONTINUE TO SCROLL' with 'INSPECT ELEMENT'")
else:
    print("File not found")
