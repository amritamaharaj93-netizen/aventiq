"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // Dynamic state for editing the project
  const [projectTitle, setProjectTitle] = useState("")
  const [projectCategory, setProjectCategory] = useState("Web")
  const [projectStatus, setProjectStatus] = useState("Draft")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectResults, setProjectResults] = useState("")
  const [projectTech, setProjectTech] = useState("")

  // Image Upload State
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem("aventiq_admin_projects")
    if (savedProjects) {
      try {
        const projects = JSON.parse(savedProjects)
        const foundProject = projects.find((p: any) => p.id === params.id)
        if (foundProject) {
          setProjectTitle(foundProject.title || "")
          setProjectCategory(foundProject.category || "Web")
          setProjectStatus(foundProject.status || "Draft")
          setProjectDescription(foundProject.desc || foundProject.description || "")
          setProjectResults(foundProject.results || "")
          setProjectTech(Array.isArray(foundProject.tech) ? foundProject.tech.join(", ") : (foundProject.tech || ""))
          if (foundProject.image && !foundProject.image.startsWith("blob:")) {
            setImagePreview(foundProject.image)
          }
        }
      } catch (e) {
        console.error("Failed to parse projects from local storage")
      }
    }
  }, [params.id])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImagePreview(url)
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Save to localStorage
    const savedProjects = localStorage.getItem("aventiq_admin_projects")
    if (savedProjects) {
      try {
        const projects = JSON.parse(savedProjects)
        const updatedProjects = projects.map((p: any) => {
          if (p.id === params.id) {
            return {
              ...p,
              title: projectTitle,
              category: projectCategory,
              status: projectStatus,
              desc: projectDescription,
              description: projectDescription, // keep both for backwards compatibility
              results: projectResults,
              tech: projectTech.split(",").map(t => t.trim()).filter(Boolean),
              ...(imagePreview && { image: imagePreview })
            }
          }
          return p
        })
        localStorage.setItem("aventiq_admin_projects", JSON.stringify(updatedProjects))
      } catch (e) {
        console.error("Failed to save project updates to local storage")
      }
    }

    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/projects")
    }, 600)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/projects">
          <Button variant="outline" className="w-10 h-10 p-0 rounded-xl border-slate-200 text-slate-500 hover:text-[#020B1C] hover:bg-slate-50">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-[#020B1C] tracking-tight">
            Edit Project
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Project ID: {params.id}
          </p>
        </div>
      </div>

      {/* Editor Card */}
      <form onSubmit={handleSave} className="bg-white border border-slate-100 rounded-[24px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] overflow-hidden relative">
        {/* Premium Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9] opacity-90"></div>

        <div className="p-8 md:p-10 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">Project Title</label>
              <input 
                type="text" 
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">Category</label>
              <select 
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)] appearance-none"
              >
                <option value="SaaS">SaaS</option>
                <option value="Mobile">Mobile</option>
                <option value="AI">AI</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Web">Web</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">Status</label>
              <select 
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)] appearance-none"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            
            {/* Thumbnail Upload */}
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">Thumbnail Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full h-12 px-4 rounded-xl border-2 border-dashed border-[#0067D9]/20 bg-[#0067D9]/[0.02] flex items-center justify-start gap-2 text-[#0067D9] font-semibold hover:bg-[#0067D9]/5 hover:border-[#0067D9]/40 cursor-pointer transition-all duration-300 overflow-hidden group shadow-[0_2px_10px_rgba(0,103,217,0.02)]"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                {imagePreview ? (
                  <div className="flex items-center gap-3 w-full justify-start">
                    <div className="h-8 w-8 rounded-lg overflow-hidden shadow-sm border border-slate-200">
                      <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-[14px] text-[#0067D9] font-bold group-hover:text-[#0052ad] transition-colors">Change Image</span>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={18} className="text-[#0067D9]/70 group-hover:text-[#0067D9] transition-colors" /> 
                    <span className="text-[14px]">Upload Image</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="grid grid-cols-1 gap-y-8">
            {/* Tech Stack */}
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">Tech Stack <span className="text-slate-400 font-medium normal-case tracking-normal">(comma separated)</span></label>
              <input 
                type="text" 
                value={projectTech}
                onChange={(e) => setProjectTech(e.target.value)}
                placeholder="e.g. Next.js, Node.js, PostgreSQL"
                className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
              />
            </div>
            
            {/* Project Results */}
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">The Result / Impact</label>
              <input 
                type="text" 
                value={projectResults}
                onChange={(e) => setProjectResults(e.target.value)}
                placeholder="e.g. Reduced operational costs by 40%..."
                className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">Project Description</label>
              <textarea 
                rows={4}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)] resize-none leading-relaxed"
              />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link href="/admin/projects">
            <Button type="button" variant="ghost" className="h-11 px-6 rounded-xl font-bold text-slate-600 hover:bg-slate-200/50">
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="h-11 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:from-[#00C6F7] hover:to-[#0067D9] text-white font-bold px-8 rounded-xl shadow-[0_0_15px_rgba(0,198,247,0.3)] hover:shadow-[0_0_25px_rgba(0,198,247,0.5)] transition-all flex items-center gap-2"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
