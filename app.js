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
            item.style.animation = 'fadeInUp 0.5s ease-out forwards';
            item.classList.add('visible');
        } else {
            item.style.display = 'none';
            item.classList.remove('visible');
            item.style.animation = 'none';
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

// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
        // Stagger effect for initial load vs scroll
        card.style.transitionDelay = `${(index % 10) * 0.05}s`; 
        observer.observe(card);
    });
});
