"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, LayoutTemplate, Cloud, Smartphone, Palette, Cpu, Database, Server, Blocks, ShoppingCart, Wrench } from "lucide-react"

const ALL_SERVICES = [
  { 
    icon: LayoutTemplate, 
    title: "Web Development", 
    desc: "High-performance, accessible, and modern web applications built for scale. We create responsive digital experiences that engage users and drive conversions.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    slug: "web-development"
  },
  { 
    icon: Cloud, 
    title: "SaaS Development", 
    desc: "End-to-end multi-tenant software as a service platform engineering. From subscription billing to complex user roles, we build scalable platforms.",
    tags: ["Node.js", "AWS", "PostgreSQL", "Stripe"],
    slug: "saas-development"
  },
  { 
    icon: Smartphone, 
    title: "Mobile App Development", 
    desc: "Native-feeling iOS and Android applications with single codebases. Deliver seamless mobile experiences with fast performance and offline capabilities.",
    tags: ["React Native", "Swift", "Kotlin", "Firebase"],
    slug: "mobile-development"
  },
  { 
    icon: Palette, 
    title: "UI/UX Design", 
    desc: "User-centric interface design and intuitive experiences. We transform complex workflows into clean, accessible, and beautiful interfaces.",
    tags: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
    slug: "ui-ux-design"
  },
  { 
    icon: Cpu, 
    title: "AI Development", 
    desc: "Intelligent automation and integrations powered by modern machine learning. Leverage large language models and computer vision for your business.",
    tags: ["OpenAI", "Python", "PyTorch", "LangChain"],
    slug: "ai-development"
  },
  { 
    icon: Database, 
    title: "API & Backend", 
    desc: "Secure, fast, and scalable architectures designed for complex data flows. We engineer robust APIs that power enterprise-grade applications.",
    tags: ["GraphQL", "REST", "NestJS", "Prisma"],
    slug: "api-backend"
  },
  { 
    icon: Server, 
    title: "Cloud & DevOps", 
    desc: "Automated deployments, continuous integration, and cloud infrastructure management for highly available software systems.",
    tags: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    slug: "cloud-devops"
  },
  { 
    icon: Blocks, 
    title: "Custom Software", 
    desc: "Tailored software solutions designed from the ground up to solve your specific operational challenges and business requirements.",
    tags: ["Architecture", "Enterprise", "Legacy Migration"],
    slug: "custom-software"
  },
  { 
    icon: ShoppingCart, 
    title: "E-commerce Development", 
    desc: "Scalable online storefronts with customized checkouts, inventory management, and fast, secure payment processing integrations.",
    tags: ["Shopify", "Next.js Commerce", "Medusa", "Stripe"],
    slug: "ecommerce"
  },
  { 
    icon: Wrench, 
    title: "Maintenance & Support", 
    desc: "Ongoing code optimization, security patching, and technical support to ensure your digital products remain fast, secure, and reliable.",
    tags: ["Monitoring", "SLA", "Updates", "Security audits"],
    slug: "maintenance"
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24">
      {/* Header Section */}
      <div className="container mx-auto px-4 md:px-8 mb-20 text-center max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-[#102A43] mb-6"
        >
          What We Build
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-[#475569] leading-relaxed"
        >
          From strategy to deployment, Aventiq delivers technology solutions designed to solve real business problems and create long-term value.
        </motion.p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {ALL_SERVICES.map((service) => (
            <motion.div 
              key={service.title} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Cyan Hover Glow (Subtle Top Border) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-[#00C6F7] transition-colors duration-300"></div>
              
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-xl bg-[#F3F8FF] flex items-center justify-center text-[#0067D9] mb-6 group-hover:bg-[#062B63] group-hover:text-white transition-colors duration-300 relative">
                 <service.icon size={28} />
                 {/* Small Orange Accent Dot */}
                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF8A00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#102A43] mb-4 group-hover:text-[#0067D9] transition-colors">{service.title}</h3>
              <p className="text-[#475569] mb-8 line-clamp-3 leading-relaxed">
                {service.desc}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {service.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F3FF] text-[#0067D9] border border-[#DCE8F5]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link Arrow */}
              <div className="absolute bottom-8 left-8 right-8 flex items-center text-[#0067D9] font-semibold mt-auto group/link">
                View Service 
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mini CTA at bottom */}
      <div className="container mx-auto px-4 mt-32">
        <div className="bg-[#031A3D] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00C6F7] rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#0067D9] rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need a custom solution?</h2>
            <p className="text-[#CBD5E1] mb-8 max-w-2xl mx-auto">
              We specialize in building bespoke software that fits your exact operational needs. Let's discuss your requirements and technical architecture.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-[#FF8A00] hover:bg-[#FF9700] text-white px-8 py-4 rounded-full font-semibold transition-colors shadow-lg"
            >
              Talk to Our Engineers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
