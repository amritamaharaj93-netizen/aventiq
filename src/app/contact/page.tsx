"use client"

import { useActionState, useEffect, useState } from "react"
import { submitContactForm } from "@/app/actions/contact"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { PageHeader } from "@/components/layout/PageHeader"

const PROJECT_TYPES = [
  "Website",
  "SaaS",
  "Mobile App",
  "AI Solution",
  "E-commerce",
  "Custom Software",
  "Other"
]

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null as any)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (state?.success) {
      setSuccess(true)
    }
  }, [state])

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <PageHeader 
        title="Contact Us" 
        breadcrumbs={[{ label: "Contact Us" }]} 
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="container mx-auto px-4 max-w-7xl mt-12 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-bold text-[#0067D9] mb-8 tracking-widest uppercase shadow-sm w-max">
              Get in touch
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
              Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0067D9] to-[#00C6F7]">Great.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 mb-16 max-w-lg leading-relaxed font-medium">
              Have a vision, a product to build, or an existing system that needs scaling? Tell our engineering team about your project.
            </p>
            
            <div className="space-y-10">
              <div className="group flex flex-col items-start">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-2">Email Us</h3>
                <a href="mailto:hello@aventiq.com" className="text-2xl font-bold text-[#0067D9] group-hover:text-[#00C6F7] transition-colors">hello@aventiq.com</a>
              </div>
              <div className="group flex flex-col items-start">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-2">Call Us</h3>
                <a href="tel:8239988743" className="text-2xl font-bold text-slate-700 group-hover:text-[#0067D9] transition-colors">8239988743</a>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-2">Location</h3>
                <p className="text-xl font-bold text-slate-700">Kokar Ranchi</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 relative overflow-hidden"
          >
            {/* Subtle Gradient Glow in top right of form */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-[#00C6F7]/20 to-[#0067D9]/20 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"></div>
            
            {success ? (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[450px] relative z-10">
                <div className="w-20 h-20 bg-[#F3F8FF] rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-10 h-10 text-[#0067D9]" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Inquiry Received</h2>
                <p className="text-slate-600 text-lg max-w-md mb-10 font-medium">
                  {state?.message || "Thanks for reaching out! One of our technical directors will be in touch shortly."}
                </p>
                <Button className="h-14 px-8 text-lg font-bold rounded-2xl bg-slate-900 text-white hover:scale-105 transition-transform" onClick={() => setSuccess(false)}>Send Another</Button>
              </div>
            ) : (
              <form action={formAction} className="space-y-6 relative z-10">
                {state?.success === false && !state?.errors && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start gap-3 font-medium text-sm">
                    <AlertCircle className="shrink-0 mt-0.5" size={20} />
                    <p>{state.message}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-900 uppercase tracking-wider">Full Name <span className="text-[#0067D9]">*</span></label>
                    <input type="text" id="name" name="name" className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all font-medium text-slate-900 placeholder:font-normal placeholder:text-slate-400" required placeholder="John Doe" />
                    {state?.errors?.name && <p className="text-red-500 text-xs font-medium">{state.errors.name[0]}</p>}
                  </div>
                  <div className="space-y-2.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-900 uppercase tracking-wider">Email Address <span className="text-[#0067D9]">*</span></label>
                    <input type="email" id="email" name="email" className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all font-medium text-slate-900 placeholder:font-normal placeholder:text-slate-400" required placeholder="john@company.com" />
                    {state?.errors?.email && <p className="text-red-500 text-xs font-medium">{state.errors.email[0]}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label htmlFor="company" className="text-xs font-bold text-slate-900 uppercase tracking-wider">Company</label>
                    <input type="text" id="company" name="company" className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all font-medium text-slate-900 placeholder:font-normal placeholder:text-slate-400" placeholder="Optional" />
                  </div>
                  <div className="space-y-2.5">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-900 uppercase tracking-wider">Phone Number</label>
                    <input type="tel" id="phone" name="phone" className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all font-medium text-slate-900 placeholder:font-normal placeholder:text-slate-400" placeholder="Optional" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label htmlFor="projectType" className="text-xs font-bold text-slate-900 uppercase tracking-wider">Project Type <span className="text-[#0067D9]">*</span></label>
                  <select id="projectType" name="projectType" className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all appearance-none font-medium text-slate-900" required defaultValue="">
                    <option value="" disabled className="text-slate-400">Select a project type</option>
                    {PROJECT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {state?.errors?.projectType && <p className="text-red-500 text-xs font-medium">{state.errors.projectType[0]}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label htmlFor="budget" className="text-xs font-bold text-slate-900 uppercase tracking-wider">Budget Range</label>
                    <select id="budget" name="budget" className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all appearance-none font-medium text-slate-900">
                      <option value="" className="text-slate-400">Select a range</option>
                      <option value="< $10k">Less than $10,000</option>
                      <option value="$10k - $25k">$10,000 - $25,000</option>
                      <option value="$25k - $50k">$25,000 - $50,000</option>
                      <option value="$50k+">$50,000+</option>
                    </select>
                  </div>
                  <div className="space-y-2.5">
                    <label htmlFor="timeline" className="text-xs font-bold text-slate-900 uppercase tracking-wider">Timeline</label>
                    <select id="timeline" name="timeline" className="w-full h-14 px-5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all appearance-none font-medium text-slate-900">
                      <option value="" className="text-slate-400">Select timeline</option>
                      <option value="ASAP">As soon as possible</option>
                      <option value="1-3 months">1 - 3 months</option>
                      <option value="3-6 months">3 - 6 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label htmlFor="description" className="text-xs font-bold text-slate-900 uppercase tracking-wider">Project Details <span className="text-[#0067D9]">*</span></label>
                  <textarea id="description" name="description" rows={5} className="w-full p-5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0067D9]/20 focus:border-[#0067D9] transition-all resize-none font-medium text-slate-900 placeholder:font-normal placeholder:text-slate-400" required placeholder="Tell us about your goals, technical requirements, and vision..."></textarea>
                  {state?.errors?.description && <p className="text-red-500 text-xs font-medium">{state.errors.description[0]}</p>}
                </div>

                <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-[#0067D9] to-[#00C6F7] text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 mt-4" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Inquiry...
                    </>
                  ) : (
                    "Submit Project Inquiry"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
