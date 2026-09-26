const fs = require('fs');

function fixAdminDefaults(file, defaultObjectName) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(
        /seoTitle: "Apex Packaging Solutions[^"]*"/,
        'seoTitle: "Aventiq Web Solutions | Web Development & Digital Marketing"'
    );
    
    content = content.replace(
        /seoDescription: "Apex Packaging Solutions[^"]*"/,
        'seoDescription: "Aventiq Web Solutions is a premium IT company providing cutting-edge website development, digital marketing, SaaS engineering, and UI/UX design services to help businesses grow."'
    );
    
    content = content.replace(
        /seoKeywords: "Packaging Manufacturer[^"]*"/,
        'seoKeywords: "Web Development, Digital Marketing, SaaS Engineering, UI/UX Design, IT Company, Aventiq"'
    );
    
    content = content.replace(
        /seoAuthor: "Apex Packaging"/,
        'seoAuthor: "Aventiq Web Solutions"'
    );
    
    content = content.replace(
        /seoPublisher: "Apex Packaging"/,
        'seoPublisher: "Aventiq Web Solutions"'
    );

    // Also inject robots and alternates into the client SEO if they are not there, 
    // but the user only complained about the analyzer missing it, which reads the SSR HTML. 
    
    fs.writeFileSync(file, content);
}

fixAdminDefaults('src/app/admin/home/page.tsx');
fixAdminDefaults('src/app/admin/about/page.tsx');
// The subagent might have hardcoded empty strings or Apex strings for the others, let's just blanket search replace 'Apex Packaging' -> 'Aventiq Web Solutions' if any exist in the other files.

['src/app/admin/projects/page.tsx', 'src/app/admin/services/page.tsx', 'src/app/admin/blog/page.tsx'].forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/Apex Packaging/g, 'Aventiq Web Solutions');
        fs.writeFileSync(file, content);
    }
});

console.log("Fixed Admin SEO Defaults");
