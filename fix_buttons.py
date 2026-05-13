import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Standardize Back Buttons
    # Matches <a ...>← Back</a>
    new_content = re.sub(
        r'<a href="index\.html"[^>]*>← Back</a>',
        r'<a href="index.html" class="btn-back">← Back</a>',
        content
    )
    if new_content != content:
        content = new_content
        modified = True
        
    # Standardize Secondary Buttons (btn-copy)
    new_content = re.sub(
        r'class="btn-copy"(.*?)(>.*?<)',
        r'class="btn-secondary"\1\2',
        content
    )
    if new_content != content:
        content = new_content
        modified = True

    # Standardize inline styled prestige buttons into secondary
    # e.g. class="btn-prestige" style="background: var(--hover); color: var(--text);..."
    new_content = re.sub(
        r'class="btn-prestige" style="[^"]*background:\s*var\(--hover\)[^"]*"',
        r'class="btn-secondary"',
        content
    )
    if new_content != content:
        content = new_content
        modified = True
        
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed buttons in {file}")
