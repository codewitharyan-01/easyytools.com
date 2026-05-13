import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

hamburger_html = """        <div class="hamburger" id="hamburger" onclick="toggleMenu()">
            <span></span><span></span><span></span>
        </div>"""

overlay_html = """
    <div class="mobile-overlay" id="mobile-overlay">
        <a href="index.html" onclick="toggleMenu()">Home</a>
        <a href="privacy.html" onclick="toggleMenu()">Privacy</a>
        <a href="contact.html" onclick="toggleMenu()">Contact</a>
    </div>
"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # 1. Add hamburger if missing
    if 'id="hamburger"' not in content and '<header class="site-header">' in content:
        content = re.sub(
            r'(</nav>\s*</header>|</a>\s*</header>)',
            r'\1'.replace('</header>', hamburger_html + '\n    </header>'),
            content
        )
        modified = True
        
    # 2. Add mobile overlay if missing
    if 'id="mobile-overlay"' not in content and '</header>' in content:
        content = content.replace('</header>', '</header>' + overlay_html)
        modified = True
        
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file}")
