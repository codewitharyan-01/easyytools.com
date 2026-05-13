// easyytools.com Prestige Engine v5
console.log("EasyyTools.com Engine v5: Prestige Active.");

// Global Search
function filterTools() {
    const query = document.getElementById('search').value.toLowerCase();
    const items = document.querySelectorAll('.tool-card');

    items.forEach(item => {
        const title = item.querySelector('h3').innerText.toLowerCase();
        const desc = item.querySelector('p').innerText.toLowerCase();
        const tags = item.getAttribute('data-tags') || '';

        if (title.includes(query) || desc.includes(query) || tags.includes(query)) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
}

// Global Copy Logic
function copy(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Copied to clipboard");
    });
}

function showToast(msg) {
    const t = document.getElementById('toast');
    if(!t) return;
    t.innerText = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// Mobile Menu
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('mobile-overlay');
    if(hamburger && overlay) {
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        if (overlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// Tool Specific Helper: Download QR
function downloadQR(canvasId) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const link = document.createElement('a');
    link.download = 'easyytools-qr.png';
    link.href = canvas.toDataURL();
    link.click();
    showToast("Downloading QR Code...");
}
