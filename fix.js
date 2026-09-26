const fs = require('fs');
let content = fs.readFileSync('src/app/admin/home/page.tsx', 'utf8');
content = content.replace(
  '    { id: "4", platform: "Instagram", url: "https://instagram.com" }\r\n  ]\r\n}',
  '    { id: "4", platform: "Instagram", url: "https://instagram.com" }\r\n  ],\r\n  seoTitle: "",\r\n  seoDescription: "",\r\n  seoKeywords: "",\r\n  seoCanonical: "",\r\n  seoAuthor: "",\r\n  seoPublisher: ""\r\n}'
);
content = content.replace(
  '    { id: "4", platform: "Instagram", url: "https://instagram.com" }\n  ]\n}',
  '    { id: "4", platform: "Instagram", url: "https://instagram.com" }\n  ],\n  seoTitle: "",\n  seoDescription: "",\n  seoKeywords: "",\n  seoCanonical: "",\n  seoAuthor: "",\n  seoPublisher: ""\n}'
);
fs.writeFileSync('src/app/admin/home/page.tsx', content);
console.log("Done");
