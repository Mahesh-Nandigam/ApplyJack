import pathlib
import re

txt = pathlib.Path('public/about.html').read_text(encoding='utf-8')

# Remove the old script I added
start_idx = txt.find("<script>\n(function() {")
if start_idx >= 0:
    end_idx = txt.find("})();\n</script>", start_idx) + 15
    txt = txt[:start_idx] + txt[end_idx:]
    print("Removed old script")

new_script = """
<script>
(function() {
    function syncOpacity() {
        const cover = document.getElementById('unlock-lusion-cover');
        const ref = document.getElementById('about-who-title-main-scroll');
        if (cover && ref) {
            // "THE TRUE POTENTIAL" text is managed by the site's JS.
            // It fades out on scroll. We will exactly match its opacity!
            const computedStyle = window.getComputedStyle(ref);
            cover.style.opacity = computedStyle.opacity;
            cover.style.transform = computedStyle.transform; // Also match any sliding/scaling
            cover.style.visibility = computedStyle.visibility;
        }
        requestAnimationFrame(syncOpacity);
    }
    requestAnimationFrame(syncOpacity);
})();
</script>
"""

txt = txt.replace('</body>', new_script + '\n</body>')
pathlib.Path('public/about.html').write_text(txt, encoding='utf-8')
print("Added exact sync script")
