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
    description: "We engineer lightning-fast, highly secure web applications using modern JavaScript frameworks. Our architectures are designed to handle immense traffic while delivering a flawless, app-like experience in the browser.",
    icon: LayoutTemplate,
    color: "from-[#0067D9] to-[#00C6F7]",
    glow: "bg-[#00C6F7]",
    features: [
      { title: "Frontend Engineering", desc: "Building highly interactive, accessible, and fast user interfaces using React and Next.js." },
      { title: "Performance Optimization", desc: "Optimizing Core Web Vitals, implementing advanced caching, and Edge delivery." },
      { title: "Progressive Web Apps", desc: "Creating installable web applications with offline capabilities and push notifications." },
      { title: "Technical SEO", desc: "Server-side rendering and structured data implementation to ensure maximum search engine visibility." }
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
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#020B1C]">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] ${data.glow} rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse`}></div>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[#020B1C] to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <Link href="/services" className="inline-flex items-center text-[#94A3B8] hover:text-white transition-colors mb-12 group font-medium tracking-wide text-sm">
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
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#020B1C] mb-8 tracking-tight">Overview</h2>
            <p className="text-xl text-[#475569] leading-relaxed mb-16 font-light">
              {data.description}
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#020B1C] mb-8 tracking-tight">What We Deliver</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {data.features.map((feature: any, i: number) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-[#DCE8F5] shadow-xl shadow-[#062B63]/5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${data.color} opacity-10 mb-6 flex items-center justify-center`}></div>
                  <div className="absolute w-12 h-12 -mt-18 flex items-center justify-center text-[#020B1C]">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#020B1C] mb-3">{feature.title}</h3>
                  <p className="text-[#475569] leading-relaxed font-light">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#DCE8F5] shadow-2xl shadow-[#062B63]/5 sticky top-32">
              <h3 className="text-2xl font-bold text-[#020B1C] mb-6 tracking-tight">Technologies</h3>
              <div className="flex flex-wrap gap-3 mb-10">
                {data.tech.map((tech: string) => (
                  <span key={tech} className="px-4 py-2 bg-[#F1F5F9] text-[#102A43] font-medium rounded-lg text-sm border border-[#E2E8F0]">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="w-full h-px bg-[#E2E8F0] mb-10"></div>

              <h3 className="text-2xl font-bold text-[#020B1C] mb-4 tracking-tight">Start this project</h3>
              <p className="text-[#475569] font-light mb-8">Ready to bring this vision to life? Let our elite engineering team handle it.</p>
              
              <Button asChild className={`w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r ${data.color} text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all`}>
                <Link href="/contact">Consult with Us</Link>
              </Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
