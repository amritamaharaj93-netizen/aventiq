const fs = require('fs');

function patchLocalStorageLoad(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // For page.tsx
    if (content.includes('if (Array.isArray(parsed.techStackList)) {') && !content.includes('.replace(/className=/g, \'class=\')')) {
        content = content.replace(
            /if \(Array\.isArray\(parsed\.techStackList\)\) \{\s*setTechStackList\(parsed\.techStackList\)\s*\}/,
            `if (Array.isArray(parsed.techStackList)) {
            const sanitizedList = parsed.techStackList.map(t => ({
              ...t,
              svgString: t.svgString ? t.svgString.replace(/className=/g, 'class=').replace(/strokeWidth=/g, 'stroke-width=').replace(/strokeLinecap=/g, 'stroke-linecap=').replace(/strokeLinejoin=/g, 'stroke-linejoin=').replace(/fillRule=/g, 'fill-rule=').replace(/clipRule=/g, 'clip-rule=') : t.svgString
            }));
            setTechStackList(sanitizedList);
          }`
        );
    }
    
    // For admin/home/page.tsx
    if (content.includes('techStackList: Array.isArray(parsed.techStackList)') && !content.includes('.replace(/className=/g, \'class=\')')) {
        content = content.replace(
            /techStackList: Array\.isArray\(parsed\.techStackList\) \? parsed\.techStackList : DEFAULT_HOME_SETTINGS\.techStackList/,
            `techStackList: Array.isArray(parsed.techStackList) ? parsed.techStackList.map(t => ({
              ...t,
              svgString: t.svgString ? t.svgString.replace(/className=/g, 'class=').replace(/strokeWidth=/g, 'stroke-width=').replace(/strokeLinecap=/g, 'stroke-linecap=').replace(/strokeLinejoin=/g, 'stroke-linejoin=').replace(/fillRule=/g, 'fill-rule=').replace(/clipRule=/g, 'clip-rule=') : t.svgString
            })) : DEFAULT_HOME_SETTINGS.techStackList`
        );
    }
    
    fs.writeFileSync(file, content);
}

patchLocalStorageLoad('src/app/page.tsx');
patchLocalStorageLoad('src/app/admin/home/page.tsx');
