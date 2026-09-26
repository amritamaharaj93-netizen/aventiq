import os
import re

PAGE_PATH = r"c:\Users\91870\Desktop\aventiq\src\app\page.tsx"
NAV_PATH = r"c:\Users\91870\Desktop\aventiq\src\components\layout\Navbar.tsx"
FOOTER_PATH = r"c:\Users\91870\Desktop\aventiq\src\components\layout\Footer.tsx"

def rewrite_page():
    with open(PAGE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace Hero
    content = content.replace('"Aventiq 2.0 is now live"', '"Innovative Packaging Solutions"')
    content = content.replace('"We build premium tech"', '"We manufacture premium"')
    content = content.replace('"digital experiences"', '"packaging solutions"')
    content = content.replace('"Aventiq is a world-class software development agency specializing in enterprise SaaS platforms, high-performance mobile applications, and intelligent cloud architecture."', '"Apex Packaging Solutions is a world-class manufacturer specializing in sustainable corrugated boxes, flexible packaging, and custom rigid containers for global brands."')
    
    content = content.replace('"Mobile Excellence"', '"Sustainable Materials"')
    content = content.replace('"Native apps that users"', '"Eco-friendly packaging that"')
    content = content.replace('"love & engage with"', '"protects our planet"')
    content = content.replace('"We craft pixel-perfect iOS and Android applications with smooth animations, offline-first architecture, and real-time sync that deliver 4.8+ star experiences."', '"We craft 100% recyclable and biodegradable packaging solutions that reduce carbon footprint while ensuring maximum product protection and shelf appeal."')

    content = content.replace('"Cloud Infrastructure"', '"Industrial Strength"')
    content = content.replace('"Scalable systems built"', '"Heavy-duty packaging built"')
    content = content.replace('"for future growth"', '"for safe transit"')
    content = content.replace('"Our cloud-native architectures ensure maximum uptime, rapid scalability, and optimized operational costs for enterprise operations."', '"Our industrial packaging solutions ensure maximum protection, stackability, and compliance with international shipping standards."')

    # Replace Services with Products
    services_pattern = r'const DEFAULT_SERVICES = \[.*?\]'
    new_services = '''const DEFAULT_SERVICES = [
  { id: "1", iconName: "Box", title: "Corrugated Boxes", desc: "Custom printed corrugated boxes for retail, e-commerce, and industrial shipping.", slug: "corrugated-boxes" },
  { id: "2", iconName: "Layers", title: "Flexible Packaging", desc: "High-barrier pouches and films for food, beverage, and medical industries.", slug: "flexible-packaging" },
  { id: "3", iconName: "Hexagon", title: "Rigid Containers", desc: "Durable plastic and glass containers engineered for safety and preservation.", slug: "rigid-containers" },
  { id: "4", iconName: "ShieldCheck", title: "Medical Packaging", desc: "ISO-certified sterile barrier systems and cleanroom packaging solutions.", slug: "medical-packaging" },
  { id: "5", iconName: "Zap", title: "Custom Design", desc: "In-house structural and graphic design services for unique brand experiences.", slug: "custom-design" },
  { id: "6", iconName: "Award", title: "Sustainable Solutions", desc: "Eco-friendly, biodegradable, and recycled material packaging options.", slug: "sustainable-solutions" },
]'''
    content = re.sub(services_pattern, new_services, content, flags=re.DOTALL)

    # Replace Tech Stack with Certifications
    tech_pattern = r'const DEFAULT_TECH_STACK: TechItem\[\] = \[.*?\]'
    new_tech = '''const DEFAULT_TECH_STACK: TechItem[] = [
  { id: "1", name: "ISO 9001", category: "Quality", color: "#1572B6", svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { id: "2", name: "FSC Certified", category: "Sustainability", color: "#10B981", svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><path d="M12 2L2 22h20L12 2z"/></svg>' },
  { id: "3", name: "BRCGS Food Safety", category: "Safety", color: "#F97316", svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>' },
  { id: "4", name: "ISO 14001", category: "Environment", color: "#0EA5E9", svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>' },
]'''
    content = re.sub(tech_pattern, new_tech, content, flags=re.DOTALL)

    # Replace Some Meta
    content = content.replace('"Why Choose Aventiq"', '"Why Choose Apex Packaging"')
    content = content.replace('"Engineering Excellence Meets World-Class Design"', '"Manufacturing Excellence Meets Sustainable Design"')
    content = content.replace('"We don\'t just write code — we architect high-converting digital products that scale smoothly with your business goals."', '"We don\'t just make boxes — we engineer sustainable packaging solutions that protect your products and elevate your brand."')
    
    content = content.replace('"What We Build"', '"Our Products & Solutions"')
    content = content.replace('"From strategy to deployment, Aventiq delivers technology solutions designed to solve real business problems and create long-term value."', '"From structural design to mass production, Apex delivers packaging solutions tailored to your industry standards."')
    
    content = content.replace('"Tech Stack"', '"Certifications"')
    content = content.replace('"Technologies We Use"', '"Quality & Sustainability Certifications"')
    
    content = content.replace('"Projects Delivered"', '"Millions of Units Produced"')
    content = content.replace('"Happy Clients"', '"Global Partners"')
    content = content.replace('"Technologies"', '"Material Types"')
    
    with open(PAGE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)


def rewrite_nav():
    with open(NAV_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('Aventiq', 'Apex')
    
    # Replace dropdown items
    content = content.replace('Web Development', 'Corrugated Boxes')
    content = content.replace('SaaS Development', 'Flexible Packaging')
    content = content.replace('UI/UX Design', 'Rigid Containers')
    content = content.replace('AI Development', 'Medical Packaging')
    content = content.replace('Cloud & DevOps', 'Custom Design')
    content = content.replace('Digital Marketing', 'Sustainable Solutions')
    content = content.replace('SEO', 'Food & Beverage')
    
    with open(NAV_PATH, 'w', encoding='utf-8') as f:
        f.write(content)


def rewrite_footer():
    try:
        with open(FOOTER_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace('Aventiq', 'Apex')
        content = content.replace('aventiq', 'apex')
        content = content.replace('Premium software development agency specializing in scalable web, mobile, and AI solutions.', 'Leading manufacturer of sustainable packaging solutions for global industries.')
        
        content = content.replace('Web Development', 'Corrugated Boxes')
        content = content.replace('SaaS Development', 'Flexible Packaging')
        content = content.replace('Mobile Apps', 'Rigid Containers')
        content = content.replace('AI Solutions', 'Medical Packaging')
        content = content.replace('Cloud Architecture', 'Sustainable Solutions')
        
        with open(FOOTER_PATH, 'w', encoding='utf-8') as f:
            f.write(content)
    except FileNotFoundError:
        pass


if __name__ == "__main__":
    rewrite_page()
    rewrite_nav()
    rewrite_footer()
