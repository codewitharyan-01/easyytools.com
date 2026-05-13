import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # 1. Remove inline font-size from result-display
    # Matches: style="font-size: 10rem; margin: 4rem 0;" -> style="margin: 4rem 0;"
    new_content = re.sub(
        r'(class="result-display"[^>]*?)font-size:\s*\d+(\.\d+)?rem;?',
        r'\1',
        content
    )
    if new_content != content:
        content = new_content
        modified = True
        
    # 2. Fix Index Hero
    if file == 'index.html':
        content = content.replace('font-size: 5.5rem;', 'font-size: clamp(3rem, 10vw, 5.5rem);')
        modified = True
        
    # 3. Fix Contact/Privacy Title
    if file in ['contact.html', 'privacy.html']:
        content = content.replace('font-size: 5rem;', 'font-size: clamp(3rem, 10vw, 5rem);')
        modified = True
        
    # 4. Fix Prestige Panel Titles
    # <h1 style="font-size: 3rem;
    new_content = re.sub(
        r'<h1 style="font-size:\s*3rem;',
        r'<h1 style="font-size: clamp(2rem, 8vw, 3rem);',
        content
    )
    if new_content != content:
        content = new_content
        modified = True

    # 5. Fix tool inputs grid (some have style="display: grid; grid-template-columns: 1fr 1fr;")
    # It doesn't break desktop but on mobile 1fr 1fr is bad. 
    # Change to a class "responsive-grid"
    new_content = re.sub(
        r'style="display:\s*grid;\s*grid-template-columns:\s*(1fr\s*1fr|repeat\(3,\s*1fr\));\s*gap:\s*1\.[50]rem;\s*margin-bottom:\s*[34]rem;"',
        r'class="responsive-grid"',
        content
    )
    if new_content != content:
        content = new_content
        modified = True

    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed inline styles in {file}")
