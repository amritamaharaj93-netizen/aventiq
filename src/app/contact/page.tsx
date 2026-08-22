"use client"

import { useActionState, useEffect, useState } from "react"
import { submitContactForm } from "@/app/actions/contact"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

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
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#102A43] mb-6">Let's Build Something Great.</h1>
            <p className="text-xl text-[#475569] mb-12 max-w-lg">
              Have an idea, a product to build, or an existing system that needs improvement? Tell Aventiq about your project.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-[#102A43] text-lg mb-2">Email Us</h3>
                <p className="text-[#0067D9]">hello@aventiq.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#102A43] text-lg mb-2">Call Us</h3>
                <p className="text-[#475569]">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#102A43] text-lg mb-2">Location</h3>
                <p className="text-[#475569]">San Francisco, CA<br/>Global Remote Team</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border"
          >
            {success ? (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <CheckCircle2 className="w-16 h-16 text-[#00C6F7] mb-6" />
                <h2 className="text-3xl font-bold text-[#102A43] mb-4">Request Received</h2>
                <p className="text-[#475569] text-lg max-w-md">
                  {state?.message}
                </p>
                <Button className="mt-8" onClick={() => setSuccess(false)}>Send Another Message</Button>
              </div>
            ) : (
              <form action={formAction} className="space-y-6">
                {state?.success === false && !state?.errors && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-start gap-3">
                    <AlertCircle className="shrink-0 mt-0.5" size={20} />
                    <p>{state.message}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-[#102A43]">Full Name *</label>
                    <input type="text" id="name" name="name" className="w-full h-12 px-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-[#0067D9] transition-all" required />
                    {state?.errors?.name && <p className="text-red-500 text-xs">{state.errors.name[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#102A43]">Email Address *</label>
                    <input type="email" id="email" name="email" className="w-full h-12 px-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-[#0067D9] transition-all" required />
                    {state?.errors?.email && <p className="text-red-500 text-xs">{state.errors.email[0]}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-[#102A43]">Company</label>
                    <input type="text" id="company" name="company" className="w-full h-12 px-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-[#0067D9] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-[#102A43]">Phone Number</label>
                    <input type="tel" id="phone" name="phone" className="w-full h-12 px-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-[#0067D9] transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-sm font-medium text-[#102A43]">Project Type *</label>
                  <select id="projectType" name="projectType" className="w-full h-12 px-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-[#0067D9] transition-all appearance-none" required defaultValue="">
                    <option value="" disabled>Select a project type</option>
                    {PROJECT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {state?.errors?.projectType && <p className="text-red-500 text-xs">{state.errors.projectType[0]}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-sm font-medium text-[#102A43]">Budget Range</label>
                    <select id="budget" name="budget" className="w-full h-12 px-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-[#0067D9] transition-all appearance-none">
                      <option value="">Select a range</option>
                      <option value="< $10k">Less than $10,000</option>
                      <option value="$10k - $25k">$10,000 - $25,000</option>
                      <option value="$25k - $50k">$25,000 - $50,000</option>
                      <option value="$50k+">$50,000+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="timeline" className="text-sm font-medium text-[#102A43]">Timeline</label>
                    <select id="timeline" name="timeline" className="w-full h-12 px-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-[#0067D9] transition-all appearance-none">
                      <option value="">Select timeline</option>
                      <option value="ASAP">As soon as possible</option>
                      <option value="1-3 months">1 - 3 months</option>
                      <option value="3-6 months">3 - 6 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-[#102A43]">Project Description *</label>
                  <textarea id="description" name="description" rows={5} className="w-full p-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-[#0067D9] transition-all resize-none" required placeholder="Tell us about your goals, requirements, and vision..."></textarea>
                  {state?.errors?.description && <p className="text-red-500 text-xs">{state.errors.description[0]}</p>}
                </div>

                <Button type="submit" className="w-full h-12 text-lg" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Request...
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
