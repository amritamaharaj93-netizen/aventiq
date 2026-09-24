"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Edit, Trash2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const INITIAL_JOBS = [
  { id: "1", role: "Senior Full Stack Engineer", department: "Engineering", location: "Remote", type: "Full-time", applicants: 24, status: "Active", date: "Aug 10, 2026" },
  { id: "2", role: "Product Designer (UI/UX)", department: "Design", location: "New York, NY", type: "Full-time", applicants: 45, status: "Active", date: "Aug 05, 2026" },
  { id: "3", role: "DevOps Specialist", department: "Engineering", location: "Remote", type: "Full-time", applicants: 8, status: "Draft", date: "Aug 18, 2026" },
  { id: "4", role: "Marketing Director", department: "Marketing", location: "San Francisco, CA", type: "Full-time", applicants: 112, status: "Closed", date: "Jul 15, 2026" },
]

export default function AdminCareersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [jobs, setJobs] = useState(INITIAL_JOBS)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_careers")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setJobs(parsed)
        }
      } catch (e) {
        console.error("Failed to parse career postings from local storage")
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("aventiq_admin_careers", JSON.stringify(jobs))
    }
  }, [jobs, isLoaded])

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id))
  }

  const filteredJobs = jobs.filter(job => 
    job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination Math
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE) || 1
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredJobs.length)
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
            Careers & Openings
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Manage job postings and review incoming applicants.
          </p>
        </div>
        <Link href="/admin/careers/create">
          <Button className="h-11 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:from-[#00C6F7] hover:to-[#0067D9] text-white font-bold px-6 rounded-xl shadow-[0_0_15px_rgba(0,198,247,0.3)] hover:shadow-[0_0_25px_rgba(0,198,247,0.5)] transition-all flex items-center gap-2 cursor-pointer">
            <Plus size={18} strokeWidth={2.5} /> Add Job Posting
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
              placeholder="Search jobs..." 
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
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Job Role</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Department</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Location</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Applicants</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Status</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedJobs.map((job) => (
                <tr key={job.id} className="hover:bg-[#F4F7FA]/50 transition-colors group bg-white">
                  <td className="p-5">
                    <div className="font-bold text-[#020B1C] text-sm group-hover:text-[#0067D9] transition-colors">{job.role}</div>
                    <div className="text-xs text-slate-400 font-medium mt-1">Posted {job.date}</div>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200">
                      {job.department}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-medium text-slate-600">{job.location}</span>
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-semibold text-[#0067D9] flex items-center gap-1.5 bg-[#0067D9]/10 w-fit px-3 py-1 rounded-full">
                      <Users size={14} />
                      {job.applicants}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      job.status === "Active" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                        : job.status === "Draft"
                        ? "bg-amber-50 text-amber-700 border-amber-200/60 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                        : "bg-slate-100 text-slate-600 border-slate-200/60"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        job.status === "Active" ? "bg-emerald-500 animate-pulse" : job.status === "Draft" ? "bg-amber-500" : "bg-slate-400"
                      }`}></span>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-100">
                      <Link 
                        href={`/admin/careers/${job.id}/edit`}
                        className="p-2 text-slate-400 hover:text-[#0067D9] hover:bg-[#0067D9]/10 rounded-lg transition-all cursor-pointer" 
                        title="Edit Job Posting"
                      >
                        <Edit size={16} strokeWidth={2.5} />
                      </Link>
                      <button 
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer" 
                        title="Delete Job Posting"
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
            Showing <span className="font-bold text-[#020B1C]">{filteredJobs.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-[#020B1C]">{endIndex}</span> of <span className="font-bold text-[#020B1C]">{filteredJobs.length}</span> entries
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
