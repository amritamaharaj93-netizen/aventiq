const fs = require('fs');

// Fix services page
let servicesContent = fs.readFileSync('src/app/services/page.tsx', 'utf8');
servicesContent = servicesContent.replace(
    /<p className="text-slate-600 mb-8 leading-relaxed font-medium text-\[17px\]">\s*\{service\.desc\}\s*<\/p>/g,
    '<div className="text-slate-600 mb-8 leading-relaxed font-medium text-[17px]" dangerouslySetInnerHTML={{ __html: service.desc }} />'
);
fs.writeFileSync('src/app/services/page.tsx', servicesContent);
