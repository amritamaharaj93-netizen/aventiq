"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
        isScrolled ? "shadow-md border-b border-border/40" : "border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-2 relative z-50">
            {/* Fallback to text if logo image is missing, but assume user uploads logo */}
            <div className="relative flex items-center">
               <Image 
                  src="/img/aventiq-logo.jpeg" 
                  alt="Aventiq Logo" 
                  width={240} 
                  height={80} 
                  className="h-14 md:h-20 w-auto object-contain mix-blend-multiply brightness-[1.1] contrast-[1.1]"
                  priority
               />
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex flex-none items-center justify-center">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-base font-semibold transition-colors hover:text-[#0067D9]",
                      isActive ? "text-[#0067D9] font-bold" : "text-[#475569]"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="hidden md:block">
            <Button asChild variant="default" className="rounded-full px-6 bg-[#0067D9] hover:bg-[#00C6F7] hover:text-[#020B1C] transition-all">
              <Link href="/contact">Start a Project</Link>
            </Button>
          </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 text-[#020B1C]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 h-screen bg-white dark:bg-[#020B1C] pt-24 px-4 pb-8 flex flex-col md:hidden border-b border-border shadow-lg"
          >
            <nav className="flex flex-col gap-6 items-center text-center">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/")
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-xl font-medium transition-colors",
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <Button asChild variant="default" size="lg" className="mt-4 rounded-full w-full max-w-sm">
                <Link href="/contact">Start a Project</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
