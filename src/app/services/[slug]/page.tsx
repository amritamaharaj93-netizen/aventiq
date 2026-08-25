"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, MonitorSmartphone, PenTool, Sparkles, LayoutTemplate, Palette, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

// Mock detailed data for the dynamic routes
const SERVICE_DETAILS: Record<string, any> = {
  "ui-ux-design": {
    title: "UI/UX Design",
    subtitle: "Crafting digital experiences that captivate users and drive conversions.",
    description: "In today's digital landscape, a functional application isn't enough. We design intuitive, accessible, and stunning user interfaces that reduce friction and elevate your brand presence. Our design process bridges the gap between complex system logic and seamless human interaction.",
    icon: Palette,
    color: "from-[#FF8A00] to-[#FFB52E]",
    glow: "bg-[#FF8A00]",
    features: [
      { title: "User Research & Strategy", desc: "Deep diving into user behavior, market analysis, and journey mapping to ensure the product solves real problems." },
      { title: "Wireframing & Prototyping", desc: "Rapid low and high-fidelity prototyping to visualize workflows and validate concepts before writing a single line of code." },
      { title: "Design Systems", desc: "Creating scalable, reusable component libraries that ensure visual consistency across your entire ecosystem." },
      { title: "Interaction Design", desc: "Implementing micro-interactions and motion design that make software feel alive, responsive, and premium." }
    ],
    tech: ["Figma", "Framer", "Adobe Creative Suite", "Principle", "Tailwind CSS"],
  },
  "web-development": {
    title: "Web Development",
    subtitle: "High-performance web applications built for enterprise scale.",
    description: "We engineer lightning-fast, highly secure web applications using modern JavaScript frameworks. Our architectures are designed to handle immense traffic while delivering a flawless, app-like experience in the browser.\n\nAt Aventiq, we understand that your digital presence is the core of your business. That's why we focus on building robust, scalable solutions tailored to your unique requirements. From complex enterprise SaaS platforms to high-conversion headless e-commerce sites, our full-stack engineering team ensures every product we build is optimized for peak performance, robust security, and exceptional user engagement. We leverage the latest cloud technologies and agile methodologies to bring your vision to life.",
    icon: LayoutTemplate,
    color: "from-[#062B63] to-[#0067D9]",
    glow: "bg-[#00C6F7]",
    features: [
      { title: "Custom Web Applications", desc: "Tailor-made web solutions designed from the ground up to meet your specific business requirements with seamless user experiences." },
      { title: "E-Commerce Platforms", desc: "Scalable, secure, and conversion-optimized online stores built with the latest headless commerce technologies." },
      { title: "Enterprise SaaS Development", desc: "Robust multi-tenant architectures, complex data management, and secure APIs for software-as-a-service products." },
      { title: "CMS & Content Platforms", desc: "Dynamic, easy-to-manage content systems powered by headless CMS architecture like Sanity or WordPress." }
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  }
}

export default function ServiceDetail() {
  const params = useParams()
  const slug = params.slug as string
  
  // Fallback generic data if not in our specific mock list
  const data = SERVICE_DETAILS[slug] || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    subtitle: "Premium software engineering and technology solutions.",
    description: "We deliver sophisticated technology solutions designed to solve complex business problems with elegance and scale. Partner with us to build software that moves your business forward.",
    icon: Zap,
    color: "from-[#062B63] to-[#0067D9]",
    glow: "bg-[#0067D9]",
    features: [
      { title: "Strategic Architecture", desc: "Designing scalable systems built to handle future growth and complex requirements." },
      { title: "Agile Development", desc: "Iterative, transparent delivery cycles that ensure rapid time-to-market." },
      { title: "Quality Assurance", desc: "Rigorous automated and manual testing pipelines for zero-defect software." },
      { title: "Ongoing Support", desc: "Dedicated maintenance, monitoring, and feature iteration post-launch." }
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "AWS", "TypeScript"],
  }

  const Icon = data.icon

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* PREMIUM HERO */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden bg-[#020B1C]">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] ${data.glow} rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse`}></div>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[#020B1C] to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <Link href="/services" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-4 group font-medium tracking-wide text-sm">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Services
          </Link>

          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center mb-8 shadow-2xl shadow-[#00C6F7]/20`}
            >
              <Icon size={40} className="text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 leading-[1.1]"
            >
              {data.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-3xl text-[#CBD5E1] font-light leading-relaxed max-w-3xl"
            >
              {data.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* CONTENT & DETAILS */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-16 relative z-10">
          
          <div className="lg:col-span-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Overview</h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-20 font-medium whitespace-pre-line">
              {data.description}
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">What We Deliver</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {data.features.map((feature: any, i: number) => (
                <div key={i} className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center mb-6 shadow-md text-white group-hover:scale-110 transition-transform duration-500`}>
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-28">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-wider text-sm">Technologies Used</h3>
              <div className="flex flex-wrap gap-2.5 mb-10">
                {data.tech.map((tech: string) => (
                  <span key={tech} className="px-4 py-2 bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm border border-slate-200 hover:border-slate-300 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-10"></div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Request a Quote</h3>
              <p className="text-slate-500 mb-6 text-sm">Tell us about your {data.title.toLowerCase()} needs and we'll get back to you within 24 hours.</p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
                </div>
                <div>
                  <textarea placeholder="Project Details" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"></textarea>
                </div>
                <button type="submit" className={`w-full h-12 mt-2 text-base font-bold rounded-xl bg-gradient-to-r ${data.color} text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}>
                  Submit Request
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
