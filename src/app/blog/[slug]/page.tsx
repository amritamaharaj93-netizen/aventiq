"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Clock, Calendar, User, Tag, Share2, Bookmark } from "lucide-react"
import { PageHeader } from "@/components/layout/PageHeader"

const DEFAULT_POSTS = [
  {
    id: "1",
    title: "Why Next.js is the Future of Enterprise Web Applications",
    category: "Next.js",
    desc: "Explore how Server Components, Edge routing, and enhanced caching in Next.js App Router are transforming enterprise scalability.",
    author: "Alex Thompson",
    date: "Aug 19, 2026",
    readTime: "6 min read",
    status: "Published",
    slug: "nextjs-enterprise-future",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
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
    desc: "A practical guide to implementing OpenAI and LangChain directly into your existing B2B SaaS architecture.",
    author: "Sarah Chen",
    date: "Aug 12, 2026",
    readTime: "8 min read",
    status: "Published",
    slug: "integrating-llms-saas",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    content: `
      <h2>Leveraging GenAI for B2B SaaS Differentiation</h2>
      <p>Artificial Intelligence is no longer just a gimmick — it is becoming a core operational feature of enterprise SaaS tools. From automated workflow synthesis to intelligent document extraction, LLMs enable software products to deliver immediate value.</p>

      <h3>Architectural Pattern: Retrieval-Augmented Generation (RAG)</h3>
      <p>Directly querying LLMs often leads to hallucinations or out-of-date answers. By pairing LLMs with vector database embeddings (such as Pinecone orpgvector), SaaS platforms can grounding answers in enterprise private data securely.</p>

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
    desc: "Understanding connection pooling, indexing strategies, and replication for high-traffic web applications.",
    author: "David Miller",
    date: "Aug 05, 2026",
    readTime: "5 min read",
    status: "Published",
    slug: "modern-database-scaling",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
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
    desc: "Learn how to architect robust, fault-tolerant backend systems using Golang's concurrency model and gRPC.",
    author: "Elena Rodriguez",
    date: "Jul 28, 2026",
    readTime: "7 min read",
    status: "Published",
    slug: "resilient-microservices-go",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop",
    content: `
      <h2>Why Golang Excels in Microservices</h2>
      <p>Go's lightweight goroutines, built-in concurrency primitives, and fast compile speeds make it the preferred language for high-throughput distributed microservices.</p>

      <h3>Key Resilience Patterns</h3>
      <p>Implementing circuit breakers, rate limiting, and structured gRPC retries ensures individual service failures do not cascade into system-wide outages.</p>
    `
  }
]

export default function BlogPostDetailPage() {
  const params = useParams()
  const slugParam = params.slug as string
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let found = null

    // Check localStorage
    const saved = localStorage.getItem("aventiq_admin_blog")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          found = parsed.find((p: any) => p.slug === slugParam || p.id === slugParam)
        }
      } catch (e) {
        console.error("Failed to parse saved blog posts")
      }
    }

    // Fallback to default posts if not found in localStorage
    if (!found) {
      found = DEFAULT_POSTS.find((p) => p.slug === slugParam || p.id === slugParam)
    }

    // If still not found, use first default post as safety fallback
    if (!found) {
      found = DEFAULT_POSTS[0]
    }

    setPost(found)
    setIsLoading(false)
  }, [slugParam])

  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-8">
        <div className="text-center text-slate-500 font-bold text-lg animate-pulse">Loading article...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <PageHeader 
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.category || "Article" }
        ]} 
        bgImage={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop"}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl mt-12">
        
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0067D9] hover:text-[#0052ad] mb-8 group transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to All Articles
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 md:p-12 overflow-hidden">
          
          {/* Header Metadata */}
          <div className="space-y-6 pb-8 border-b border-slate-100">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#0067D9]/10 text-[#0067D9] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Clock size={14} /> {post.readTime || "5 min read"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
              {post.desc}
            </p>

            {/* Author Bar */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0067D9] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#0067D9]/20">
                  {(post.author || "A").charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{post.author || "Aventiq Engineering"}</div>
                  <div className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                    <Calendar size={12} /> {post.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                  className="p-2 text-slate-400 hover:text-[#0067D9] hover:bg-slate-100 rounded-xl transition-all"
                  title="Copy link"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="my-8 rounded-2xl overflow-hidden shadow-md max-h-[440px]">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                }}
              />
            </div>
          )}

          {/* Article HTML Body Content (From Backend Rich Text Editor) */}
          <div 
            className="prose prose-slate prose-lg max-w-none text-slate-800 leading-relaxed font-normal pt-4
              prose-headings:font-extrabold prose-headings:text-slate-900 prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:mb-6 prose-p:text-slate-600 prose-p:leading-relaxed
              prose-a:text-[#0067D9] prose-a:font-bold hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-[#0067D9] prose-blockquote:bg-slate-50 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-slate-700
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:mb-2 prose-li:text-slate-600
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
              prose-img:rounded-2xl prose-img:shadow-md
            "
            dangerouslySetInnerHTML={{ 
              __html: post.content || `<p>${post.desc || post.title}</p>` 
            }}
          />

        </article>

      </div>
    </div>
  )
}
