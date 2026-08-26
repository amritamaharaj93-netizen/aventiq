"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Edit, Trash2, MoreHorizontal, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

// Exact same data to ensure no data loss + expanded fields to match frontend
const INITIAL_PROJECTS = [
  { id: "1", title: "NexGen Enterprise SaaS", category: "SaaS", status: "Published", date: "Aug 12, 2026", desc: "A comprehensive multi-tenant resource planning platform built for modern enterprise workforces.", results: "Reduced operational costs by 40% and improved onboarding speed by 3x.", tech: ["Next.js", "Node.js", "PostgreSQL", "AWS"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", imageColor: "from-[#062B63] to-[#0067D9]", slug: "nexgen-enterprise" },
  { id: "2", title: "FinTech Mobile Banking", category: "Mobile", status: "Published", date: "Jul 28, 2026", desc: "A highly secure, cross-platform mobile banking application.", results: "Achieved 4.9/5 App Store rating with 500k+ downloads in year one.", tech: ["React Native", "TypeScript", "NestJS", "Stripe"], image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop", imageColor: "from-[#0067D9] to-[#00C6F7]", slug: "fintech-mobile" },
  { id: "3", title: "Aura AI Analytics", category: "AI", status: "Draft", date: "Jul 15, 2026", desc: "An advanced predictive analytics engine that leverages machine learning.", results: "Improved forecast accuracy by 28% and saved $2.4M in overstock.", tech: ["Python", "PyTorch", "React", "Docker"], image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop", imageColor: "from-[#020B1C] to-[#062B63]", slug: "aura-ai" },
  { id: "4", title: "Luxe E-commerce Platform", category: "E-commerce", status: "Published", date: "Jun 02, 2026", desc: "A headless e-commerce storefront for a luxury fashion brand.", results: "Increased conversion rate by 65% and decreased bounce rate by 40%.", tech: ["Next.js", "Shopify Plus", "Tailwind CSS", "Vercel"], image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop", imageColor: "from-[#102A43] to-[#FF8A00]", slug: "luxe-ecommerce" },
]

export default function AdminProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [projects, setProjects] = useState(INITIAL_PROJECTS)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newProjectForm, setNewProjectForm] = useState({ 
    title: "", 
    category: "SaaS", 
    status: "Draft",
    desc: "",
    results: "",
    tech: ""
  })
  
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("aventiq_admin_projects")
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects))
      } catch (e) {
        console.error("Failed to parse projects from local storage")
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever projects change, but ONLY after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("aventiq_admin_projects", JSON.stringify(projects))
    }
  }, [projects, isLoaded])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImagePreview(url)
    }
  }

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProjectForm.title.trim()) return

    const newProject = {
      id: Date.now().toString(),
      title: newProjectForm.title,
      category: newProjectForm.category,
      status: newProjectForm.status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      desc: newProjectForm.desc || "New project description goes here.",
      results: newProjectForm.results || "Expected impact and results to be added.",
      tech: newProjectForm.tech ? newProjectForm.tech.split(",").map(t => t.trim()).filter(Boolean) : ["React"],
      image: imagePreview || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      imageColor: "from-[#020B1C] to-[#0067D9]",
      slug: newProjectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }
    setProjects([newProject, ...projects])
    setIsAddModalOpen(false)
    setNewProjectForm({ title: "", category: "SaaS", status: "Draft", desc: "", results: "", tech: "" })
    setImagePreview(null)
    setSearchQuery("") // Clear search so the new project is visible immediately
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
            Projects Management
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Create, edit, and manage your portfolio projects.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="h-11 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:from-[#00C6F7] hover:to-[#0067D9] text-white font-bold px-6 rounded-xl shadow-[0_0_15px_rgba(0,198,247,0.3)] hover:shadow-[0_0_25px_rgba(0,198,247,0.5)] transition-all flex items-center gap-2">
          <Plus size={18} strokeWidth={2.5} /> Add New Project
        </Button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        
        {/* Controls Bar */}
        <div className="p-5 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00C6F7] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm text-[#020B1C] placeholder:text-slate-400 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto h-11 px-5 rounded-xl border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:text-[#020B1C] transition-colors flex items-center gap-2 shadow-sm">
            <Filter size={18} /> Filter
          </Button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Project Name</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Category</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Status</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase hidden md:table-cell">Date Added</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-[#F4F7FA]/50 transition-colors group bg-white">
                  <td className="p-5">
                    <div className="font-bold text-[#020B1C] text-sm group-hover:text-[#0067D9] transition-colors">{project.title}</div>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200">
                      {project.category}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      project.status === "Published" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                        : "bg-amber-50 text-amber-700 border-amber-200/60 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                    }`}>
                      {/* Optional little dot indicator */}
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${project.status === "Published" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-5 text-sm font-medium text-slate-500 hidden md:table-cell">
                    {project.date}
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/projects/${project.id}/edit`} className="p-2 text-slate-400 hover:text-[#0067D9] hover:bg-[#0067D9]/10 rounded-lg transition-all" title="Edit">
                        <Edit size={16} strokeWidth={2.5} />
                      </Link>
                      <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-[#020B1C] hover:bg-slate-100 rounded-lg transition-all" title="More Options">
                        <MoreHorizontal size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-medium text-slate-500">
            Showing <span className="font-bold text-[#020B1C]">1</span> to <span className="font-bold text-[#020B1C]">{filteredProjects.length}</span> of <span className="font-bold text-[#020B1C]">{filteredProjects.length}</span> entries
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="rounded-lg border-slate-200 text-slate-400 font-semibold h-9 px-4">
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled className="rounded-lg border-slate-200 text-slate-400 font-semibold h-9 px-4">
              Next
            </Button>
          </div>
        </div>

      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9] opacity-90"></div>
            
            <div className="flex items-center justify-between p-6 md:px-8 border-b border-slate-100">
              <h2 className="text-xl font-bold text-[#020B1C]">Add New Project</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 md:p-8 flex-1">
              <form id="add-project-form" onSubmit={handleAddProject} className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">Project Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. E-commerce App" 
                      value={newProjectForm.title}
                      onChange={(e) => setNewProjectForm({...newProjectForm, title: e.target.value})}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">Category</label>
                    <select 
                      value={newProjectForm.category}
                      onChange={(e) => setNewProjectForm({...newProjectForm, category: e.target.value})}
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
                      value={newProjectForm.status}
                      onChange={(e) => setNewProjectForm({...newProjectForm, status: e.target.value})}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)] appearance-none"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
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

                <div className="space-y-6">
                  {/* Tech Stack */}
                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">Tech Stack</label>
                    <input 
                      type="text" 
                      value={newProjectForm.tech}
                      onChange={(e) => setNewProjectForm({...newProjectForm, tech: e.target.value})}
                      placeholder="e.g. Next.js, React, AWS" 
                      className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                  {/* Results */}
                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">The Result / Impact</label>
                    <input 
                      type="text" 
                      value={newProjectForm.results}
                      onChange={(e) => setNewProjectForm({...newProjectForm, results: e.target.value})}
                      placeholder="e.g. Reduced operational costs by 40%..." 
                      className="w-full h-12 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block ml-1">Project Description</label>
                    <textarea 
                      rows={3}
                      required
                      value={newProjectForm.desc}
                      onChange={(e) => setNewProjectForm({...newProjectForm, desc: e.target.value})}
                      placeholder="A comprehensive description..." 
                      className="w-full p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0067D9]/10 focus:border-[#0067D9] transition-all duration-300 text-[15px] font-semibold text-[#020B1C] shadow-[0_2px_10px_rgba(0,0,0,0.02)] resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 md:px-8 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAddModalOpen(false)
                  setImagePreview(null)
                }}
                className="rounded-xl border-slate-200 h-11 px-6 text-slate-600 font-bold hover:bg-slate-200/50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="add-project-form"
                className="rounded-xl bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:from-[#00C6F7] hover:to-[#0067D9] text-white h-11 px-8 font-bold shadow-[0_0_15px_rgba(0,198,247,0.3)] hover:shadow-[0_0_25px_rgba(0,198,247,0.5)] transition-all"
              >
                Create Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
