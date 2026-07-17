import pathlib
import re
txt = pathlib.Path('public/_astro/hoisted.CUO_IjfL.js').read_text(encoding='utf-8')
for match in re.finditer(r'[\'"`]/assets/.*?[\'"`]', txt):
    print(match.group(0))
