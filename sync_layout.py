import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

master_header = """    <header class="site-header">
        <a href="index.html" class="logo">easyytools.com</a>
        <nav class="desktop-nav">
            <a href="index.html">Home</a>
            <a href="index.html#tool-grid">Tools</a>
            <a href="privacy.html">Privacy</a>
            <a href="contact.html">Contact</a>
        </nav>
        <div class="hamburger" id="hamburger" onclick="toggleMenu()">
            <span></span><span></span><span></span>
        </div>
    </header>
    <div class="mobile-overlay" id="mobile-overlay">
        <a href="index.html" onclick="toggleMenu()">Home</a>
        <a href="index.html#tool-grid" onclick="toggleMenu()">Tools</a>
        <a href="privacy.html" onclick="toggleMenu()">Privacy</a>
        <a href="contact.html" onclick="toggleMenu()">Contact</a>
    </div>"""

master_footer = """    <footer class="site-footer">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; align-items: center; text-align: center;">
            <a href="index.html" class="logo" style="font-size: 2rem;">easyytools.com</a>
            <p style="color: var(--text-muted); max-width: 400px;">A prestigious collective of high-performance online utilities designed for modern professionals.</p>
            <div style="display: flex; gap: 2rem; justify-content: center; margin-bottom: 2rem;">
                <a href="privacy.html" style="color: var(--text-muted); text-decoration: none; font-weight: 700;">Privacy</a>
                <a href="contact.html" style="color: var(--text-muted); text-decoration: none; font-weight: 700;">Contact</a>
            </div>
            <div style="width: 100%; border-top: 1px solid var(--border); padding-top: 2rem; color: var(--text-muted); font-size: 0.9rem;">
                &copy; 2026 easyytools.com
            </div>
        </div>
    </footer>"""

ad_zone = """\n        <div class="ad-zone" style="margin: 4rem 0;">AdSense Advertisement Zone</div>\n"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace Header & Mobile Overlay
    # Regex to match from <header class="site-header"> up to the end of <div class="mobile-overlay"...></div>
    content = re.sub(
        r'<header class="site-header">.*?</header>\s*(<div class="mobile-overlay".*?</div>)?',
        master_header,
        content,
        flags=re.DOTALL
    )

    # Replace Footer
    content = re.sub(
        r'<footer class="site-footer">.*?</footer>',
        master_footer,
        content,
        flags=re.DOTALL
    )

    # Replace Ad Zones (Standardize them)
    content = re.sub(
        r'<div class="ad-zone".*?</div>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # Inject 2 Ad Zones for tool pages (one after the back button or title, one before the closing main tag)
    if file != 'index.html':
        # Top Ad: After <main ...> and <a href... ← Back</a>
        if '← Back</a>' in content:
            content = content.replace('← Back</a>', '← Back</a>' + ad_zone)
        else:
            # Fallback if no back button
            content = re.sub(r'(<main[^>]*>)', r'\1' + ad_zone, content)
            
        # Bottom Ad: Before </main>
        content = content.replace('</main>', ad_zone + '    </main>')
    else:
        # Index.html specific ad injection
        # Remove old ones first (done above)
        # Add after section hero
        content = content.replace('</section>', '</section>' + ad_zone)
        # Add before </main>
        content = content.replace('</main>', ad_zone + '    </main>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Synchronized {file}")
