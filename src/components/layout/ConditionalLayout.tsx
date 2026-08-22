"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export function ConditionalHeader() {
  const pathname = usePathname()
  const isHidden = pathname?.startsWith("/admin") || pathname === "/login"

  if (isHidden) return null
  return <Navbar />
}

export function ConditionalFooter() {
  const pathname = usePathname()
  const isHidden = pathname?.startsWith("/admin") || pathname === "/login"

  if (isHidden) return null
  return <Footer />
}
