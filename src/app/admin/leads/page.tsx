"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Eye, Trash2, Mail, Download, Phone, Building2, Calendar, Clock, DollarSign, Tag, CheckCircle2, X, Send, Plus, AlertCircle, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ContactLead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  subject: string
  projectType: string
  budget: string
  timeline: string
  message: string
  status: "New" | "Contacted" | "In Progress" | "Closed"
  date: string
}

// Starts clean with zero dummy entries so only genuine submitted leads exist
const DEFAULT_LEADS: ContactLead[] = []

export default function AdminLeadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [leads, setLeads] = useState<ContactLead[]>(DEFAULT_LEADS)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5

  // Modals state
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null)
  const [replyLead, setReplyLead] = useState<ContactLead | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [replySentSuccess, setReplySentSuccess] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "Website",
    budget: "$10k - $25k",
    timeline: "1-3 months",
    message: ""
  })
  const [addLeadError, setAddLeadError] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_leads")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setLeads(parsed)
        }
      } catch (e) {
        console.error("Failed to parse leads from local storage")
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("aventiq_admin_leads", JSON.stringify(leads))
    }
  }, [leads, isLoaded])

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id))
    if (selectedLead?.id === id) setSelectedLead(null)
    if (replyLead?.id === id) setReplyLead(null)
  }

  const handleUpdateStatus = (id: string, newStatus: ContactLead["status"]) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null)
    }
  }

  // Create Manual Genuine Lead
  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAddLeadError(null)

    if (!newLeadForm.name.trim() || !newLeadForm.email.trim() || !newLeadForm.message.trim()) {
      setAddLeadError("Please fill out name, email, and project message details.")
      return
    }

    const cleanPhone = newLeadForm.phone.replace(/\D/g, "").slice(0, 10)
    if (newLeadForm.phone && cleanPhone.length !== 10) {
      setAddLeadError("Phone number must be a valid 10-digit number.")
      return
    }

    const created: ContactLead = {
      id: Date.now().toString(),
      name: newLeadForm.name.trim(),
      email: newLeadForm.email.trim(),
      phone: cleanPhone,
      company: newLeadForm.company.trim() || "Direct Client",
      subject: `${newLeadForm.projectType} Inquiry - ${newLeadForm.message.slice(0, 35)}...`,
      projectType: newLeadForm.projectType,
      budget: newLeadForm.budget,
      timeline: newLeadForm.timeline,
      message: newLeadForm.message.trim(),
      status: "New",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    }

    setLeads(prev => [created, ...prev])
    setIsAddModalOpen(false)
    setNewLeadForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "Website",
      budget: "$10k - $25k",
      timeline: "1-3 months",
      message: ""
    })
  }

  // Export CSV Handler
  const exportToCSV = () => {
    if (leads.length === 0) return
    const headers = ["ID", "Name", "Email", "Phone", "Company", "Project Type", "Budget", "Timeline", "Status", "Date Received", "Message"]
    const rows = leads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${l.company.replace(/"/g, '""')}"`,
      `"${l.projectType.replace(/"/g, '""')}"`,
      `"${l.budget.replace(/"/g, '""')}"`,
      `"${l.timeline.replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.date}"`,
      `"${l.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ])

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `aventiq_leads_export_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Open Reply Modal
  const openReplyModal = (lead: ContactLead) => {
    setReplyLead(lead)
    setReplyMessage(`Hi ${lead.name},\n\nThank you for reaching out to Aventiq regarding your ${lead.projectType} inquiry ("${lead.subject}").\n\nWe have reviewed your project requirements and would be delighted to schedule a strategy call to align on technical architecture and next steps.\n\nBest regards,\nAventiq Engineering Team`)
    setReplySentSuccess(false)
  }

  // Send Reply Handler
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyLead) return

    if (replyLead.status === "New") {
      handleUpdateStatus(replyLead.id, "Contacted")
    }

    setReplySentSuccess(true)
    setTimeout(() => {
      setReplyLead(null)
      setReplySentSuccess(false)
    }, 1500)
  }

  // Filtering
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "All" || lead.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Pagination Math
  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE) || 1
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredLeads.length)
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
            Contact Leads
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Review and respond to genuine client inquiries submitted via your website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="h-11 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] text-white font-bold px-6 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} /> Record Genuine Lead
          </Button>

          <Button 
            onClick={exportToCSV}
            disabled={leads.length === 0}
            className="h-11 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold px-5 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40"
          >
            <Download size={18} strokeWidth={2.5} className="text-[#0067D9]" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        
        {/* Controls Bar */}
        <div className="p-5 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00C6F7] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search leads by name, email, company..." 
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-sm text-[#020B1C] placeholder:text-slate-400 font-medium"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600">
              <Filter size={14} className="text-slate-400" />
              <span>Status:</span>
              <select 
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="bg-transparent font-bold text-[#020B1C] focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table or Empty State */}
        {filteredLeads.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
              <Inbox size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#020B1C]">No Genuine Leads Yet</h3>
            <p className="text-sm font-medium text-slate-500 max-w-md mx-auto">
              Real project inquiries submitted via your website's <code className="bg-slate-100 px-2 py-0.5 rounded text-[#0067D9] font-bold">/contact</code> page will appear here live.
            </p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="mt-2 h-10 px-5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              + Record Genuine Lead Manually
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Lead Name & Company</th>
                  <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Contact Info</th>
                  <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Inquiry Subject</th>
                  <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Project Type</th>
                  <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase">Status</th>
                  <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase hidden sm:table-cell">Date</th>
                  <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#F4F7FA]/50 transition-colors group bg-white">
                    <td className="p-5">
                      <div className="font-bold text-[#020B1C] text-sm group-hover:text-[#0067D9] transition-colors flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0067D9]/10 to-[#00C6F7]/20 flex items-center justify-center text-[#0067D9] font-extrabold text-sm border border-[#0067D9]/20 shadow-sm">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div>{lead.name}</div>
                          <div className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                            <Building2 size={11} /> {lead.company}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="text-xs font-semibold text-slate-600 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Mail size={13} className="text-[#0067D9]" /> {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                            <Phone size={13} className="text-slate-400" /> {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-5 max-w-[200px]">
                      <span className="text-xs font-semibold text-[#020B1C] line-clamp-2 block">
                        {lead.subject}
                      </span>
                    </td>

                    <td className="p-5">
                      <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                        {lead.projectType}
                      </span>
                    </td>

                    <td className="p-5">
                      <select 
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as ContactLead["status"])}
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none transition-all ${
                          lead.status === "New" 
                            ? "bg-blue-50 text-blue-700 border-blue-200" 
                            : lead.status === "Contacted"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : lead.status === "In Progress"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        <option value="New">● New</option>
                        <option value="Contacted">● Contacted</option>
                        <option value="In Progress">● In Progress</option>
                        <option value="Closed">● Closed</option>
                      </select>
                    </td>

                    <td className="p-5 text-xs font-medium text-slate-500 hidden sm:table-cell whitespace-nowrap">
                      {lead.date}
                    </td>

                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-100">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 text-slate-500 hover:text-[#00C6F7] hover:bg-[#00C6F7]/10 rounded-lg transition-all cursor-pointer" 
                          title="View Full Lead Details"
                        >
                          <Eye size={17} strokeWidth={2.5} />
                        </button>

                        <button 
                          onClick={() => openReplyModal(lead)}
                          className="p-2 text-slate-500 hover:text-[#0067D9] hover:bg-[#0067D9]/10 rounded-lg transition-all cursor-pointer" 
                          title="Quick Reply / Send Email"
                        >
                          <Mail size={17} strokeWidth={2.5} />
                        </button>

                        <button 
                          onClick={() => handleDeleteLead(lead.id)} 
                          className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer" 
                          title="Delete Lead"
                        >
                          <Trash2 size={17} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Footer */}
        {filteredLeads.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-medium text-slate-500">
              Showing <span className="font-bold text-[#020B1C]">{filteredLeads.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-[#020B1C]">{endIndex}</span> of <span className="font-bold text-[#020B1C]">{filteredLeads.length}</span> entries
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
        )}

      </div>

      {/* Record Genuine Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-slate-100 relative overflow-hidden space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#020B1C]">Record Genuine Lead</h3>
                <p className="text-xs font-medium text-slate-500">Manually add an offline or direct client inquiry.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {addLeadError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertCircle size={16} /> {addLeadError}
              </div>
            )}

            <form onSubmit={handleAddLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Lead Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Client Name"
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-[#020B1C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="client@company.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-[#020B1C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Phone (10 Digits)</label>
                  <input 
                    type="text" 
                    maxLength={10}
                    placeholder="e.g. 8239988743"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-[#020B1C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Company</label>
                  <input 
                    type="text" 
                    placeholder="Company Name"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-[#020B1C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Project Type</label>
                  <select 
                    value={newLeadForm.projectType}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, projectType: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                  >
                    <option value="Website">Website</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="AI Solution">AI Solution</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Custom Software">Custom Software</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Budget</label>
                  <select 
                    value={newLeadForm.budget}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                  >
                    <option value="< $10k">&lt; $10,000</option>
                    <option value="$10k - $25k">$10,000 - $25,000</option>
                    <option value="$25k - $50k">$25,000 - $50,000</option>
                    <option value="$50k+">$50,000+</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Timeline</label>
                  <select 
                    value={newLeadForm.timeline}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, timeline: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                  >
                    <option value="ASAP">ASAP</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Project Description *</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Describe the inquiry or project scope..."
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  variant="outline" 
                  className="h-10 px-4 rounded-xl text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="h-10 px-6 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  Save Genuine Lead
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* View Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-100 relative overflow-hidden space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0067D9]/10 text-[#0067D9] flex items-center justify-center font-extrabold text-base">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#020B1C]">{selectedLead.name}</h3>
                  <p className="text-xs font-semibold text-slate-500">{selectedLead.company}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lead Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase block mb-1">Email</span>
                <a href={`mailto:${selectedLead.email}`} className="font-bold text-[#0067D9] hover:underline flex items-center gap-1">
                  <Mail size={12} /> {selectedLead.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block mb-1">Phone</span>
                <span className="font-bold text-slate-700 flex items-center gap-1 font-mono">
                  <Phone size={12} /> {selectedLead.phone || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block mb-1">Project Type</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Tag size={12} /> {selectedLead.projectType}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block mb-1">Budget</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <DollarSign size={12} /> {selectedLead.budget}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block mb-1">Timeline</span>
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Clock size={12} /> {selectedLead.timeline}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block mb-1">Received Date</span>
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Calendar size={12} /> {selectedLead.date}
                </span>
              </div>
            </div>

            {/* Subject & Full Message */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#020B1C]">{selectedLead.subject}</h4>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
                {selectedLead.message}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Status:</span>
                <select 
                  value={selectedLead.status}
                  onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as ContactLead["status"])}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="New">● New</option>
                  <option value="Contacted">● Contacted</option>
                  <option value="In Progress">● In Progress</option>
                  <option value="Closed">● Closed</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    const target = selectedLead
                    setSelectedLead(null)
                    openReplyModal(target)
                  }}
                  className="h-10 px-5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Mail size={14} /> Send Reply Email
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Send Quick Reply Modal */}
      {replyLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-slate-100 relative overflow-hidden space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#020B1C]">Compose Email Reply</h3>
                <p className="text-xs font-medium text-slate-500">To: {replyLead.name} ({replyLead.email})</p>
              </div>
              <button 
                onClick={() => setReplyLead(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {replySentSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Email Reply Sent!</h4>
                <p className="text-xs text-slate-500 font-medium">Lead status updated to Contacted.</p>
              </div>
            ) : (
              <form onSubmit={handleSendReply} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Subject</label>
                  <input 
                    type="text" 
                    value={`Re: ${replyLead.subject}`}
                    readOnly
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Message Body</label>
                  <textarea 
                    rows={6}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <a 
                    href={`mailto:${replyLead.email}?subject=${encodeURIComponent("Re: " + replyLead.subject)}&body=${encodeURIComponent(replyMessage)}`}
                    className="text-xs font-bold text-[#0067D9] hover:underline flex items-center gap-1"
                  >
                    Open in Mail App ↗
                  </a>

                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      onClick={() => setReplyLead(null)}
                      variant="outline" 
                      className="h-10 px-4 rounded-xl text-xs font-bold"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="h-10 px-6 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Send size={14} /> Send Reply
                    </Button>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  )
}
