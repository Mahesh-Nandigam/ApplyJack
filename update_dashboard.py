import pathlib
import re

file_path = 'src/app/dashboard/page.js'
txt = pathlib.Path(file_path).read_text(encoding='utf-8')

new_notifications_block = """  const notifications = [
    { platform: 'LinkedIn', count: 3, role: 'Full Stack Developer', color: '#0A66C2', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
    { platform: 'Naukri', count: 5, role: 'Frontend Engineer', color: '#008bdc', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" /></svg> },
    { platform: 'Internshala', count: 2, role: 'React Developer', color: '#1295c9', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg> },
    { platform: 'Indeed', count: 8, role: 'Software Engineer', color: '#2164f3', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm-1-7a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 10z" /></svg> },
    { platform: 'Wellfound', count: 4, role: 'Backend Dev', color: '#e64a19', icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 2L1 21h22L12 2zm0 3.5l7.5 13.5h-15L12 5.5z" /></svg> }
  ];"""

# Replace notifications array
start = txt.find('  const notifications = [')
end = txt.find('  ];\n', start) + 5
txt = txt[:start] + new_notifications_block + txt[end:]

new_cards_block = """        <div className="flex-1 w-full flex items-center justify-center mt-4">
          <div className="w-full flex gap-4 xl:gap-6 2xl:gap-8 max-w-[1400px] mx-auto">
            {notifications.map((notif, idx) => (
              <div 
                key={idx}
                className="flex-1 min-w-[200px] h-[340px] bg-zinc-900/20 backdrop-blur-sm border border-[#27272a] rounded-3xl p-6 flex flex-col justify-between hover:border-zinc-500 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer group hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-black/50"
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl border border-[#27272a] flex items-center justify-center bg-zinc-950 group-hover:bg-zinc-900 transition-all duration-300 shadow-inner drop-shadow-md" style={{ color: notif.color }}>
                    {notif.icon}
                  </div>
                  <span className="bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 text-xs font-bold px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    {notif.count} New
                  </span>
                </div>
                
                <div className="mt-auto mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-zinc-100 transition-colors">{notif.platform}</h3>
                  <p className="text-sm text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors">{notif.count} job notifications for</p>
                  <p className="text-lg font-semibold text-zinc-300 mt-1 leading-snug group-hover:text-white transition-colors">{notif.role}</p>
                </div>

                <button className="w-full bg-zinc-900 text-white font-semibold text-sm px-4 py-3.5 rounded-xl border border-[#27272a] group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-md">
                  Auto-Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>"""

# Replace the scrolling container
start_scroll = txt.find('<div className="flex-1 overflow-x-auto')
end_scroll = txt.find('        </div>\n      </div>', start_scroll)
txt = txt[:start_scroll] + new_cards_block + txt[end_scroll:]

pathlib.Path(file_path).write_text(txt, encoding='utf-8')
print("Dashboard updated successfully.")
