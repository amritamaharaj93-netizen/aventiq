"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

export default function CreateBlogPostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Form State
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("Technology")
  const [author, setAuthor] = useState("Aventiq Team")
  const [readTime, setReadTime] = useState("5 min read")
  const [status, setStatus] = useState("Published")
  const [desc, setDesc] = useState("")
  const [content, setContent] = useState("")

  // Image Upload State
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTitleChange = (val: string) => {
    setTitle(val)
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setSlug(autoSlug)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploadingImage(true)
      const url = URL.createObjectURL(file)
      setImagePreview(url)
      
      try {
        const formDataPayload = new FormData()
        formDataPayload.append('file', file)
        formDataPayload.append('folder', 'aventiq_blog')
        
        const { uploadMedia } = await import('@/actions/upload')
        const response = await uploadMedia(formDataPayload)
        
        if (response.success && response.result) {
          setImagePreview(response.result.secure_url)
        } else {
          console.error("Upload failed:", response.error)
          alert("Failed to upload image. " + (response.error || ''))
        }
      } catch (error) {
        console.error("Error uploading image:", error)
        alert("An error occurred during upload.")
      } finally {
        setIsUploadingImage(false)
      }
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || isUploadingImage) return
    setIsLoading(true)

    const newPost = {
      id: Date.now().toString(),
      title: title.trim(),
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      author: author || "Aventiq Team",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      readTime: readTime || "5 min read",
      views: "0",
      status,
      desc: desc || "Insightful article on software architecture and digital innovation.",
      content: content || `<p>${desc || title}</p>`,
      image: imagePreview || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
    }

    const saved = localStorage.getItem("aventiq_admin_blog")
    let postsList = []
    if (saved) {
      try {
        postsList = JSON.parse(saved)
      } catch (err) {
        console.error("Failed to parse blog posts")
      }
    }

    const updated = Array.isArray(postsList) ? [newPost, ...postsList] : [newPost]
    localStorage.setItem("aventiq_admin_blog", JSON.stringify(updated))

    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/blog")
    }, 400)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/blog"
            className="p-2.5 text-slate-500 hover:text-[#020B1C] hover:bg-slate-100 rounded-xl transition-all border border-slate-200 shadow-sm"
            title="Back to Blog List"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight">Create Blog Post</h1>
            <p className="text-[#64748B] text-sm font-medium mt-0.5">Write and publish a new engineering article.</p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
        
        <form onSubmit={handleSave} className="space-y-8 mt-2">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Title */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Post Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. Why Next.js is the Future of Enterprise Apps"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-semibold text-[#020B1C]"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2 md:col-span-1">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">URL Slug</label>
              <input 
                type="text" 
                required
                placeholder="e.g. nextjs-enterprise-future"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-mono text-slate-700"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-semibold text-[#020B1C]"
              >
                <option value="Technology">Technology</option>
                <option value="Engineering">Engineering</option>
                <option value="AI">AI & ML</option>
                <option value="Design">UI/UX Design</option>
                <option value="Company">Company Update</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>

            {/* Author */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Author Name</label>
              <input 
                type="text" 
                placeholder="e.g. Alex Thompson"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-medium text-[#020B1C]"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-semibold text-[#020B1C]"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Card Excerpt / Short Summary */}
            <div className="space-y-2 md:col-span-3">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Excerpt / Card Summary</label>
              <textarea 
                rows={2}
                placeholder="Short summary displayed on the blog list card..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-medium text-[#020B1C]"
              />
            </div>

            {/* Full Content (Rich Editor) */}
            <div className="space-y-2 md:col-span-3">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Article Body Content</label>
              <RichTextEditor 
                value={content}
                onChange={(val) => setContent(val)}
                placeholder="Write your complete blog post article here..."
                minHeight="280px"
              />
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2 md:col-span-3">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Cover Image</label>
              <div 
                onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                className={`relative w-full h-36 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center gap-2 text-slate-500 hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition-all duration-300 overflow-hidden ${isUploadingImage ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                  disabled={isUploadingImage}
                />
                {isUploadingImage ? (
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 size={28} className="text-[#0067D9] animate-spin mb-2" />
                    <span className="text-sm font-bold text-[#0067D9]">Uploading...</span>
                  </div>
                ) : imagePreview ? (
                  <div className="relative w-full h-full">
                    <img src={imagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white font-bold text-sm opacity-0 hover:opacity-100 transition-opacity">
                      Change Image
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={28} className="text-[#0067D9]" />
                    <span className="text-sm font-bold text-[#0067D9]">Click to upload blog cover image</span>
                    <span className="text-xs text-slate-400 font-medium">PNG, JPG, WebP up to 5MB</span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <Link href="/admin/blog">
              <Button type="button" variant="outline" className="h-11 px-6 rounded-xl border-slate-200 text-slate-600 font-semibold hover:bg-slate-100 cursor-pointer">
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-11 px-8 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] text-white font-bold rounded-xl shadow-lg shadow-[#0067D9]/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Publishing...
                </>
              ) : (
                <>
                  <Save size={18} /> Publish Post
                </>
              )}
            </Button>
          </div>

        </form>
      </div>

    </div>
  )
}
