"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"

const PROJECTS = [
  {
    title: "NexGen Enterprise SaaS",
    category: "SaaS",
    desc: "A comprehensive multi-tenant resource planning platform built for modern enterprise workforces. Designed to handle over 1M+ daily active users with sub-100ms query times.",
    results: "Reduced operational costs by 40% and improved onboarding speed by 3x.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    imageColor: "from-[#062B63] to-[#0067D9]",
    slug: "nexgen-enterprise"
  },
  {
    title: "FinTech Mobile Banking",
    category: "Mobile Application",
    desc: "A highly secure, cross-platform mobile banking application featuring real-time transaction processing, biometric authentication, and AI-driven spending insights.",
    results: "Achieved 4.9/5 App Store rating with 500k+ downloads in year one.",
    tech: ["React Native", "TypeScript", "NestJS", "Stripe"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    imageColor: "from-[#0067D9] to-[#00C6F7]",
    slug: "fintech-mobile"
  },
  {
    title: "Aura AI Analytics",
    category: "AI",
    desc: "An advanced predictive analytics engine that leverages machine learning to forecast market trends and automate inventory management for large retailers.",
    results: "Improved forecast accuracy by 28% and saved $2.4M in overstock.",
    tech: ["Python", "PyTorch", "React", "Docker"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
    imageColor: "from-[#020B1C] to-[#062B63]",
    slug: "aura-ai"
  },
  {
    title: "Luxe E-commerce Platform",
    category: "E-commerce",
    desc: "A headless e-commerce storefront for a luxury fashion brand, featuring 3D product configurators, global localized checkout, and ultra-fast page loads.",
    results: "Increased conversion rate by 65% and decreased bounce rate by 40%.",
    tech: ["Next.js", "Shopify Plus", "Tailwind CSS", "Vercel"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    imageColor: "from-[#102A43] to-[#FF8A00]",
    slug: "luxe-ecommerce"
  }
]

import { PageHeader } from "@/components/layout/PageHeader"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <PageHeader 
        title="Featured Work" 
        breadcrumbs={[{ label: "Projects" }]} 
        bgImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
      />

      {/* Intro */}
      <div className="container mx-auto px-4 md:px-8 mt-24 mb-24 relative">
        <div className="max-w-3xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-100 border border-slate-200 text-sm font-bold text-slate-700 mb-6 tracking-wide uppercase shadow-sm">
            Our Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Proof of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0067D9] to-[#00C6F7]">Performance</span>
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed font-light">
            Explore some of the digital products and technology solutions we've engineered for ambitious businesses worldwide.
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="container mx-auto px-4 md:px-8 space-y-32">
        {PROJECTS.map((project, index) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}
          >
            {/* Project Image/Visual */}
            <div className="w-full lg:w-3/5 group">
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 transition-all duration-700 group-hover:shadow-3xl">
                
                {/* Real Image */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Gradient Overlay for premium feel */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.imageColor} opacity-20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-10`}></div>
                
              </div>
            </div>

            {/* Project Details */}
            <div className="w-full lg:w-2/5 flex flex-col justify-center">
              <div className="text-sm font-bold tracking-widest text-[#0067D9] uppercase mb-5 flex items-center">
                <span className="w-10 h-[2px] bg-gradient-to-r from-[#0067D9] to-transparent mr-4 inline-block"></span>
                {project.category}
              </div>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                {project.title}
              </h2>
              
              <p className="text-lg md:text-xl text-slate-500 mb-8 leading-relaxed font-light">
                {project.desc}
              </p>

              <div className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] border border-slate-100 shadow-sm mb-10 relative overflow-hidden transition-all duration-300 hover:shadow-md hover:bg-white">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0067D9] to-[#00C6F7]"></div>
                <h4 className="font-extrabold text-slate-900 mb-3 text-lg">The Result</h4>
                <p className="text-slate-600 leading-relaxed font-medium">"{project.results}"</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-xs md:text-sm px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-semibold shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 mt-32 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#020B1C] py-16 px-8 rounded-3xl relative overflow-hidden max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-[var(--background-image-gradient-tech)] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start your next project?</h2>
            <p className="text-xl text-[#CBD5E1] mb-8 max-w-2xl mx-auto">
              Partner with Aventiq to build secure, scalable, and high-performance digital products.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-[#0067D9] hover:bg-[#00C6F7] hover:text-[#020B1C] text-white px-8 py-4 rounded-full font-bold transition-all"
            >
              Start a Project
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
