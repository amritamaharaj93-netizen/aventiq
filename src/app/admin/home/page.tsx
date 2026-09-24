"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Loader2, 
  Layout, 
  Sparkles, 
  Sliders, 
  Award, 
  BarChart3, 
  Megaphone, 
  Link as LinkIcon, 
  Navigation, 
  Layers, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Image as ImageIcon,
  Eye,
  EyeOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), { ssr: false })

export interface NavLink {
  id: string
  name: string
  href: string
  isActive?: boolean
}

export interface HeroSlide {
  id: string
  badge: string
  headline: string
  headlineHighlight: string
  description: string
  ctaText: string
  ctaLink: string
  accentColor: string
  accentEndColor: string
  imageUrl: string
}

export interface ServiceCard {
  id: string
  iconName: string
  title: string
  desc: string
  slug: string
}

export interface FeatureCard {
  id: string
  title: string
  description: string
  iconName: string
}

export interface StatItem {
  id: string
  number: string
  label: string
  subtext: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  quote: string
  rating: number
}

export interface PartnerItem {
  id: string
  name: string
}

export interface BlogPostItem {
  id: string
  tag: string
  tagColor: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
}

export interface TechItem {
  id: string
  name: string
  category: string
  color: string
  svgString: string
  imageUrl?: string
}

export interface FaqItem {
  id: string
  q: string
  a: string
}

export interface HomeSettingsContent {
  headerLogoUrl: string
  headerCtaText: string
  headerCtaLink: string
  navLinks: NavLink[]

  heroSlides: HeroSlide[]

  servicesBadge: string
  servicesTitle: string
  servicesSub: string
  servicesList: ServiceCard[]

  whyChooseUsBadge: string
  whyChooseUsTitle: string
  whyChooseUsSub: string
  features: FeatureCard[]

  stats: StatItem[]

  ctaHeadline: string
  ctaSubtext: string
  ctaButtonText: string
  ctaButtonLink: string

  // Newly Added Sections
  testimonialsBadge: string
  testimonialsTitle: string
  testimonialsList: TestimonialItem[]
  
  partnersBadge: string
  partnersTitle: string
  partnersList: PartnerItem[]
  
  blogBadge: string
  blogTitle: string
  blogSub: string
  blogPostsList: BlogPostItem[]
  
  techBadge: string
  techTitle: string
  techStackList: TechItem[]
  
  faqBadge: string
  faqTitle: string
  faqSub: string
  faqList: FaqItem[]
  
  contactBadge: string
  contactTitleBase: string
  contactTitleHighlight: string
  contactSub: string
  
  finalCtaBadge: string
  finalCtaTitleBase: string
  finalCtaTitleHighlight: string
  finalCtaSub: string

  // Footer
  footerLogoUrl: string
  footerDescription: string
  footerEmail: string
  footerPhone: string
  footerLocation: string
  footerCopyrightText: string
  footerCompanyLinks: NavLink[]
  footerSocialLinks: SocialLink[]
}

const DEFAULT_HOME_SETTINGS: HomeSettingsContent = {
  headerLogoUrl: "/img/logo_transparent.png",
  headerCtaText: "Start a Project",
  headerCtaLink: "/contact",
  navLinks: [
    { id: "1", name: "Home", href: "/", isActive: true },
    { id: "2", name: "Services", href: "/services", isActive: true },
    { id: "3", name: "Projects", href: "/projects", isActive: true },
    { id: "4", name: "About", href: "/about", isActive: true },
    { id: "5", name: "Blog", href: "/blog", isActive: true },
    { id: "6", name: "Contact", href: "/contact", isActive: true },
  ],

  servicesBadge: "Our Services",
  servicesTitle: "What We Build",
  servicesSub: "From strategy to deployment, Aventiq delivers technology solutions designed to solve real business problems and create long-term value.",
  servicesList: [
    { id: "1", iconName: "LayoutTemplate", title: "Web Development", desc: "High-performance, accessible, and modern web applications built for scale.", slug: "web-development" },
    { id: "2", iconName: "Cloud", title: "SaaS Development", desc: "End-to-end multi-tenant software as a service platform engineering.", slug: "saas-development" },
    { id: "3", iconName: "Palette", title: "UI/UX Design", desc: "Beautiful, intuitive interfaces and user experiences that delight and convert.", slug: "ui-ux-design" },
    { id: "4", iconName: "Cpu", title: "AI Development", desc: "Intelligent automation and integrations powered by modern machine learning.", slug: "ai-development" },
    { id: "5", iconName: "Server", title: "Cloud & DevOps", desc: "Scalable cloud infrastructure, CI/CD pipelines, and reliable deployment workflows.", slug: "cloud-devops" },
    { id: "6", iconName: "Megaphone", title: "Digital Marketing", desc: "Data-driven marketing strategies that amplify your brand and drive growth.", slug: "digital-marketing" },
    { id: "7", iconName: "Search", title: "SEO", desc: "Search engine optimization that boosts visibility and organic traffic.", slug: "seo" },
    { id: "8", iconName: "Target", title: "Meta Ads", desc: "High-ROI Facebook and Instagram ad campaigns that reach your target audience.", slug: "meta-ads" },
    { id: "9", iconName: "MousePointerClick", title: "Google Ads", desc: "Strategic Google Ads management to maximize conversions and minimize ad spend.", slug: "google-ads" },
  ],

  heroSlides: [
    {
      id: "1",
      badge: "Aventiq 2.0 is now live",
      headline: "We build premium tech",
      headlineHighlight: "digital experiences",
      description: "Aventiq is a world-class software development agency specializing in enterprise SaaS platforms, high-performance mobile applications, and intelligent cloud architecture.",
      ctaText: "Start a Project",
      ctaLink: "/contact",
      accentColor: "#0067D9",
      accentEndColor: "#00C6F7",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "2",
      badge: "Mobile Excellence",
      headline: "Native apps that users",
      headlineHighlight: "love & engage with",
      description: "We craft pixel-perfect iOS and Android applications with smooth animations, offline-first architecture, and real-time sync that deliver 4.8+ star experiences.",
      ctaText: "Build Your App",
      ctaLink: "/contact",
      accentColor: "#10B981",
      accentEndColor: "#34D399",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "3",
      badge: "Cloud Infrastructure",
      headline: "Scalable systems built",
      headlineHighlight: "for future growth",
      description: "Our cloud-native architectures ensure maximum uptime, rapid scalability, and optimized operational costs for enterprise operations.",
      ctaText: "Explore DevOps",
      ctaLink: "/services",
      accentColor: "#F59E0B",
      accentEndColor: "#FCD34D",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "4",
      badge: "AI Integrations",
      headline: "Automate intelligently with",
      headlineHighlight: "machine learning",
      description: "Leverage generative AI and custom machine learning models to streamline workflows and deliver next-generation insights.",
      ctaText: "Learn More",
      ctaLink: "/services",
      accentColor: "#8B5CF6",
      accentEndColor: "#C4B5FD",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200"
    }
  ],

  whyChooseUsBadge: "Why Choose Aventiq",
  whyChooseUsTitle: "Engineering Excellence Meets World-Class Design",
  whyChooseUsSub: "We don't just write code — we architect high-converting digital products that scale smoothly with your business goals.",
  features: [
    { id: "1", title: "Enterprise Reliability", description: "Built with zero-downtime microservices and cloud-native architecture.", iconName: "ShieldCheck" },
    { id: "2", title: "Sub-100ms Performance", description: "Optimized bundle sizes, edge rendering, and sub-second asset loading.", iconName: "Zap" },
    { id: "3", title: "Pixel-Perfect UI/UX", description: "Custom tailored aesthetic interfaces engineered for maximum conversion.", iconName: "Palette" },
    { id: "4", title: "Dedicated Support", description: "24/7 technical monitoring, security patches, and SLA guarantees.", iconName: "Server" }
  ],

  stats: [
    { id: "1", number: "150+", label: "Projects Delivered", subtext: "Enterprise & Startup Apps" },
    { id: "2", number: "99.9%", label: "Uptime SLA", subtext: "Cloud Infrastructure" },
    { id: "3", number: "4.9/5", label: "Client Satisfaction", subtext: "Verified Ratings" },
    { id: "4", number: "24/7", label: "DevOps Monitoring", subtext: "Proactive Security" }
  ],

  ctaHeadline: "Ready to Build Something Extraordinary?",
  ctaSubtext: "Schedule a free technical architecture consultation with our senior engineers.",
  ctaButtonText: "Get Free Consultation",
  ctaButtonLink: "/contact",

  testimonialsBadge: "Client Reviews",
  testimonialsTitle: "Real Stories of Growth & Success",
  testimonialsList: [
    {
      id: "1",
      name: "Rahul Desai",
      role: "CTO, TechVanguard India",
      quote: "Aventiq transformed our legacy system into a modern SaaS platform. Their team delivered ahead of schedule with exceptional code quality. The architecture handles 10x our original traffic across India. Our experience throughout the engagement was incredible. We were guided whenever we had queries and the engineering staff is highly professional.",
      rating: 5,
    },
    {
      id: "2",
      name: "Vikram Mehta",
      role: "Founder, CloudSync Networks",
      quote: "Working with Aventiq felt like having an in-house engineering team in Bengaluru. Their deep understanding of cloud architecture and DevOps practices helped us reduce infrastructure costs by 40%. Highly recommend them to anyone needing serious backend scaling for the Indian market.",
      rating: 5,
    },
    {
      id: "3",
      name: "Priya Sharma",
      role: "VP of Product, DataFlow Systems",
      quote: "The mobile application Aventiq built for us has a 4.8-star rating and helped us seamlessly expand into Tier 2 and Tier 3 cities. Their attention to UX details and smooth animations set our product apart from every competitor. An absolute joy to collaborate with from start to finish.",
      rating: 5,
    },
    {
      id: "4",
      name: "Anjali Kapoor",
      role: "Director of Engineering, FinTech Corp",
      quote: "They didn't just write code; they partnered with us to fundamentally improve our product strategy for the UPI ecosystem. The best technical partners we've ever hired in India. The migration was completely seamless without any downtime.",
      rating: 5,
    },
  ],
  
  partnersBadge: "Our Trusted Partners",
  partnersTitle: "Companies We've Built & Delivered For",
  partnersList: [
    { id: "1", name: "TechVanguard India" },
    { id: "2", name: "CloudSync Networks" },
    { id: "3", name: "DataFlow Systems" },
    { id: "4", name: "FinTech Corp" },
    { id: "5", name: "NexGen Solutions" },
    { id: "6", name: "Innovate Labs" },
    { id: "7", name: "Acme Corp" },
    { id: "8", name: "GlobalTech" },
    { id: "9", name: "FutureSoft" },
    { id: "10", name: "RapidScale AI" },
    { id: "11", name: "MetaEdge" },
    { id: "12", name: "Zenith Digital" },
    { id: "13", name: "Prism Analytics" }
  ],
  
  blogBadge: "Insights",
  blogTitle: "Latest from Our Blog",
  blogSub: "Insights on engineering, design, and technology trends from the Aventiq team.",
  blogPostsList: [
    {
      id: "1",
      tag: "Engineering",
      tagColor: "#0067D9",
      title: "Building Scalable SaaS Platforms with Next.js and Edge Computing",
      excerpt: "Learn how we architect multi-tenant SaaS applications that serve thousands of concurrent users with sub-100ms response times.",
      date: "Aug 18, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "2",
      tag: "AI & ML",
      tagColor: "#8B5CF6",
      title: "Integrating AI Agents into Enterprise Workflows: A Practical Guide",
      excerpt: "A deep dive into how we build intelligent automation pipelines that reduce manual work by up to 60% for our enterprise clients.",
      date: "Aug 12, 2026",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "3",
      tag: "Design",
      tagColor: "#EC4899",
      title: "The Art of Micro-Interactions: Why Small Details Win Big Users",
      excerpt: "How subtle animations and thoughtful UI feedback loops can dramatically improve user retention and satisfaction scores.",
      date: "Aug 5, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
    },
  ],
  
  techBadge: "Tech Stack",
  techTitle: "Technologies We Use",
  techStackList: [
    {
      id: "1",
      name: "HTML",
      category: "Frontend",
      color: "#E34F26",
      svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><path d="M3 3h18l-1.5 16L12 22l-7.5-3L3 3z" strokeLinejoin="round" /><path d="M7.5 7h9l-.5 4.5h-8" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 11.5l-.5 4.5-3.5 1.5-3.5-1.5-.2-2" strokeLinecap="round" strokeLinejoin="round" /></svg>'
    },
    {
      id: "2",
      name: "CSS",
      category: "Frontend",
      color: "#1572B6",
      svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><path d="M3 3h18l-1.5 16L12 22l-7.5-3L3 3z" strokeLinejoin="round" /><path d="M16.5 7H7.5l.5 4.5h8l-.5 4.5-3.5 1.5-3.5-1.5-.2-2" strokeLinecap="round" strokeLinejoin="round" /></svg>'
    },
    {
      id: "3",
      name: "React",
      category: "Frontend",
      color: "#61DAFB",
      svgString: '<svg viewBox="-11.5 -10.2 23 20.4" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-14 h-14"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/><circle r="2" fill="currentColor" stroke="none"/></svg>'
    },
    {
      id: "4",
      name: "Next.js",
      category: "Frontend",
      color: "#FFFFFF",
      svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><circle cx="12" cy="12" r="10"/><path d="M8 8v8l8-8v8"/></svg>'
    },
    {
      id: "5",
      name: "PHP",
      category: "Backend",
      color: "#777BB4",
      svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><ellipse cx="12" cy="12" rx="10" ry="6"/><text x="12" y="16" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">PHP</text></svg>'
    },
    {
      id: "6",
      name: "WordPress",
      category: "CMS",
      color: "#21759B",
      svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><circle cx="12" cy="12" r="10"/><path d="M6 10l3 8.5L12 12l3 6.5L18 10" strokeLinejoin="round"/></svg>'
    },
    {
      id: "7",
      name: "Android",
      category: "Mobile",
      color: "#3DDC84",
      svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><path d="M5 14v-4a7 7 0 0 1 14 0v4M8 8v-2M16 8v-2"/><rect x="5" y="14" width="14" height="4" rx="1"/></svg>'
    },
    {
      id: "8",
      name: "AWS",
      category: "Cloud",
      color: "#FF9900",
      svgString: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14"><path d="M4 15s4 4 10 2c-3 1-7-1-10-2z" fill="currentColor" stroke="none"/><path d="M14 12c-1.5 2-4.5 3-7 1.5 1-1 3.5-2.5 7-1.5z" fill="currentColor" stroke="none"/><path d="M19 15l-2 1m2-1l-1-2" strokeWidth="2"/><text x="12" y="11" fontSize="8" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">AWS</text></svg>'
    },
    {
      id: "9",
      name: "GitHub",
      category: "Version Control",
      color: "#FFFFFF",
      svgString: '<svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>'
    },
    {
      id: "10",
      name: "Vercel",
      category: "Hosting",
      color: "#FFFFFF",
      svgString: '<svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14"><path d="M12 4L22 20H2L12 4Z"/></svg>'
    }
  ],
  
  faqBadge: "FAQ",
  faqTitle: "Frequently Asked Questions",
  faqSub: "Got questions? We've got answers. If you don't see your question here, feel free to reach out to our team.",
  faqList: [
    {
      id: "1",
      q: "What is your typical project timeline?",
      a: "Project timelines vary depending on scope and complexity. A simple MVP might take 4-8 weeks, while enterprise SaaS platforms typically take 3-6 months. We work iteratively, providing deliverables every sprint."
    },
    {
      id: "2",
      q: "Do you provide post-launch support and maintenance?",
      a: "Yes, we offer comprehensive post-launch support, maintenance, and SLA-backed retainers to ensure your software remains secure, performant, and up-to-date with the latest technologies."
    },
    {
      id: "3",
      q: "What is your pricing model?",
      a: "We offer flexible pricing models including fixed-price for well-defined scopes and time-and-materials for agile projects with evolving requirements. We're transparent about costs and provide detailed estimates."
    },
    {
      id: "4",
      q: "Will I own the intellectual property (IP)?",
      a: "Absolutely. Once the project is fully paid for, you receive complete ownership of all source code, designs, and intellectual property."
    },
    {
      id: "5",
      q: "How do you ensure the quality of your code?",
      a: "We employ rigorous code reviews, automated testing (unit, integration, and E2E), CI/CD pipelines, and adhere to strict coding standards to deliver robust, bug-free applications."
    }
  ],
  
  contactBadge: "Contact Us",
  contactTitleBase: "Let's build something\n",
  contactTitleHighlight: "extraordinary together.",
  contactSub: "Whether you have a fully formed project or just an idea on a napkin, our team is ready to bring your vision to life.",
  
  finalCtaBadge: "Let's Collaborate",
  finalCtaTitleBase: "Have an Idea? ",
  finalCtaTitleHighlight: "Let's Build It.",
  finalCtaSub: "Tell Aventiq what you're building. We'll help turn your vision into a scalable digital product.",

  footerLogoUrl: "/img/logo_transparent.png",
  footerDescription: "Aventiq is a modern software development company that helps businesses transform ideas into scalable digital products and technology solutions.",
  footerEmail: "aventiq34@gmail.com",
  footerPhone: "8239988743",
  footerLocation: "Kokar, Ranchi, Jharkhand, India",
  footerCopyrightText: "© 2026 Aventiq. All rights reserved.",
  footerCompanyLinks: [
    { id: "1", name: "About", href: "/about" },
    { id: "2", name: "Projects", href: "/projects" },
    { id: "3", name: "Careers", href: "/careers" },
    { id: "4", name: "Contact", href: "/contact" },
    { id: "5", name: "Blog", href: "/blog" }
  ],
  footerSocialLinks: [
    { id: "1", platform: "LinkedIn", url: "https://linkedin.com" },
    { id: "2", platform: "GitHub", url: "https://github.com" },
    { id: "3", platform: "Twitter", url: "https://twitter.com" },
    { id: "4", platform: "Instagram", url: "https://instagram.com" }
  ]
}

export default function AdminHomeSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSavedSuccess, setIsSavedSuccess] = useState(false)
  const [formData, setFormData] = useState<HomeSettingsContent>(DEFAULT_HOME_SETTINGS)

  // Load saved content from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_home")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object") {
          let loadedHeroSlides = Array.isArray(parsed.heroSlides) ? parsed.heroSlides : DEFAULT_HOME_SETTINGS.heroSlides;
          
          if (loadedHeroSlides.length < 4) {
            const existingIds = loadedHeroSlides.map((s: any) => s.id);
            const missing = DEFAULT_HOME_SETTINGS.heroSlides.filter(s => !existingIds.includes(s.id));
            loadedHeroSlides = [...loadedHeroSlides, ...missing];
          }

          setFormData({
            ...DEFAULT_HOME_SETTINGS,
            ...parsed,
            navLinks: Array.isArray(parsed.navLinks) ? parsed.navLinks : DEFAULT_HOME_SETTINGS.navLinks,
            heroSlides: loadedHeroSlides,
            servicesList: Array.isArray(parsed.servicesList) ? parsed.servicesList : DEFAULT_HOME_SETTINGS.servicesList,
            features: Array.isArray(parsed.features) ? parsed.features : DEFAULT_HOME_SETTINGS.features,
            stats: Array.isArray(parsed.stats) ? parsed.stats : DEFAULT_HOME_SETTINGS.stats,
            testimonialsList: Array.isArray(parsed.testimonialsList) ? parsed.testimonialsList : DEFAULT_HOME_SETTINGS.testimonialsList,
            partnersList: Array.isArray(parsed.partnersList) ? parsed.partnersList : DEFAULT_HOME_SETTINGS.partnersList,
            blogPostsList: Array.isArray(parsed.blogPostsList) ? parsed.blogPostsList : DEFAULT_HOME_SETTINGS.blogPostsList,
            techStackList: Array.isArray(parsed.techStackList) ? parsed.techStackList : DEFAULT_HOME_SETTINGS.techStackList,
            faqList: Array.isArray(parsed.faqList) ? parsed.faqList : DEFAULT_HOME_SETTINGS.faqList,
            footerCompanyLinks: Array.isArray(parsed.footerCompanyLinks) ? parsed.footerCompanyLinks : DEFAULT_HOME_SETTINGS.footerCompanyLinks,
            footerSocialLinks: Array.isArray(parsed.footerSocialLinks) ? parsed.footerSocialLinks : DEFAULT_HOME_SETTINGS.footerSocialLinks,
          })
        }
      } catch (e) {
        console.error("Failed to parse home settings from local storage")
      }
    }
  }, [])

  const logoFileInputRef = useRef<HTMLInputElement>(null)
  const heroFileInputRef = useRef<HTMLInputElement>(null)
  const [activeHeroSlideId, setActiveHeroSlideId] = useState<string | null>(null)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)

  const handleLogoImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploadingLogo(true)
      const url = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, headerLogoUrl: url }))
      
      try {
        const formDataPayload = new FormData()
        formDataPayload.append('file', file)
        formDataPayload.append('folder', 'aventiq_assets')
        
        const { uploadMedia } = await import('@/actions/upload')
        const response = await uploadMedia(formDataPayload)
        
        if (response.success && response.result) {
          setFormData(prev => ({ ...prev, headerLogoUrl: response.result.secure_url }))
        } else {
          console.error("Upload failed:", response.error)
          alert("Failed to upload logo. " + (response.error || ''))
        }
      } catch (error) {
        console.error("Error uploading logo:", error)
        alert("An error occurred during upload.")
      } finally {
        setIsUploadingLogo(false)
      }
    }
  }

  const footerLogoFileInputRef = useRef<HTMLInputElement>(null)
  const [isUploadingFooterLogo, setIsUploadingFooterLogo] = useState(false)

  const handleFooterLogoImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploadingFooterLogo(true)
      const url = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, footerLogoUrl: url }))
      
      try {
        const formDataPayload = new FormData()
        formDataPayload.append('file', file)
        formDataPayload.append('folder', 'aventiq_assets')
        
        const { uploadMedia } = await import('@/actions/upload')
        const response = await uploadMedia(formDataPayload)
        
        if (response.success && response.result) {
          setFormData(prev => ({ ...prev, footerLogoUrl: response.result.secure_url }))
        } else {
          console.error("Upload failed:", response.error)
          alert("Failed to upload footer logo. " + (response.error || ''))
        }
      } catch (error) {
        console.error("Error uploading footer logo:", error)
        alert("An error occurred during upload.")
      } finally {
        setIsUploadingFooterLogo(false)
      }
    }
  }

  const [isUploadingHero, setIsUploadingHero] = useState(false)

  const handleHeroImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && activeHeroSlideId) {
      setIsUploadingHero(true)
      const url = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        heroSlides: prev.heroSlides.map(s => s.id === activeHeroSlideId ? { ...s, imageUrl: url } : s)
      }))
      e.target.value = ''
      
      try {
        const formDataPayload = new FormData()
        formDataPayload.append('file', file)
        formDataPayload.append('folder', 'aventiq_heroes')
        
        const { uploadMedia } = await import('@/actions/upload')
        const response = await uploadMedia(formDataPayload)
        
        if (response.success && response.result) {
          setFormData(prev => ({
            ...prev,
            heroSlides: prev.heroSlides.map(s => s.id === activeHeroSlideId ? { ...s, imageUrl: response.result.secure_url } : s)
          }))
        } else {
          console.error("Upload failed:", response.error)
          alert("Failed to upload hero image. " + (response.error || ''))
        }
      } catch (error) {
        console.error("Error uploading hero image:", error)
        alert("An error occurred during upload.")
      } finally {
        setIsUploadingHero(false)
        setActiveHeroSlideId(null)
      }
    }
  }

  // Header Nav Links CRUD
  const addNavLink = () => {
    setFormData(prev => ({
      ...prev,
      navLinks: [...prev.navLinks, { id: Date.now().toString(), name: "New Page", href: "/new-page", isActive: true }]
    }))
  }
  const removeNavLink = (id: string) => {
    setFormData(prev => ({ ...prev, navLinks: prev.navLinks.filter(n => n.id !== id) }))
  }
  const updateNavLink = (id: string, field: "name" | "href", val: string) => {
    setFormData(prev => ({
      ...prev,
      navLinks: prev.navLinks.map(n => n.id === id ? { ...n, [field]: val } : n)
    }))
  }
  const toggleNavLinkStatus = (id: string) => {
    setFormData(prev => ({
      ...prev,
      navLinks: prev.navLinks.map(n => n.id === id ? { ...n, isActive: n.isActive !== false ? false : true } : n)
    }))
  }

  // Hero Slides CRUD
  const addHeroSlide = () => {
    const newSlide: HeroSlide = {
      id: Date.now().toString(),
      badge: "New Highlight Feature",
      headline: "Transform your tech",
      headlineHighlight: "into reality",
      description: "Custom software development designed for high performance and modern user experience.",
      ctaText: "Get Started",
      ctaLink: "/contact",
      accentColor: "#0067D9",
      accentEndColor: "#00C6F7",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
    }
    setFormData(prev => ({ ...prev, heroSlides: [...prev.heroSlides, newSlide] }))
  }
  const removeHeroSlide = (id: string) => {
    if (formData.heroSlides.length <= 1) return
    setFormData(prev => ({ ...prev, heroSlides: prev.heroSlides.filter(s => s.id !== id) }))
  }
  const updateHeroSlide = (id: string, field: keyof HeroSlide, val: string) => {
    setFormData(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map(s => s.id === id ? { ...s, [field]: val } : s)
    }))
  }

  // Services CRUD
  const addServiceCard = () => {
    const newService: ServiceCard = {
      id: Date.now().toString(),
      iconName: "Box",
      title: "New Service",
      desc: "Brief description of the service and its core benefits.",
      slug: "new-service"
    }
    setFormData(prev => ({ ...prev, servicesList: [...prev.servicesList, newService] }))
  }
  const removeServiceCard = (id: string) => {
    setFormData(prev => ({ ...prev, servicesList: prev.servicesList.filter(s => s.id !== id) }))
  }
  const updateServiceCard = (id: string, field: keyof ServiceCard, val: string) => {
    setFormData(prev => ({
      ...prev,
      servicesList: prev.servicesList.map(s => s.id === id ? { ...s, [field]: val } : s)
    }))
  }

  // Features CRUD
  const addFeature = () => {
    const newFeature: FeatureCard = {
      id: Date.now().toString(),
      title: "New Core Capability",
      description: "Detailed description of technical advantages and features offered.",
      iconName: "Zap"
    }
    setFormData(prev => ({ ...prev, features: [...prev.features, newFeature] }))
  }
  const removeFeature = (id: string) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter(f => f.id !== id) }))
  }
  const updateFeature = (id: string, field: keyof FeatureCard, val: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map(f => f.id === id ? { ...f, [field]: val } : f)
    }))
  }

  // Stats CRUD
  const addStat = () => {
    setFormData(prev => ({
      ...prev,
      stats: [...prev.stats, { id: Date.now().toString(), number: "100+", label: "New Metric", subtext: "Category Label" }]
    }))
  }
  const removeStat = (id: string) => {
    setFormData(prev => ({ ...prev, stats: prev.stats.filter(s => s.id !== id) }))
  }
  const updateStat = (id: string, field: keyof StatItem, val: string) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.map(s => s.id === id ? { ...s, [field]: val } : s)
    }))
  }

  // Testimonials CRUD
  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonialsList: [...prev.testimonialsList, { id: Date.now().toString(), name: "New Client", role: "Position, Company", quote: "Client review goes here.", rating: 5 }]
    }))
  }
  const removeTestimonial = (id: string) => {
    setFormData(prev => ({ ...prev, testimonialsList: prev.testimonialsList.filter(t => t.id !== id) }))
  }
  const updateTestimonial = (id: string, field: keyof TestimonialItem, val: string | number) => {
    setFormData(prev => ({
      ...prev,
      testimonialsList: prev.testimonialsList.map(t => t.id === id ? { ...t, [field]: val } : t)
    }))
  }

  // Partners CRUD
  const addPartner = () => {
    setFormData(prev => ({
      ...prev,
      partnersList: [...prev.partnersList, { id: Date.now().toString(), name: "New Partner" }]
    }))
  }
  const removePartner = (id: string) => {
    setFormData(prev => ({ ...prev, partnersList: prev.partnersList.filter(p => p.id !== id) }))
  }
  const updatePartner = (id: string, field: keyof PartnerItem, val: string) => {
    setFormData(prev => ({
      ...prev,
      partnersList: prev.partnersList.map(p => p.id === id ? { ...p, [field]: val } : p)
    }))
  }

  // Blog Posts CRUD
  const addBlogPost = () => {
    setFormData(prev => ({
      ...prev,
      blogPostsList: [...prev.blogPostsList, { 
        id: Date.now().toString(), 
        tag: "New Tag", 
        tagColor: "#0067D9", 
        title: "New Blog Post", 
        excerpt: "Brief description of the blog post...", 
        date: "Today", 
        readTime: "5 min read", 
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" 
      }]
    }))
  }
  const removeBlogPost = (id: string) => {
    setFormData(prev => ({ ...prev, blogPostsList: prev.blogPostsList.filter(p => p.id !== id) }))
  }
  const updateBlogPost = (id: string, field: keyof BlogPostItem, val: string) => {
    setFormData(prev => ({
      ...prev,
      blogPostsList: prev.blogPostsList.map(p => p.id === id ? { ...p, [field]: val } : p)
    }))
  }

  // Tech Stack CRUD
  const addTechItem = () => {
    setFormData(prev => ({
      ...prev,
      techStackList: [...prev.techStackList, {
        id: Date.now().toString(),
        name: "New Tech",
        category: "Frontend",
        color: "#FFFFFF",
        svgString: '<svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14"><circle cx="12" cy="12" r="10"/></svg>'
      }]
    }))
  }
  const removeTechItem = (id: string) => {
    setFormData(prev => ({ ...prev, techStackList: prev.techStackList.filter(t => t.id !== id) }))
  }
  const updateTechItem = (id: string, field: keyof TechItem, val: string) => {
    setFormData(prev => ({
      ...prev,
      techStackList: prev.techStackList.map(t => t.id === id ? { ...t, [field]: val } : t)
    }))
  }

  const [isUploadingTech, setIsUploadingTech] = useState<string | null>(null)
  const handleTechImageUpload = async (id: string, file: File) => {
    setIsUploadingTech(id)
    try {
      const formDataPayload = new FormData()
      formDataPayload.append('file', file)
      formDataPayload.append('folder', 'aventiq_assets')
      
      const { uploadMedia } = await import('@/actions/upload')
      const response = await uploadMedia(formDataPayload)
      
      if (response.success && response.result) {
        updateTechItem(id, "imageUrl", response.result.secure_url)
      } else {
        alert("Failed to upload tech logo. " + (response.error || ''))
      }
    } catch (error) {
      alert("An error occurred during upload.")
    } finally {
      setIsUploadingTech(null)
    }
  }

  // FAQ CRUD
  const addFaqItem = () => {
    setFormData(prev => ({
      ...prev,
      faqList: [...prev.faqList, {
        id: Date.now().toString(),
        q: "New Question?",
        a: "Answer goes here."
      }]
    }))
  }
  const removeFaqItem = (id: string) => {
    setFormData(prev => ({ ...prev, faqList: prev.faqList.filter(f => f.id !== id) }))
  }
  const updateFaqItem = (id: string, field: keyof FaqItem, val: string) => {
    setFormData(prev => ({
      ...prev,
      faqList: prev.faqList.map(f => f.id === id ? { ...f, [field]: val } : f)
    }))
  }

  // Footer Social Links CRUD
  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      footerSocialLinks: [...prev.footerSocialLinks, { id: Date.now().toString(), platform: "Social", url: "https://" }]
    }))
  }
  const removeSocialLink = (id: string) => {
    setFormData(prev => ({ ...prev, footerSocialLinks: prev.footerSocialLinks.filter(s => s.id !== id) }))
  }
  const updateSocialLink = (id: string, field: keyof SocialLink, val: string) => {
    setFormData(prev => ({
      ...prev,
      footerSocialLinks: prev.footerSocialLinks.map(s => s.id === id ? { ...s, [field]: val } : s)
    }))
  }

  // Save to Local Storage
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    localStorage.setItem("aventiq_admin_home", JSON.stringify(formData))

    setTimeout(() => {
      setIsLoading(false)
      setIsSavedSuccess(true)
      setTimeout(() => setIsSavedSuccess(false), 3000)
    }, 400)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto pb-16">
      
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
            Home Page & Navigation Management
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Customize header navigation, hero carousel slides, feature cards, stats counters, CTA banner, and footer links.
          </p>
        </div>

        {isSavedSuccess && (
          <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200 shadow-sm animate-in fade-in flex items-center gap-1.5">
            <CheckCircle2 size={16} /> All Home settings saved!
          </span>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-12">
        
        {/* SECTION 1: HEADER & NAVIGATION */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <Navigation className="text-[#0067D9]" size={20} /> Header Logo & Top Navbar Links
              </h2>
              <Button type="button" onClick={addNavLink} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9] cursor-pointer">
                <Plus size={14} /> Add Nav Link
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Header Logo Image</label>
                <div 
                  className="w-full h-14 p-1.5 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => logoFileInputRef.current?.click()}
                >
                  <div className="w-14 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    {formData.headerLogoUrl ? (
                      <img src={formData.headerLogoUrl} alt="Logo" className="w-full h-full object-contain p-1" />
                    ) : (
                      <ImageIcon size={18} className="text-slate-300" />
                    )}
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-[13px] font-bold text-[#020B1C] truncate">
                      {formData.headerLogoUrl ? formData.headerLogoUrl.split('/').pop() : 'Upload Logo'}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">Click to change image</span>
                  </div>
                  <input 
                    type="file" 
                    ref={logoFileInputRef}
                    className="hidden" 
                    accept="image/*"
                    onChange={handleLogoImageChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Header CTA Text</label>
                  <input 
                    type="text" 
                    value={formData.headerCtaText}
                    onChange={(e) => setFormData({...formData, headerCtaText: e.target.value})}
                    className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-semibold text-[#020B1C]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Header CTA Link</label>
                  <input 
                    type="text" 
                    value={formData.headerCtaLink}
                    onChange={(e) => setFormData({...formData, headerCtaLink: e.target.value})}
                    className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-semibold text-[#020B1C]"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Links Table */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Manage Top Header Menu Items</label>
              <div className="space-y-2">
                {formData.navLinks.map((link, idx) => (
                  <div key={link.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 transition-all hover:bg-slate-100/80">
                    <span className="text-xs font-bold text-slate-400 w-6">#{idx + 1}</span>
                    <input 
                      type="text"
                      placeholder="Link Name (e.g. Services)"
                      value={link.name}
                      onChange={(e) => updateNavLink(link.id, "name", e.target.value)}
                      className="flex-1 h-11 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold shadow-sm focus:border-[#0067D9] focus:ring-1 focus:ring-[#0067D9]"
                    />
                    <input 
                      type="text"
                      placeholder="URL Href (e.g. /services)"
                      value={link.href}
                      onChange={(e) => updateNavLink(link.id, "href", e.target.value)}
                      className="flex-1 h-11 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold font-mono shadow-sm focus:border-[#0067D9] focus:ring-1 focus:ring-[#0067D9]"
                    />
                    
                    {/* Circle Toggle Switch */}
                    <button 
                      type="button" 
                      onClick={() => toggleNavLinkStatus(link.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0067D9] focus:ring-offset-1 ${link.isActive !== false ? 'bg-[#10B981]' : 'bg-slate-300'}`}
                      title={link.isActive !== false ? "Active" : "Inactive"}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${link.isActive !== false ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => removeNavLink(link.id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        {/* SECTION 2: HERO CAROUSEL SLIDES CRUD */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <Sparkles className="text-[#0067D9]" size={20} /> Hero Carousel Slides 
              </h2>
              <Button type="button" onClick={addHeroSlide} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9] cursor-pointer">
                <Plus size={14} /> Add Hero Slide
              </Button>
            </div>

            <div className="space-y-6">
              {/* Hidden file input for hero images */}
              <input 
                type="file" 
                ref={heroFileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={handleHeroImageChange}
              />

              {formData.heroSlides.map((slide, idx) => (
                <div key={slide.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-extrabold px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700">
                      Slide #{idx + 1}
                    </span>
                    {formData.heroSlides.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeHeroSlide(slide.id)}
                        className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={14} /> Remove Slide
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Badge Tagline</label>
                      <input 
                        type="text" 
                        value={slide.badge}
                        onChange={(e) => updateHeroSlide(slide.id, "badge", e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Hero Slide Image</label>
                      <div 
                        className="w-full h-11 p-1 pr-3 rounded-xl border border-slate-200 bg-white flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors"
                        onClick={() => {
                          setActiveHeroSlideId(slide.id)
                          heroFileInputRef.current?.click()
                        }}
                      >
                        <div className="w-12 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                          {slide.imageUrl ? (
                            <img src={slide.imageUrl} alt="Slide Image" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={14} className="text-slate-300" />
                          )}
                        </div>
                        <div className="flex flex-col flex-1 overflow-hidden">
                          <span className="text-[11px] font-bold text-[#020B1C] truncate">
                            {slide.imageUrl ? slide.imageUrl.split('/').pop() : 'Upload Image'}
                          </span>
                          <span className="text-[9px] font-medium text-slate-400 -mt-0.5">Click to change</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Headline Base</label>
                      <input 
                        type="text" 
                        value={slide.headline}
                        onChange={(e) => updateHeroSlide(slide.id, "headline", e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Headline Highlight (Gradient Text)</label>
                      <input 
                        type="text" 
                        value={slide.headlineHighlight}
                        onChange={(e) => updateHeroSlide(slide.id, "headlineHighlight", e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0067D9]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Description</label>
                    <RichTextEditor 
                      value={slide.description}
                      onChange={(val) => updateHeroSlide(slide.id, "description", val)}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">CTA Button Text</label>
                      <input 
                        type="text" 
                        value={slide.ctaText}
                        onChange={(e) => updateHeroSlide(slide.id, "ctaText", e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">CTA Button Link</label>
                      <input 
                        type="text" 
                        value={slide.ctaLink}
                        onChange={(e) => updateHeroSlide(slide.id, "ctaLink", e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Gradient Start Color</label>
                      <div className="flex items-center gap-2 w-full h-10 px-3 rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-[#0067D9] focus-within:ring-1 focus-within:ring-[#0067D9]">
                        <input 
                          type="color" 
                          value={slide.accentColor}
                          onChange={(e) => updateHeroSlide(slide.id, "accentColor", e.target.value)}
                          className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0"
                        />
                        <input 
                          type="text" 
                          value={slide.accentColor}
                          onChange={(e) => updateHeroSlide(slide.id, "accentColor", e.target.value)}
                          className="flex-1 bg-transparent border-none focus:outline-none text-xs font-semibold font-mono"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Gradient End Color</label>
                      <div className="flex items-center gap-2 w-full h-10 px-3 rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-[#0067D9] focus-within:ring-1 focus-within:ring-[#0067D9]">
                        <input 
                          type="color" 
                          value={slide.accentEndColor}
                          onChange={(e) => updateHeroSlide(slide.id, "accentEndColor", e.target.value)}
                          className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0"
                        />
                        <input 
                          type="text" 
                          value={slide.accentEndColor}
                          onChange={(e) => updateHeroSlide(slide.id, "accentEndColor", e.target.value)}
                          className="flex-1 bg-transparent border-none focus:outline-none text-xs font-semibold font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        {/* SECTION 2.5: WHAT WE BUILD (SERVICES) */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <Layers className="text-[#0067D9]" size={20} /> What We Build (Services Section)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Section Badge</label>
                <input 
                  type="text" 
                  value={formData.servicesBadge}
                  onChange={(e) => setFormData({...formData, servicesBadge: e.target.value})}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Section Title</label>
                <input 
                  type="text" 
                  value={formData.servicesTitle}
                  onChange={(e) => setFormData({...formData, servicesTitle: e.target.value})}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase">Sub-headline Description</label>
              <RichTextEditor 
                value={formData.servicesSub}
                onChange={(val) => setFormData({...formData, servicesSub: val})}
              />
            </div>

            {/* Service Cards CRUD UI */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Manage Service Cards</label>
                <Button type="button" onClick={addServiceCard} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9] cursor-pointer h-8">
                  <Plus size={14} className="mr-1" /> Add Service Card
                </Button>
              </div>
              <div className="space-y-3">
                {formData.servicesList.map((srv, idx) => (
                  <div key={srv.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-3 transition-all hover:bg-slate-100/80">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Card #{idx + 1}</span>
                      <button 
                        type="button" 
                        onClick={() => removeServiceCard(srv.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 cursor-pointer"
                        title="Remove Service"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Title</label>
                        <input 
                          type="text" 
                          value={srv.title}
                          onChange={(e) => updateServiceCard(srv.id, "title", e.target.value)}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:border-[#0067D9] focus:ring-1 focus:ring-[#0067D9]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Icon Name (Lucide)</label>
                        <input 
                          type="text" 
                          value={srv.iconName}
                          onChange={(e) => updateServiceCard(srv.id, "iconName", e.target.value)}
                          placeholder="e.g. LayoutTemplate"
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:border-[#0067D9] focus:ring-1 focus:ring-[#0067D9]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Slug / Link Path</label>
                        <input 
                          type="text" 
                          value={srv.slug}
                          onChange={(e) => updateServiceCard(srv.id, "slug", e.target.value)}
                          placeholder="e.g. web-development"
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:border-[#0067D9] focus:ring-1 focus:ring-[#0067D9]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                      <RichTextEditor 
                        value={srv.desc}
                        onChange={(val) => updateServiceCard(srv.id, "desc", val)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        {/* SECTION 3: WHY CHOOSE US / FEATURES CRUD */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <Award className="text-[#0067D9]" size={20} /> Why Choose Us Section & Feature Cards 
              </h2>
              <Button type="button" onClick={addFeature} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9] cursor-pointer">
                <Plus size={14} /> Add Feature Card
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Section Badge</label>
                <input 
                  type="text" 
                  value={formData.whyChooseUsBadge}
                  onChange={(e) => setFormData({...formData, whyChooseUsBadge: e.target.value})}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Section Title</label>
                <input 
                  type="text" 
                  value={formData.whyChooseUsTitle}
                  onChange={(e) => setFormData({...formData, whyChooseUsTitle: e.target.value})}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 uppercase">Sub-headline Description</label>
              <textarea 
                rows={2}
                value={formData.whyChooseUsSub}
                onChange={(e) => setFormData({...formData, whyChooseUsSub: e.target.value})}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {formData.features.map((feat, idx) => (
                <div key={feat.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-extrabold text-slate-600">Feature #{idx + 1}</span>
                    <button type="button" onClick={() => removeFeature(feat.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  <input 
                    type="text"
                    placeholder="Feature Title"
                    value={feat.title}
                    onChange={(e) => updateFeature(feat.id, "title", e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold"
                  />
                  <RichTextEditor 
                    value={feat.description}
                    onChange={(val) => updateFeature(feat.id, "description", val)}
                  />
                </div>
              ))}
            </div>

          </div>
        {/* SECTION 4: STATS COUNTERS CRUD */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <BarChart3 className="text-[#0067D9]" size={20} /> Stats Counter Banner 
              </h2>
              <Button type="button" onClick={addStat} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9] cursor-pointer">
                <Plus size={14} /> Add Stat Counter
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {formData.stats.map((stat, idx) => (
                <div key={stat.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-bold text-slate-500">Stat #{idx + 1}</span>
                    <button type="button" onClick={() => removeStat(stat.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  <input 
                    type="text"
                    placeholder="Number (e.g. 150+)"
                    value={stat.number}
                    onChange={(e) => updateStat(stat.id, "number", e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm font-extrabold text-[#0067D9]"
                  />
                  <input 
                    type="text"
                    placeholder="Label (e.g. Projects)"
                    value={stat.label}
                    onChange={(e) => updateStat(stat.id, "label", e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold"
                  />
                  <input 
                    type="text"
                    placeholder="Subtext"
                    value={stat.subtext}
                    onChange={(e) => updateStat(stat.id, "subtext", e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-[11px] font-medium text-slate-500"
                  />
                </div>
              ))}
            </div>
          </div>

        {/* SECTION 5: CTA BANNER */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>

            <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2 border-b border-slate-100 pb-3">
              <Megaphone className="text-[#0067D9]" size={20} /> Bottom Call-to-Action Banner Settings
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Banner Main Headline</label>
                <input 
                  type="text" 
                  value={formData.ctaHeadline}
                  onChange={(e) => setFormData({...formData, ctaHeadline: e.target.value})}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Banner Subtext</label>
                <textarea 
                  rows={2}
                  value={formData.ctaSubtext}
                  onChange={(e) => setFormData({...formData, ctaSubtext: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">CTA Button Text</label>
                  <input 
                    type="text" 
                    value={formData.ctaButtonText}
                    onChange={(e) => setFormData({...formData, ctaButtonText: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">CTA Button Link</label>
                  <input 
                    type="text" 
                    value={formData.ctaButtonLink}
                    onChange={(e) => setFormData({...formData, ctaButtonLink: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6: TESTIMONIALS */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <Award className="text-[#0067D9]" size={20} /> Testimonials Section
              </h2>
              <Button type="button" onClick={addTestimonial} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9] cursor-pointer">
                <Plus size={14} /> Add Testimonial
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Badge</label><input type="text" value={formData.testimonialsBadge} onChange={(e) => setFormData({...formData, testimonialsBadge: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Title</label><input type="text" value={formData.testimonialsTitle} onChange={(e) => setFormData({...formData, testimonialsTitle: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {formData.testimonialsList.map((testi, idx) => (
                <div key={testi.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-extrabold text-slate-600">Testimonial #{idx + 1}</span>
                    <button type="button" onClick={() => removeTestimonial(testi.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" placeholder="Name" value={testi.name}
                      onChange={(e) => updateTestimonial(testi.id, "name", e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold"
                    />
                    <input 
                      type="text" placeholder="Role (e.g. CTO, Tech Corp)" value={testi.role}
                      onChange={(e) => updateTestimonial(testi.id, "role", e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium"
                    />
                  </div>
                  <RichTextEditor 
                    value={testi.quote}
                    onChange={(val) => updateTestimonial(testi.id, "quote", val)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7: TRUSTED PARTNERS */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <Globe className="text-[#0067D9]" size={20} /> Trusted Partners Section
              </h2>
              <Button type="button" onClick={addPartner} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9] cursor-pointer">
                <Plus size={14} /> Add Partner
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Badge</label><input type="text" value={formData.partnersBadge} onChange={(e) => setFormData({...formData, partnersBadge: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Title</label><input type="text" value={formData.partnersTitle} onChange={(e) => setFormData({...formData, partnersTitle: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Partner Companies</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {formData.partnersList.map((partner) => (
                  <div key={partner.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <input 
                      type="text"
                      placeholder="Company Name"
                      value={partner.name}
                      onChange={(e) => updatePartner(partner.id, "name", e.target.value)}
                      className="flex-1 h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold"
                    />
                    <button type="button" onClick={() => removePartner(partner.id)} className="p-1.5 text-slate-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 8: BLOG / INSIGHTS */}
          {/* SECTION 8: BLOG / INSIGHTS */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <Layers className="text-[#0067D9]" size={20} /> Blog / Insights Section
              </h2>
              <Button type="button" onClick={addBlogPost} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9] cursor-pointer">
                <Plus size={14} /> Add Blog Post
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Badge</label><input type="text" value={formData.blogBadge} onChange={(e) => setFormData({...formData, blogBadge: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Title</label><input type="text" value={formData.blogTitle} onChange={(e) => setFormData({...formData, blogTitle: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Description</label>
              <RichTextEditor value={formData.blogSub} onChange={(val) => setFormData({...formData, blogSub: val})} />
            </div>

            <div className="space-y-3 pt-4">
              <label className="text-xs font-bold text-slate-700 uppercase">Blog Posts</label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {formData.blogPostsList.map((post, idx) => (
                  <div key={post.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-[11px] font-extrabold text-slate-600">Post #{idx + 1}</span>
                      <button type="button" onClick={() => removeBlogPost(post.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Tag (e.g. Engineering)" value={post.tag} onChange={(e) => updateBlogPost(post.id, "tag", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold" />
                      <input type="text" placeholder="Tag Color (e.g. #0067D9)" value={post.tagColor} onChange={(e) => updateBlogPost(post.id, "tagColor", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold" />
                    </div>
                    <input type="text" placeholder="Post Title" value={post.title} onChange={(e) => updateBlogPost(post.id, "title", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold" />
                    <RichTextEditor 
                      value={post.excerpt} 
                      onChange={(val) => updateBlogPost(post.id, "excerpt", val)} 
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Date (e.g. Aug 18, 2026)" value={post.date} onChange={(e) => updateBlogPost(post.id, "date", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium" />
                      <input type="text" placeholder="Read Time (e.g. 8 min read)" value={post.readTime} onChange={(e) => updateBlogPost(post.id, "readTime", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium" />
                    </div>
                    <input type="text" placeholder="Image URL" value={post.image} onChange={(e) => updateBlogPost(post.id, "image", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 9: TECH STACK */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <Sliders className="text-[#0067D9]" size={20} /> Tech Stack Section
              </h2>
              <Button type="button" onClick={addTechItem} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9] cursor-pointer">
                <Plus size={14} /> Add Tech
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Badge</label><input type="text" value={formData.techBadge} onChange={(e) => setFormData({...formData, techBadge: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Title</label><input type="text" value={formData.techTitle} onChange={(e) => setFormData({...formData, techTitle: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
            </div>
            
            <div className="space-y-3 pt-4">
              <label className="text-xs font-bold text-slate-700 uppercase">Technologies</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.techStackList.map((tech, idx) => (
                  <div key={tech.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-[11px] font-extrabold text-slate-600">Tech #{idx + 1}</span>
                      <button type="button" onClick={() => removeTechItem(tech.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Name" value={tech.name} onChange={(e) => updateTechItem(tech.id, "name", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold" />
                      <input type="text" placeholder="Category" value={tech.category} onChange={(e) => updateTechItem(tech.id, "category", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold" />
                    </div>
                    <input type="text" placeholder="Hover Color Hex (e.g. #FFFFFF)" value={tech.color} onChange={(e) => updateTechItem(tech.id, "color", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold" />
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative">
                        {isUploadingTech === tech.id ? (
                          <Loader2 className="w-5 h-5 text-[#0067D9] animate-spin" />
                        ) : tech.imageUrl ? (
                          <img src={tech.imageUrl} alt="Tech" className="w-full h-full object-contain p-1" />
                        ) : (
                          <div dangerouslySetInnerHTML={{ __html: tech.svgString }} className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1 relative">
                        <input 
                          type="file" 
                          id={`tech-upload-${tech.id}`}
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleTechImageUpload(tech.id, e.target.files[0])
                          }}
                        />
                        <label 
                          htmlFor={`tech-upload-${tech.id}`}
                          className="w-full flex items-center justify-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs font-bold text-slate-700 transition-colors"
                        >
                          <ImageIcon size={14} /> 
                          {isUploadingTech === tech.id ? 'Uploading...' : 'Upload Icon'}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 10: FAQ */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <CheckCircle2 className="text-[#0067D9]" size={20} /> FAQ Section
              </h2>
              <Button type="button" onClick={addFaqItem} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9] cursor-pointer">
                <Plus size={14} /> Add Question
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Badge</label><input type="text" value={formData.faqBadge} onChange={(e) => setFormData({...formData, faqBadge: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Title</label><input type="text" value={formData.faqTitle} onChange={(e) => setFormData({...formData, faqTitle: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Description</label>
              <RichTextEditor value={formData.faqSub} onChange={(val) => setFormData({...formData, faqSub: val})} />
            </div>
            
            <div className="space-y-3 pt-4">
              <label className="text-xs font-bold text-slate-700 uppercase">Questions & Answers</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.faqList.map((faq, idx) => (
                  <div key={faq.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-[11px] font-extrabold text-slate-600">FAQ #{idx + 1}</span>
                      <button type="button" onClick={() => removeFaqItem(faq.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                    </div>
                    <input type="text" placeholder="Question" value={faq.q} onChange={(e) => updateFaqItem(faq.id, "q", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold" />
                    <RichTextEditor 
                      value={faq.a} 
                      onChange={(val) => updateFaqItem(faq.id, "a", val)} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 11: CONTACT US */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>
            <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2 border-b border-slate-100 pb-3">
              <Mail className="text-[#0067D9]" size={20} /> Contact Us Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Badge</label><input type="text" value={formData.contactBadge} onChange={(e) => setFormData({...formData, contactBadge: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Title Base</label><input type="text" value={formData.contactTitleBase} onChange={(e) => setFormData({...formData, contactTitleBase: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Title Highlight</label><input type="text" value={formData.contactTitleHighlight} onChange={(e) => setFormData({...formData, contactTitleHighlight: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Description</label><textarea rows={2} value={formData.contactSub} onChange={(e) => setFormData({...formData, contactSub: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium" /></div>
          </div>

          {/* SECTION 12: FINAL CTA */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>
            <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="text-[#0067D9]" size={20} /> Final Footer CTA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Badge</label><input type="text" value={formData.finalCtaBadge} onChange={(e) => setFormData({...formData, finalCtaBadge: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Title Base</label><input type="text" value={formData.finalCtaTitleBase} onChange={(e) => setFormData({...formData, finalCtaTitleBase: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
              <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Title Highlight</label><input type="text" value={formData.finalCtaTitleHighlight} onChange={(e) => setFormData({...formData, finalCtaTitleHighlight: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold" /></div>
            </div>
            <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Description</label><textarea rows={2} value={formData.finalCtaSub} onChange={(e) => setFormData({...formData, finalCtaSub: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium" /></div>
          </div>

        {/* SECTION 6: FOOTER SETTINGS */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>

            <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layout className="text-[#0067D9]" size={20} /> Footer Text & Social Links 
            </h2>

            <div className="space-y-2 pb-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Footer Logo Image</label>
              <div 
                className="w-full h-14 p-1.5 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => footerLogoFileInputRef.current?.click()}
              >
                <div className="w-14 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {formData.footerLogoUrl ? (
                    <img src={formData.footerLogoUrl} alt="Footer Logo" className="w-full h-full object-contain p-1" />
                  ) : (
                    <ImageIcon size={18} className="text-slate-300" />
                  )}
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <span className="text-[13px] font-bold text-[#020B1C] truncate">
                    {formData.footerLogoUrl ? formData.footerLogoUrl.split('/').pop() : 'Upload Footer Logo'}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">Click to change image</span>
                </div>
                <input 
                  type="file" 
                  ref={footerLogoFileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFooterLogoImageChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Footer Email</label>
                <input 
                  type="email" 
                  value={formData.footerEmail}
                  onChange={(e) => setFormData({...formData, footerEmail: e.target.value})}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Footer Phone</label>
                <input 
                  type="text" 
                  value={formData.footerPhone}
                  onChange={(e) => setFormData({...formData, footerPhone: e.target.value})}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Footer Address</label>
                <input 
                  type="text" 
                  value={formData.footerLocation}
                  onChange={(e) => setFormData({...formData, footerLocation: e.target.value})}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Footer Description</label>
                <textarea 
                  rows={3}
                  value={formData.footerDescription}
                  onChange={(e) => setFormData({...formData, footerDescription: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">Copyright Line</label>
                <textarea 
                  rows={3}
                  value={formData.footerCopyrightText}
                  onChange={(e) => setFormData({...formData, footerCopyrightText: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-medium"
                />
              </div>
            </div>

            {/* Social Links CRUD */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase">Social Media Links </label>
                <Button type="button" onClick={addSocialLink} variant="outline" size="sm" className="text-xs font-bold text-[#0067D9]">
                  <Plus size={14} /> Add Social Link
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.footerSocialLinks.map((social) => (
                  <div key={social.id} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <input 
                      type="text"
                      placeholder="Platform Name"
                      value={social.platform}
                      onChange={(e) => updateSocialLink(social.id, "platform", e.target.value)}
                      className="w-28 h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-bold"
                    />
                    <input 
                      type="text"
                      placeholder="URL"
                      value={social.url}
                      onChange={(e) => updateSocialLink(social.id, "url", e.target.value)}
                      className="flex-1 h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium"
                    />
                    <button type="button" onClick={() => removeSocialLink(social.id)} className="p-1.5 text-slate-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="h-12 px-10 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] text-white font-bold rounded-xl shadow-lg shadow-[#0067D9]/20 hover:shadow-[#0067D9]/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 text-base"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Saving Home Settings...
              </>
            ) : (
              <>
                <Save size={20} /> Save All Home Settings
              </>
            )}
          </Button>
        </div>

      </form>

    </div>
  )
}
