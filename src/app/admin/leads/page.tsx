"use client"

import { useState } from "react"
import { Search, Filter, Eye, Trash2, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dummy data for the leads
const INITIAL_LEADS = [
  { id: "1", name: "Michael Chang", email: "michael@innovate.co", subject: "SaaS Platform Development", status: "New", date: "Aug 18, 2026" },
  { id: "2", name: "Emily Davis", email: "emily.d@startup.io", subject: "UI/UX Design for Fintech App", status: "New", date: "Aug 18, 2026" },
  { id: "3", name: "Sarah O'Connor", email: "sarah@retailtech.com", subject: "E-commerce App Build", status: "Contacted", date: "Aug 15, 2026" },
  { id: "4", name: "James Wilson", email: "james@wilsonlogistics.com", subject: "Cloud Infrastructure Setup", status: "Closed", date: "Aug 10, 2026" },
  { id: "5", name: "Anita Patel", email: "apatel@healthplus.net", subject: "AI Healthcare Integration", status: "Contacted", date: "Aug 08, 2026" },
]

export default function AdminLeadsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
            Contact Leads
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Review and manage incoming project inquiries and messages.
          </p>
        </div>
        <Button className="h-11 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold px-6 rounded-xl shadow-sm transition-all flex items-center gap-2">
          <Download size={18} strokeWidth={2.5} className="text-[#0067D9]" /> Export CSV
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
              placeholder="Search leads by name or email..." 
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm text-[#020B1C] placeholder:text-slate-400 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-11 px-5 rounded-xl border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:text-[#020B1C] transition-colors flex items-center gap-2 shadow-sm">
              <Filter size={18} /> Filter Status
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Lead Name</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Contact Info</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase hidden lg:table-cell">Inquiry Subject</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Status</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase hidden sm:table-cell">Date Received</th>
                <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_LEADS.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#F4F7FA]/50 transition-colors group bg-white">
                  <td className="p-5">
                    <div className="font-bold text-[#020B1C] text-sm group-hover:text-[#0067D9] transition-colors flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0067D9]/10 to-[#00C6F7]/10 flex items-center justify-center text-[#0067D9] font-bold text-xs">
                        {lead.name.charAt(0)}
                      </div>
                      {lead.name}
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" />
                      {lead.email}
                    </span>
                  </td>
                  <td className="p-5 hidden lg:table-cell">
                    <span className="text-sm font-semibold text-[#020B1C] truncate max-w-[200px] block">
                      {lead.subject}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      lead.status === "New" 
                        ? "bg-blue-50 text-blue-700 border-blue-200/60 shadow-[0_0_10px_rgba(59,130,246,0.1)]" 
                        : lead.status === "Contacted"
                        ? "bg-amber-50 text-amber-700 border-amber-200/60 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                        : "bg-slate-100 text-slate-600 border-slate-200/60"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        lead.status === "New" ? "bg-blue-500 animate-pulse" 
                        : lead.status === "Contacted" ? "bg-amber-500" 
                        : "bg-slate-400"
                      }`}></span>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-5 text-sm font-medium text-slate-500 hidden sm:table-cell">
                    {lead.date}
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-100">
                      <button className="p-2 text-slate-400 hover:text-[#00C6F7] hover:bg-[#00C6F7]/10 rounded-lg transition-all" title="View Details">
                        <Eye size={16} strokeWidth={2.5} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-[#0067D9] hover:bg-[#0067D9]/10 rounded-lg transition-all" title="Send Email">
                        <Mail size={16} strokeWidth={2.5} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={16} strokeWidth={2.5} />
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
            Showing <span className="font-bold text-[#020B1C]">1</span> to <span className="font-bold text-[#020B1C]">5</span> of <span className="font-bold text-[#020B1C]">5</span> entries
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
