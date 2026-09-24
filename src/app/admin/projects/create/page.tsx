"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

export default function CreateProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Form State
  const [projectTitle, setProjectTitle] = useState("")
  const [projectCategory, setProjectCategory] = useState("SaaS")
  const [projectStatus, setProjectStatus] = useState("Draft")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectResults, setProjectResults] = useState("")
  const [projectTech, setProjectTech] = useState("")

  // Image Upload State
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploadingImage(true)
      
      // Temporary preview
      const localUrl = URL.createObjectURL(file)
      setImagePreview(localUrl)
      
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'aventiq_projects')
        
        // Dynamic import to avoid needing to add the import at the top for now
        // But let's actually just fetch the API or call server action
        const { uploadMedia } = await import('@/actions/upload')
        const response = await uploadMedia(formData)
        
        if (response.success && response.result) {
          setImagePreview(response.result.secure_url)
        } else {
          console.error("Upload failed:", response.error)
          alert("Failed to upload image. " + (response.error || ''))
        }
      } catch (error) {
        console.error("Error uploading:", error)
        alert("An error occurred during upload.")
      } finally {
        setIsUploadingImage(false)
      }
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectTitle.trim() || isUploadingImage) return
    setIsLoading(true)

    const newProject = {
      id: Date.now().toString(),
      title: projectTitle,
      category: projectCategory,
      status: projectStatus,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      desc: projectDescription || "New project description goes here.",
      description: projectDescription || "New project description goes here.",
      results: projectResults || "Expected impact and results to be added.",
      tech: projectTech ? projectTech.split(",").map(t => t.trim()).filter(Boolean) : ["React"],
      image: imagePreview || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      imageColor: "from-[#020B1C] to-[#0067D9]",
      slug: projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }

    const savedProjects = localStorage.getItem("aventiq_admin_projects")
    let projectsList = []
    if (savedProjects) {
      try {
        projectsList = JSON.parse(savedProjects)
      } catch (e) {
        console.error("Failed to parse projects from local storage")
      }
    }

    // Append to bottom
    const updated = Array.isArray(projectsList) ? [...projectsList, newProject] : [newProject]
    localStorage.setItem("aventiq_admin_projects", JSON.stringify(updated))

    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/projects")
    }, 400)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/projects"
            className="p-2.5 text-slate-500 hover:text-[#020B1C] hover:bg-slate-100 rounded-xl transition-all border border-slate-200 shadow-sm"
            title="Back to Projects"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight">Add New Project</h1>
            <p className="text-[#64748B] text-sm font-medium mt-0.5">Create a new portfolio project for display on the site.</p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
        
        <form onSubmit={handleSave} className="space-y-8 mt-2">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Title */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. NexGen SaaS Platform"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-semibold text-[#020B1C]"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Category</label>
              <select 
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-semibold text-[#020B1C]"
              >
                <option value="SaaS">SaaS</option>
                <option value="Mobile">Mobile Application</option>
                <option value="AI">AI</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Web">Web Development</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Status</label>
              <select 
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-semibold text-[#020B1C]"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Description</label>
              <RichTextEditor 
                value={projectDescription}
                onChange={(val) => setProjectDescription(val)}
                placeholder="Comprehensive description of the project..."
                minHeight="220px"
              />
            </div>

            {/* Results / Key Impact */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Results / Key Impact</label>
              <input 
                type="text" 
                placeholder="e.g. Reduced operational costs by 40% and improved onboarding speed by 3x."
                value={projectResults}
                onChange={(e) => setProjectResults(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-medium text-[#020B1C]"
              />
            </div>

            {/* Technologies */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Technologies Used (Comma-separated)</label>
              <input 
                type="text" 
                placeholder="e.g. Next.js, Node.js, PostgreSQL, AWS, Tailwind CSS"
                value={projectTech}
                onChange={(e) => setProjectTech(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-medium text-[#020B1C]"
              />
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Project Image</label>
              <div 
                onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                className={`relative w-full h-32 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center gap-2 text-slate-500 hover:bg-slate-100 hover:border-slate-400 cursor-pointer transition-all duration-300 overflow-hidden ${isUploadingImage ? 'opacity-50 pointer-events-none' : ''}`}
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
                    <Loader2 size={24} className="text-[#0067D9] animate-spin mb-2" />
                    <span className="text-sm font-bold text-[#0067D9]">Uploading to Cloudinary...</span>
                  </div>
                ) : imagePreview ? (
                  <div className="relative w-full h-full">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white font-bold text-sm opacity-0 hover:opacity-100 transition-opacity">
                      Change Image
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={24} className="text-[#0067D9]" />
                    <span className="text-sm font-bold text-[#0067D9]">Click to upload project thumbnail</span>
                    <span className="text-xs text-slate-400 font-medium">PNG, JPG, WebP up to 5MB</span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <Link href="/admin/projects">
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
                  <Loader2 size={18} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={18} /> Create Project
                </>
              )}
            </Button>
          </div>

        </form>
      </div>

    </div>
  )
}
