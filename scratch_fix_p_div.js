const fs = require('fs');
let content = fs.readFileSync('src/app/projects/page.tsx', 'utf8');

content = content.replace(
    /<p className="text-lg md:text-xl text-slate-500 mb-8 leading-relaxed font-light">([\s\S]*?)<div dangerouslySetInnerHTML=\{\{ __html: project\.desc \}\} \/>([\s\S]*?)<\/p>/g,
    '<div className="text-lg md:text-xl text-slate-500 mb-8 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: project.desc }} />'
);

fs.writeFileSync('src/app/projects/page.tsx', content);
