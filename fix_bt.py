import pathlib
txt = pathlib.Path('src/app/builder/page.js').read_text(encoding='utf-8')
idx = txt.find('@media print {')
if idx != -1:
    before = txt[:idx]
    after = txt[idx:]
    # Remove any backticks from the last 20 characters of before
    if '`' in before[-20:]:
        before = before[:-20] + before[-20:].replace('`', '')
        txt = before + after
    if '`}</style>' not in txt and '</style>' in txt:
        txt = txt.replace('</style>', '`}</style>')
pathlib.Path('src/app/builder/page.js').write_text(txt, encoding='utf-8')
print('Fixed!')
