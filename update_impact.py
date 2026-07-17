import pathlib
import re

file_path = 'public/about.html'
txt = pathlib.Path(file_path).read_text(encoding='utf-8')

# 1. Background Hover Text
# Replace the huge SVG path
svg_start = txt.find('<svg id="about-award-title"')
svg_end = txt.find('</svg>', svg_start) + 6
if svg_start != -1 and svg_end != -1:
    new_svg = '''<svg id="about-award-title" viewBox="0 0 1440 1250" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: rgba(255,255,255,0.05);">
<g font-size="340" font-weight="900" font-family="inherit" fill="none" stroke="currentColor" stroke-width="1.5" letter-spacing="-5">
  <text x="40" y="320">MULTI</text>
  <text x="40" y="700">AUTOMATING</text>
  <text x="40" y="1080">HIRING</text>
</g>
</svg>'''
    txt = txt[:svg_start] + new_svg + txt[svg_end:]

# 2. Main Heading & Total
txt = txt.replace('>Awards</h5>', '>IMPACT</h5>')
txt = txt.replace('>58</p>', '>98</p>')

# 3. Data Table

replacements = [
    # Group 1
    ('>Awwwards<', '>LinkedIn<'),
    ('>001</p> <p class="about-award-item-wrapper-text">Site of the Year<', '>500</p> <p class="about-award-item-wrapper-text">Auto-Applied Roles<'),
    ('>001</p> <p class="about-award-item-wrapper-text">Developer Site of the Year<', '>150</p> <p class="about-award-item-wrapper-text">Recruiter Profile Views<'),
    ('>001</p> <p class="about-award-item-wrapper-text">Site of the Month<', '>045</p> <p class="about-award-item-wrapper-text">Initial Screenings<'),
    ('>010</p> <p class="about-award-item-wrapper-text">Site of the Day<', '>012</p> <p class="about-award-item-wrapper-text">Final Round Interviews<'),
    ('>016</p> <p class="about-award-item-wrapper-text">Honorable Mention<', '>003</p> <p class="about-award-item-wrapper-text">Offers Received<'),
    
    # Group 2
    ('>FWA<', '>Indeed<'),
    ('>001</p> <p class="about-award-item-wrapper-text">Site of the Year<', '>800</p> <p class="about-award-item-wrapper-text">Easy Apply Submissions<'),
    ('>002</p> <p class="about-award-item-wrapper-text">Site of the Month<', '>120</p> <p class="about-award-item-wrapper-text">Employer Responses<'),
    ('>017</p> <p class="about-award-item-wrapper-text">Site of the Day<', '>015</p> <p class="about-award-item-wrapper-text">Assessment Invites<'),

    # Group 3
    ('>CSSDA<', '>Wellfound<'),
    ('>001</p> <p class="about-award-item-wrapper-text">Site of the Year<', '>300</p> <p class="about-award-item-wrapper-text">Startup Applications<'),
    ('>001</p> <p class="about-award-item-wrapper-text">Agency Site of the Year<', '>025</p> <p class="about-award-item-wrapper-text">Founder Matches<'),

    # Group 4
    ('>Webby Awards<', '>Cold Outreach<'),
    ('>002</p> <p class="about-award-item-wrapper-text">Webby Winner<', '>100</p> <p class="about-award-item-wrapper-text">Automated Emails Sent<'),
    ('>002</p> <p class="about-award-item-wrapper-text">Webby Nominee<', '>040</p> <p class="about-award-item-wrapper-text">Positive Replies<'),

    # Group 5
    ('>Lovie Awards<', '>Optimization<'),
    ('>001</p> <p class="about-award-item-wrapper-text">Lovie Winner<', '>98%</p> <p class="about-award-item-wrapper-text">ATS Resume Match Rate<'),

    # Group 6
    ('>Drum Awards<', '>Time Saved<'),
    ('>001</p> <p class="about-award-item-wrapper-text">The Drum Awards for Design<', '>120</p> <p class="about-award-item-wrapper-text">Hours of Manual Work Reclaimed<'),

    # Group 7
    ('>CommArts<', '>Execution Speed<'),
    ('>001</p> <p class="about-award-item-wrapper-text">Best-in-show Interactive<', '>0.5</p> <p class="about-award-item-wrapper-text">Seconds per Application<'),
]

for old_t, new_t in replacements:
    txt = txt.replace(old_t, new_t)

pathlib.Path(file_path).write_text(txt, encoding='utf-8')
print("Impact section updated successfully.")
