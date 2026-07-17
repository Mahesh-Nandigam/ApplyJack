import pathlib
import sys

p = pathlib.Path('src/app/builder/page.js')
txt = p.read_text(encoding='utf-8')

# Add id to resume container
old_resume = '<div className="w-full max-w-[800px] bg-white text-black p-12 shadow-2xl rounded-sm flex flex-col justify-start select-none min-h-[1100px]">'
new_resume = '<div id="resume-preview-sheet" className="w-full max-w-[800px] bg-white text-black p-12 shadow-2xl rounded-sm flex flex-col justify-start select-none min-h-[1100px] print:w-[210mm] print:h-[297mm] print:min-h-0 print:p-0 print:shadow-none print:m-0">'
txt = txt.replace(old_resume, new_resume)

# Hide header and sidebar on print
txt = txt.replace('<header className="bg-[#0b0f19]/80', '<header className="print:hidden bg-[#0b0f19]/80')
txt = txt.replace('<div className="w-full lg:w-1/3 p-8', '<div className="print:hidden w-full lg:w-1/3 p-8')

# Ensure the parent wrapper of the resume doesn't break layout in print
txt = txt.replace('<div className="flex-1 p-8 overflow-y-auto flex items-start justify-center bg-[#1a2ffb]">', '<div className="flex-1 p-8 overflow-y-auto flex items-start justify-center bg-[#1a2ffb] print:p-0 print:bg-white print:overflow-visible">')
txt = txt.replace('<div className="flex-grow flex flex-col lg:flex-row overflow-hidden bg-[#080b12]">', '<div className="flex-grow flex flex-col lg:flex-row overflow-hidden bg-[#080b12] print:overflow-visible">')

# Add global print styles
old_style = '</style>'
new_style = '''
        @media print {
          body, html {
            margin: 0;
            padding: 0;
            background: white !important;
            height: auto !important;
          }
          /* Hide everything except the resume sheet */
          body * {
            visibility: hidden;
          }
          #resume-preview-sheet, #resume-preview-sheet * {
            visibility: visible;
          }
          #resume-preview-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 10mm !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      </style>'''
txt = txt.replace(old_style, new_style)

p.write_text(txt, encoding='utf-8')
print('Updated print styles')
