"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Mail, Phone, MapPin, Plus, Trash2, Globe, Building2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ContactOffice {
  id: string
  name: string
  address: string
  phone: string
  email: string
  mapQuery: string
  isPrimary: boolean
}

export interface ContactPageContent {
  headerTitle: string
  badgeTag: string
  mainHeadline: string
  subText: string
  email: string
  phone: string
  locationName: string
  fullAddress: string
  mapQuery: string
  offices: ContactOffice[]
}

const DEFAULT_CONTACT: ContactPageContent = {
  headerTitle: "Contact Us",
  badgeTag: "Get in touch",
  mainHeadline: "Let's Build Something Great.",
  subText: "Have a vision, a product to build, or an existing system that needs scaling? Tell our engineering team about your project.",
  email: "aventiq34@gmail.com",
  phone: "8239988743",
  locationName: "Kokar Ranchi",
  fullAddress: "Kokar, Ranchi, Jharkhand, India",
  mapQuery: "Kokar Ranchi",
  offices: [
    {
      id: "1",
      name: "Main Headquarters",
      address: "Kokar, Ranchi, Jharkhand, India",
      phone: "8239988743",
      email: "aventiq34@gmail.com",
      mapQuery: "Kokar Ranchi",
      isPrimary: true
    }
  ]
}

export default function AdminContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSavedSuccess, setIsSavedSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState<ContactPageContent>(DEFAULT_CONTACT)

  // Phone sanitization helper (digits only, max 10 chars)
  const sanitizePhone = (val: string) => {
    return val.replace(/\D/g, "").slice(0, 10)
  }

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_contact")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object") {
          setFormData({
            ...DEFAULT_CONTACT,
            ...parsed,
            phone: sanitizePhone(parsed.phone || DEFAULT_CONTACT.phone),
            offices: Array.isArray(parsed.offices) && parsed.offices.length > 0 
              ? parsed.offices.map((o: ContactOffice) => ({ ...o, phone: sanitizePhone(o.phone || "") })) 
              : DEFAULT_CONTACT.offices
          })
        }
      } catch (e) {
        console.error("Failed to parse contact content from local storage")
      }
    }
  }, [])

  const handleOfficeChange = (id: string, field: keyof ContactOffice, value: any) => {
    const finalVal = field === "phone" ? sanitizePhone(value) : value
    setFormData(prev => ({
      ...prev,
      offices: prev.offices.map(off => off.id === id ? { ...off, [field]: finalVal } : off)
    }))
  }

  const addOffice = () => {
    const newOffice: ContactOffice = {
      id: Date.now().toString(),
      name: "Branch Office",
      address: "City, State, Country",
      phone: "8239988743",
      email: "contact@aventiq.com",
      mapQuery: "Ranchi Jharkhand",
      isPrimary: false
    }
    setFormData(prev => ({
      ...prev,
      offices: [...prev.offices, newOffice]
    }))
  }

  const removeOffice = (id: string) => {
    if (formData.offices.length <= 1) return
    setFormData(prev => ({
      ...prev,
      offices: prev.offices.filter(off => off.id !== id)
    }))
  }

  const setPrimaryOffice = (id: string) => {
    setFormData(prev => {
      const selected = prev.offices.find(o => o.id === id)
      return {
        ...prev,
        locationName: selected ? selected.name : prev.locationName,
        fullAddress: selected ? selected.address : prev.fullAddress,
        email: selected ? selected.email : prev.email,
        phone: selected ? selected.phone : prev.phone,
        mapQuery: selected ? selected.mapQuery : prev.mapQuery,
        offices: prev.offices.map(off => ({
          ...off,
          isPrimary: off.id === id
        }))
      }
    })
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Validate 10 digits for main phone
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMessage(`Main phone number must be a valid 10-digit number (currently ${formData.phone.length}/10 digits).`)
      return
    }

    // Validate 10 digits for all offices
    const invalidOffice = formData.offices.find(off => !/^\d{10}$/.test(off.phone))
    if (invalidOffice) {
      setErrorMessage(`Phone number for "${invalidOffice.name}" must be a valid 10-digit number (currently ${invalidOffice.phone.length}/10 digits).`)
      return
    }

    setIsLoading(true)

    localStorage.setItem("aventiq_admin_contact", JSON.stringify(formData))

    setTimeout(() => {
      setIsLoading(false)
      setIsSavedSuccess(true)
      setTimeout(() => setIsSavedSuccess(false), 3000)
    }, 400)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
            Contact Us Page Management
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Update email, phone (strictly 10-digits), location, Google Maps embed, and manage branches.
          </p>
        </div>

        {isSavedSuccess && (
          <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200 shadow-sm animate-in fade-in flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Changes saved successfully!
          </span>
        )}

        {errorMessage && (
          <span className="text-xs font-bold bg-red-50 text-red-700 px-4 py-2 rounded-xl border border-red-200 shadow-sm animate-in fade-in flex items-center gap-1.5">
            ⚠️ {errorMessage}
          </span>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Section 1: Page Text & Primary Contact Info */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
          
          <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2 pb-2 border-b border-slate-100">
            <Mail className="text-[#0067D9]" size={20} /> Section 1: Contact Page Hero & Main Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Header Hero Title
              </label>
              <input 
                type="text" 
                value={formData.headerTitle}
                onChange={(e) => setFormData({...formData, headerTitle: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-semibold text-[#020B1C]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Badge Tagline
              </label>
              <input 
                type="text" 
                value={formData.badgeTag}
                onChange={(e) => setFormData({...formData, badgeTag: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-semibold text-[#020B1C]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Main Headline Title
              </label>
              <input 
                type="text" 
                value={formData.mainHeadline}
                onChange={(e) => setFormData({...formData, mainHeadline: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-semibold text-[#020B1C]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Sub-Text Paragraph
              </label>
              <textarea 
                rows={3}
                value={formData.subText}
                onChange={(e) => setFormData({...formData, subText: e.target.value})}
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-medium text-slate-700"
              />
            </div>

          </div>
        </div>

        {/* Section 2: Contact Methods & Primary Location */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
          
          <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2 pb-2 border-b border-slate-100">
            <Phone className="text-[#0067D9]" size={20} /> Section 2: Direct Contact Channels & Location Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Mail size={14} className="text-[#0067D9]" /> Email Address
              </label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-semibold text-[#020B1C]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone size={14} className="text-[#0067D9]" /> Phone Number (10 Digits)
                </label>
                <span className={`text-[11px] font-bold ${formData.phone.length === 10 ? "text-emerald-600" : "text-amber-600"}`}>
                  {formData.phone.length}/10 digits
                </span>
              </div>
              <input 
                type="text" 
                maxLength={10}
                placeholder="10 digit phone number (e.g. 8239988743)"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: sanitizePhone(e.target.value)})}
                className={`w-full h-12 px-4 rounded-xl border ${
                  formData.phone.length === 10 
                    ? "border-slate-200 focus:border-[#00C6F7]" 
                    : "border-amber-300 bg-amber-50/20 focus:border-amber-500"
                } bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 text-sm font-semibold text-[#020B1C]`}
              />
              {formData.phone.length > 0 && formData.phone.length < 10 && (
                <p className="text-[11px] font-medium text-amber-600">⚠️ Must be exactly 10 digits</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={14} className="text-[#0067D9]" /> Short Location Name (Displayed in Link)
              </label>
              <input 
                type="text" 
                value={formData.locationName}
                onChange={(e) => setFormData({...formData, locationName: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-semibold text-[#020B1C]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Globe size={14} className="text-[#0067D9]" /> Google Maps Search Query / Address
              </label>
              <input 
                type="text" 
                value={formData.mapQuery}
                onChange={(e) => setFormData({...formData, mapQuery: e.target.value})}
                placeholder="e.g. Kokar Ranchi"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-semibold text-[#020B1C]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 size={14} className="text-[#0067D9]" /> Full Address (Displayed under Map)
              </label>
              <input 
                type="text" 
                value={formData.fullAddress}
                onChange={(e) => setFormData({...formData, fullAddress: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-semibold text-[#020B1C]"
              />
            </div>

          </div>
        </div>

        {/* Section 3: Manage Office Locations (CRUD Functionality) */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
              <Building2 className="text-[#0067D9]" size={20} /> Section 3: Manage Office Locations & Branches
            </h2>
            <Button 
              type="button"
              onClick={addOffice}
              variant="outline"
              size="sm"
              className="text-xs font-bold text-[#0067D9] border-[#0067D9]/30 hover:bg-[#0067D9]/10 rounded-lg cursor-pointer"
            >
              <Plus size={16} /> Add Office Branch
            </Button>
          </div>

          <div className="space-y-6">
            {formData.offices.map((office, index) => (
              <div 
                key={office.id} 
                className={`p-6 rounded-2xl border transition-all space-y-4 ${
                  office.isPrimary 
                    ? "bg-blue-50/40 border-[#0067D9]/40 shadow-sm" 
                    : "bg-slate-50/50 border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-extrabold px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-700">
                      Location #{index + 1}
                    </span>
                    {office.isPrimary ? (
                      <span className="text-xs font-bold bg-[#0067D9] text-white px-3 py-1 rounded-full shadow-sm">
                        ★ Primary Office
                      </span>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => setPrimaryOffice(office.id)}
                        className="text-xs font-semibold text-[#0067D9] hover:underline cursor-pointer"
                      >
                        Set as Primary
                      </button>
                    )}
                  </div>

                  {formData.offices.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeOffice(office.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={14} /> Remove Location
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Office Name</label>
                    <input 
                      type="text" 
                      value={office.name}
                      onChange={(e) => handleOfficeChange(office.id, "name", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-[#020B1C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Email</label>
                    <input 
                      type="email" 
                      value={office.email}
                      onChange={(e) => handleOfficeChange(office.id, "email", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-[#020B1C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Phone Number (10 Digits)</label>
                      <span className={`text-[10px] font-bold ${office.phone.length === 10 ? "text-emerald-600" : "text-amber-600"}`}>
                        {office.phone.length}/10 digits
                      </span>
                    </div>
                    <input 
                      type="text" 
                      maxLength={10}
                      placeholder="10 digit phone number (e.g. 8239988743)"
                      value={office.phone}
                      onChange={(e) => handleOfficeChange(office.id, "phone", e.target.value)}
                      className={`w-full h-11 px-4 rounded-xl border ${
                        office.phone.length === 10 ? "border-slate-200" : "border-amber-300 bg-amber-50/20"
                      } bg-white text-sm font-semibold text-[#020B1C]`}
                    />
                    {office.phone.length > 0 && office.phone.length < 10 && (
                      <p className="text-[10px] font-medium text-amber-600">⚠️ Must be exactly 10 digits</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Map Search Query</label>
                    <input 
                      type="text" 
                      value={office.mapQuery}
                      onChange={(e) => handleOfficeChange(office.id, "mapQuery", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-[#020B1C]"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Full Physical Address</label>
                    <input 
                      type="text" 
                      value={office.address}
                      onChange={(e) => handleOfficeChange(office.id, "address", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-[#020B1C]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Floating Submit Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="h-12 px-10 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] text-white font-bold rounded-xl shadow-lg shadow-[#0067D9]/20 hover:shadow-[#0067D9]/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 text-base"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save size={20} /> Save Contact Us Content
              </>
            )}
          </Button>
        </div>

      </form>

    </div>
  )
}
