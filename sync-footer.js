const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Aryan\\Desktop\\Idea';

// Read index.html to extract the new footer
const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');

// Use regex to extract the footer. 
// <footer class="site-footer"> ... </footer>
const footerMatch = indexHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);

if (!footerMatch) {
    console.error("Could not find footer in index.html");
    process.exit(1);
}

const newFooter = footerMatch[0];

// Read all html files
const files = fs.readdirSync(dir);
let updatedCount = 0;

for (const file of files) {
    if (file.endsWith('.html') && file !== 'index.html') {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Replace old footer with new footer
        const newContent = content.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, newFooter);
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            updatedCount++;
        }
    }
}

console.log(`Successfully updated footer in ${updatedCount} HTML files.`);
