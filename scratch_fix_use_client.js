const fs = require('fs');

const files = [
    'src/app/page.tsx',
    'src/app/services/page.tsx',
    'src/app/projects/page.tsx',
    'src/app/blog/page.tsx',
    'src/app/about/page.tsx'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if the file starts with the import instead of use client
    if (content.startsWith('import { ClientSEO }') && content.includes('"use client"')) {
        // Remove the import from the top
        content = content.replace('import { ClientSEO } from "@/components/ClientSEO";\n', '');
        
        // Find "use client" and put the import right after it
        content = content.replace(/"use client"\r?\n/, '"use client"\n\nimport { ClientSEO } from "@/components/ClientSEO";\n');
        
        fs.writeFileSync(file, content);
    }
});

console.log("Fixed use client positioning");
