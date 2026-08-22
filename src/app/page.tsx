"use client"

import { useState, useEffect } from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Smartphone, Cloud, Cpu, Database, Blocks, LayoutTemplate, ShieldCheck, Zap } from "lucide-react"

// Using server component for the page, and we'll extract smaller animated client components if needed,
// but since we want Framer Motion we might just make this a client component, or better:
// wrap specific sections in client components. For simplicity and speed of delivering the first pass, 
// I'll make the page a Client Component to use motion everywhere.
import { motion, AnimatePresence } from "framer-motion"

const SERVICES = [
  { icon: LayoutTemplate, title: "Web Development", desc: "High-performance, accessible, and modern web applications built for scale." },
  { icon: Cloud, title: "SaaS Development", desc: "End-to-end multi-tenant software as a service platform engineering." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native-feeling iOS and Android applications with single codebases." },
  { icon: Cpu, title: "AI Development", desc: "Intelligent automation and integrations powered by modern machine learning." },
  { icon: Database, title: "API & Backend", desc: "Secure, fast, and scalable architectures designed for complex data flows." },
  { icon: Blocks, title: "Custom Software", desc: "Tailored software solutions to solve your specific business challenges." },
]

export default function Home() {
  const HERO_SLIDES = [
    {
      badge: "Aventiq 2.0 is now live",
      headline: "We build premium tech",
      headlineHighlight: "digital experiences",
      description: "Aventiq is a world-class software development agency specializing in enterprise SaaS platforms, high-performance mobile applications, and intelligent cloud architecture.",
      cta: "Start a Project",
      accent: "#0067D9",
      accentEnd: "#00C6F7",
      cardLabel: "SaaS Dashboard",
      cardTitle: "Enterprise Analytics Platform",
      cardSubtitle: "Real-time insights for modern businesses",
      metrics: [
        { label: "Revenue", value: "$188K", change: "+24%" },
        { label: "Users", value: "12.4K", change: "+18%" },
        { label: "Uptime", value: "99.9%", change: "" },
      ],
      chartData: [40, 60, 100, 80, 50, 70, 90, 60, 80],
    },
    {
      badge: "Mobile Excellence",
      headline: "Native apps that users",
      headlineHighlight: "love & engage with",
      description: "We craft pixel-perfect iOS and Android applications with smooth animations, offline-first architecture, and real-time sync that deliver 4.8+ star experiences.",
      cta: "Build Your App",
      accent: "#10B981",
      accentEnd: "#34D399",
      cardLabel: "Mobile App",
      cardTitle: "HealthTrack Pro",
      cardSubtitle: "AI-powered fitness & wellness platform",
      metrics: [
        { label: "Downloads", value: "340K", change: "+42%" },
        { label: "Rating", value: "4.8★", change: "" },
        { label: "DAU", value: "89K", change: "+31%" },
      ],
      chartData: [30, 50, 45, 70, 85, 60, 95, 80, 100],
    },
    {
      badge: "E-Commerce Solutions",
      headline: "Commerce platforms that",
      headlineHighlight: "scale & convert",
      description: "End-to-end e-commerce engineering with headless CMS, real-time inventory, and AI-powered recommendations that drive 3x higher conversion rates.",
      cta: "Launch Your Store",
      accent: "#8B5CF6",
      accentEnd: "#A78BFA",
      cardLabel: "E-Commerce",
      cardTitle: "LuxeCart Platform",
      cardSubtitle: "Next-gen shopping experience",
      metrics: [
        { label: "Orders", value: "8.2K", change: "+56%" },
        { label: "GMV", value: "$2.4M", change: "+38%" },
        { label: "Conv.", value: "4.7%", change: "+12%" },
      ],
      chartData: [60, 45, 80, 55, 90, 70, 85, 95, 75],
    },
    {
      badge: "AI-Powered Automation",
      headline: "Intelligent systems that",
      headlineHighlight: "think & automate",
      description: "We build custom AI agents, ML pipelines, and intelligent automation workflows that reduce manual work by 60% and unlock new business capabilities.",
      cta: "Explore AI Solutions",
      accent: "#F59E0B",
      accentEnd: "#FBBF24",
      cardLabel: "AI Platform",
      cardTitle: "NeuralOps Suite",
      cardSubtitle: "Intelligent workflow automation",
      metrics: [
        { label: "Tasks", value: "45K", change: "+67%" },
        { label: "Accuracy", value: "97.3%", change: "+5%" },
        { label: "Saved", value: "1.2K hrs", change: "" },
      ],
      chartData: [20, 40, 35, 65, 50, 80, 70, 90, 100],
    },
  ]

  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, NexGen Solutions",
      quote: "Aventiq transformed our legacy system into a modern SaaS platform. Their team delivered ahead of schedule with exceptional code quality. The architecture handles 10x our original traffic. Our experience throughout the engagement was incredible. We were guided whenever we had queries and the engineering staff is highly professional.",
      rating: 5,
    },
    {
      name: "Michael Roberts",
      role: "Founder, CloudSync",
      quote: "Working with Aventiq felt like having an in-house engineering team. Their deep understanding of cloud architecture and DevOps practices helped us reduce infrastructure costs by 40%. Highly recommend them to anyone needing serious backend scaling.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "VP of Product, DataFlow",
      quote: "The mobile application Aventiq built for us has a 4.8-star rating on both app stores. Their attention to UX details and smooth animations set our product apart from every competitor. An absolute joy to collaborate with from start to finish.",
      rating: 5,
    },
    {
      name: "David Park",
      role: "Director of Engineering, FinTech Corp",
      quote: "They didn't just write code; they partnered with us to fundamentally improve our product strategy. The best technical partners we've ever hired. The migration was completely seamless without any downtime.",
      rating: 5,
    },
  ]
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#030712]">
        {/* Static Base Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0C1222] to-[#030712]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0067D9]/40 to-transparent z-20"></div>

        {/* FULL SLIDER TRACK */}
        <div className="grid w-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={{
                enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
                center: { x: 0, zIndex: 1, opacity: 1 },
                exit: (dir) => ({ x: dir < 0 ? '100%' : '-100%', zIndex: 0, opacity: 1 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="col-start-1 row-start-1 w-full pt-[110px] pb-[100px]"
            >
              
              {/* Slide-specific Glow Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] right-[0%] w-[800px] h-[800px] rounded-full blur-[150px]" style={{ backgroundColor: `${HERO_SLIDES[activeSlide].accent}12` }}></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]" style={{ backgroundColor: `${HERO_SLIDES[activeSlide].accent}08` }}></div>
              </div>

              {/* Slide Content */}
              <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Left Side: Text Content */}
                  <div className="text-left">
                    {/* Pill Badge */}
                    <div
                      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium mb-6"
                      style={{ backgroundColor: `${HERO_SLIDES[activeSlide].accent}10`, borderColor: `${HERO_SLIDES[activeSlide].accent}25`, color: HERO_SLIDES[activeSlide].accent }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: HERO_SLIDES[activeSlide].accent }}></span>
                        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: HERO_SLIDES[activeSlide].accent }}></span>
                      </span>
                      {HERO_SLIDES[activeSlide].badge}
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-[5.5rem] font-bold tracking-[-0.03em] mb-8 text-white leading-[1.05]">
                      {HERO_SLIDES[activeSlide].headline} <br className="hidden md:block" />
                      <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${HERO_SLIDES[activeSlide].accent}, ${HERO_SLIDES[activeSlide].accentEnd})` }}>
                        {HERO_SLIDES[activeSlide].headlineHighlight}
                      </span>
                    </h1>

                    {/* Description */}
                    <p className="text-base md:text-lg text-[#94A3B8] mb-10 max-w-md leading-relaxed">
                      {HERO_SLIDES[activeSlide].description}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button asChild size="lg" className="rounded-full px-8 h-14 border-0 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all font-semibold text-base" style={{ backgroundColor: HERO_SLIDES[activeSlide].accent, color: '#030712' }}>
                        <Link href="/contact">{HERO_SLIDES[activeSlide].cta}</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 border border-white/10 bg-transparent text-white hover:bg-white/5 hover:border-white/20 font-medium transition-all text-base group">
                        <Link href="/services">
                          Explore Services
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right Side: Visual Card */}
                  <div className="hidden lg:block relative">
                    <div
                      className="rounded-[2rem] overflow-hidden border border-white/[0.06] p-8 shadow-2xl relative"
                      style={{ background: `linear-gradient(145deg, #111827, #0C1222 60%, ${HERO_SLIDES[activeSlide].accent}08)` }}
                    >
                      {/* Window Top Bar */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-white/10"></div>
                            <div className="w-3 h-3 rounded-full bg-white/10"></div>
                            <div className="w-3 h-3 rounded-full bg-white/10"></div>
                          </div>
                          <div className="px-3 py-1 rounded-lg bg-white/5 text-[11px] text-white/50 font-medium">{HERO_SLIDES[activeSlide].cardLabel}</div>
                        </div>
                        <div className="px-3 py-1 rounded-full text-[11px] font-semibold" style={{ backgroundColor: `${HERO_SLIDES[activeSlide].accent}20`, color: HERO_SLIDES[activeSlide].accent }}>
                          Live
                        </div>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-2xl font-bold text-white mb-1">{HERO_SLIDES[activeSlide].cardTitle}</h3>
                      <p className="text-sm text-slate-400 mb-8">{HERO_SLIDES[activeSlide].cardSubtitle}</p>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {HERO_SLIDES[activeSlide].metrics.map((m, mi) => (
                          <div key={mi} className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                            <div className="text-[11px] text-slate-500 font-medium mb-2">{m.label}</div>
                            <div className="text-xl font-bold text-white">{m.value}</div>
                            {m.change && <div className="text-xs font-semibold mt-1" style={{ color: HERO_SLIDES[activeSlide].accent }}>{m.change}</div>}
                          </div>
                        ))}
                      </div>

                      {/* Bar Chart */}
                      <div className="bg-white/[0.03] rounded-xl p-5 border border-white/[0.06]">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-medium text-slate-400">Performance</span>
                          <span className="text-xs font-medium" style={{ color: HERO_SLIDES[activeSlide].accent }}>Last 9 months</span>
                        </div>
                        <div className="flex items-end justify-between h-28 gap-2">
                          {HERO_SLIDES[activeSlide].chartData.map((h, ci) => (
                            <motion.div
                              key={`${activeSlide}-${ci}`}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 0.6, delay: ci * 0.05, ease: [0.22, 1, 0.36, 1] }}
                              className="w-full rounded-md"
                              style={{
                                backgroundColor: ci === HERO_SLIDES[activeSlide].chartData.indexOf(Math.max(...HERO_SLIDES[activeSlide].chartData)) ? HERO_SLIDES[activeSlide].accent : `${HERO_SLIDES[activeSlide].accent}30`,
                              }}
                            ></motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Navigation - Floating at bottom */}
        <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-2 z-20">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > activeSlide ? 1 : -1)
                setActiveSlide(i)
              }}
              className="relative h-2 rounded-full transition-all duration-500"
              style={{
                width: i === activeSlide ? '32px' : '8px',
                backgroundColor: i === activeSlide ? HERO_SLIDES[activeSlide].accent : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
      </section>

      {/* TRUSTED CLIENTS */}
      <section className="py-[40px] bg-white border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-[#64748B] mb-12">Trusted by Businesses Building What's Next</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12">
            {['Acme Corp', 'GlobalTech', 'Innovate', 'NexGen', 'FutureSoft'].map((client, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center px-4 relative group cursor-default"
              >
                {/* Circular element mirroring the features UI */}
                <div className="w-20 h-20 rounded-full border-4 border-[#00C6F7]/20 p-1 mb-4 flex items-center justify-center bg-transparent group-hover:border-[#00C6F7]/50 transition-colors duration-300">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0067D9] to-[#020B1C] flex items-center justify-center text-white shadow-md text-2xl font-bold font-mono">
                    {client.charAt(0)}
                  </div>
                </div>
                
                <div className="text-lg font-bold font-mono text-[#102A43] group-hover:text-[#0067D9] transition-colors duration-300">
                  {client}
                </div>

                {/* Short Vertical Divider mirroring the features UI */}
                {i !== 4 && (
                  <div className="absolute right-0 top-[25%] bottom-[15%] w-px bg-slate-200 hidden md:block"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-[80px] relative bg-[#F0F7FF] overflow-hidden">
        {/* Premium Geometric Texture Layer */}
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        {/* Atmospheric Glow Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#102A43] mb-6 relative inline-block">
              What We Build
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </h2>
            <p className="text-lg text-[#475569] mt-8">
              From strategy to deployment, Aventiq delivers technology solutions designed to solve real business problems and create long-term value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => {
              const CARD_THEMES = [
                { main: '#10B981', light: '#ECFDF5' }, // Green
                { main: '#0EA5E9', light: '#F0F9FF' }, // Blue
                { main: '#F97316', light: '#FFF7ED' }, // Orange
                { main: '#8B5CF6', light: '#F5F3FF' }, // Purple
                { main: '#EC4899', light: '#FDF2F8' }, // Pink
                { main: '#6366F1', light: '#EEF2FF' }, // Indigo
              ];
              const theme = CARD_THEMES[i % CARD_THEMES.length];
              
              return (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  style={{ borderColor: theme.main }}
                  className="bg-white rounded-3xl border p-8 flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
                >
                  {/* Glowing Squircle Icon matching the image */}
                  <div 
                    className="w-16 h-16 rounded-2xl text-white flex items-center justify-center mb-6"
                    style={{ 
                      backgroundColor: theme.main, 
                      boxShadow: `0 10px 25px -5px ${theme.main}90` 
                    }}
                  >
                    <service.icon size={28} strokeWidth={2} />
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-[#102A43] mb-3">{service.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-8 flex-grow">{service.desc}</p>
                  
                  {/* Subtle Horizontal Divider */}
                  <div className="w-full h-px bg-slate-100 mb-6"></div>
                  
                  {/* Bottom Action Bar (Explore & Get Quote) */}
                  <div className="w-full flex items-center justify-between mt-auto">
                    <Link 
                      href="/services" 
                      className="flex items-center text-sm font-bold group/link"
                      style={{ color: theme.main }}
                    >
                      Explore <ArrowRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      href="/contact" 
                      className="px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-80"
                      style={{ backgroundColor: theme.light, color: theme.main }}
                    >
                      Get Quote
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE AVENTIQ */}
      <section className="py-[40px] bg-[#031A3D] text-white">
        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Aventiq?</h2>
            <p className="text-[#CBD5E1] text-lg mb-8">
              We combine modern engineering, thoughtful design, and business understanding to build technology that creates measurable impact.
            </p>
            <ul className="space-y-4 mb-10">
              {['Experienced Developers', 'Modern Technology Stack', 'Scalable Architecture', 'Transparent Communication'].map((item, i) => (
                <li key={i} className="flex items-center text-lg">
                  <ShieldCheck className="text-[#00C6F7] mr-3" size={24} />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="accent" size="lg" className="rounded-full">
              <Link href="/about">Discover Our Approach</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#041A3B] p-8 rounded-2xl border border-white/5 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#00C6F7] mb-2">50+</div>
              <div className="text-[#CBD5E1]">Projects Delivered</div>
            </div>
            <div className="bg-[#041A3B] p-8 rounded-2xl border border-white/5 text-center translate-y-8">
              <div className="text-4xl md:text-5xl font-bold text-[#00C6F7] mb-2">30+</div>
              <div className="text-[#CBD5E1]">Happy Clients</div>
            </div>
            <div className="bg-[#041A3B] p-8 rounded-2xl border border-white/5 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#FF8A00] mb-2">10+</div>
              <div className="text-[#CBD5E1]">Technologies</div>
            </div>
            <div className="bg-[#041A3B] p-8 rounded-2xl border border-white/5 text-center translate-y-8">
              <div className="text-4xl md:text-5xl font-bold text-[#FF8A00] mb-2">5+</div>
              <div className="text-[#CBD5E1]">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (List UI based on image) */}
      <section className="py-[40px] bg-[#F4F8FA] border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="mb-16 max-w-3xl">
             <h2 className="text-4xl md:text-5xl font-light text-[#00428A] tracking-tight mb-4">
                Real Stories of <span className="font-semibold text-[#102A43]">Growth & Success</span>
             </h2>
             <p className="text-lg text-slate-600 font-medium">
                Read true experiences shared by our clients, detailing their journeys to scale supported by our engineering teams.
             </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
             
             {/* Left side: Active Testimonial Card */}
             <div className="flex-1 w-full relative bg-white rounded-3xl p-10 md:p-14 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
                {/* Faint large quote mark */}
                <div className="absolute top-10 right-10 text-[180px] font-bold text-slate-50 leading-none select-none pointer-events-none">
                  &rdquo;
                </div>
                
                <div className="relative z-10">
                   <div className="text-sm font-bold tracking-widest text-[#D97706] uppercase mb-8">
                      Verified Client Partner
                   </div>
                   
                   <AnimatePresence mode="wait">
                     <motion.div
                       key={activeTestimonial}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       transition={{ duration: 0.3 }}
                     >
                       <p className="text-[22px] md:text-2xl text-[#334155] leading-[1.7] font-light italic">
                         {testimonials[activeTestimonial].quote}
                       </p>
                     </motion.div>
                   </AnimatePresence>
                </div>
             </div>

             {/* Right side: List of Clients */}
             <div className="w-full lg:w-[450px] flex flex-col gap-3">
                {testimonials.map((testimonial, idx) => {
                   const isActive = idx === activeTestimonial
                   
                   return (
                     <button
                       key={idx}
                       onClick={() => setActiveTestimonial(idx)}
                       className={`w-full text-left px-6 py-5 rounded-2xl transition-all duration-300 border-2 flex items-center justify-between ${
                         isActive 
                           ? "bg-white border-teal-200 shadow-sm" 
                           : "bg-white/50 border-transparent hover:bg-white hover:border-slate-100"
                       }`}
                     >
                       <div>
                         <div className={`font-bold text-[17px] mb-1 ${isActive ? 'text-[#102A43]' : 'text-[#334155]'}`}>
                           {testimonial.name}
                         </div>
                         <div className="text-sm text-slate-400 font-medium">
                           {testimonial.role}
                         </div>
                       </div>
                       
                       {isActive && (
                         <motion.div 
                           layoutId="activeIndicator"
                           className="w-2.5 h-2.5 rounded-full bg-teal-400"
                         />
                       )}
                     </button>
                   )
                })}
             </div>

          </div>
        </div>
      </section>

      {/* BLOG / INSIGHTS */}
      <section className="py-[40px] relative border-b border-slate-100">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 bg-[#F4F8FA]">
          <div 
            className="absolute inset-0 opacity-[0.25]" 
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div className="relative">
              <div className="absolute -inset-10 bg-white/40 blur-3xl rounded-full z-0 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0067D9]/20 text-sm font-bold text-[#0067D9] mb-6 shadow-sm">
                  Insights
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-[#102A43] mb-4" style={{ textShadow: '0 2px 10px rgba(255,255,255,1)' }}>
                  Latest from Our Blog
                </h2>
                <p className="text-lg text-[#334155] max-w-lg font-medium" style={{ textShadow: '0 2px 8px rgba(255,255,255,0.9)' }}>
                  Insights on engineering, design, and technology trends from the Aventiq team.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="relative z-10 rounded-full px-6 border-[#0067D9]/30 text-[#0067D9] hover:bg-[#0067D9] hover:text-white mt-6 md:mt-0 h-12 bg-white shadow-sm font-bold transition-all">
              <Link href="/blog">
                View All Posts
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tag: "Engineering",
                tagColor: "#0067D9",
                title: "Building Scalable SaaS Platforms with Next.js and Edge Computing",
                excerpt: "Learn how we architect multi-tenant SaaS applications that serve thousands of concurrent users with sub-100ms response times.",
                date: "Aug 18, 2026",
                readTime: "8 min read",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
              },
              {
                tag: "AI & ML",
                tagColor: "#8B5CF6",
                title: "Integrating AI Agents into Enterprise Workflows: A Practical Guide",
                excerpt: "A deep dive into how we build intelligent automation pipelines that reduce manual work by up to 60% for our enterprise clients.",
                date: "Aug 12, 2026",
                readTime: "12 min read",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
              },
              {
                tag: "Design",
                tagColor: "#EC4899",
                title: "The Art of Micro-Interactions: Why Small Details Win Big Users",
                excerpt: "How subtle animations and thoughtful UI feedback loops can dramatically improve user retention and satisfaction scores.",
                date: "Aug 5, 2026",
                readTime: "6 min read",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
              },
            ].map((post, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Blog Image */}
                <div className="h-48 relative overflow-hidden bg-slate-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-8">
                  {/* Tag */}
                  <div
                    className="inline-flex px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ backgroundColor: `${post.tagColor}10`, color: post.tagColor }}
                  >
                    {post.tag}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#102A43] mb-3 group-hover:text-[#0067D9] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[#64748B] leading-relaxed mb-6">{post.excerpt}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-xs text-[#94A3B8] font-medium">{post.date}</span>
                    <span className="text-xs text-[#94A3B8] font-medium">{post.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (Clean Light Minimalist Theme) */}
      <section className="py-[40px] bg-white relative">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#102A43] tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Find answers to common questions about our services, process, and technical capabilities.
            </p>
          </div>

          <div className="space-y-0">
            {[
              {
                q: "What technologies does Aventiq use?",
                a: "We work with modern frameworks like Next.js, React, React Native, Node.js, Python, and cloud platforms including AWS, Google Cloud, and Azure. We always choose the best tool for your specific project needs.",
              },
              {
                q: "How long does a typical project take?",
                a: "Project timelines vary based on scope. A typical MVP takes 6-10 weeks, while a full enterprise platform may take 3-6 months. We provide detailed timelines during the discovery phase.",
              },
              {
                q: "Do you offer ongoing support after launch?",
                a: "Absolutely. We provide maintenance packages that include bug fixes, performance monitoring, security updates, and feature enhancements to keep your product running smoothly.",
              },
              {
                q: "What is your development process like?",
                a: "We follow an agile methodology with 2-week sprints, regular demos, and continuous deployment. You'll have full visibility into progress through shared project boards and weekly status updates.",
              },
              {
                q: "Can you work with our existing team?",
                a: "Yes. We offer team augmentation services where our engineers embed with your existing team, following your workflows, coding standards, and communication tools.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group border-b border-slate-200 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer py-6 text-[#102A43] font-bold text-lg md:text-xl list-none transition-colors hover:text-[#0067D9]">
                  <span className="pr-8">{faq.q}</span>
                  <span className="relative flex-shrink-0 w-5 h-5 ml-4 flex items-center justify-center">
                    {/* Vertical line (disappears when open) */}
                    <span className="absolute inset-0 w-[2px] h-full bg-[#102A43] mx-auto rounded-full transition-transform duration-300 group-open:rotate-90 group-open:opacity-0 group-hover:bg-[#0067D9]"></span>
                    {/* Horizontal line (turns blue when open) */}
                    <span className="absolute inset-0 h-[2px] w-full bg-[#102A43] my-auto rounded-full transition-colors duration-300 group-open:bg-[#0067D9] group-hover:bg-[#0067D9]"></span>
                  </span>
                </summary>
                <div className="pb-8 text-slate-600 leading-relaxed text-[17px]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="py-[40px] bg-[#020B1C] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--background-image-gradient-tech)] rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Have an Idea? Let's Build It.</h2>
          <p className="text-xl text-[#CBD5E1] mb-10">
            Tell Aventiq what you're building. We'll help turn your idea into a scalable digital product.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg">
              <Link href="/contact">Start a Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-[#00C6F7] text-[#00C6F7] hover:bg-[#00C6F7]/10">
              <Link href="/contact">Talk to Aventiq</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
