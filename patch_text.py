import pathlib, re

p = pathlib.Path('public/about.html')
txt = p.read_text(encoding='utf-8')

# ---- Add UNLOCK cover overlay with CSS WAVE animation ----
# We use individual text elements for each letter to animate them sequentially.
OVERLAY = """
<svg id="unlock-lusion-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.553 38.502" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:3;pointer-events:none;">
    <style>
        .wave-text {
            fill: #fff;
            font-size: 34px;
            font-weight: 900;
            font-family: inherit;
            opacity: 0;
            animation: waveAnim 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes waveAnim {
            0% { opacity: 0; transform: translateY(10px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
    </style>
    <!-- Total width ~191.553. We manually space the letters -->
    <text x="0" y="34" class="wave-text" style="animation-delay: 0.2s">U</text>
    <text x="32" y="34" class="wave-text" style="animation-delay: 0.3s">N</text>
    <text x="64" y="34" class="wave-text" style="animation-delay: 0.4s">L</text>
    <text x="94" y="34" class="wave-text" style="animation-delay: 0.5s">O</text>
    <text x="127" y="34" class="wave-text" style="animation-delay: 0.6s">C</text>
    <text x="160" y="34" class="wave-text" style="animation-delay: 0.7s">K</text>
</svg>
"""

# Remove the old static UNLOCK overlay
old_overlay_pattern = r'<svg id="unlock-lusion-cover".*?</svg>'
txt = re.sub(old_overlay_pattern, '', txt, flags=re.DOTALL)

# Insert the new animated overlay
target = '<svg id="about-who-title-main-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.553 38.502"></svg>'
if target in txt:
    txt = txt.replace(target, target + OVERLAY, 1)
    print('Animated UNLOCK overlay inserted')
else:
    print('main-logo SVG not found exactly')

p.write_text(txt, encoding='utf-8')
print('Done - saved public/about.html')
