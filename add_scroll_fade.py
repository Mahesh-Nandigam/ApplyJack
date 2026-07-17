import pathlib

txt = pathlib.Path('public/about.html').read_text(encoding='utf-8')
script = """
<script>
window.addEventListener('scroll', () => {
    const cover = document.getElementById('unlock-lusion-cover');
    if (cover) {
        const opacity = Math.max(0, 1 - window.scrollY / 200);
        cover.style.opacity = opacity;
        if(window.scrollY > 300) {
            cover.style.display = 'none';
        } else {
            cover.style.display = 'block';
        }
    }
});
</script>
"""
if 'unlock-lusion-cover' in txt and 'window.addEventListener("scroll"' not in txt:
    txt = txt.replace('</body>', script + '\n</body>')
    pathlib.Path('public/about.html').write_text(txt, encoding='utf-8')
    print('Added scroll listener')
