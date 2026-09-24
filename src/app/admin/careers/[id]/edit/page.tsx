"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

export default function EditCareerPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const [isLoading, setIsLoading] = useState(false)

  // Form State
  const [role, setRole] = useState("")
  const [department, setDepartment] = useState("Engineering")
  const [location, setLocation] = useState("Remote")
  const [type, setType] = useState("Full-time")
  const [status, setStatus] = useState("Active")
  const [description, setDescription] = useState("")

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_careers")
    if (saved) {
      try {
        const jobs = JSON.parse(saved)
        if (Array.isArray(jobs)) {
          const found = jobs.find((j: any) => j.id === jobId)
          if (found) {
            setRole(found.role || "")
            setDepartment(found.department || "Engineering")
            setLocation(found.location || "Remote")
            setType(found.type || "Full-time")
            setStatus(found.status || "Active")
            setDescription(found.description || `<p>We are seeking a talented ${found.role} to join our team.</p>`)
          }
        }
      } catch (e) {
        console.error("Failed to parse career posting from local storage")
      }
    }
  }, [jobId])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!role.trim()) return
    setIsLoading(true)

    const saved = localStorage.getItem("aventiq_admin_careers")
    if (saved) {
      try {
        const jobs = JSON.parse(saved)
        if (Array.isArray(jobs)) {
          const updated = jobs.map((j: any) => {
            if (j.id === jobId) {
              return {
                ...j,
                role,
                department,
                location,
                type,
                status,
                description
              }
            }
            return j
          })
          localStorage.setItem("aventiq_admin_careers", JSON.stringify(updated))
        }
      } catch (err) {
        console.error("Failed to update career posting")
      }
    }

    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/careers")
    }, 400)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/careers"
            className="p-2.5 text-slate-500 hover:text-[#020B1C] hover:bg-slate-100 rounded-xl transition-all border border-slate-200 shadow-sm"
            title="Back to Careers List"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight">Edit Career Posting</h1>
            <p className="text-[#64748B] text-sm font-medium mt-0.5">Update job details, department, location, and description.</p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
        
        <form onSubmit={handleSave} className="space-y-8 mt-2">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Role Title */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Job Role Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. Senior Full Stack Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-semibold text-[#020B1C]"
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Department</label>
              <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-semibold text-[#020B1C]"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Product">Product</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Location</label>
              <input 
                type="text" 
                placeholder="e.g. Remote or San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-medium text-[#020B1C]"
              />
            </div>

            {/* Employment Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Employment Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-semibold text-[#020B1C]"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm font-semibold text-[#020B1C]"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Full Job Description & Requirements (Rich Text Editor) */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Job Description & Responsibilities</label>
              <RichTextEditor 
                value={description}
                onChange={(val) => setDescription(val)}
                placeholder="Detailed role summary, responsibilities, requirements, and benefits..."
                minHeight="260px"
              />
            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <Link href="/admin/careers">
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
                  <Save size={18} /> Save Changes
                </>
              )}
            </Button>
          </div>

        </form>
      </div>

    </div>
  )
}
