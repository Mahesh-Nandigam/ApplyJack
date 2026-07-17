import pathlib

txt = pathlib.Path('public/about.html').read_text(encoding='utf-8')

replacements = [
    # Address Block
    (
        '<div class="footer-address-line">Suite 2</div> <div class="footer-address-line">9 Marsh Street</div> <div class="footer-address-line">Bristol, BS1 4AA</div> <div class="footer-address-line">United Kingdom</div>',
        '<div class="footer-address-line">Team SHAURYA Labs</div> <div class="footer-address-line">Cloud Infrastructure</div> <div class="footer-address-line">Global Deployment</div> <div class="footer-address-line">Active 24/7</div>'
    ),
    
    # Social Links (Instagram -> GitHub)
    (
        '<span class="footer-socials-text">Instagram</span>',
        '<span class="footer-socials-text">GitHub</span>'
    ),
    
    # Contact Emails
    (
        '<div id="footer-enquires-header">General enquires</div> <a id="footer-enquires-link" href="mailto:hello@lusion.co">hello@lusion.co</a>',
        '<div id="footer-enquires-header">User Support</div> <a id="footer-enquires-link" href="mailto:support@applyjack.com">support@applyjack.com</a>'
    ),
    (
        '<div id="footer-business-header">New business</div> <a id="footer-business-link" href="mailto:business@lusion.co">business@lusion.co</a>',
        '<div id="footer-business-header">Partnerships</div> <a id="footer-business-link" href="mailto:connect@applyjack.com">connect@applyjack.com</a>'
    ),
    
    # Newsletter Heading
    (
        '<span class="footer-newsletter-line">Subscribe to</span> <span class="footer-newsletter-line">our newsletter</span>',
        '<span class="footer-newsletter-line">Get the latest</span> <span class="footer-newsletter-line">automation features</span>'
    ),
    
    # Footer Bar
    (
        '<div id="footer-bottom-copyright">©2026 LUSION Creative Studio</div>',
        '<div id="footer-bottom-copyright">© 2026 Apply Jack by Team SHAURYA</div>'
    ),
    (
        '> R&D: labs.lusion.co</a>',
        '> Engine Status: Operational</a>'
    ),
    (
        '<div id="footer-bottom-tagline">Built by Lusion with ❤️</div>',
        '<div id="footer-bottom-tagline">Built by SHAURYA with ⚡</div>'
    )
]

for old_str, new_str in replacements:
    if old_str in txt:
        txt = txt.replace(old_str, new_str)
        print("Replaced:", old_str[:30], "...")
    else:
        print("COULD NOT FIND:", old_str[:30], "...")

pathlib.Path('public/about.html').write_text(txt, encoding='utf-8')
print("File written.")
