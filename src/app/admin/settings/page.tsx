"use client"

import { useState } from "react"
import { Save, User, Shield, Bell, Building, Globe, Mail, Lock, Upload, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("company")
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
          Platform Settings
        </h1>
        <p className="text-[#64748B] text-sm font-medium">
          Manage your platform configuration, team members, and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Settings Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <button 
            onClick={() => setActiveTab("company")}
            className={`w-full flex items-center gap-3 px-4 py-3 font-semibold rounded-xl transition-all ${
              activeTab === "company" 
              ? "bg-white text-[#0067D9] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-[#0067D9]/20" 
              : "text-slate-500 hover:bg-white hover:text-[#020B1C]"
            }`}
          >
            <Building size={18} strokeWidth={2.5} />
            Company Profile
          </button>
          <button 
            onClick={() => setActiveTab("account")}
            className={`w-full flex items-center gap-3 px-4 py-3 font-semibold rounded-xl transition-all ${
              activeTab === "account" 
              ? "bg-white text-[#0067D9] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-[#0067D9]/20" 
              : "text-slate-500 hover:bg-white hover:text-[#020B1C]"
            }`}
          >
            <User size={18} strokeWidth={2.5} />
            Account Details
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 font-semibold rounded-xl transition-all ${
              activeTab === "security" 
              ? "bg-white text-[#0067D9] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-[#0067D9]/20" 
              : "text-slate-500 hover:bg-white hover:text-[#020B1C]"
            }`}
          >
            <Shield size={18} strokeWidth={2.5} />
            Security & Auth
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 font-semibold rounded-xl transition-all ${
              activeTab === "notifications" 
              ? "bg-white text-[#0067D9] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-[#0067D9]/20" 
              : "text-slate-500 hover:bg-white hover:text-[#020B1C]"
            }`}
          >
            <Bell size={18} strokeWidth={2.5} />
            Notifications
          </button>
        </div>

        {/* Main Settings Form */}
        <div className="lg:col-span-9">
          <form onSubmit={handleSave} className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            
            {activeTab === "company" && (
              <>
                <div className="p-8 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-[#020B1C] mb-1">Company Profile</h2>
                  <p className="text-[#64748B] text-sm font-medium">Update your company's public-facing information.</p>
                </div>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Company Name</label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" defaultValue="Aventiq Technologies" className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Support Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="email" defaultValue="contact@aventiq.com" className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Website URL</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="url" defaultValue="https://www.aventiq.com" className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Company Bio</label>
                    <textarea rows={4} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium resize-none" defaultValue="Aventiq is a premier digital agency specializing in SaaS platforms, mobile applications, and AI integrations." />
                  </div>
                </div>
              </>
            )}

            {activeTab === "account" && (
              <>
                <div className="p-8 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-[#020B1C] mb-1">Account Details</h2>
                  <p className="text-[#64748B] text-sm font-medium">Manage your personal admin profile and preferences.</p>
                </div>
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF8A00] to-[#FFB52E] flex items-center justify-center text-white font-bold text-3xl shadow-lg">AD</div>
                    <div>
                      <Button type="button" variant="outline" className="h-10 px-4 rounded-xl border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:text-[#020B1C] transition-colors flex items-center gap-2 mb-2">
                        <Upload size={16} /> Upload New Avatar
                      </Button>
                      <p className="text-xs text-slate-400">Recommended size: 256x256px. JPG or PNG.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" defaultValue="Admin User" className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="email" defaultValue="admin@aventiq.com" className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Role</label>
                      <div className="relative">
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" value="Super Administrator" disabled className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-medium cursor-not-allowed" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "security" && (
              <>
                <div className="p-8 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-[#020B1C] mb-1">Security & Authentication</h2>
                  <p className="text-[#64748B] text-sm font-medium">Keep your account secure with strong passwords and 2FA.</p>
                </div>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="password" placeholder="••••••••" className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium" />
                      </div>
                    </div>
                    <div className="hidden md:block"></div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="password" placeholder="Enter new password" className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="password" placeholder="Confirm new password" className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C6F7]/50 focus:border-[#00C6F7] transition-all text-[#020B1C] font-medium" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#020B1C]">Two-Factor Authentication (2FA)</h4>
                      <p className="text-sm text-slate-500">Require an extra security code when logging in.</p>
                    </div>
                    <ToggleRight size={40} className="text-[#00C6F7] cursor-pointer" />
                  </div>
                </div>
              </>
            )}

            {activeTab === "notifications" && (
              <>
                <div className="p-8 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-[#020B1C] mb-1">Notification Preferences</h2>
                  <p className="text-[#64748B] text-sm font-medium">Control which email alerts you receive from the platform.</p>
                </div>
                <div className="p-8 space-y-6">
                  {[
                    { title: "New Contact Leads", desc: "Receive an email when a new project inquiry is submitted.", active: true },
                    { title: "Weekly Analytics Report", desc: "A summary of views, leads, and performance every Monday.", active: false },
                    { title: "Security Alerts", desc: "Get notified about new logins from unrecognized devices.", active: true },
                    { title: "System Updates", desc: "Stay informed about platform maintenance and new features.", active: false },
                  ].map((notif, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="font-bold text-[#020B1C]">{notif.title}</h4>
                        <p className="text-sm text-slate-500">{notif.desc}</p>
                      </div>
                      <ToggleRight size={40} className={`cursor-pointer ${notif.active ? "text-[#00C6F7]" : "text-slate-300"}`} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Form Actions (Global across all tabs) */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button type="submit" disabled={isLoading} className="h-11 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:from-[#00C6F7] hover:to-[#0067D9] text-white font-bold px-8 rounded-xl shadow-[0_0_15px_rgba(0,198,247,0.3)] hover:shadow-[0_0_25px_rgba(0,198,247,0.5)] transition-all flex items-center gap-2">
                {isLoading ? "Saving..." : <><Save size={18} strokeWidth={2.5} /> Save Changes</>}
              </Button>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  )
}
