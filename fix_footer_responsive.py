import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # Fix footer bottom wrapper
    old_bottom = '<div style="max-width: 1200px; margin: 0 auto; border-top: 1px solid var(--border); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">'
    if old_bottom in content:
        content = content.replace(old_bottom, '<div class="footer-bottom">')
        modified = True

    # Fix footer links wrapper
    old_links = '<div style="display: flex; gap: 2rem;">'
    if old_links in content:
        # Only replace if it's inside the footer-bottom area.
        # Actually it's unique enough since the other links in header have class="desktop-nav"
        content = content.replace(old_links, '<div class="footer-links">')
        modified = True

    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed responsive footer classes in {file}")
