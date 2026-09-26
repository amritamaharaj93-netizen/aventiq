const fs = require('fs');

const PAGE_PATH = 'src/app/page.tsx';
const NAV_PATH = 'src/components/layout/Navbar.tsx';
const FOOTER_PATH = 'src/components/layout/Footer.tsx';

function rewritePage() {
    let content = fs.readFileSync(PAGE_PATH, 'utf8');

    content = content.replace(/"Aventiq 2.0 is now live"/g, '"Innovative Packaging Solutions"');
    content = content.replace(/"We build premium tech"/g, '"We manufacture premium"');
    content = content.replace(/"digital experiences"/g, '"packaging solutions"');
    content = content.replace(/"Aventiq is a world-class software development agency specializing in enterprise SaaS platforms, high-performance mobile applications, and intelligent cloud architecture."/g, '"Apex Packaging Solutions is a world-class manufacturer specializing in sustainable corrugated boxes, flexible packaging, and custom rigid containers for global brands."');
    
    content = content.replace(/"Mobile Excellence"/g, '"Sustainable Materials"');
    content = content.replace(/"Native apps that users"/g, '"Eco-friendly packaging that"');
    content = content.replace(/"love & engage with"/g, '"protects our planet"');
    content = content.replace(/"We craft pixel-perfect iOS and Android applications with smooth animations, offline-first architecture, and real-time sync that deliver 4.8\+ star experiences."/g, '"We craft 100% recyclable and biodegradable packaging solutions that reduce carbon footprint while ensuring maximum product protection and shelf appeal."');

    content = content.replace(/"Cloud Infrastructure"/g, '"Industrial Strength"');
    content = content.replace(/"Scalable systems built"/g, '"Heavy-duty packaging built"');
    content = content.replace(/"for future growth"/g, '"for safe transit"');
    content = content.replace(/"Our cloud-native architectures ensure maximum uptime, rapid scalability, and optimized operational costs for enterprise operations."/g, '"Our industrial packaging solutions ensure maximum protection, stackability, and compliance with international shipping standards."');

    const newServices = `const DEFAULT_SERVICES = [
  { id: "1", iconName: "Box", title: "Corrugated Boxes", desc: "Custom printed corrugated boxes for retail, e-commerce, and industrial shipping.", slug: "corrugated-boxes" },
  { id: "2", iconName: "Layers", title: "Flexible Packaging", desc: "High-barrier pouches and films for food, beverage, and medical industries.", slug: "flexible-packaging" },
  { id: "3", iconName: "Hexagon", title: "Rigid Containers", desc: "Durable plastic and glass containers engineered for safety and preservation.", slug: "rigid-containers" },
  { id: "4", iconName: "ShieldCheck", title: "Medical Packaging", desc: "ISO-certified sterile barrier systems and cleanroom packaging solutions.", slug: "medical-packaging" },
  { id: "5", iconName: "Zap", title: "Custom Design", desc: "In-house structural and graphic design services for unique brand experiences.", slug: "custom-design" },
  { id: "6", iconName: "Award", title: "Sustainable Solutions", desc: "Eco-friendly, biodegradable, and recycled material packaging options.", slug: "sustainable-solutions" },
]`;
    content = content.replace(/const DEFAULT_SERVICES = \[[\s\S]*?\]/, newServices);

    const newTech = `const DEFAULT_TECH_STACK: TechItem[] = [
  { id: "1", name: "ISO 9001", category: "Quality", color: "#1572B6", svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { id: "2", name: "FSC Certified", category: "Sustainability", color: "#10B981", svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><path d="M12 2L2 22h20L12 2z"/></svg>' },
  { id: "3", name: "BRCGS Food Safety", category: "Safety", color: "#F97316", svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>' },
  { id: "4", name: "ISO 14001", category: "Environment", color: "#0EA5E9", svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>' },
]`;
    content = content.replace(/const DEFAULT_TECH_STACK: TechItem\[\] = \[[\s\S]*?\]/, newTech);

    content = content.replace(/"Why Choose Aventiq"/g, '"Why Choose Apex Packaging"');
    content = content.replace(/"Engineering Excellence Meets World-Class Design"/g, '"Manufacturing Excellence Meets Sustainable Design"');
    
    // Fixed string escape here
    content = content.replace(/"We don't just write code — we architect high-converting digital products that scale smoothly with your business goals."/g, '"We don\'t just make boxes — we engineer sustainable packaging solutions that protect your products and elevate your brand."');
    
    content = content.replace(/"What We Build"/g, '"Our Products & Solutions"');
    content = content.replace(/"From strategy to deployment, Aventiq delivers technology solutions designed to solve real business problems and create long-term value."/g, '"From structural design to mass production, Apex delivers packaging solutions tailored to your industry standards."');
    
    content = content.replace(/"Tech Stack"/g, '"Certifications"');
    content = content.replace(/"Technologies We Use"/g, '"Quality & Sustainability Certifications"');
    
    content = content.replace(/"Projects Delivered"/g, '"Millions of Units Produced"');
    content = content.replace(/"Happy Clients"/g, '"Global Partners"');
    content = content.replace(/"Technologies"/g, '"Material Types"');

    content = content.replace(/Aventiq/g, 'Apex');
    content = content.replace(/aventiq/g, 'apex');

    fs.writeFileSync(PAGE_PATH, content);
}

function rewriteNav() {
    try {
        let content = fs.readFileSync(NAV_PATH, 'utf8');
        content = content.replace(/Aventiq/g, 'Apex');
        content = content.replace(/Web Development/g, 'Corrugated Boxes');
        content = content.replace(/SaaS Development/g, 'Flexible Packaging');
        content = content.replace(/UI\/UX Design/g, 'Rigid Containers');
        content = content.replace(/AI Development/g, 'Medical Packaging');
        content = content.replace(/Cloud & DevOps/g, 'Custom Design');
        content = content.replace(/Digital Marketing/g, 'Sustainable Solutions');
        content = content.replace(/SEO/g, 'Food & Beverage');
        fs.writeFileSync(NAV_PATH, content);
    } catch(e) {}
}

function rewriteFooter() {
    try {
        let content = fs.readFileSync(FOOTER_PATH, 'utf8');
        content = content.replace(/Aventiq/g, 'Apex');
        content = content.replace(/aventiq/g, 'apex');
        content = content.replace(/Premium software development agency specializing in scalable web, mobile, and AI solutions./g, 'Leading manufacturer of sustainable packaging solutions for global industries.');
        content = content.replace(/Web Development/g, 'Corrugated Boxes');
        content = content.replace(/SaaS Development/g, 'Flexible Packaging');
        content = content.replace(/Mobile Apps/g, 'Rigid Containers');
        content = content.replace(/AI Solutions/g, 'Medical Packaging');
        content = content.replace(/Cloud Architecture/g, 'Sustainable Solutions');
        fs.writeFileSync(FOOTER_PATH, content);
    } catch(e) {}
}

rewritePage();
rewriteNav();
rewriteFooter();
