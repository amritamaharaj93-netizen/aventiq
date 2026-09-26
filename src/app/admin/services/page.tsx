"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface DeliverableFeature {
  title: string
  desc: string
}

export interface ServiceItem {
  id: string
  title: string
  slug: string
  status: string
  date: string
  desc: string
  subtitle: string
  overview: string
  tech: string[]
  features: DeliverableFeature[]
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "1",
    title: "Web Development",
    slug: "web-development",
    status: "Published",
    date: "Aug 12, 2026",
    desc: "High-performance, accessible, and modern web applications built for scale. We create responsive digital experiences that engage users and drive conversions.",
    subtitle: "High-performance web applications built for enterprise scale.",
    overview: "We engineer lightning-fast, highly secure web applications using modern JavaScript frameworks. Our architectures are designed to handle immense traffic while delivering a flawless, app-like experience in the browser.\n\nAt Aventiq, we understand that your digital presence is the core of your business. That's why we focus on building robust, scalable solutions tailored to your unique requirements. From complex enterprise SaaS platforms to high-conversion headless e-commerce sites, our full-stack engineering team ensures every product we build is optimized for peak performance, robust security, and exceptional user engagement. We leverage the latest cloud technologies and agile methodologies to bring your vision to life.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      { title: "Custom Web Applications", desc: "Tailor-made web solutions designed from the ground up to meet your specific business requirements with seamless user experiences." },
      { title: "E-Commerce Platforms", desc: "Scalable, secure, and conversion-optimized online stores built with the latest headless commerce technologies." },
      { title: "Enterprise SaaS Development", desc: "Robust multi-tenant architectures, complex data management, and secure APIs for software-as-a-service products." },
      { title: "CMS & Content Platforms", desc: "Dynamic, easy-to-manage content systems powered by headless CMS architecture like Sanity or WordPress." }
    ]
  },
  {
    id: "2",
    title: "SaaS Development",
    slug: "saas-development",
    status: "Published",
    date: "Jul 28, 2026",
    desc: "End-to-end multi-tenant software as a service platform engineering. From subscription billing to complex user roles, we build scalable platforms.",
    subtitle: "Scalable multi-tenant cloud platforms designed for rapid growth.",
    overview: "We specialize in building robust Software as a Service (SaaS) products engineered for reliability, security, and effortless scaling. From initial concept to deployment and continuous iteration, we build high-availability platforms that handle high user volumes and automated recurring transactions seamlessly.",
    tech: ["Node.js", "AWS", "PostgreSQL", "Stripe", "Docker"],
    features: [
      { title: "Multi-Tenant Architecture", desc: "Isolated tenant data structures and shared resources designed for security and massive scaling." },
      { title: "Subscription & Billing", desc: "Integrated payment gateways, recurring subscriptions, invoice generation, and tier management." },
      { title: "Role-Based Access Control", desc: "Granular permissions, SSO integration, and enterprise-grade authentication systems." },
      { title: "API Ecosystem", desc: "Developer-friendly REST and GraphQL APIs for seamless third-party integrations and extensibility." }
    ]
  },
  {
    id: "3",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    status: "Published",
    date: "Jul 20, 2026",
    desc: "Native and cross-platform mobile apps for iOS and Android built with smooth animations, offline sync, and real-time push notifications.",
    subtitle: "High-performance iOS and Android apps engineered for user engagement.",
    overview: "Deliver exceptional mobile experiences to your customers with native and cross-platform mobile development. We craft iOS and Android applications featuring fluid UI, offline support, biometric authentication, and lightning-fast API synchronization.",
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    features: [
      { title: "iOS & Android Apps", desc: "Cross-platform mobile applications engineered with native performance and smooth 60fps animations." },
      { title: "Offline-First Sync", desc: "Robust data architecture providing offline persistence and seamless background synchronization." },
      { title: "Push Notifications", desc: "Automated user engagement notifications integrated with analytics and deep linking." },
      { title: "App Store Publishing", desc: "Complete end-to-end app store optimization, submission, and release management." }
    ]
  },
  {
    id: "4",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    status: "Published",
    date: "Jul 15, 2026",
    desc: "User-centric interface design and intuitive experiences. We transform complex workflows into clean, accessible, and beautiful interfaces.",
    subtitle: "Crafting digital experiences that captivate users and drive conversions.",
    overview: "In today's digital landscape, a functional application isn't enough. We design intuitive, accessible, and stunning user interfaces that reduce friction and elevate your brand presence. Our design process bridges the gap between complex system logic and seamless human interaction.",
    tech: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Tailwind CSS"],
    features: [
      { title: "User Research & Strategy", desc: "Deep diving into user behavior, market analysis, and journey mapping to ensure the product solves real problems." },
      { title: "Wireframing & Prototyping", desc: "Rapid low and high-fidelity prototyping to visualize workflows and validate concepts before writing a single line of code." },
      { title: "Design Systems", desc: "Creating scalable, reusable component libraries that ensure visual consistency across your entire ecosystem." },
      { title: "Interaction Design", desc: "Implementing micro-interactions and motion design that make software feel alive, responsive, and premium." }
    ]
  },
  {
    id: "5",
    title: "AI Development",
    slug: "ai-development",
    status: "Published",
    date: "Jun 02, 2026",
    desc: "Intelligent automation and integrations powered by modern machine learning. Leverage large language models and computer vision for your business.",
    subtitle: "Cutting-edge artificial intelligence and machine learning solutions.",
    overview: "Empower your business with custom AI solutions, automated workflows, intelligent chatbots, and predictive model integrations designed to turn complex data into actionable business intelligence.",
    tech: ["OpenAI", "Python", "PyTorch", "LangChain", "Docker"],
    features: [
      { title: "LLM & GenAI Integration", desc: "Custom fine-tuning and retrieval-augmented generation (RAG) for enterprise knowledge systems." },
      { title: "Predictive Analytics", desc: "Machine learning models for forecasting sales, inventory optimization, and user behavior analytics." },
      { title: "Computer Vision", desc: "Automated image and video analysis for quality control, security, and automated tagging." },
      { title: "Workflow Automation", desc: "AI-driven decision engines and automated document processing for operational efficiency." }
    ]
  },
  {
    id: "6",
    title: "Cloud & DevOps",
    slug: "cloud-devops",
    status: "Published",
    date: "May 20, 2026",
    desc: "Automated deployments, continuous integration, and cloud infrastructure management for highly available software systems.",
    subtitle: "Automated deployments and cloud infrastructure management for high availability.",
    overview: "Modern digital infrastructure requires automated CI/CD pipelines, container orchestration, and cloud governance. We architect resilient cloud environments on AWS, Azure, and Google Cloud to ensure your applications remain available 24/7 with zero downtime.",
    tech: ["Docker", "Kubernetes", "CI/CD", "Terraform", "AWS"],
    features: [
      { title: "Infrastructure as Code", desc: "Automated server and cluster provisioning using Terraform and CloudFormation." },
      { title: "CI/CD Pipelines", desc: "Automated build, test, and deployment pipelines for friction-free delivery." },
      { title: "Container Orchestration", desc: "Production Kubernetes and Docker container management for zero-downtime scaling." },
      { title: "Monitoring & Alerts", desc: "Real-time telemetry, logging, and automated incident alerting." }
    ]
  },
  {
    id: "7",
    title: "Digital Marketing",
    slug: "digital-marketing",
    status: "Published",
    date: "May 05, 2026",
    desc: "Comprehensive marketing strategies that increase brand awareness, drive traffic, and convert visitors into loyal customers across multiple channels.",
    subtitle: "Comprehensive growth strategies that turn visitors into loyal brand advocates.",
    overview: "Drive sustainable revenue growth with end-to-end digital marketing solutions tailored to modern tech businesses. We combine data analysis, creative messaging, and multi-channel attribution to maximize customer acquisition and brand equity.",
    tech: ["Strategy", "Content Marketing", "Google Analytics", "HubSpot", "Growth Hacking"],
    features: [
      { title: "Multi-Channel Strategy", desc: "Unified campaign architectures across search, social, and email marketing." },
      { title: "Content Marketing", desc: "High-converting blog posts, whitepapers, and landing page content tailored to your audience." },
      { title: "Funnel Optimization", desc: "Conversion rate optimization (CRO) to maximize lead capture at every step." },
      { title: "Analytics & Attribution", desc: "Transparent data dashboards tracking ROI, CAC, and LTV." }
    ]
  },
  {
    id: "8",
    title: "SEO",
    slug: "seo",
    status: "Published",
    date: "Apr 18, 2026",
    desc: "Data-driven Search Engine Optimization to boost your organic visibility, rank higher on Google, and drive sustainable high-quality traffic.",
    subtitle: "Dominate organic search rankings and attract high-intent customer traffic.",
    overview: "Our technical and content-driven SEO strategies help your software products rank at the top of search engine results pages. We optimize site architecture, page performance, and backlink authority to build long-term organic authority.",
    tech: ["On-Page SEO", "Technical Audits", "Ahrefs", "Semrush", "Core Web Vitals"],
    features: [
      { title: "Technical SEO Audits", desc: "Deep-dive crawl analysis, fixing indexation issues, and accelerating page load speed." },
      { title: "On-Page & Keyword Strategy", desc: "Targeting high-intent commercial keywords and optimizing structured data." },
      { title: "Authority & Link Building", desc: "White-hat outreach and digital PR to earn quality editorial backlinks." },
      { title: "Core Web Vitals Tuning", desc: "Optimizing LCP, CLS, and FID for maximum Google search preference." }
    ]
  },
  {
    id: "9",
    title: "Meta Ads",
    slug: "meta-ads",
    status: "Published",
    date: "Apr 02, 2026",
    desc: "Highly targeted Facebook and Instagram advertising campaigns designed to maximize ROI, generate leads, and scale your brand reach.",
    subtitle: "High-ROI Facebook and Instagram ad campaigns targeted with surgical precision.",
    overview: "Scale customer acquisition with hyper-targeted social ad campaigns on Facebook and Instagram. We craft high-converting ad creative, build lookalike audiences, and continuously test ad copy to generate measurable sales pipeline.",
    tech: ["Facebook Ads", "Instagram Ads", "Meta Pixel", "CAPI", "A/B Testing"],
    features: [
      { title: "High-Converting Creatives", desc: "Engaging visual ads and copywriting tailored to targeted buyer personas." },
      { title: "Advanced Audience Targeting", desc: "Leveraging custom audiences, lookalikes, and behavioral retargeting." },
      { title: "Conversions API Integration", desc: "Server-side tracking setup to ensure 100% accurate conversion data." },
      { title: "Campaign Scaling & ROAS", desc: "Continuous bid optimization and budget scaling to maximize Return on Ad Spend." }
    ]
  },
  {
    id: "10",
    title: "Google Ads",
    slug: "google-ads",
    status: "Published",
    date: "Mar 15, 2026",
    desc: "Intent-driven search and display advertising. We optimize your ad spend to capture high-intent users actively looking for your solutions.",
    subtitle: "Capture high-intent search buyers at the exact moment they search for solutions.",
    overview: "Put your software directly in front of buyers actively searching for your solutions on Google. We structure high-performing PPC search, display, and remarketing campaigns engineered to generate qualified inbound leads.",
    tech: ["Google Search Ads", "Display Network", "PPC Strategy", "Negative Keywords", "Google Tag Manager"],
    features: [
      { title: "Intent Search Campaigns", desc: "Bidding on high-converting transactional search keywords with tight match types." },
      { title: "Negative Keyword Filtering", desc: "Eliminating wasted ad spend by excluding non-converting search queries." },
      { title: "Quality Score Optimization", desc: "Writing relevant ad copy and dedicated landing pages to lower cost-per-click." },
      { title: "Conversion Tracking", desc: "Setting up full end-to-end goal tracking in Google Tag Manager and GA4." }
    ]
  }
]

const PRIORITY_SLUGS = ["web-development", "saas-development", "mobile-app-development"]

// Deduplication function to remove duplicate services and purge legacy entries with 0 cards or missing slug
const deduplicateAndCleanServices = (list: ServiceItem[]): ServiceItem[] => {
  const validItems = list.filter(item => {
    if (!item.title || !item.title.trim()) return false
    const cards = item.features?.length || 0
    const hasSlug = item.slug && item.slug.trim().length > 0
    if (cards === 0 || !hasSlug) return false
    return true
  })

  const map = new Map<string, ServiceItem>()

  for (const item of validItems) {
    const key = (item.slug || item.title).toLowerCase().trim()
    const existing = map.get(key)

    if (!existing) {
      map.set(key, item)
    } else {
      const existingCards = existing.features?.length || 0
      const itemCards = item.features?.length || 0

      if (itemCards > existingCards) {
        map.set(key, item)
      }
    }
  }

  for (const def of DEFAULT_SERVICES) {
    const key = def.slug.toLowerCase().trim()
    if (!map.has(key)) {
      map.set(key, def)
    }
  }

  const allItems = Array.from(map.values())

  allItems.sort((a, b) => {
    const slugA = (a.slug || "").toLowerCase()
    const slugB = (b.slug || "").toLowerCase()

    const indexA = PRIORITY_SLUGS.indexOf(slugA)
    const indexB = PRIORITY_SLUGS.indexOf(slugB)

    if (indexA !== -1 && indexB !== -1) return indexA - indexB
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    return 0
  })

  return allItems
}

export default function AdminServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5

  const [formData, setFormData] = useState({
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    seoCanonical: "",
    seoAuthor: "",
    seoPublisher: "",
  })

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_services")
    let currentList = DEFAULT_SERVICES

    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentList = [...parsed, ...DEFAULT_SERVICES]
        }
      } catch (e) {
        console.error("Failed to parse services from local storage")
      }
    }

    const cleaned = deduplicateAndCleanServices(currentList)
    setServices(cleaned)
    
    const savedSeo = localStorage.getItem("aventiq_admin_services_seo")
    if (savedSeo) {
      try {
        setFormData(JSON.parse(savedSeo))
      } catch (e) {}
    }
    
    setIsLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("aventiq_admin_services", JSON.stringify(services))
      localStorage.setItem("aventiq_admin_services_seo", JSON.stringify(formData))
    }
  }, [services, formData, isLoaded])

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id))
  }

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination Math
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE) || 1
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredServices.length)
  const paginatedServices = filteredServices.slice(startIndex, endIndex)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
            Services Management
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Manage all 10 core services, text, overview paragraphs, and deliverable cards.
          </p>
        </div>
        <Link href="/admin/services/create">
          <Button 
            className="h-11 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:from-[#00C6F7] hover:to-[#0067D9] text-white font-bold px-6 rounded-xl shadow-[0_0_15px_rgba(0,198,247,0.3)] hover:shadow-[0_0_25px_rgba(0,198,247,0.5)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} /> Add New Service
          </Button>
        </Link>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        
        {/* Controls Toolbar */}
        <div className="p-5 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00C6F7] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search services..." 
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm text-[#020B1C] placeholder:text-slate-400 font-medium"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto h-11 px-5 rounded-xl border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:text-[#020B1C] transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={18} /> Filter List
          </Button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Service Name & Slug</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Card Summary</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Technologies</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Deliverables</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Status</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedServices.map((service) => (
                <tr key={service.id} className="hover:bg-[#F4F7FA]/50 transition-colors group bg-white">
                  <td className="p-5">
                    <div className="font-bold text-[#020B1C] text-sm group-hover:text-[#0067D9] transition-colors">{service.title}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">/services/{service.slug}</div>
                  </td>
                  <td className="p-5 max-w-xs">
                    <div className="text-xs text-slate-500 line-clamp-2 font-medium">{service.desc}</div>
                  </td>
                  <td className="p-5 max-w-[200px]">
                    <div className="flex flex-wrap gap-1">
                      {service.tech?.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                          {t}
                        </span>
                      ))}
                      {service.tech && service.tech.length > 3 && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded-md">
                          +{service.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-xs font-bold text-[#0067D9] bg-[#0067D9]/10 px-2.5 py-1 rounded-md">
                      {service.features?.length || 0} Cards
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      service.status === "Published" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                        : "bg-amber-50 text-amber-700 border-amber-200/60 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        service.status === "Published" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}></span>
                      {service.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-100">
                      <Link 
                        href={`/admin/services/${service.id}/edit`}
                        className="p-2 text-slate-500 hover:text-[#0067D9] hover:bg-[#0067D9]/10 rounded-lg transition-all cursor-pointer" 
                        title="Edit Service Content"
                      >
                        <Edit size={18} strokeWidth={2} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(service.id)}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer" 
                        title="Delete Service"
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-medium text-slate-500">
            Showing <span className="font-bold text-[#020B1C]">{filteredServices.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-[#020B1C]">{endIndex}</span> of <span className="font-bold text-[#020B1C]">{filteredServices.length}</span> entries
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={validCurrentPage <= 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="rounded-xl border-slate-200 text-slate-600 font-bold h-9 px-4 hover:bg-[#0067D9] hover:text-white hover:border-[#0067D9] hover:shadow-[0_4px_12px_rgba(0,103,217,0.25)] transition-all duration-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 disabled:hover:border-slate-200 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            <span className="text-xs font-bold text-slate-500 px-2">
              Page {validCurrentPage} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={validCurrentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="rounded-xl border-slate-200 text-slate-600 font-bold h-9 px-4 hover:bg-[#0067D9] hover:text-white hover:border-[#0067D9] hover:shadow-[0_4px_12px_rgba(0,103,217,0.25)] transition-all duration-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 disabled:hover:border-slate-200 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* SEO Settings Section */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden space-y-6">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
        
        <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2 pb-2 border-b border-slate-100">
          <Search className="text-[#0067D9]" size={20} /> Page SEO Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">SEO Title</label>
            <input 
              type="text" 
              value={formData.seoTitle}
              onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-semibold text-[#020B1C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">SEO Keywords</label>
            <input 
              type="text" 
              value={formData.seoKeywords}
              onChange={(e) => setFormData({...formData, seoKeywords: e.target.value})}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-semibold text-[#020B1C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7]"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">SEO Description</label>
            <textarea 
              rows={3}
              value={formData.seoDescription}
              onChange={(e) => setFormData({...formData, seoDescription: e.target.value})}
              className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-semibold text-[#020B1C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7]"
            />
          </div>

        </div>
      </div>

    </div>
  )
}
