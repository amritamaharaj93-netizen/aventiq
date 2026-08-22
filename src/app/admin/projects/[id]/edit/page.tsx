"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EditProjectPage() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  
  // Dummy state to simulate editing the project
  const [projectTitle, setProjectTitle] = useState("NexGen Enterprise SaaS")
  const [projectCategory, setProjectCategory] = useState("SaaS")
  const [projectStatus, setProjectStatus] = useState("Published")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/admin/projects"
    }, 1200)
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
      <form onSubmit={handleSave} className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Project Title</label>
              <input 
                type="text" 
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Category</label>
              <select 
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium appearance-none"
              >
                <option value="SaaS">SaaS</option>
                <option value="Mobile">Mobile</option>
                <option value="AI">AI</option>
                <option value="E-commerce">E-commerce</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Status</label>
              <select 
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium appearance-none"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            
            {/* Thumbnail Mock */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Thumbnail Image</label>
              <div className="w-full h-12 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center gap-2 text-slate-500 font-medium hover:bg-slate-100 cursor-pointer transition-colors">
                <ImageIcon size={18} /> Upload Image
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Project Description</label>
            <textarea 
              rows={4}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium resize-none"
              defaultValue="This is a detailed description of the project portfolio item."
            />
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
