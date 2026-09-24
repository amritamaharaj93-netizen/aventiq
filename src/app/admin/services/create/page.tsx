"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, Plus, Trash2, Layers, Code, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

export interface DeliverableFeature {
  title: string
  desc: string
}

export default function CreateServicePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Form State
  const [formData, setFormData] = useState<{
    title: string
    slug: string
    status: string
    desc: string
    subtitle: string
    overview: string
    techInput: string
    features: DeliverableFeature[]
  }>({
    title: "",
    slug: "",
    status: "Published",
    desc: "",
    subtitle: "",
    overview: "",
    techInput: "",
    features: [
      { title: "Custom Engineering", desc: "Tailor-made software built for your unique business goals." },
      { title: "Enterprise Scalability", desc: "High-performance architecture built to scale effortlessly." }
    ]
  })

  const handleTitleChange = (val: string) => {
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: autoSlug
    }))
  }

  const handleFeatureChange = (index: number, field: "title" | "desc", value: string) => {
    const updated = [...formData.features]
    updated[index][field] = value
    setFormData(prev => ({ ...prev, features: updated }))
  }

  const addFeatureRow = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { title: "", desc: "" }]
    }))
  }

  const removeFeatureRow = (index: number) => {
    if (formData.features.length <= 1) return
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return
    setIsLoading(true)

    const parsedTech = formData.techInput
      .split(",")
      .map(t => t.trim())
      .filter(Boolean)

    const cleanedFeatures = formData.features.filter(f => f.title.trim().length > 0)

    const newService = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      status: formData.status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      desc: formData.desc || "Short service summary.",
      subtitle: formData.subtitle || `${formData.title} solutions built for modern business.`,
      overview: formData.overview || `We deliver comprehensive ${formData.title} services tailored to your goals.`,
      tech: parsedTech.length > 0 ? parsedTech : ["React", "TypeScript", "Node.js"],
      features: cleanedFeatures.length > 0 ? cleanedFeatures : [
        { title: "Custom Engineering", desc: "Engineered specifically for your business requirements." }
      ]
    }

    const saved = localStorage.getItem("aventiq_admin_services")
    let list = []
    if (saved) {
      try {
        list = JSON.parse(saved)
      } catch (err) {
        console.error("Failed to parse services")
      }
    }

    const updated = Array.isArray(list) ? [...list, newService] : [newService]
    localStorage.setItem("aventiq_admin_services", JSON.stringify(updated))

    setTimeout(() => {
      setIsLoading(false)
      router.push("/admin/services")
    }, 400)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/services"
            className="p-2.5 text-slate-500 hover:text-[#020B1C] hover:bg-slate-100 rounded-xl transition-all border border-slate-200 shadow-sm"
            title="Back to Services"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight">Add New Service</h1>
            <p className="text-[#64748B] text-sm font-medium mt-0.5">Create a full service offering with overview content and deliverable cards.</p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
        
        <form onSubmit={handleSubmit} className="space-y-8 mt-2">
          
          {/* Basic Details */}
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0067D9] flex items-center gap-2">
              <Layers size={16} /> Basic Information & Card Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Web Development" 
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-semibold text-[#020B1C]"
                />
              </div>

              <div className="space-y-2 md:col-span-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">URL Slug</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. web-development" 
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-mono text-slate-700"
                />
              </div>

              <div className="space-y-2 md:col-span-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-semibold text-[#020B1C]"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Short Card Description (Shown on /services grid)</label>
              <textarea 
                rows={2}
                placeholder="Short summary displayed on the main services card..." 
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                className="w-full p-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-medium text-[#020B1C]"
              />
            </div>
          </div>

          {/* Service Detail Page Content */}
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0067D9] flex items-center gap-2">
              <Code size={16} /> Detailed Page Content (/services/[slug])
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Hero Subtitle (Tagline)</label>
              <input 
                type="text" 
                placeholder="e.g. High-performance web applications built for enterprise scale." 
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-medium text-[#020B1C]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Overview Paragraphs</label>
              <RichTextEditor 
                value={formData.overview}
                onChange={(val) => setFormData({...formData, overview: val})}
                placeholder="Detailed overview explanation shown under the Overview section..."
                minHeight="220px"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Technologies Used (Comma-separated)</label>
              <input 
                type="text" 
                placeholder="e.g. Next.js, React, TypeScript, Tailwind CSS, Framer Motion" 
                value={formData.techInput}
                onChange={(e) => setFormData({...formData, techInput: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-medium text-[#020B1C]"
              />
            </div>
          </div>

          {/* What We Deliver Features Grid */}
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0067D9] flex items-center gap-2">
                <Check size={16} /> "What We Deliver" Cards
              </h3>
              <Button 
                type="button" 
                onClick={addFeatureRow}
                variant="outline"
                size="sm"
                className="text-xs font-bold text-[#0067D9] border-[#0067D9]/30 hover:bg-[#0067D9]/10 rounded-lg cursor-pointer"
              >
                + Add Deliverable Card
              </Button>
            </div>

            <div className="space-y-4">
              {formData.features.map((feature, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 relative group space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Card #{idx + 1}</span>
                    {formData.features.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeFeatureRow(idx)}
                        className="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                      >
                        Remove Card
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text"
                      placeholder="Deliverable Title (e.g. Custom Web Applications)"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-[#020B1C] focus:outline-none focus:border-[#00C6F7]"
                    />
                    <input 
                      type="text"
                      placeholder="Deliverable Description..."
                      value={feature.desc}
                      onChange={(e) => handleFeatureChange(idx, "desc", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 focus:outline-none focus:border-[#00C6F7]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <Link href="/admin/services">
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
                  <Save size={18} /> Create Service
                </>
              )}
            </Button>
          </div>

        </form>
      </div>

    </div>
  )
}
