import pathlib

txt = pathlib.Path('public/about.html').read_text(encoding='utf-8')

start_idx = txt.find("<script>\nwindow.addEventListener('scroll'")
if start_idx >= 0:
    end_idx = txt.find('</script>', start_idx) + 9
    txt = txt[:start_idx] + txt[end_idx:]
    print('Removed old script')
else:
    print('Old script not found')

new_script = """
<script>
(function() {
    function updateOpacity() {
        const titleMain = document.getElementById('about-who-title-main');
        const cover = document.getElementById('unlock-lusion-cover');
        if (titleMain && cover) {
            const rect = titleMain.getBoundingClientRect();
            // The original text sits at the bottom of the viewport initially.
            // When user scrolls down, rect.top decreases.
            // Fade out the overlay smoothly based on rect.top.
            
            let opacity = 1;
            // The title starts around rect.top = 300 to 500 depending on screen.
            // Let's say if rect.top < 200, we start fading.
            if (rect.top < 250) {
                opacity = Math.max(0, (rect.top - 50) / 200); 
            }
            
            cover.style.opacity = opacity;
            
            if (opacity === 0) {
                cover.style.display = 'none';
            } else {
                cover.style.display = 'block';
            }
        }
        requestAnimationFrame(updateOpacity);
    }
    requestAnimationFrame(updateOpacity);
})();
</script>
"""

txt = txt.replace('</body>', new_script + '\n</body>')
pathlib.Path('public/about.html').write_text(txt, encoding='utf-8')
print('Added requestAnimationFrame scroll logic')
