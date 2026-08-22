"use client"

import { motion } from "framer-motion"
import { Target, Eye, Zap, Shield, HeartHandshake, BookOpen } from "lucide-react"

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
    <div className="min-h-screen bg-white pt-32 pb-24">
      {/* Hero */}
      <div className="container mx-auto px-4 md:px-8 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl text-center mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#102A43] mb-6">
            Technology With a Purpose.
          </h1>
          <p className="text-xl text-[#475569] leading-relaxed">
            Aventiq is a software development company focused on helping businesses turn ideas into reliable, scalable, and impactful digital products.
          </p>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-[#031A3D] text-white py-24">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-sm uppercase tracking-wider font-bold text-[#00C6F7] mb-4">Our Mission</h2>
            <p className="text-2xl md:text-3xl font-medium leading-snug">
              To help businesses use technology to solve meaningful problems and create sustainable growth.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-sm uppercase tracking-wider font-bold text-[#FF8A00] mb-4">Our Vision</h2>
            <p className="text-2xl md:text-3xl font-medium leading-snug">
              To become a trusted technology partner for businesses building the future across the globe.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="container mx-auto px-4 md:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#102A43] mb-6">Our Values</h2>
          <p className="text-lg text-[#475569]">
            The core principles that guide our engineering process and how we interact with our clients.
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
              className="bg-[#F8FAFC] p-8 rounded-2xl border border-border hover:border-[#0067D9]/30 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0067D9] mb-6">
                <value.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#102A43] mb-3">{value.title}</h3>
              <p className="text-[#475569]">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
