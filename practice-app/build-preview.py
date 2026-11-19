"""Package the reviewed interface as one offline HTML file, without dependencies."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent
html = (root / 'index.html').read_text()
css = (root / 'style.css').read_text()
scripts = []
for filename in ('settings.js', 'fretboard.js', 'app.js'):
    source = (root / filename).read_text()
    source = re.sub(r'^import .*?;\n', '', source, flags=re.M)
    source = re.sub(r'^export ', '', source, flags=re.M)
    scripts.append(source)
html = html.replace('<link rel="stylesheet" href="style.css">', '<style>' + css + '</style>')
html = html.replace('<script type="module" src="app.js"></script>', '<script type="module">\n' + '\n'.join(scripts) + '\n</script>')
(root / 'preview.html').write_text(html)
print('Created offline preview.html')
