import pathlib

file_path = 'src/app/dashboard/page.js'
txt = pathlib.Path(file_path).read_text(encoding='utf-8')

# Fix the duplicate </div> tags
txt = txt.replace('        </div>        </div>\n      </div>', '        </div>\n      </div>')
# Just in case the spaces were different:
txt = txt.replace('          </div>\n        </div>        </div>\n      </div>', '          </div>\n        </div>\n      </div>')

pathlib.Path(file_path).write_text(txt, encoding='utf-8')
print("Syntax fixed")
