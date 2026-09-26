const fs = require('fs');

let adminContent = fs.readFileSync('src/app/admin/home/page.tsx', 'utf8');
adminContent = adminContent.replace(
    /<div dangerouslySetInnerHTML=\{\{ __html: tech\.svgString \}\} className="w-6 h-6" \/>/g,
    '<div dangerouslySetInnerHTML={{ __html: tech.svgString ? tech.svgString.replace(/class="[^"]*"/, `class="w-full h-full"`) : `` }} className="w-6 h-6 flex items-center justify-center text-slate-800" />'
);

fs.writeFileSync('src/app/admin/home/page.tsx', adminContent);
