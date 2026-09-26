"use client"

import { ClientSEO } from "@/components/ClientSEO";

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Target, Eye, Zap, Shield, HeartHandshake, BookOpen } from "lucide-react"
import { PageHeader } from "@/components/layout/PageHeader"

const DEFAULT_ABOUT = {
  headerTitle: "Technology With a Purpose.",
  badgeTag: "Who We Are",
  mainTitle: "Building software that actually works",
  mainDesc1: "Aventiq is a premier software development agency focused on helping ambitious businesses turn ideas into reliable, scalable, and impactful digital products.",
  mainDesc2: "With a passion for engineering excellence, we bring together top-tier talent and innovative design thinking. Whether you're a disruptive startup or an established enterprise, we build strategic partnerships to deliver real business value through clean code, transparent communication, and forward-thinking architecture.",
  missionTitle: "Our Mission",
  missionDesc: "To empower ambitious businesses by engineering intelligent, scalable technology solutions that solve complex problems and drive sustainable growth.",
  visionTitle: "Our Vision",
  visionDesc: "To be the trusted global technology partner for visionary companies, setting the standard for software engineering excellence and digital innovation.",
  valuesHeading: "Our Core Values",
  valuesSubheading: "The principles that guide our engineering process and how we interact with our clients.",
  values: [
    { title: "Innovation", desc: "We constantly explore new technologies to deliver cutting-edge solutions." },
    { title: "Quality", desc: "We write clean, tested, and maintainable code built to last." },
    { title: "Transparency", desc: "Clear communication and honest feedback at every stage of development." },
    { title: "Ownership", desc: "We treat your product and your success as our own." },
    { title: "Continuous Learning", desc: "Our engineers stay ahead of the curve in a fast-changing landscape." },
    { title: "Customer Success", desc: "Your ROI and business growth are our ultimate metrics of success." }
  ]
}

const ICON_MAP = [Zap, Shield, Eye, Target, BookOpen, HeartHandshake]

export default function AboutPage() {
  const [data, setData] = useState(DEFAULT_ABOUT)

  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_about")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object") {
          setData({
            ...DEFAULT_ABOUT,
            ...parsed,
            values: Array.isArray(parsed.values) && parsed.values.length > 0 ? parsed.values : DEFAULT_ABOUT.values
          })
        }
      } catch (e) {
        console.error("Failed to load about page content")
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white pb-24">
      <ClientSEO storageKey="aventiq_admin_about" />
      <PageHeader 
        title={data.headerTitle} 
        breadcrumbs={[{ label: "About Us" }]} 
        bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
      />
      
      {/* Intro */}
      <div className="container mx-auto px-4 md:px-8 mt-12 mb-24 relative">
        <div className="max-w-4xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-bold text-[#0067D9] mb-8 tracking-widest uppercase shadow-sm">
            {data.badgeTag}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
            {data.mainTitle}
          </h2>
          <div 
            className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium mb-6 rich-text-content"
            dangerouslySetInnerHTML={{ __html: data.mainDesc1 }}
          />
          <div 
            className="text-lg md:text-xl text-slate-500 leading-relaxed rich-text-content"
            dangerouslySetInnerHTML={{ __html: data.mainDesc2 }}
          />
        </div>
      </div>

      {/* Mission & Vision (Elegant Classic Section) */}
      <div className="container mx-auto px-4 md:px-8 mb-0 relative">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="group relative bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden"
          >
            {/* Elegant background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0067D9] flex items-center justify-center mb-8 border border-blue-100 group-hover:bg-[#0067D9] group-hover:text-white transition-colors duration-500 shadow-sm">
                <Target strokeWidth={1.5} size={32} />
              </div>
              
              <h3 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">{data.missionTitle}</h3>
              
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
                {data.missionDesc}
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            className="group relative bg-[#020B1C] rounded-[2.5rem] p-10 md:p-14 border border-[#1A2642] shadow-2xl overflow-hidden"
          >
            {/* Elegant background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0067D9]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#0A1835] text-[#00C6F7] flex items-center justify-center mb-8 border border-[#1A2642] group-hover:bg-[#00C6F7] group-hover:text-[#020B1C] transition-colors duration-500 shadow-sm">
                <Eye strokeWidth={1.5} size={32} />
              </div>
              
              <h3 className="text-3xl font-extrabold text-white mb-6 tracking-tight">{data.visionTitle}</h3>
              
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
                {data.visionDesc}
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Values */}
      <div className="container mx-auto px-4 md:px-8 mt-16 pt-0 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">{data.valuesHeading}</h2>
          <p className="text-xl text-slate-600 font-medium">
            {data.valuesSubheading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.values.map((value, i) => {
            const IconComp = ICON_MAP[i % ICON_MAP.length]
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-[#0067D9]/5 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C6F7]/5 to-[#0067D9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 w-16 h-16 bg-[#F3F8FF] rounded-2xl flex items-center justify-center text-[#0067D9] mb-8 group-hover:scale-110 group-hover:bg-[#0067D9] group-hover:text-white transition-all duration-500">
                  <IconComp size={28} strokeWidth={2} />
                </div>
                <h3 className="relative z-10 text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#0067D9] transition-colors">{value.title}</h3>
                <p className="relative z-10 text-slate-600 font-medium leading-relaxed">{value.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
