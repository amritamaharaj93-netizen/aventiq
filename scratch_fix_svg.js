const fs = require('fs');

function fixSvg(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // We only want to replace inside the svgString fields or SVG strings
    // But since it's a quick hack, doing it globally could break JSX if we replace className globally in page.tsx!
    // Ah! If I replace className globally in page.tsx, it breaks all React components!
    // Let's ONLY replace inside svgString!
    
    content = content.replace(/svgString: '(<svg[\s\S]*?<\/svg>)'/g, (match, svg) => {
        let fixed = svg
            .replace(/className=/g, 'class=')
            .replace(/strokeWidth=/g, 'stroke-width=')
            .replace(/strokeLinecap=/g, 'stroke-linecap=')
            .replace(/strokeLinejoin=/g, 'stroke-linejoin=')
            .replace(/fillRule=/g, 'fill-rule=')
            .replace(/clipRule=/g, 'clip-rule=');
        return `svgString: '${fixed}'`;
    });
    
    fs.writeFileSync(file, content);
}

fixSvg('src/app/page.tsx');
fixSvg('src/app/admin/home/page.tsx');
