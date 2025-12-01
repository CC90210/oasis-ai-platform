// This script removes ALL opacity: 0 from Framer Motion initial states
// The issue: text fades OUT because initial={{opacity: 0}} combined with inline styles
// The fix: Remove opacity from initial states, keep only position/scale animations

const fs = require('fs');
const path = require('path');

function fixFramerMotionOpacity(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove opacity: 0 from initial states
    content = content.replace(/initial=\{\{\s*opacity:\s*0,?\s*/g, 'initial={{');

    // Remove opacity: 1 from whileInView/animate states  
    content = content.replace(/,?\s*opacity:\s*1\s*\}}/g, '}}');
    content = content.replace(/whileInView=\{\{\s*opacity:\s*1,?\s*/g, 'whileInView={{');
    content = content.replace(/animate=\{\{\s*opacity:\s*1,?\s*/g, 'animate={{');

    // Clean up empty animation objects
    content = content.replace(/initial=\{\{\s*\}\}/g, '');
    content = content.replace(/whileInView=\{\{\s*\}\}/g, '');
    content = content.replace(/animate=\{\{\s*\}\}/g, '');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
}

// Fix Landing Page
const landingPage = path.join(__dirname, 'src', 'pages', 'landing', 'LandingPage.tsx');
fixFramerMotionOpacity(landingPage);

console.log('\n✅ All Framer Motion opacity animations removed!');
console.log('Text will no longer fade out.');
