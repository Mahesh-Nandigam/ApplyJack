import pathlib

txt = pathlib.Path('src/app/builder/page.js').read_text(encoding='utf-8')

# The final step is step 7 (Resume Reveal). Let's see what buttons are there.
# If I remember, there's a button to print/download or exit.
# I will just write a regex or replace the exact button text if I know it.
# Let's inspect the final step buttons first.
idx = txt.find('currentStep === 7 ? (')
print(txt[max(0, idx):idx+2500])
