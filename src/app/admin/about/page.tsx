"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Info, Target, Eye, Shield, Zap, BookOpen, HeartHandshake, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

export interface ValueItem {
  title: string
  desc: string
}

export interface AboutContent {
  headerTitle: string
  badgeTag: string
  mainTitle: string
  mainDesc1: string
  mainDesc2: string
  missionTitle: string
  missionDesc: string
  visionTitle: string
  visionDesc: string
  valuesHeading: string
  valuesSubheading: string
  values: ValueItem[]
}

const DEFAULT_ABOUT: AboutContent = {
  headerTitle: "Technology With a Purpose.",
  badgeTag: "Who We Are",
  mainTitle: "Building software that actually works",
  mainDesc1: "Aventiq is a premier software development agency focused on helping ambitious businesses turn ideas into reliable, scalable, and impactful digital products.",
  mainDesc2: "With a passion for engineering excellence, we bring together top-tier talent and innovative design thinking. Whether you're a disruptive startup or an established enterprise, we build strategic partnerships to deliver real business value through clean code, transparent communication, and forward-thinking architecture.",
  missionTitle: "Our Mission",
  missionDesc: "To empower ambitious businesses by engineering intelligent, scalable technology solutions that solve complex problems and drive sustainable growth.",
  visionTitle: "Our Vision",
  visionDesc: "To be the trusted global technology partner for visionary companies, setting the standard for software engineering excellence and digital innovation.",
  valuesHeading: "Our Core Values",
  valuesSubheading: "The principles that guide our engineering process and how we interact with our clients.",
  values: [
    { title: "Innovation", desc: "We constantly explore new technologies to deliver cutting-edge solutions." },
    { title: "Quality", desc: "We write clean, tested, and maintainable code built to last." },
    { title: "Transparency", desc: "Clear communication and honest feedback at every stage of development." },
    { title: "Ownership", desc: "We treat your product and your success as our own." },
    { title: "Continuous Learning", desc: "Our engineers stay ahead of the curve in a fast-changing landscape." },
    { title: "Customer Success", desc: "Your ROI and business growth are our ultimate metrics of success." }
  ]
}

export default function AdminAboutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSavedSuccess, setIsSavedSuccess] = useState(false)
  const [formData, setFormData] = useState<AboutContent>(DEFAULT_ABOUT)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_about")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object") {
          setFormData({
            ...DEFAULT_ABOUT,
            ...parsed,
            values: Array.isArray(parsed.values) && parsed.values.length > 0 ? parsed.values : DEFAULT_ABOUT.values
          })
        }
      } catch (e) {
        console.error("Failed to parse about content from local storage")
      }
    }
  }, [])

  const handleValueChange = (index: number, field: "title" | "desc", val: string) => {
    const updated = [...formData.values]
    updated[index][field] = val
    setFormData(prev => ({ ...prev, values: updated }))
  }

  const addValueRow = () => {
    setFormData(prev => ({
      ...prev,
      values: [...prev.values, { title: "", desc: "" }]
    }))
  }

  const removeValueRow = (index: number) => {
    if (formData.values.length <= 1) return
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    localStorage.setItem("aventiq_admin_about", JSON.stringify(formData))

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
            About Management
          </h1>
          <p className="text-[#64748B] text-sm font-medium">
            Edit all titles, story paragraphs, mission, vision, and core values shown on /about.
          </p>
        </div>

        {isSavedSuccess && (
          <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200 shadow-sm animate-in fade-in">
            ✓ Changes saved successfully!
          </span>
        )}
      </div>

      {/* Main Form */}
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Section 1: Hero & Who We Are */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
          
          <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2 pb-2 border-b border-slate-100">
            <Info className="text-[#0067D9]" size={20} /> Section 1: Hero & Who We Are Intro
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
                Section Badge Tagline
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
                Main Story Title
              </label>
              <input 
                type="text" 
                value={formData.mainTitle}
                onChange={(e) => setFormData({...formData, mainTitle: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] text-sm font-semibold text-[#020B1C]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Lead Overview Paragraph (High Highlight)
              </label>
              <RichTextEditor 
                value={formData.mainDesc1}
                onChange={(val) => setFormData({...formData, mainDesc1: val})}
                placeholder="Write lead paragraph overview..."
                minHeight="140px"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Extended Story Paragraph
              </label>
              <RichTextEditor 
                value={formData.mainDesc2}
                onChange={(val) => setFormData({...formData, mainDesc2: val})}
                placeholder="Write detailed company background..."
                minHeight="180px"
              />
            </div>

          </div>
        </div>

        {/* Section 2: Mission & Vision */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
          
          <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2 pb-2 border-b border-slate-100">
            <Target className="text-[#0067D9]" size={20} /> Section 2: Mission & Vision
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Mission */}
            <div className="space-y-4 p-5 rounded-2xl bg-slate-50/50 border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0067D9] flex items-center gap-2">
                <Target size={16} /> Mission Card
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Card Title</label>
                <input 
                  type="text" 
                  value={formData.missionTitle}
                  onChange={(e) => setFormData({...formData, missionTitle: e.target.value})}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-[#020B1C]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Mission Statement</label>
                <textarea 
                  rows={4}
                  value={formData.missionDesc}
                  onChange={(e) => setFormData({...formData, missionDesc: e.target.value})}
                  className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-4 p-5 rounded-2xl bg-slate-900 text-white border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#00C6F7] flex items-center gap-2">
                <Eye size={16} /> Vision Card
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Card Title</label>
                <input 
                  type="text" 
                  value={formData.visionTitle}
                  onChange={(e) => setFormData({...formData, visionTitle: e.target.value})}
                  className="w-full h-11 px-4 rounded-xl border border-slate-700 bg-slate-800 text-sm font-semibold text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Vision Statement</label>
                <textarea 
                  rows={4}
                  value={formData.visionDesc}
                  onChange={(e) => setFormData({...formData, visionDesc: e.target.value})}
                  className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-800 text-sm font-medium text-slate-200"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Core Values Grid */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] via-[#00C6F7] to-[#0067D9]"></div>
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
              <Shield className="text-[#0067D9]" size={20} /> Section 3: Core Values Grid
            </h2>
            <Button 
              type="button"
              onClick={addValueRow}
              variant="outline"
              size="sm"
              className="text-xs font-bold text-[#0067D9] border-[#0067D9]/30 hover:bg-[#0067D9]/10 rounded-lg cursor-pointer"
            >
              + Add Value Card
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Section Title</label>
              <input 
                type="text" 
                value={formData.valuesHeading}
                onChange={(e) => setFormData({...formData, valuesHeading: e.target.value})}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-semibold text-[#020B1C]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Section Subtitle</label>
              <input 
                type="text" 
                value={formData.valuesSubheading}
                onChange={(e) => setFormData({...formData, valuesSubheading: e.target.value})}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            {formData.values.map((val, idx) => (
              <div key={idx} className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Value Card #{idx + 1}</span>
                  {formData.values.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeValueRow(idx)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                    >
                      Remove Card
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Value Title (e.g. Innovation)"
                    value={val.title}
                    onChange={(e) => handleValueChange(idx, "title", e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-[#020B1C]"
                  />
                  <input 
                    type="text" 
                    placeholder="Description..."
                    value={val.desc}
                    onChange={(e) => handleValueChange(idx, "desc", e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-600"
                  />
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
                <Save size={20} /> Save About Us Content
              </>
            )}
          </Button>
        </div>

      </form>

    </div>
  )
}
