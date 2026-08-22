"use client"

import { motion } from "framer-motion"

const STACK = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Express", "NestJS", "Go", "GraphQL"]
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma", "Drizzle"]
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Vercel", "Docker", "Kubernetes", "GitHub Actions", "Terraform"]
  },
  {
    category: "AI & Machine Learning",
    items: ["OpenAI API", "Python", "PyTorch", "LangChain", "TensorFlow"]
  }
]

export default function TechnologiesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-[#102A43] mb-6"
          >
            Built With Modern Technology
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#475569] max-w-3xl mx-auto"
          >
            We use proven technologies and modern engineering practices to create fast, secure, scalable digital products.
          </motion.p>
        </div>

        <div className="space-y-12">
          {STACK.map((group, index) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="md:w-1/3 text-center md:text-left">
                <h2 className="text-2xl font-bold text-[#062B63]">{group.category}</h2>
                <div className="h-1 w-12 bg-[#00C6F7] mt-4 mx-auto md:mx-0"></div>
              </div>
              <div className="md:w-2/3 flex flex-wrap justify-center md:justify-start gap-4">
                {group.items.map(tech => (
                  <span 
                    key={tech} 
                    className="px-6 py-3 bg-[#F3F8FF] text-[#0067D9] rounded-xl font-medium border border-[#DCE8F5] hover:border-[#00C6F7] hover:shadow-md transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
