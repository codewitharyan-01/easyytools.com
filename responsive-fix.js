const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Aryan\\Desktop\\Idea';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace hardcoded 1fr 1fr with auto-fit minmax
    const newContent = content.replace(/grid-template-columns:\s*1fr\s+1fr;/g, 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));');
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated ${file}`);
    }
});

console.log("Responsive fix applied.");
