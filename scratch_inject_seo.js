const fs = require('fs');

function injectSEO(file, storageKey) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('ClientSEO')) return; // Already injected
    
    // Inject import
    content = 'import { ClientSEO } from "@/components/ClientSEO";\n' + content;
    
    // Inject component right before first major div or main, or right after return (
    content = content.replace(/return\s*\(\s*(<div|<main|<section)/, `return (\n    <>\n      <ClientSEO storageKey="${storageKey}" />\n      $1`);
    
    // Fix closing tag if we added a fragment
    // Note: Since this is a simple regex, we'll instead just inject it right after the first wrapper element.
    content = fs.readFileSync(file, 'utf8'); // Reset
    content = 'import { ClientSEO } from "@/components/ClientSEO";\n' + content;
    content = content.replace(/return\s*\(\s*(<div[^>]*>|<main[^>]*>|<section[^>]*>)/, `return (\n    $1\n      <ClientSEO storageKey="${storageKey}" />`);
    
    fs.writeFileSync(file, content);
}

injectSEO('src/app/page.tsx', 'aventiq_admin_home');
injectSEO('src/app/services/page.tsx', 'aventiq_admin_services_seo');
injectSEO('src/app/projects/page.tsx', 'aventiq_admin_projects_seo');
injectSEO('src/app/blog/page.tsx', 'aventiq_admin_blog_seo');
injectSEO('src/app/about/page.tsx', 'aventiq_admin_about');

console.log("Injected ClientSEO");
