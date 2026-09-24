"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, LayoutTemplate, Cloud, Smartphone, Palette, Cpu, Server, Megaphone, Search, Target, MousePointerClick, Zap } from "lucide-react"
import { PageHeader } from "@/components/layout/PageHeader"

const DEFAULT_SERVICES = [
  { 
    icon: LayoutTemplate, 
    title: "Web Development", 
    desc: "High-performance, accessible, and modern web applications built for scale. We create responsive digital experiences that engage users and drive conversions.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    slug: "web-development"
  },
  { 
    icon: Cloud, 
    title: "SaaS Development", 
    desc: "End-to-end multi-tenant software as a service platform engineering. From subscription billing to complex user roles, we build scalable platforms.",
    tags: ["Node.js", "AWS", "PostgreSQL", "Stripe"],
    slug: "saas-development"
  },
  { 
    icon: Smartphone, 
    title: "Mobile App Development", 
    desc: "Native and cross-platform mobile apps for iOS and Android built with smooth animations, offline sync, and real-time push notifications.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin"],
    slug: "mobile-app-development"
  },
  { 
    icon: Palette, 
    title: "UI/UX Design", 
    desc: "User-centric interface design and intuitive experiences. We transform complex workflows into clean, accessible, and beautiful interfaces.",
    tags: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
    slug: "ui-ux-design"
  },
  { 
    icon: Cpu, 
    title: "AI Development", 
    desc: "Intelligent automation and integrations powered by modern machine learning. Leverage large language models and computer vision for your business.",
    tags: ["OpenAI", "Python", "PyTorch", "LangChain"],
    slug: "ai-development"
  },
  { 
    icon: Server, 
    title: "Cloud & DevOps", 
    desc: "Automated deployments, continuous integration, and cloud infrastructure management for highly available software systems.",
    tags: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    slug: "cloud-devops"
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Comprehensive marketing strategies that increase brand awareness, drive traffic, and convert visitors into loyal customers across multiple channels.",
    tags: ["Strategy", "Content", "Analytics", "Growth"],
    slug: "digital-marketing"
  },
  {
    icon: Search,
    title: "SEO",
    desc: "Data-driven Search Engine Optimization to boost your organic visibility, rank higher on Google, and drive sustainable high-quality traffic.",
    tags: ["On-Page", "Off-Page", "Technical SEO", "Audits"],
    slug: "seo"
  },
  {
    icon: Target,
    title: "Meta Ads",
    desc: "Highly targeted Facebook and Instagram advertising campaigns designed to maximize ROI, generate leads, and scale your brand reach.",
    tags: ["Facebook", "Instagram", "Retargeting", "ROAS"],
    slug: "meta-ads"
  },
  {
    icon: MousePointerClick,
    title: "Google Ads",
    desc: "Intent-driven search and display advertising. We optimize your ad spend to capture high-intent users actively looking for your solutions.",
    tags: ["Search Ads", "Display", "PPC", "Conversion"],
    slug: "google-ads"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function ServicesPage() {
  const [servicesList, setServicesList] = useState<any[]>(DEFAULT_SERVICES)

  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_services")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const PRIORITY_SLUGS = ["web-development", "saas-development", "mobile-app-development"]
          const mapped = parsed.map((item: any) => {
            const found = DEFAULT_SERVICES.find(d => d.slug === item.slug || d.title.toLowerCase() === item.title.toLowerCase())
            return {
              icon: found ? found.icon : Zap,
              title: item.title,
              desc: item.desc || item.overview || "High-performance software and digital solutions.",
              tags: item.tech && item.tech.length > 0 ? item.tech : (found ? found.tags : ["React", "TypeScript", "Node.js"]),
              slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            }
          })

          mapped.sort((a: any, b: any) => {
            const slugA = (a.slug || "").toLowerCase()
            const slugB = (b.slug || "").toLowerCase()

            const indexA = PRIORITY_SLUGS.indexOf(slugA)
            const indexB = PRIORITY_SLUGS.indexOf(slugB)

            if (indexA !== -1 && indexB !== -1) return indexA - indexB
            if (indexA !== -1) return -1
            if (indexB !== -1) return 1
            return 0
          })

          setServicesList(mapped)
        }
      } catch (e) {
        console.error("Failed to load services from local storage")
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <PageHeader 
        title="What We Build" 
        breadcrumbs={[{ label: "Services" }]} 
        bgImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
      />

      {/* Intro Text */}
      <div className="container mx-auto px-4 md:px-8 mt-12 mb-16 text-center max-w-4xl relative">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-bold text-[#0067D9] mb-8 tracking-widest uppercase shadow-sm">
          Our Expertise
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0067D9] to-[#00C6F7]">Excellence</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
          From robust enterprise software to highly engaging mobile experiences, we build technology solutions that drive measurable business results. Explore our core disciplines below.
        </p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 pb-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesList.map((service) => {
            const Icon = service.icon || Zap
            return (
              <motion.div 
                key={service.slug || service.title} 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl p-2 border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,103,217,0.1)] transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Premium Gradient Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C6F7]/5 via-transparent to-[#0067D9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <Link href={`/services/${service.slug}`} className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
                  <div>
                    {/* Icon Container */}
                    <div className="w-16 h-16 rounded-2xl bg-[#F3F8FF] flex items-center justify-center text-[#0067D9] mb-8 group-hover:scale-110 group-hover:bg-white group-hover:shadow-[0_0_25px_rgba(0,198,247,0.25)] transition-all duration-500 relative">
                      <Icon size={28} strokeWidth={2} />
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF8A00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm border-2 border-white"></div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-[#0067D9] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-8 leading-relaxed font-medium text-[17px]">
                      {service.desc}
                    </p>
                  </div>

                  <div>
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.tags?.map((tag: string) => (
                        <span key={tag} className="text-xs px-3.5 py-1.5 bg-slate-50 text-slate-600 rounded-full font-semibold border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button Link */}
                    <div className="inline-flex items-center gap-2 font-bold text-[#0067D9] group-hover:text-[#00C6F7] transition-colors">
                      View Details <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

    </div>
  )
}
