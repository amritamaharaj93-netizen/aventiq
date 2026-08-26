"use client"

import { useState, useEffect } from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Smartphone, Cloud, Cpu, Database, Blocks, LayoutTemplate, ShieldCheck, Zap, Palette, Server, Megaphone, Search, Target, MousePointerClick, Hexagon, Triangle, Box, Command, Layers, User, Mail, Phone, MapPin, Send, Briefcase, Users, Award, Calendar } from "lucide-react"

// Using server component for the page, and we'll extract smaller animated client components if needed,
// but since we want Framer Motion we might just make this a client component, or better:
// wrap specific sections in client components. For simplicity and speed of delivering the first pass, 
// I'll make the page a Client Component to use motion everywhere.
import { motion, AnimatePresence } from "framer-motion"
import { submitContactForm } from "@/app/actions/contact"

const SERVICES = [
  { icon: LayoutTemplate, title: "Web Development", desc: "High-performance, accessible, and modern web applications built for scale.", slug: "web-development" },
  { icon: Cloud, title: "SaaS Development", desc: "End-to-end multi-tenant software as a service platform engineering.", slug: "saas-development" },
  { icon: Palette, title: "UI/UX Design", desc: "Beautiful, intuitive interfaces and user experiences that delight and convert.", slug: "ui-ux-design" },
  { icon: Cpu, title: "AI Development", desc: "Intelligent automation and integrations powered by modern machine learning.", slug: "ai-development" },
  { icon: Server, title: "Cloud & DevOps", desc: "Scalable cloud infrastructure, CI/CD pipelines, and reliable deployment workflows.", slug: "cloud-devops" },
  { icon: Megaphone, title: "Digital Marketing", desc: "Data-driven marketing strategies that amplify your brand and drive growth.", slug: "digital-marketing" },
  { icon: Search, title: "SEO", desc: "Search engine optimization that boosts visibility and organic traffic.", slug: "seo" },
  { icon: Target, title: "Meta Ads", desc: "High-ROI Facebook and Instagram ad campaigns that reach your target audience.", slug: "meta-ads" },
  { icon: MousePointerClick, title: "Google Ads", desc: "Strategic Google Ads management to maximize conversions and minimize ad spend.", slug: "google-ads" },
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
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    },
    {
      badge: "Mobile Excellence",
      headline: "Native apps that users",
      headlineHighlight: "love & engage with",
      description: "We craft pixel-perfect iOS and Android applications with smooth animations, offline-first architecture, and real-time sync that deliver 4.8+ star experiences.",
      cta: "Build Your App",
      accent: "#10B981",
      accentEnd: "#34D399",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
    },
    {
      badge: "E-Commerce Solutions",
      headline: "Commerce platforms that",
      headlineHighlight: "scale & convert",
      description: "End-to-end e-commerce engineering with headless CMS, real-time inventory, and AI-powered recommendations that drive 3x higher conversion rates.",
      cta: "Launch Your Store",
      accent: "#8B5CF6",
      accentEnd: "#A78BFA",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
    },
    {
      badge: "AI-Powered Automation",
      headline: "Intelligent systems that",
      headlineHighlight: "think & automate",
      description: "We build custom AI agents, ML pipelines, and intelligent automation workflows that reduce manual work by 60% and unlock new business capabilities.",
      cta: "Explore AI Solutions",
      accent: "#F59E0B",
      accentEnd: "#FBBF24",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    },
  ]

  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState("")

  const handleHomeContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    setFormSuccess(false);
    
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    
    // Zod schema requires these fields to be strings, so we provide defaults if they don't exist in this form
    formData.set("name", `${firstName} ${lastName}`);
    formData.set("projectType", "General Inquiry");
    formData.set("description", formData.get("message") as string);
    formData.set("company", "");
    formData.set("phone", "");
    formData.set("budget", "");
    formData.set("timeline", "");

    try {
      const res = await submitContactForm(null, formData);
      if (res.success) {
        setFormSuccess(true);
        e.currentTarget.reset();
      } else {
        // Extract the first specific validation error if Zod failed
        const firstError = res.errors ? (Object.values(res.errors as Record<string, string[]>)[0])?.[0] : null;
        setFormError(firstError as string || res.message || "Please fill in all required fields correctly.");
      }
    } catch(err) {
      setFormError("Failed to send message. Please try again later.");
    }
    setIsSubmitting(false);
  }
  const testimonials = [
    {
      name: "Rahul Desai",
      role: "CTO, TechVanguard India",
      quote: "Aventiq transformed our legacy system into a modern SaaS platform. Their team delivered ahead of schedule with exceptional code quality. The architecture handles 10x our original traffic across India. Our experience throughout the engagement was incredible. We were guided whenever we had queries and the engineering staff is highly professional.",
      rating: 5,
    },
    {
      name: "Vikram Mehta",
      role: "Founder, CloudSync Networks",
      quote: "Working with Aventiq felt like having an in-house engineering team in Bengaluru. Their deep understanding of cloud architecture and DevOps practices helped us reduce infrastructure costs by 40%. Highly recommend them to anyone needing serious backend scaling for the Indian market.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "VP of Product, DataFlow Systems",
      quote: "The mobile application Aventiq built for us has a 4.8-star rating and helped us seamlessly expand into Tier 2 and Tier 3 cities. Their attention to UX details and smooth animations set our product apart from every competitor. An absolute joy to collaborate with from start to finish.",
      rating: 5,
    },
    {
      name: "Anjali Kapoor",
      role: "Director of Engineering, FinTech Corp",
      quote: "They didn't just write code; they partnered with us to fundamentally improve our product strategy for the UPI ecosystem. The best technical partners we've ever hired in India. The migration was completely seamless without any downtime.",
      rating: 5,
    },
  ]


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
              className="col-start-1 row-start-1 w-full pt-[80px] pb-[100px]"
            >
              
              {/* Slide-specific Glow Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-20%] right-[0%] w-[800px] h-[800px] rounded-full blur-[150px]" style={{ backgroundColor: `${HERO_SLIDES[activeSlide].accent}12` }}></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]" style={{ backgroundColor: `${HERO_SLIDES[activeSlide].accent}08` }}></div>
              </div>

              {/* Background Image Layer */}
              <div 
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${HERO_SLIDES[activeSlide].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
              </div>

              {/* Slide Content */}
              <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center justify-center min-h-[60vh] pt-4">
                {/* Pill Badge */}
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium mb-6 backdrop-blur-sm"
                  style={{ backgroundColor: `${HERO_SLIDES[activeSlide].accent}20`, borderColor: `${HERO_SLIDES[activeSlide].accent}40`, color: '#fff' }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: HERO_SLIDES[activeSlide].accent }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: HERO_SLIDES[activeSlide].accent }}></span>
                  </span>
                  {HERO_SLIDES[activeSlide].badge}
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-[5.5rem] font-bold tracking-[-0.03em] mb-8 text-white leading-[1.05] max-w-4xl mx-auto drop-shadow-lg">
                  {HERO_SLIDES[activeSlide].headline} <br className="hidden md:block" />
                  <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${HERO_SLIDES[activeSlide].accent}, ${HERO_SLIDES[activeSlide].accentEnd})` }}>
                    {HERO_SLIDES[activeSlide].headlineHighlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-base md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
                  {HERO_SLIDES[activeSlide].description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="rounded-full px-8 h-14 border-0 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all font-semibold text-base hover:scale-105" style={{ backgroundColor: HERO_SLIDES[activeSlide].accent, color: '#030712' }}>
                    <Link href="/contact">{HERO_SLIDES[activeSlide].cta}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 font-medium transition-all text-base group shadow-lg">
                    <Link href="/services">
                      Explore Services
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                  </Button>
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

      {/* SERVICES */}
      <section className="py-10 relative bg-[#F0F7FF] overflow-hidden">
        
        {/* Atmospheric Glow Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#0067D9]"></div>
              <span className="text-[#102A43] font-bold text-sm tracking-[0.15em] uppercase">Our Services</span>
              <div className="w-8 h-[2px] bg-[#0067D9]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#102A43] tracking-tight mb-6">
              What We Build
            </h2>
            <p className="text-lg text-[#475569]">
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
                  
                  {/* Bottom Action Bar */}
                  <div className="w-full flex items-center justify-center mt-auto">
                    <Link 
                      href={`/services/${service.slug}`} 
                      className="flex items-center text-sm font-bold group/link"
                      style={{ color: theme.main }}
                    >
                      Explore <ArrowRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE AVENTIQ */}
      <section className="py-10 md:py-[80px] bg-[#031A3D] text-white overflow-hidden w-full">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-[#0f1115] p-8 rounded-[1.5rem] border border-white/5 flex flex-col items-center text-center shadow-2xl w-full">
              <div className="w-[4.5rem] h-[4.5rem] rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Briefcase className="text-[#00C6F7] w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="text-[2.75rem] font-extrabold text-white mb-5 tracking-tight leading-none">
                50<span className="text-[#00C6F7]">+</span>
              </div>
              <div className="w-10 h-1 bg-[#00C6F7] rounded-full mb-6"></div>
              <div className="text-[#94A3B8] text-[11px] font-bold tracking-[0.2em] uppercase">
                Projects Delivered
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0f1115] p-8 rounded-[1.5rem] border border-white/5 flex flex-col items-center text-center shadow-2xl w-full">
              <div className="w-[4.5rem] h-[4.5rem] rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Users className="text-[#FF8A00] w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="text-[2.75rem] font-extrabold text-white mb-5 tracking-tight leading-none">
                30<span className="text-[#FF8A00]">+</span>
              </div>
              <div className="w-10 h-1 bg-[#FF8A00] rounded-full mb-6"></div>
              <div className="text-[#94A3B8] text-[11px] font-bold tracking-[0.2em] uppercase">
                Happy Clients
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0f1115] p-8 rounded-[1.5rem] border border-white/5 flex flex-col items-center text-center shadow-2xl w-full">
              <div className="w-[4.5rem] h-[4.5rem] rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Layers className="text-[#00C6F7] w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="text-[2.75rem] font-extrabold text-white mb-5 tracking-tight leading-none">
                10<span className="text-[#00C6F7]">+</span>
              </div>
              <div className="w-10 h-1 bg-[#00C6F7] rounded-full mb-6"></div>
              <div className="text-[#94A3B8] text-[11px] font-bold tracking-[0.2em] uppercase">
                Technologies
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0f1115] p-8 rounded-[1.5rem] border border-white/5 flex flex-col items-center text-center shadow-2xl w-full">
              <div className="w-[4.5rem] h-[4.5rem] rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Calendar className="text-[#FF8A00] w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="text-[2.75rem] font-extrabold text-white mb-5 tracking-tight leading-none">
                5<span className="text-[#FF8A00]">+</span>
              </div>
              <div className="w-10 h-1 bg-[#FF8A00] rounded-full mb-6"></div>
              <div className="text-[#94A3B8] text-[11px] font-bold tracking-[0.2em] uppercase">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 bg-[#F8FAFC] border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="mb-16 text-center">
             <div className="inline-flex items-center gap-3 mb-4">
               <div className="w-8 h-[2px] bg-[#FFB800]"></div>
               <span className="text-[#102A43] font-bold text-sm tracking-[0.15em] uppercase">Client Reviews</span>
               <div className="w-8 h-[2px] bg-[#FFB800]"></div>
             </div>
             <h2 className="text-4xl md:text-5xl font-extrabold text-[#102A43] tracking-tight">
                Real Stories of Growth & Success
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 gap-y-12">
             {testimonials.map((testimonial, idx) => (
                <div 
                  key={idx} 
                  className="relative bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col h-full mt-4 lg:mt-6"
                >
                   {/* Overlapping Quote Icon */}
                   <div className="absolute -top-5 -left-4 w-12 h-12 bg-[#FFB800] rounded-full flex items-center justify-center shadow-md">
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#102A43]">
                       <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                       <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                     </svg>
                   </div>

                   {/* Stars */}
                   <div className="flex gap-1 mb-5">
                     {[...Array(5)].map((_, i) => (
                       <svg key={i} className="w-4 h-4 text-[#FFB800] fill-current" viewBox="0 0 24 24">
                         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                       </svg>
                     ))}
                   </div>

                   {/* Quote */}
                   <div className="flex-1">
                     <p className="text-slate-500 italic text-[14.5px] leading-relaxed">
                        "{testimonial.quote}"
                     </p>
                   </div>

                   {/* User Info */}
                   <div className="flex items-center gap-4 mt-8">
                      <div className="w-11 h-11 rounded-full bg-[#102A43] flex items-center justify-center text-white font-bold text-sm shrink-0">
                         {testimonial.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[#102A43] font-bold text-[14px]">
                            {testimonial.name}
                         </span>
                         <span className="text-slate-400 text-[12px]">
                            {testimonial.role}
                         </span>
                      </div>
                   </div>
                </div>
             ))}
          </div>

        </div>
      </section>

      {/* TRUSTED PARTNERS */}
      <section className="relative overflow-hidden bg-[#0A1E3D]">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .marquee-left {
            animation: scroll-left 35s linear infinite;
            display: flex;
            width: max-content;
          }
          .marquee-right {
            animation: scroll-right 35s linear infinite;
            display: flex;
            width: max-content;
          }
          .marquee-left:hover, .marquee-right:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Glow orbs */}
        <div className="absolute top-0 left-[20%] w-[400px] h-[200px] bg-[#0067D9]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-[20%] w-[400px] h-[200px] bg-[#00C6F7]/8 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#0067D9]/50 to-transparent"></div>

        <div className="py-[40px] relative z-10">
          {/* Section Header */}
          <div className="container mx-auto px-4 md:px-8 text-center mb-14">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C6F7] animate-pulse"></div>
              <span className="text-[12px] font-bold text-[#00C6F7] tracking-[0.2em] uppercase">Our Trusted Partners</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Companies We've Built <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0067D9] to-[#00C6F7]">& Delivered For</span>
            </h2>
          </div>

          {/* Row 1 — scrolls left */}
          <div className="w-full overflow-hidden mb-5">
            <div className="marquee-left items-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center shrink-0">
                  {['TechVanguard India', 'CloudSync Networks', 'DataFlow Systems', 'FinTech Corp', 'NexGen Solutions', 'Innovate Labs'].map((company, j) => (
                    <div
                      key={j}
                      className="shrink-0 mx-3 px-10 py-5 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.12] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.2)] hover:from-white/[0.12] hover:to-white/[0.05] hover:border-[#00C6F7]/40 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_30px_rgba(0,198,247,0.1)] transition-all duration-500 group cursor-default"
                    >
                      <span className="font-semibold text-[15px] text-white/80 tracking-[0.04em] whitespace-nowrap group-hover:text-white transition-colors duration-500">
                        {company}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="w-full overflow-hidden">
            <div className="marquee-right items-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center shrink-0">
                  {['Acme Corp', 'GlobalTech', 'FutureSoft', 'RapidScale AI', 'MetaEdge', 'Zenith Digital', 'Prism Analytics'].map((company, j) => (
                    <div
                      key={j}
                      className="shrink-0 mx-3 px-10 py-5 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.12] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.2)] hover:from-white/[0.12] hover:to-white/[0.05] hover:border-[#00C6F7]/40 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_30px_rgba(0,198,247,0.1)] transition-all duration-500 group cursor-default"
                    >
                      <span className="font-semibold text-[15px] text-white/80 tracking-[0.04em] whitespace-nowrap group-hover:text-white transition-colors duration-500">
                        {company}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00C6F7]/50 to-transparent"></div>
      </section>

      {/* BLOG / INSIGHTS */}
      <section className="py-[40px] relative border-b border-slate-100">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 bg-[#F4F8FA]">
          <div 
            className="absolute inset-0 opacity-20"
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

      {/* TECHNOLOGIES */}
      <section className="py-[40px] bg-gradient-to-b from-[#020C1B] to-[#0A1E3D] relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C6F7]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0067D9]/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#00C6F7]"></div>
              <span className="text-[#00C6F7] font-bold text-sm tracking-[0.15em] uppercase">Tech Stack</span>
              <div className="w-8 h-[2px] bg-[#00C6F7]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              Technologies We Use
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              {
                name: "HTML",
                category: "Frontend",
                color: "#E34F26",
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
                    <path d="M3 3h18l-1.5 16L12 22l-7.5-3L3 3z" strokeLinejoin="round" />
                    <path d="M7.5 7h9l-.5 4.5h-8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 11.5l-.5 4.5-3.5 1.5-3.5-1.5-.2-2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                name: "CSS",
                category: "Frontend",
                color: "#1572B6",
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
                    <path d="M3 3h18l-1.5 16L12 22l-7.5-3L3 3z" strokeLinejoin="round" />
                    <path d="M16.5 7H7.5l.5 4.5h8l-.5 4.5-3.5 1.5-3.5-1.5-.2-2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                name: "React",
                category: "Frontend",
                color: "#61DAFB",
                svg: (
                  <svg viewBox="-11.5 -10.2 23 20.4" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-14 h-14">
                    <ellipse rx="11" ry="4.2"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                    <circle r="2" fill="currentColor" stroke="none"/>
                  </svg>
                )
              },
              {
                name: "Next.js",
                category: "Frontend",
                color: "#FFFFFF",
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 8v8l8-8v8"/>
                  </svg>
                )
              },
              {
                name: "PHP",
                category: "Backend",
                color: "#777BB4",
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
                    <ellipse cx="12" cy="12" rx="10" ry="6"/>
                    <text x="12" y="16" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">PHP</text>
                  </svg>
                )
              },
              {
                name: "WordPress",
                category: "CMS",
                color: "#21759B",
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M6 10l3 8.5L12 12l3 6.5L18 10" strokeLinejoin="round"/>
                  </svg>
                )
              },
              {
                name: "Android",
                category: "Mobile",
                color: "#3DDC84",
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
                    <path d="M5 14v-4a7 7 0 0 1 14 0v4M8 8v-2M16 8v-2"/>
                    <rect x="5" y="14" width="14" height="4" rx="1"/>
                  </svg>
                )
              },
              {
                name: "AWS",
                category: "Cloud",
                color: "#FF9900",
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
                    <path d="M4 15s4 4 10 2c-3 1-7-1-10-2z" fill="currentColor" stroke="none"/>
                    <path d="M14 12c-1.5 2-4.5 3-7 1.5 1-1 3.5-2.5 7-1.5z" fill="currentColor" stroke="none"/>
                    <path d="M19 15l-2 1m2-1l-1-2" strokeWidth="2"/>
                    <text x="12" y="11" fontSize="8" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">AWS</text>
                  </svg>
                )
              },
              {
                name: "GitHub",
                category: "Version Control",
                color: "#FFFFFF",
                svg: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                )
              },
              {
                name: "Vercel",
                category: "Hosting",
                color: "#FFFFFF",
                svg: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
                    <path d="M12 4L22 20H2L12 4Z"/>
                  </svg>
                )
              }
            ].map((tech, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div 
                  className="w-[110px] h-[110px] rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center mb-5 group-hover:-translate-y-2 group-hover:bg-white/[0.08] transition-all duration-500"
                  style={{ '--hover-border-color': tech.color } as React.CSSProperties}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = tech.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                >
                  <div style={{ color: tech.color }} className="transition-transform duration-500 group-hover:scale-110">
                    {tech.svg}
                  </div>
                </div>
                <h3 className="font-bold text-white text-[16px] mb-1 transition-colors duration-300" style={{ '--hover-text-color': tech.color } as React.CSSProperties} onMouseEnter={(e) => (e.currentTarget.style.color = tech.color)} onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}>{tech.name}</h3>
                <span className="text-white/40 font-bold text-[10px] tracking-[0.1em] uppercase">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 bg-[#F4F8FA] relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#FFB800]"></div>
              <span className="text-[#102A43] font-bold text-sm tracking-[0.15em] uppercase">FAQ</span>
              <div className="w-8 h-[2px] bg-[#FFB800]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#102A43] tracking-tight mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-500">
              Got questions? We've got answers. If you don't see your question here, feel free to reach out to our team.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "What is your typical project timeline?",
                a: "Project timelines vary depending on scope and complexity. A simple MVP might take 4-8 weeks, while enterprise SaaS platforms typically take 3-6 months. We work iteratively, providing deliverables every sprint."
              },
              {
                q: "Do you provide post-launch support and maintenance?",
                a: "Yes, we offer comprehensive post-launch support, maintenance, and SLA-backed retainers to ensure your software remains secure, performant, and up-to-date with the latest technologies."
              },
              {
                q: "What is your pricing model?",
                a: "We offer flexible pricing models including fixed-price for well-defined scopes and time-and-materials for agile projects with evolving requirements. We're transparent about costs and provide detailed estimates."
              },
              {
                q: "Will I own the intellectual property (IP)?",
                a: "Absolutely. Once the project is fully paid for, you receive complete ownership of all source code, designs, and intellectual property."
              },
              {
                q: "How do you ensure the quality of your code?",
                a: "We employ rigorous code reviews, automated testing (unit, integration, and E2E), CI/CD pipelines, and adhere to strict coding standards to deliver robust, bug-free applications."
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className={`bg-white rounded-2xl border ${openFaq === i ? 'border-[#0067D9] shadow-md shadow-blue-900/5' : 'border-slate-200 shadow-sm'} overflow-hidden transition-all duration-300`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-bold text-xl pr-4 leading-tight ${openFaq === i ? 'text-[#0067D9]' : 'text-[#102A43]'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === i ? 'bg-[#0067D9] text-white' : 'bg-[#F0F7FF] text-[#0067D9]'}`}>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-5 pt-3 text-slate-500 text-lg leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section className="py-10 bg-white relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-slate-50 to-transparent rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/50 to-transparent rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 text-sm font-bold text-slate-600 mb-5 tracking-widest uppercase">
                Contact Us
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-[#102A43] tracking-tight mb-4 leading-snug">
                Let's build something <br/>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0067D9] to-[#00C6F7]">extraordinary together.</span>
              </h2>
              <p className="text-base text-slate-500 mb-8 max-w-md leading-relaxed">
                Whether you have a fully formed project or just an idea on a napkin, our team is ready to bring your vision to life.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] flex items-center justify-center text-[#0067D9] group-hover:bg-[#0067D9] group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#102A43] mb-0.5">Email Us</h4>
                    <a href="mailto:aventiq34@gmail.com" className="text-sm text-[#0067D9] font-medium hover:underline">aventiq34@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] flex items-center justify-center text-[#0067D9] group-hover:bg-[#0067D9] group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#102A43] mb-0.5">Call Us</h4>
                    <a href="tel:+918239988743" className="text-sm text-[#0067D9] font-medium hover:underline">8239988743</a>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] flex items-center justify-center text-[#0067D9] group-hover:bg-[#0067D9] group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#102A43] mb-0.5">Visit Us</h4>
                    <a href="https://maps.google.com/?q=Kokar+Ranchi" target="_blank" rel="noopener noreferrer" className="text-sm text-[#0067D9] font-medium hover:underline">Kokar Ranchi</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="flex-1 w-full max-w-xl">
              <div className="bg-white rounded-[40px] shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-slate-100 p-8 md:p-12 relative overflow-hidden">
                {/* Form decorative accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100 to-transparent opacity-50 pointer-events-none"></div>
                
                <h3 className="text-2xl font-bold text-[#102A43] mb-8 relative z-10">Send a Message</h3>
                
                <form className="space-y-6 relative z-10" onSubmit={handleHomeContact}>
                  {formSuccess ? (
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="p-6 bg-green-50 border border-green-100 rounded-2xl text-green-700 text-center font-medium mb-6 w-full">
                        Thanks for reaching out! We will be in touch shortly.
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          setFormSuccess(false);
                          setFormError("");
                        }}
                        className="w-full py-4 rounded-2xl bg-[#102A43] hover:bg-[#0067D9] text-white font-bold text-lg transition-colors flex items-center justify-center shadow-lg shadow-blue-900/20 cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <>
                      {formError && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl font-medium text-sm">
                          {formError}
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-600 ml-1">First Name</label>
                          <input 
                            type="text" 
                            name="firstName"
                            required
                            placeholder="John" 
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all placeholder:text-slate-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-600 ml-1">Last Name</label>
                          <input 
                            type="text" 
                            name="lastName"
                            required
                            placeholder="Doe" 
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          placeholder="john@company.com" 
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Message</label>
                        <textarea 
                          name="message"
                          required
                          placeholder="Tell us about your project..." 
                          rows={4}
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all placeholder:text-slate-400 resize-none"
                        ></textarea>
                      </div>
                      
                      <button disabled={isSubmitting} type="submit" className="w-full py-4 rounded-2xl bg-[#102A43] hover:bg-[#0067D9] text-white font-bold text-lg transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20 mt-2 disabled:opacity-70">
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* FINAL CTA (Light BG + Dark Glassmorphism) */}
      <section className="py-[40px] relative overflow-hidden bg-gradient-to-br from-[#EEF5FB] via-[#E0EFFA] to-[#D4E8F8]">
        {/* Soft Decorative Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-300/30 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-cyan-200/30 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-violet-200/20 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '10s' }}></div>

        <div className="container relative z-10 mx-auto px-4 text-center max-w-6xl">
          {/* Wide Dark Glassmorphism Card with responsive border-radius */}
          <div className="relative group">
            {/* Outer glow ring */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#0067D9]/40 via-[#00C6F7]/40 to-[#8B5CF6]/40 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem] md:rounded-[200px]"></div>
            
            <div className="relative bg-[#0A1A35]/85 backdrop-blur-2xl border border-white/10 p-10 md:p-20 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)] rounded-[3rem] md:rounded-[200px]">
              {/* Inner shimmer */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none rounded-[3rem] md:rounded-[200px]"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-[#00C6F7]/30 to-transparent"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-sm font-bold text-[#00C6F7] mb-8 uppercase tracking-[0.2em] backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#00C6F7] animate-pulse"></span>
                  Let's Collaborate
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                  Have an Idea?{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6F7] via-[#0067D9] to-[#8B5CF6]">
                    Let's Build It.
                  </span>
                </h2>
                <p className="text-base md:text-xl text-slate-300/80 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                  Tell Aventiq what you're building. We'll help turn your vision into a scalable digital product.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-5">
                  <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg font-bold bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:from-[#0052ad] hover:to-[#00b0dc] text-white shadow-[0_0_40px_rgba(0,103,217,0.35)] hover:shadow-[0_0_60px_rgba(0,198,247,0.4)] transition-all duration-300 hover:-translate-y-1 border-0">
                    <Link href="/contact">Start a Project</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg font-bold border-white/15 text-white hover:bg-white/10 bg-white/[0.05] backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                    <Link href="/contact">Talk to Aventiq</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
