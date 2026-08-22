"use client"

import { useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, MoreHorizontal } from "lucide-react"

const INITIAL_SERVICES = [
  { id: "1", title: "Web Development", status: "Published", date: "Aug 12, 2026" },
  { id: "2", title: "SaaS Development", status: "Published", date: "Jul 28, 2026" },
  { id: "3", title: "Mobile App Development", status: "Published", date: "Jul 15, 2026" },
  { id: "4", title: "AI Development", status: "Draft", date: "Jun 02, 2026" },
]

export default function AdminServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#062B63] tracking-tight">Services Management</h1>
          <p className="text-[#475569] mt-2 text-lg">Manage the premium services offered by Aventiq.</p>
        </div>
        <button className="bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:opacity-90 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_10px_20px_-10px_rgba(0,198,247,0.5)] transition-all hover:-translate-y-0.5">
          <Plus size={18} /> Add New Service
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#DCE8F5] shadow-xl shadow-[#062B63]/5 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-[#DCE8F5] flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#F8FAFC]/50 backdrop-blur-sm">
          <div className="relative w-full sm:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
            <input 
              type="text" 
              placeholder="Search services..." 
              className="w-full h-11 pl-12 pr-4 rounded-xl border border-[#DCE8F5] bg-white focus:outline-none focus:border-[#0067D9] focus:ring-4 focus:ring-[#0067D9]/10 transition-all text-sm shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="w-full sm:w-auto flex items-center gap-2 text-[#475569] bg-white border border-[#DCE8F5] px-5 py-2.5 rounded-xl hover:bg-[#F3F8FF] hover:text-[#0067D9] transition-all font-medium text-sm shadow-sm">
            <Filter size={16} /> Filter List
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#DCE8F5] text-[11px] uppercase tracking-wider font-bold text-[#64748B]">
                <th className="p-5 pl-8">Service Name</th>
                <th className="p-5">Status</th>
                <th className="p-5 hidden md:table-cell">Date Added</th>
                <th className="p-5 pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F5]/50">
              {INITIAL_SERVICES.map((service) => (
                <tr key={service.id} className="hover:bg-[#F3F8FF]/30 transition-colors group">
                  <td className="p-5 pl-8">
                    <div className="font-semibold text-[#102A43] text-base">{service.title}</div>
                  </td>
                  <td className="p-5">
                    <span className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border ${
                      service.status === "Published" 
                        ? "bg-[#E8F3FF] text-[#0067D9] border-[#0067D9]/20" 
                        : "bg-[#FFF4E5] text-[#FF8A00] border-[#FF8A00]/20"
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-[#475569] hidden md:table-cell font-medium">
                    {service.date}
                  </td>
                  <td className="p-5 pr-8 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-[#64748B] hover:text-[#0067D9] hover:bg-[#E8F3FF] rounded-lg transition-colors" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-[#64748B] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors" title="More">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="p-5 border-t border-[#DCE8F5] flex items-center justify-between bg-[#F8FAFC]/50">
          <div className="text-sm font-medium text-[#64748B]">Showing <span className="text-[#102A43]">4</span> of 4 entries</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-[#64748B] border border-[#DCE8F5] rounded-lg opacity-50 cursor-not-allowed bg-white">Previous</button>
            <button className="px-4 py-2 text-sm font-medium text-[#64748B] border border-[#DCE8F5] rounded-lg opacity-50 cursor-not-allowed bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
