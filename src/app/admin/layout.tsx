import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, FolderKanban, FileText, Briefcase, Mail, Settings, Users, MessageSquare, LogOut, Command } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F7FA] flex font-sans">
      {/* Premium Dark Sidebar */}
      <aside className="w-72 bg-[#020B1C] border-r border-[#062B63]/30 hidden md:flex flex-col fixed h-screen top-0 shadow-2xl z-50">
        <div className="px-8 pt-8 pb-4 flex items-center justify-start">
          <Link href="/admin" className="block w-full">
             <Image 
                src="/img/logo_transparent.png" 
                alt="Aventiq Logo" 
                width={240} 
                height={80} 
                className="w-full h-auto object-contain object-left drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]"
                priority
             />
          </Link>
        </div>

        <div className="px-8 pb-2 text-[11px] uppercase tracking-widest font-semibold text-[#475569]">
          Main Menu
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#0067D9]/20 to-transparent text-[#00C6F7] border-l-2 border-[#00C6F7] rounded-r-xl font-medium transition-all shadow-[inset_0px_1px_0px_rgba(255,255,255,0.02)]">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 text-[#CBD5E1] hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all group border-l-2 border-transparent">
            <FolderKanban size={18} className="text-[#64748B] group-hover:text-[#00C6F7] transition-colors" />
            Projects
          </Link>
          <Link href="/admin/services" className="flex items-center gap-3 px-4 py-3 text-[#CBD5E1] hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all group border-l-2 border-transparent">
            <Briefcase size={18} className="text-[#64748B] group-hover:text-[#00C6F7] transition-colors" />
            Services
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 text-[#CBD5E1] hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all group border-l-2 border-transparent">
            <FileText size={18} className="text-[#64748B] group-hover:text-[#00C6F7] transition-colors" />
            Blog
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 text-[#CBD5E1] hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all group border-l-2 border-transparent">
            <Mail size={18} className="text-[#64748B] group-hover:text-[#00C6F7] transition-colors" />
            Contact Leads
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-3 px-4 py-3 text-[#CBD5E1] hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all group border-l-2 border-transparent">
            <MessageSquare size={18} className="text-[#64748B] group-hover:text-[#00C6F7] transition-colors" />
            Testimonials
          </Link>
          <Link href="/admin/careers" className="flex items-center gap-3 px-4 py-3 text-[#CBD5E1] hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all group border-l-2 border-transparent">
            <Users size={18} className="text-[#64748B] group-hover:text-[#00C6F7] transition-colors" />
            Careers
          </Link>
        </nav>

        <div className="px-4 pb-8 pt-4 mt-auto">
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-[#CBD5E1] hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all mb-1 border-l-2 border-transparent">
            <Settings size={18} className="text-[#64748B]" />
            Settings
          </Link>
          <Link href="/login" className="flex items-center gap-3 px-4 py-2.5 text-[#CBD5E1] hover:text-[#ff4d4f] hover:bg-white/5 rounded-xl font-medium transition-all border-l-2 border-transparent">
            <LogOut size={18} className="text-[#64748B]" />
            Exit Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-8 lg:p-12 relative overflow-hidden">
        {/* Subtle background glow for premium feel */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0067D9]/5 rounded-full filter blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  )
}
