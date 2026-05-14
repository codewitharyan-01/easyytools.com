const fs = require('fs');
const path = require('path');

const tools = [
    'youtube-title-generator.html',
    'hashtag-generator.html',
    'utm-builder.html',
    'lorem-ipsum.html',
    'meme-generator.html',
    'text-to-pdf.html',
    'text-to-speech.html',
    'voice-typing.html',
    'bmr-calculator.html',
    'discount-calculator.html',
    'password-strength.html',
    'jwt-decoder.html',
    'html-beautifier.html',
    'color-converter.html',
    'fake-data-generator.html'
];

const dir = 'c:\\Users\\Aryan\\Desktop\\Idea';

tools.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace vibrant greens
    content = content.replace(/rgba\(46,\s*213,\s*115,\s*0\.1\)/g, 'var(--hover)');
    content = content.replace(/rgba\(46,\s*213,\s*115,\s*0\.2\)/g, 'var(--border)');
    content = content.replace(/rgba\(46,\s*213,\s*115,\s*0\.3\)/g, 'var(--border)');
    content = content.replace(/#2ed573/gi, 'var(--text)');
    
    // Replace vibrant reds
    content = content.replace(/rgba\(255,\s*71,\s*87,\s*0\.1\)/g, 'var(--hover)');
    content = content.replace(/rgba\(255,\s*71,\s*87,\s*0\.2\)/g, 'var(--border)');
    content = content.replace(/#ff4757/gi, 'var(--text-muted)');
    
    // Replace vibrant oranges
    content = content.replace(/rgba\(255,\s*165,\s*2,\s*0\.1\)/g, 'var(--hover)');
    content = content.replace(/rgba\(255,\s*165,\s*2,\s*0\.2\)/g, 'var(--border)');
    content = content.replace(/#ffa502/gi, 'var(--text-muted)');
    
    // Replace vibrant yellows
    content = content.replace(/#eccc68/gi, 'var(--text-muted)');
    
    // Replace vibrant blues
    content = content.replace(/#3742fa/gi, 'var(--text-muted)');
    
    // Password Strength specific fix to keep gradients but with prestige tones
    if (file === 'password-strength.html') {
        content = content.replace(/color = 'var\(--text-muted\)';/g, "color = 'var(--text-muted)';");
        content = content.replace(/color = 'var\(--text\)';/g, "color = 'var(--text)';");
        // Convert to inline logic using var(--text) and var(--text-muted) and var(--hover)
        // Since we replaced the colors string literals, we should make sure they still work as strings
        // #ff4757 became var(--text-muted)
    }

    // specific fix for color converter preview background
    if (file === 'color-converter.html') {
        content = content.replace(/background: var\(--text\);/g, 'background: var(--hover);'); // Because #2ed573 was replaced with var(--text)
    }

    fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Restyling completed.");
