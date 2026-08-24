import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  breadcrumbs: Breadcrumb[]
  bgImage?: string
}

export function PageHeader({ 
  title, 
  breadcrumbs, 
  bgImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" 
}: PageHeaderProps) {
  return (
    <div className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-[#0B1221]/70 backdrop-blur-[1px]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">{title}</h1>
        
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium">
          <Link href="/" className="text-white/70 hover:text-[#00C6F7] transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-white/40" />
              {crumb.href ? (
                <Link href={crumb.href} className="text-white/70 hover:text-[#00C6F7] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#00C6F7]">{crumb.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
