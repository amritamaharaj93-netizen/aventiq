"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface BlogPost {
  id: string
  title: string
  category: string
  views: string
  status: string
  date: string
  desc: string
  slug: string
  image: string
  author: string
  readTime: string
  content?: string
}

const DEFAULT_POSTS: BlogPost[] = [
  { 
    id: "1", 
    title: "Why Next.js is the Future of Enterprise Web Applications", 
    category: "Next.js", 
    views: "1.2k", 
    status: "Published", 
    date: "Aug 19, 2026", 
    desc: "Explore how Server Components, Edge routing, and enhanced caching in Next.js App Router are transforming enterprise scalability.", 
    slug: "nextjs-enterprise-future",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    author: "Alex Thompson",
    readTime: "6 min read",
    content: `
      <h2>The Shift Towards Server-Driven Architecture</h2>
      <p>Modern web development has undergone a massive evolution. In recent years, frontend architecture shifted heavily towards client-side rendering (CSR) with React single-page applications. While CSR offered fluid interactive experiences, it introduced noticeable trade-offs: massive JavaScript bundle sizes, initial load latency, and complex SEO workarounds.</p>

      <p>Next.js App Router with React Server Components fundamentally resolves these pain points by rendering components on the server closest to your database and edge nodes.</p>

      <h3>Key Advantages for Enterprise Applications</h3>
      <ul>
        <li><strong>Zero-Bundle-Size Server Components:</strong> Server components keep heavy dependencies on the server, drastically reducing the JavaScript sent to client browsers.</li>
        <li><strong>Streaming and Suspense:</strong> Progressively stream UI elements as data resolves on the backend, ensuring instant initial page paints.</li>
        <li><strong>Edge Middleware and Localization:</strong> Execute auth checks, geo-routing, and rewrite rules at edge data centers worldwide with sub-10ms response times.</li>
      </ul>

      <blockquote>
        "Architecting enterprise applications with Next.js allows engineering teams to ship faster, lower infrastructure costs, and deliver unmatched lighthouse performance scores."
      </blockquote>

      <h3>Conclusion</h3>
      <p>Whether you are refactoring legacy monoliths or launching a high-concurrency SaaS platform, Next.js provides the gold standard infrastructure for modern web engineering.</p>
    `
  },
  { 
    id: "2", 
    title: "Integrating Large Language Models into SaaS Products", 
    category: "AI", 
    views: "856", 
    status: "Published", 
    date: "Aug 12, 2026", 
    desc: "A practical guide to implementing OpenAI and LangChain directly into your existing B2B SaaS architecture.", 
    slug: "integrating-llms-saas",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    author: "Sarah Chen",
    readTime: "8 min read",
    content: `
      <h2>Leveraging GenAI for B2B SaaS Differentiation</h2>
      <p>Artificial Intelligence is no longer just a gimmick — it is becoming a core operational feature of enterprise SaaS tools. From automated workflow synthesis to intelligent document extraction, LLMs enable software products to deliver immediate value.</p>

      <h3>Architectural Pattern: Retrieval-Augmented Generation (RAG)</h3>
      <p>Directly querying LLMs often leads to hallucinations or out-of-date answers. By pairing LLMs with vector database embeddings (such as Pinecone or pgvector), SaaS platforms can ground answers in enterprise private data securely.</p>

      <ul>
        <li><strong>Document Ingestion Pipeline:</strong> Chunk user documents into semantic embeddings using OpenAI text-embedding-3 models.</li>
        <li><strong>Vector Indexing:</strong> Store embeddings with tenant isolation keys in PostgreSQL pgvector.</li>
        <li><strong>Contextual Prompt Engineering:</strong> Inject retrieved chunks into system prompts before streaming response tokens.</li>
      </ul>

      <h3>Summary</h3>
      <p>Integrating AI intelligently empowers users to automate tedious workflows while increasing platform retention and lifetime value.</p>
    `
  },
  { 
    id: "3", 
    title: "Modern Database Scaling with PostgreSQL", 
    category: "Engineering", 
    views: "640", 
    status: "Published", 
    date: "Aug 05, 2026", 
    desc: "Understanding connection pooling, indexing strategies, and replication for high-traffic web applications.", 
    slug: "modern-database-scaling",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    author: "David Miller",
    readTime: "5 min read",
    content: `
      <h2>Scaling PostgreSQL to Millions of Queries</h2>
      <p>PostgreSQL remains the undisputed database choice for modern web scale. However, as query volume spikes, naive database queries can bottleneck server throughput.</p>

      <h3>Essential Optimization Strategies</h3>
      <ol>
        <li><strong>Connection Pooling with PgBouncer:</strong> Prevent database process starvation by managing database connections efficiently.</li>
        <li><strong>Partial Indexing & B-Trees:</strong> Index high-cardinality columns and partial WHERE clauses to minimize index disk footprint.</li>
        <li><strong>Read Replicas:</strong> Offload heavy analytical queries and search lookups to read-only replica nodes.</li>
      </ol>
    `
  },
  { 
    id: "4", 
    title: "Building Resilient Microservices with Go", 
    category: "Backend", 
    views: "1.5k", 
    status: "Published", 
    date: "Jul 28, 2026", 
    desc: "Learn how to architect robust, fault-tolerant backend systems using Golang's concurrency model and gRPC.", 
    slug: "resilient-microservices-go",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop",
    author: "Elena Rodriguez",
    readTime: "7 min read",
    content: `
      <h2>Why Golang Excels in Microservices</h2>
      <p>Go's lightweight goroutines, built-in concurrency primitives, and fast compile speeds make it the preferred language for high-throughput distributed microservices.</p>

      <h3>Key Resilience Patterns</h3>
      <p>Implementing circuit breakers, rate limiting, and structured gRPC retries ensures individual service failures do not cascade into system-wide outages.</p>
    `
  },
  { 
    id: "5", 
    title: "Mastering Tailwind CSS for Enterprise UI", 
    category: "Frontend", 
    views: "2.1k", 
    status: "Published", 
    date: "Jul 15, 2026", 
    desc: "Strategies for maintaining scalable utility-first CSS across large teams and complex component libraries.", 
    slug: "mastering-tailwind-enterprise",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop",
    author: "James Wilson",
    readTime: "4 min read",
    content: `
      <h2>Utility-First Styling at Scale</h2>
      <p>Tailwind CSS revolutionized UI development by eliminating stylesheet pollution. Learn how to define design tokens, custom colors, and reusable component variants seamlessly.</p>
    `
  },
  { 
    id: "6", 
    title: "The Ultimate Guide to CI/CD on Vercel", 
    category: "DevOps", 
    views: "980", 
    status: "Published", 
    date: "Jul 02, 2026", 
    desc: "Automate your deployment pipelines, run edge middleware, and achieve zero-downtime rollouts effortlessly.", 
    slug: "cicd-guide-vercel",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop",
    author: "Alex Thompson",
    readTime: "6 min read",
    content: `
      <h2>Automated Edge Deployments</h2>
      <p>Streamline your software delivery pipeline with instant preview environments, automated unit tests, and seamless production promotions.</p>
    `
  }
]

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_POSTS)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5

  // Load from localStorage on mount, merging defaults
  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_blog")
    let currentList = DEFAULT_POSTS

    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map<string, BlogPost>()
          for (const item of [...parsed, ...DEFAULT_POSTS]) {
            const key = (item.slug || item.id || "").toLowerCase().trim()
            if (key && !map.has(key)) {
              map.set(key, item)
            }
          }
          currentList = Array.from(map.values())
        }
      } catch (e) {
        console.error("Failed to parse blog posts from local storage")
      }
    }

    setPosts(currentList)
    setIsLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("aventiq_admin_blog", JSON.stringify(posts))
    }
  }, [posts, isLoaded])

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination Math
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredPosts.length)
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
            Blog Management
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Create, edit, and publish articles to your website.
          </p>
        </div>
        <Link href="/admin/blog/create">
          <Button className="h-11 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:from-[#00C6F7] hover:to-[#0067D9] text-white font-bold px-6 rounded-xl shadow-[0_0_15px_rgba(0,198,247,0.3)] hover:shadow-[0_0_25px_rgba(0,198,247,0.5)] transition-all flex items-center gap-2 cursor-pointer">
            <Plus size={18} strokeWidth={2.5} /> Create Post
          </Button>
        </Link>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        
        {/* Controls Bar */}
        <div className="p-5 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00C6F7] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm text-[#020B1C] placeholder:text-slate-400 font-medium"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto h-11 px-5 rounded-xl border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:text-[#020B1C] transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={18} /> Filter List
          </Button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Post Title</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Category</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase hidden lg:table-cell">Views</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Status</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase hidden sm:table-cell">Date</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedPosts.map((post) => (
                <tr key={post.id} className="hover:bg-[#F4F7FA]/50 transition-colors group bg-white">
                  <td className="p-5">
                    <div className="font-bold text-[#020B1C] text-sm group-hover:text-[#0067D9] transition-colors">{post.title}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">/blog/{post.slug}</div>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-5 hidden lg:table-cell">
                    <span className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                      <Eye size={14} className="text-slate-400" />
                      {post.views}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      post.status === "Published" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                        : "bg-amber-50 text-amber-700 border-amber-200/60 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${post.status === "Published" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}></span>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-5 text-sm font-medium text-slate-500 hidden sm:table-cell">
                    {post.date}
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-100">
                      <Link 
                        href={`/admin/blog/${post.id}/edit`}
                        className="p-2 text-slate-500 hover:text-[#0067D9] hover:bg-[#0067D9]/10 rounded-lg transition-all cursor-pointer" 
                        title="Edit Article"
                      >
                        <Edit size={16} strokeWidth={2.5} />
                      </Link>
                      <button 
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer" 
                        title="Delete Article"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-medium text-slate-500">
            Showing <span className="font-bold text-[#020B1C]">{filteredPosts.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-[#020B1C]">{endIndex}</span> of <span className="font-bold text-[#020B1C]">{filteredPosts.length}</span> entries
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={validCurrentPage <= 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="rounded-xl border-slate-200 text-slate-600 font-bold h-9 px-4 hover:bg-[#0067D9] hover:text-white hover:border-[#0067D9] hover:shadow-[0_4px_12px_rgba(0,103,217,0.25)] transition-all duration-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 disabled:hover:border-slate-200 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            <span className="text-xs font-bold text-slate-500 px-2">
              Page {validCurrentPage} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={validCurrentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="rounded-xl border-slate-200 text-slate-600 font-bold h-9 px-4 hover:bg-[#0067D9] hover:text-white hover:border-[#0067D9] hover:shadow-[0_4px_12px_rgba(0,103,217,0.25)] transition-all duration-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 disabled:hover:border-slate-200 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
