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
    imageColor: "from-[#062B63] to-[#0067D9]",
    slug: "nexgen-enterprise"
  },
  {
    title: "FinTech Mobile Banking",
    category: "Mobile Application",
    desc: "A highly secure, cross-platform mobile banking application featuring real-time transaction processing, biometric authentication, and AI-driven spending insights.",
    results: "Achieved 4.9/5 App Store rating with 500k+ downloads in year one.",
    tech: ["React Native", "TypeScript", "NestJS", "Stripe"],
    imageColor: "from-[#0067D9] to-[#00C6F7]",
    slug: "fintech-mobile"
  },
  {
    title: "Aura AI Analytics",
    category: "AI",
    desc: "An advanced predictive analytics engine that leverages machine learning to forecast market trends and automate inventory management for large retailers.",
    results: "Improved forecast accuracy by 28% and saved $2.4M in overstock.",
    tech: ["Python", "PyTorch", "React", "Docker"],
    imageColor: "from-[#020B1C] to-[#062B63]",
    slug: "aura-ai"
  },
  {
    title: "Luxe E-commerce Platform",
    category: "E-commerce",
    desc: "A headless e-commerce storefront for a luxury fashion brand, featuring 3D product configurators, global localized checkout, and ultra-fast page loads.",
    results: "Increased conversion rate by 65% and decreased bounce rate by 40%.",
    tech: ["Next.js", "Shopify Plus", "Tailwind CSS", "Vercel"],
    imageColor: "from-[#102A43] to-[#FF8A00]",
    slug: "luxe-ecommerce"
  }
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24">
      {/* Header Section */}
      <div className="container mx-auto px-4 md:px-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#102A43] mb-6">
            Featured Work
          </h1>
          <p className="text-xl text-[#475569] leading-relaxed">
            Explore some of the digital products and technology solutions we've built for ambitious businesses.
          </p>
        </motion.div>
      </div>

      {/* Projects List */}
      <div className="container mx-auto px-4 md:px-8 space-y-24">
        {PROJECTS.map((project, index) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 items-center`}
          >
            {/* Project Image/Visual */}
            <div className="w-full lg:w-3/5">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group shadow-lg">
                {/* Simulated Image Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.imageColor} opacity-90 transition-transform duration-700 group-hover:scale-105`}></div>
                
                {/* Decorative UI elements mimicking an app interface inside the image */}
                <div className="absolute inset-x-8 bottom-0 h-4/5 bg-white/10 backdrop-blur-md rounded-t-xl border-t border-x border-white/20 p-6 flex flex-col gap-4 transform transition-transform duration-500 group-hover:translate-y-2">
                   <div className="w-32 h-4 bg-white/20 rounded-full"></div>
                   <div className="w-full h-24 bg-white/10 rounded-lg"></div>
                   <div className="flex gap-4">
                     <div className="w-1/2 h-32 bg-white/10 rounded-lg"></div>
                     <div className="w-1/2 h-32 bg-white/10 rounded-lg"></div>
                   </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#062B63]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href={`/projects/${project.slug}`} className="bg-white text-[#062B63] px-6 py-3 rounded-full font-bold flex items-center hover:bg-[#00C6F7] hover:text-[#020B1C] transition-colors">
                    View Full Case Study <ExternalLink size={18} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="w-full lg:w-2/5 flex flex-col justify-center">
              <div className="text-sm font-bold tracking-wider text-[#0067D9] uppercase mb-4 flex items-center">
                <span className="w-8 h-[2px] bg-[#0067D9] mr-3 inline-block"></span>
                {project.category}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-[#102A43] mb-6">
                {project.title}
              </h2>
              
              <p className="text-lg text-[#475569] mb-8 leading-relaxed">
                {project.desc}
              </p>

              <div className="bg-white p-6 rounded-xl border border-border shadow-sm mb-8 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF8A00]"></div>
                <h4 className="font-semibold text-[#102A43] mb-2">The Result</h4>
                <p className="text-[#475569] italic">"{project.results}"</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {project.tech.map(t => (
                  <span key={t} className="text-sm px-3 py-1 bg-[#E8F3FF] text-[#062B63] rounded-md font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <Link 
                href={`/projects/${project.slug}`} 
                className="inline-flex items-center text-lg font-semibold text-[#0067D9] hover:text-[#FF8A00] transition-colors group w-max"
              >
                Read Case Study 
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
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
