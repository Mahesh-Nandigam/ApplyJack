import pathlib
import json
import os

# 1. Update TEAM -> ASPRINTS
txt = pathlib.Path('public/about.html').read_text(encoding='utf-8')
svg = '<svg id="about-who-team-title" xmlns="http://www.w3.org/2000/svg" width="311" height="56" fill="none" viewBox="0 0 311 56"><path fill="#fff" d="M0 0h43.28v6.4H25.12V56h-6.96V6.4H0V0Zm85.906 0h35.68v6.4h-28.72v17.92h23.92v6.4h-23.92V49.6h29.76V56h-36.72V0Zm75.171 56 21.36-56h8.24l21.28 56h-7.44l-5.92-15.12h-24.4L168.277 56h-7.2Zm15.2-21.44h20.24L186.357 7.6l-10.08 26.96ZM253.493 0h8.8l19.84 46.48L301.733 0h8.64v56h-6.8V11.84L285.013 56h-6.16l-18.56-44.16V56h-6.8V0Z"></path></svg>'
new_html = '<div id="about-who-team-title" style="display: flex; justify-content: space-between; align-items: center; width: 311px; max-width: 100%; height: 56px; font-size: 50px; font-weight: 500; font-family: inherit; color: #fff;"><span>A</span><span>S</span><span>P</span><span>R</span><span>I</span><span>N</span><span>T</span><span>S</span></div>'

if svg in txt:
    txt = txt.replace(svg, new_html)
    pathlib.Path('public/about.html').write_text(txt, encoding='utf-8')
    print('Updated TEAM svg to ASPRINTS')
else:
    print('SVG not found in about.html')

# 2. Create the team.json file locally to intercept proxy
os.makedirs('public/assets/team', exist_ok=True)
data = [
  {
    "id": "edan",
    "name": "Edan Kwan",
    "role": "AUTOMATION ENGINEER"
  },
  {
    "id": "ffi",
    "name": "Ffion Morgan",
    "role": "SYSTEMS ARCHITECT"
  },
  {
    "id": "pierre",
    "name": "Pierre Nottin",
    "role": "DEPLOYMENT LEAD"
  },
  {
    "id": "yannic",
    "name": "Yannic Laurenz",
    "role": "ALGORITHM SPECIALIST"
  },
  {
    "id": "paul",
    "name": "Paul Catoera",
    "role": "INTEGRATION EXPERT"
  },
  {
    "id": "andrii",
    "name": "Andrii Ovsiannikov",
    "role": "DATA SCIENTIST"
  },
  {
    "id": "sunny",
    "name": "Sunny",
    "role": "EXECUTIVE AI OVERLORD"
  }
]
pathlib.Path('public/assets/team/team.json').write_text(json.dumps(data, indent=2), encoding='utf-8')
print('Created public/assets/team/team.json')
