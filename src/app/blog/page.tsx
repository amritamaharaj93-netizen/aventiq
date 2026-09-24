"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/layout/PageHeader"

const DEFAULT_POSTS = [
  {
    id: "1",
    title: "Why Next.js is the Future of Enterprise Web Applications",
    category: "Next.js",
    desc: "Explore how Server Components, Edge routing, and enhanced caching in Next.js App Router are transforming enterprise scalability.",
    author: "Alex Thompson",
    date: "Aug 12, 2026",
    readTime: "6 min read",
    status: "Published",
    slug: "nextjs-enterprise-future",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Integrating Large Language Models into SaaS Products",
    category: "AI",
    desc: "A practical guide to implementing OpenAI and LangChain directly into your existing B2B SaaS architecture.",
    author: "Sarah Chen",
    date: "Aug 05, 2026",
    readTime: "8 min read",
    status: "Published",
    slug: "integrating-llms-saas",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Modern Database Scaling with PostgreSQL",
    category: "Software Engineering",
    desc: "Understanding connection pooling, indexing strategies, and replication for high-traffic web applications.",
    author: "David Miller",
    date: "Jul 28, 2026",
    readTime: "5 min read",
    status: "Published",
    slug: "modern-database-scaling",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Building Resilient Microservices with Go",
    category: "Backend",
    desc: "Learn how to architect robust, fault-tolerant backend systems using Golang's concurrency model and gRPC.",
    author: "Elena Rodriguez",
    date: "Jul 15, 2026",
    readTime: "7 min read",
    status: "Published",
    slug: "resilient-microservices-go",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Mastering Tailwind CSS for Enterprise UI",
    category: "Frontend",
    desc: "Strategies for maintaining scalable utility-first CSS across large teams and complex component libraries.",
    author: "James Wilson",
    date: "Jul 02, 2026",
    readTime: "4 min read",
    status: "Published",
    slug: "mastering-tailwind-enterprise",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "The Ultimate Guide to CI/CD on Vercel",
    category: "DevOps",
    desc: "Automate your deployment pipelines, run edge middleware, and achieve zero-downtime rollouts effortlessly.",
    author: "Alex Thompson",
    date: "Jun 21, 2026",
    readTime: "6 min read",
    status: "Published",
    slug: "cicd-guide-vercel",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop"
  }
]

export default function BlogPage() {
  const [posts, setPosts] = useState(DEFAULT_POSTS)

  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_blog")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure every parsed item has a valid image URL
          const enrichedParsed = parsed.map((item, idx) => ({
            ...item,
            image: item.image || DEFAULT_POSTS[idx % DEFAULT_POSTS.length]?.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
          }))

          const map = new Map()
          for (const item of [...enrichedParsed, ...DEFAULT_POSTS]) {
            if (item.status === "Published" || !item.status) {
              const key = item.slug || item.id
              if (!map.has(key)) {
                map.set(key, item)
              }
            }
          }
          setPosts(Array.from(map.values()))
        }
      } catch (e) {
        console.error("Failed to parse saved blog posts")
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <PageHeader 
        title="Insights & Ideas" 
        breadcrumbs={[{ label: "Blog" }]} 
        bgImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="container mx-auto px-4 md:px-8 max-w-6xl mt-12 mb-24">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-bold text-[#0067D9] mb-8 tracking-widest uppercase shadow-sm">
            Engineering Blog
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0067D9] to-[#00C6F7]">Shared</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Thoughts on software architecture, technology trends, and building scalable digital businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link key={post.slug || post.id || index} href={`/blog/${post.slug || post.id}`}>
              <motion.article 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
                className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#0067D9]/10 transition-all duration-500 flex flex-col relative h-full cursor-pointer"
              >
                {/* Image Banner */}
                <div className="h-56 relative overflow-hidden bg-slate-100">
                  <img 
                    src={post.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"} 
                    alt={post.title} 
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                    }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-[#0067D9] border border-white/50 text-xs font-extrabold px-4 py-1.5 rounded-full z-10 shadow-sm uppercase tracking-wide">
                    {post.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex flex-col flex-1 relative z-10 bg-white">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#0067D9] transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed flex-1 line-clamp-3">
                    {post.desc}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-slate-500 pt-6 border-t border-slate-100 mt-auto font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#F3F8FF] text-[#0067D9] flex items-center justify-center font-bold text-[10px]">
                        {(post.author || "A").charAt(0)}
                      </div>
                      <span>{post.author || "Aventiq"}</span>
                    </div>
                    <span className="text-[#0067D9] font-bold">{post.readTime || "5 min read"}</span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
