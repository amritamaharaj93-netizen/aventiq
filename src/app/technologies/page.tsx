"use client"

import { motion } from "framer-motion"

const STACK = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Framer Motion", slug: "framer" },
      { name: "Vue.js", slug: "vuedotjs" }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Python", slug: "python" },
      { name: "Express", slug: "express" },
      { name: "NestJS", slug: "nestjs" },
      { name: "Go", slug: "go" },
      { name: "GraphQL", slug: "graphql" }
    ]
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "MySQL", slug: "mysql" },
      { name: "Redis", slug: "redis" },
      { name: "Prisma", slug: "prisma" },
      { name: "Drizzle", slug: "drizzle" }
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", slug: "amazonaws" },
      { name: "Vercel", slug: "vercel" },
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "GitHub Actions", slug: "githubactions" },
      { name: "Terraform", slug: "terraform" }
    ]
  }
]

import { PageHeader } from "@/components/layout/PageHeader"

export default function TechnologiesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 overflow-hidden">
      <PageHeader 
        title="Modern Technology Stack" 
        breadcrumbs={[{ label: "Technologies" }]} 
        bgImage="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-24 mb-24">
        
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-bold text-[#0067D9] mb-8 tracking-widest uppercase shadow-sm">
            Our Stack
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0067D9] to-[#00C6F7]">Scale</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            We utilize the most robust, scalable, and secure technologies to architect digital products capable of handling millions of users effortlessly.
          </p>
        </div>

        <div className="space-y-24">
          {STACK.map((group, groupIndex) => (
            <div key={group.category} className="relative">
              
              {/* Category Header */}
              <div className="flex items-center gap-6 mb-12">
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{group.category}</h3>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              {/* Grid of Tech Icons */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                {group.items.map((tech, index) => (
                  <motion.div 
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, ease: "easeOut" }}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    {/* Rounded Square Box */}
                    <div className="w-full aspect-square bg-white rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-center p-8 mb-5 group-hover:shadow-[0_10px_40px_rgba(0,103,217,0.1)] group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00C6F7]/5 to-[#0067D9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Tech Logo fetching from SimpleIcons using the theme blue color */}
                      <img 
                        src={`https://cdn.simpleicons.org/${tech.slug}/0067D9`} 
                        alt={tech.name}
                        className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm"
                        loading="lazy"
                      />
                    </div>

                    {/* Labels below the box exactly like the requested image */}
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#0067D9] transition-colors">{tech.name}</h4>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">{group.category}</span>
                  </motion.div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
