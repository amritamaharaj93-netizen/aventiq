import { 
  FolderKanban, 
  Users, 
  Eye, 
  Briefcase, 
  CheckCircle2, 
  TrendingUp,
  Activity
} from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { 
      label: "Active Projects", 
      value: "12", 
      trend: "+2.5%",
      icon: FolderKanban,
      color: "text-[#0067D9]",
      bg: "bg-[#0067D9]/10"
    },
    { 
      label: "New Leads", 
      value: "5", 
      trend: "+12.4%",
      icon: Users,
      color: "text-[#FF8A00]",
      bg: "bg-[#FF8A00]/10"
    },
    { 
      label: "Total Views", 
      value: "24.5k", 
      trend: "+18.2%",
      icon: Eye,
      color: "text-[#00C6F7]",
      bg: "bg-[#00C6F7]/10"
    },
    { 
      label: "Open Jobs", 
      value: "3", 
      trend: "Stable",
      icon: Briefcase,
      color: "text-[#062B63]",
      bg: "bg-[#062B63]/10"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#020B1C] tracking-tight mb-1">
          Dashboard Overview
        </h1>
        <p className="text-[#64748B] text-sm font-medium">
          Welcome back to the Aventiq control center. Here is your daily summary.
        </p>
      </div>
      
      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={stat.label} 
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle gradient accent on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <Icon size={24} className={stat.color} />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {stat.trend !== "Stable" && <TrendingUp size={12} />}
                  {stat.trend}
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-[#64748B] text-sm font-semibold tracking-wide uppercase mb-1">
                  {stat.label}
                </h3>
                <p className="text-4xl font-extrabold text-[#020B1C] tracking-tight">
                  {stat.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity Premium Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <Activity size={20} className="text-[#062B63]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#020B1C]">Recent Activity & Status</h2>
              <p className="text-[#64748B] text-sm">Real-time system diagnostics</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start gap-4 p-5 rounded-xl border border-emerald-100 bg-emerald-50/50">
            <div className="mt-1 relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
            </div>
            <div>
              <h4 className="text-emerald-900 font-semibold mb-1 flex items-center gap-2">
                All Systems Operational
                <CheckCircle2 size={16} className="text-emerald-500" />
              </h4>
              <p className="text-emerald-700/80 text-sm leading-relaxed">
                System is currently running optimally. All database connections are stable and API response times are within expected parameters.
              </p>
              <div className="mt-3 text-xs font-semibold text-emerald-600/70">
                Last checked: Just now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
