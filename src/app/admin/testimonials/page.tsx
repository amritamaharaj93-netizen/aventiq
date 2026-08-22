"use client"

import { useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, MoreHorizontal, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

// Exact same data to ensure no data loss
const INITIAL_TESTIMONIALS = [
  { id: "1", client: "Sarah Jenkins", company: "TechFlow Inc.", rating: 5, date: "Aug 15, 2026", status: "Published" },
  { id: "2", client: "David Chen", company: "Global Retail", rating: 5, date: "Jul 22, 2026", status: "Published" },
  { id: "3", client: "Elena Rodriguez", company: "HealthSync", rating: 4, date: "Jun 10, 2026", status: "Draft" },
]

export default function AdminTestimonialsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
            Testimonials
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Manage client reviews and feedback to display on the site.
          </p>
        </div>
        <Button className="h-11 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:from-[#00C6F7] hover:to-[#0067D9] text-white font-bold px-6 rounded-xl shadow-[0_0_15px_rgba(0,198,247,0.3)] hover:shadow-[0_0_25px_rgba(0,198,247,0.5)] transition-all flex items-center gap-2">
          <Plus size={18} strokeWidth={2.5} /> Add Testimonial
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
              placeholder="Search testimonials..." 
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
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Client Name</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Company</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase hidden md:table-cell">Rating</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Status</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase hidden md:table-cell">Date Added</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_TESTIMONIALS.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-[#F4F7FA]/50 transition-colors group bg-white">
                  <td className="p-5">
                    <div className="font-bold text-[#020B1C] text-sm group-hover:text-[#0067D9] transition-colors">{testimonial.client}</div>
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-medium text-slate-600">{testimonial.company}</span>
                  </td>
                  <td className="p-5 hidden md:table-cell">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < testimonial.rating ? "fill-current" : "text-slate-200"} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      testimonial.status === "Published" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                        : "bg-amber-50 text-amber-700 border-amber-200/60 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                    }`}>
                      {/* Optional little dot indicator */}
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${testimonial.status === "Published" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                      {testimonial.status}
                    </span>
                  </td>
                  <td className="p-5 text-sm font-medium text-slate-500 hidden md:table-cell">
                    {testimonial.date}
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-100">
                      <button className="p-2 text-slate-400 hover:text-[#0067D9] hover:bg-[#0067D9]/10 rounded-lg transition-all" title="Edit">
                        <Edit size={16} strokeWidth={2.5} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
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
            Showing <span className="font-bold text-[#020B1C]">1</span> to <span className="font-bold text-[#020B1C]">3</span> of <span className="font-bold text-[#020B1C]">3</span> entries
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
    </div>
  )
}
