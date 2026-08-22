"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const POSTS = [
  {
    title: "Why Next.js is the Future of Enterprise Web Applications",
    category: "Next.js",
    desc: "Explore how Server Components, Edge routing, and enhanced caching in Next.js App Router are transforming enterprise scalability.",
    author: "Alex Thompson",
    date: "Aug 12, 2026",
    readTime: "6 min read",
    slug: "nextjs-enterprise-future"
  },
  {
    title: "Integrating Large Language Models into SaaS Products",
    category: "AI",
    desc: "A practical guide to implementing OpenAI and LangChain directly into your existing B2B SaaS architecture.",
    author: "Sarah Chen",
    date: "Aug 05, 2026",
    readTime: "8 min read",
    slug: "integrating-llms-saas"
  },
  {
    title: "Modern Database Scaling with PostgreSQL",
    category: "Software Engineering",
    desc: "Understanding connection pooling, indexing strategies, and replication for high-traffic web applications.",
    author: "David Miller",
    date: "Jul 28, 2026",
    readTime: "5 min read",
    slug: "modern-database-scaling"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-[#102A43] mb-6"
          >
            Insights & Ideas
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#475569]"
          >
            Thoughts on software engineering, technology trends, and building scalable digital businesses.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, index) => (
            <motion.article 
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="h-48 bg-[#031A3D] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#062B63] to-[#0067D9] opacity-80 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute top-4 left-4 bg-[#FF8A00] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-[#102A43] mb-3 hover:text-[#0067D9] transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-[#475569] mb-6 text-sm flex-1">
                  {post.desc}
                </p>
                <div className="flex justify-between items-center text-xs text-[#64748B] pt-4 border-t border-border mt-auto">
                  <span>{post.author} • {post.date}</span>
                  <span className="font-medium text-[#0067D9]">{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
