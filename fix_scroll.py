import pathlib

file_path = 'src/app/dashboard/page.js'
txt = pathlib.Path(file_path).read_text(encoding='utf-8')

# Fix main container
txt = txt.replace(
    '<div className="h-screen w-full bg-[#09090b] text-zinc-50 font-sans flex flex-col overflow-hidden">',
    '<div className="min-h-screen w-full bg-[#09090b] text-zinc-50 font-sans flex flex-col overflow-x-hidden overflow-y-auto custom-scrollbar">'
)

# Fix Top section
txt = txt.replace(
    '<div className="h-[75%] p-8 lg:p-12 flex flex-col border-b border-[#27272a]">',
    '<div className="flex-none min-h-[60vh] p-8 lg:p-12 flex flex-col border-b border-[#27272a] justify-center">'
)

# Fix Bottom section
txt = txt.replace(
    '<div className="h-[25%] bg-[#09090b] flex flex-col justify-center items-center px-8 lg:px-24 relative overflow-hidden">',
    '<div className="flex-1 min-h-[40vh] bg-[#09090b] flex flex-col justify-center items-center px-8 lg:px-24 py-16 relative">'
)

pathlib.Path(file_path).write_text(txt, encoding='utf-8')
print("Fixed scrolling!")
