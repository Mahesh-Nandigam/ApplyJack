import pathlib

file_path = 'public/about.html'
path = pathlib.Path(file_path)
txt = path.read_text(encoding='utf-8')

# Let's replace the div with an onclick handler
old_str = '<div id="end-bottom">'
new_str = '<div id="end-bottom" onclick="window.location.href=\'/builder\'" style="cursor: pointer;">'

txt = txt.replace(old_str, new_str)
path.write_text(txt, encoding='utf-8')
print("Added onclick to end-bottom div")
