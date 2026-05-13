import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

mega_footer = """    <footer class="site-footer">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 4rem; padding-bottom: 4rem;">
            <div>
                <a href="index.html" class="logo" style="font-size: 1.5rem;">easyytools.com</a>
                <p style="color: var(--text-muted); margin-top: 1rem; font-size: 0.9rem;">A prestigious collective of high-performance online utilities designed for modern professionals.</p>
            </div>
            <div>
                <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.5rem; color: var(--text);">Financial & Math</h4>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <a href="calculator.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Calculator</a>
                    <a href="gst-calculator.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">GST Calculator</a>
                    <a href="emi-calculator.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">EMI Calculator</a>
                    <a href="percentage-calculator.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Percentage Calc</a>
                </div>
            </div>
            <div>
                <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.5rem; color: var(--text);">Daily Utilities</h4>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <a href="age-calculator.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Age Calculator</a>
                    <a href="bmi-calculator.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">BMI Calculator</a>
                    <a href="stopwatch.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Stopwatch</a>
                    <a href="alarm.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Alarm Clock</a>
                </div>
            </div>
            <div>
                <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.5rem; color: var(--text);">Text & Dev Tools</h4>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <a href="word-counter.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Word Counter</a>
                    <a href="password-generator.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Password Gen</a>
                    <a href="qr-generator.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">QR Generator</a>
                    <a href="sha256-hasher.html" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">SHA256 Hasher</a>
                </div>
            </div>
        </div>
        <div style="max-width: 1200px; margin: 0 auto; border-top: 1px solid var(--border); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div style="color: var(--text-muted); font-size: 0.9rem;">&copy; 2026 easyytools.com</div>
            <div style="display: flex; gap: 2rem;">
                <a href="privacy.html" style="color: var(--text-muted); text-decoration: none; font-weight: 700; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Privacy</a>
                <a href="contact.html" style="color: var(--text-muted); text-decoration: none; font-weight: 700; font-size: 0.9rem; transition: 0.3s;" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Contact</a>
            </div>
        </div>
    </footer>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace old footer with Mega Footer
    new_content = re.sub(
        r'<footer class="site-footer">.*?</footer>',
        mega_footer,
        content,
        flags=re.DOTALL
    )

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Added Mega Footer to {file}")
