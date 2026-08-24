"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, MessageCircleQuestion } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const FAQS = [
  {
    category: "General & Process",
    questions: [
      {
        q: "What is your typical software development process?",
        a: "Our process is rooted in Agile methodology. We begin with a Discovery & Strategy phase to understand your business goals, followed by UI/UX Design, Architecture Planning, Development, rigorous QA Testing, and finally Deployment. Post-launch, we provide continuous monitoring and iteration."
      },
      {
        q: "How long does it take to build a custom web or mobile application?",
        a: "Timelines vary significantly based on complexity. A standard MVP (Minimum Viable Product) typically takes 8 to 12 weeks. Large-scale enterprise applications or complex SaaS platforms can take 4 to 6 months. We provide a detailed roadmap and timeline during our initial scoping phase."
      },
      {
        q: "Will I have a dedicated project manager?",
        a: "Yes. Every client is assigned a dedicated Technical Project Manager who serves as your primary point of contact. They ensure transparent communication, provide weekly sprint updates, and ensure the engineering team remains aligned with your business objectives."
      }
    ]
  },
  {
    category: "Technical & Engineering",
    questions: [
      {
        q: "What technology stack do you use?",
        a: "We specialize in modern, scalable technologies. For web, we heavily utilize React, Next.js, and TypeScript. For mobile, React Native or native Swift/Kotlin. Our backend architectures typically rely on Node.js, NestJS, Python, or Go, backed by PostgreSQL and deployed on AWS or Vercel infrastructure."
      },
      {
        q: "Do you build custom APIs or integrate with existing third-party software?",
        a: "Both. We engineer secure, RESTful, and GraphQL APIs from scratch. We also have extensive experience integrating complex third-party systems, including payment gateways (Stripe), CRMs (Salesforce), ERPs, and AI models (OpenAI)."
      },
      {
        q: "Who owns the source code after the project is completed?",
        a: "You do. Once the project is fully delivered and all terms are settled, Aventiq transfers 100% intellectual property ownership and source code rights to your organization."
      }
    ]
  },
  {
    category: "Pricing & Support",
    questions: [
      {
        q: "How do you price your software development projects?",
        a: "We offer two engagement models: Fixed-Price for well-defined projects with strict scopes, and Time & Materials (Dedicated Team) for dynamic projects that require ongoing flexibility and scaling. We will recommend the best model during our initial consultation."
      },
      {
        q: "Do you offer post-launch maintenance and support?",
        a: "Absolutely. Software requires ongoing maintenance to remain secure and performant. We offer customizable SLA (Service Level Agreement) packages that include 24/7 monitoring, security patching, bug fixes, and continuous feature development."
      }
    ]
  }
]

function AccordionItem({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border border-[#DCE8F5] rounded-2xl mb-4 bg-white overflow-hidden shadow-sm hover:border-[#00C6F7]/40 transition-colors">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-white focus:outline-none"
      >
        <span className={`text-lg md:text-xl font-bold pr-8 transition-colors ${isOpen ? 'text-[#0067D9]' : 'text-[#020B1C]'}`}>
          {q}
        </span>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#0067D9] text-white' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 md:p-8 pt-0 text-[#475569] leading-relaxed font-light text-lg border-t border-transparent">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { PageHeader } from "@/components/layout/PageHeader"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0") // Open the first one by default

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24">
      <PageHeader 
        title="Frequently Asked Questions" 
        breadcrumbs={[{ label: "FAQ" }]} 
        bgImage="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2000&auto=format&fit=crop"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl mt-24 mb-16">
        <p className="text-xl md:text-2xl text-[#475569] font-light leading-relaxed">
          Everything you need to know about partnering with Aventiq, our engineering processes, and how we deliver premium software.
        </p>
      </div>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {FAQS.map((category, catIndex) => (
            <div key={category.category} className="mb-16 last:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#020B1C] mb-8 tracking-tight flex items-center gap-4">
                <span className="w-8 h-1 bg-[#00C6F7] rounded-full"></span>
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const id = `${catIndex}-${qIndex}`
                  return (
                    <AccordionItem 
                      key={id}
                      q={faq.q}
                      a={faq.a}
                      isOpen={openIndex === id}
                      onClick={() => setOpenIndex(openIndex === id ? null : id)}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section className="py-24 bg-white border-t border-[#F1F5F9]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#020B1C] mb-6 tracking-tight">Still have questions?</h2>
          <p className="text-xl text-[#475569] font-light mb-10">
            Can't find the answer you're looking for? Our executive engineering team is ready to discuss your specific requirements.
          </p>
          <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg bg-[#0067D9] hover:bg-[#00C6F7] hover:text-[#020B1C] transition-all shadow-xl shadow-[#0067D9]/20">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
