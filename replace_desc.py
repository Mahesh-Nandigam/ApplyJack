import pathlib

txt = pathlib.Path('public/about.html').read_text(encoding='utf-8')

# Original blocks
old_top = '<div id="about-who-desc-top"><span class="is-italic">A worldwide team</span><span>of</span><br class="is-desktop"><span>specialists in design,</span><br class="is-desktop"><span>motion, 3D, and technology</span></div>'

old_bottom = '<div id="about-who-desc-bottom"><span>working together to</span><br class="is-mobile"><br class="is-desktop"><span>turn ambitious ideas into</span><br class="is-desktop"><span>immersive digital</span><br class="is-mobile"><span>experiences.</span></div>'

# New blocks
new_top = '<div id="about-who-desc-top"><span class="is-italic">An advanced</span><span> automation engine</span><br class="is-desktop"><span>specialized in sourcing, matching,</span><br class="is-desktop"><span>and executing applications</span></div>'

new_bottom = '<div id="about-who-desc-bottom"><span>operating seamlessly to</span><br class="is-mobile"><br class="is-desktop"><span>turn exhausting manual job boards into</span><br class="is-desktop"><span>instant career</span><br class="is-mobile"><span>opportunities.</span></div>'

if old_top in txt:
    txt = txt.replace(old_top, new_top)
    print("Replaced top successfully")
else:
    print("Old top not found")

if old_bottom in txt:
    txt = txt.replace(old_bottom, new_bottom)
    print("Replaced bottom successfully")
else:
    print("Old bottom not found")

pathlib.Path('public/about.html').write_text(txt, encoding='utf-8')
