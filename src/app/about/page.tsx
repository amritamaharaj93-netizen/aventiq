"use client"

import { motion } from "framer-motion"
import { Target, Eye, Zap, Shield, HeartHandshake, BookOpen } from "lucide-react"

import { PageHeader } from "@/components/layout/PageHeader"

const VALUES = [
  { icon: Zap, title: "Innovation", desc: "We constantly explore new technologies to deliver cutting-edge solutions." },
  { icon: Shield, title: "Quality", desc: "We write clean, tested, and maintainable code built to last." },
  { icon: Eye, title: "Transparency", desc: "Clear communication and honest feedback at every stage of development." },
  { icon: Target, title: "Ownership", desc: "We treat your product and your success as our own." },
  { icon: BookOpen, title: "Continuous Learning", desc: "Our engineers stay ahead of the curve in a fast-changing landscape." },
  { icon: HeartHandshake, title: "Customer Success", desc: "Your ROI and business growth are our ultimate metrics of success." }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <PageHeader 
        title="Technology With a Purpose." 
        breadcrumbs={[{ label: "About Us" }]} 
        bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
      />
      
      {/* Intro */}
      <div className="container mx-auto px-4 md:px-8 mt-24 mb-24 relative">
        <div className="max-w-4xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-bold text-[#0067D9] mb-8 tracking-widest uppercase shadow-sm">
            Who We Are
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Building software that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0067D9] to-[#00C6F7]">actually works</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
            Aventiq is a premier software development agency focused on helping ambitious businesses turn ideas into reliable, scalable, and impactful digital products.
          </p>
        </div>
      </div>

      {/* Mission & Vision (Premium Dark Section) */}
      <div className="relative py-32 bg-[#020B1C] overflow-hidden my-24 rounded-[3rem] mx-4 md:mx-8 shadow-2xl">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00C6F7] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0067D9] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00C6F7] mb-6 tracking-widest uppercase">
              Our Mission
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
              To help businesses use technology to solve meaningful problems and create <span className="text-[#00C6F7]">sustainable growth</span>.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#FF8A00] mb-6 tracking-widest uppercase">
              Our Vision
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
              To become a trusted technology partner for visionary companies building the <span className="text-[#FF8A00]">future across the globe</span>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="container mx-auto px-4 md:px-8 py-24 pb-32">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Our Core Values</h2>
          <p className="text-xl text-slate-600 font-medium">
            The principles that guide our engineering process and how we interact with our clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((value, i) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-[#0067D9]/5 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C6F7]/5 to-[#0067D9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 w-16 h-16 bg-[#F3F8FF] rounded-2xl flex items-center justify-center text-[#0067D9] mb-8 group-hover:scale-110 group-hover:bg-[#0067D9] group-hover:text-white transition-all duration-500">
                <value.icon size={28} strokeWidth={2} />
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#0067D9] transition-colors">{value.title}</h3>
              <p className="relative z-10 text-slate-600 font-medium leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
