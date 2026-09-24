"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

const DEFAULT_FOOTER_SETTINGS = {
  footerLogoUrl: "/img/logo_transparent.png",
  footerDescription: "Aventiq is a modern software development company that helps businesses transform ideas into scalable digital products and technology solutions.",
  footerEmail: "aventiq34@gmail.com",
  footerPhone: "8239988743",
  footerLocation: "Kokar Ranchi",
  footerCopyrightText: `© ${new Date().getFullYear()} Aventiq. All rights reserved.`,
  footerCompanyLinks: [
    { id: "1", name: "About", href: "/about" },
    { id: "2", name: "Projects", href: "/projects" },
    { id: "3", name: "Careers", href: "/careers" },
    { id: "4", name: "Contact", href: "/contact" },
    { id: "5", name: "Blog", href: "/blog" },
    { id: "6", name: "FAQ", href: "/faq" }
  ],
  footerSocialLinks: [
    { id: "1", platform: "LinkedIn", url: "https://linkedin.com" },
    { id: "2", platform: "GitHub", url: "https://github.com" },
    { id: "3", platform: "Twitter", url: "https://twitter.com" },
    { id: "4", platform: "Instagram", url: "https://instagram.com" }
  ]
}

export function Footer() {
  const [footerData, setFooterData] = useState(DEFAULT_FOOTER_SETTINGS)

  useEffect(() => {
    const saved = localStorage.getItem("aventiq_admin_home")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object") {
          setFooterData({
            ...DEFAULT_FOOTER_SETTINGS,
            ...parsed,
            footerCompanyLinks: Array.isArray(parsed.footerCompanyLinks) && parsed.footerCompanyLinks.length > 0 ? parsed.footerCompanyLinks : DEFAULT_FOOTER_SETTINGS.footerCompanyLinks,
            footerSocialLinks: Array.isArray(parsed.footerSocialLinks) && parsed.footerSocialLinks.length > 0 ? parsed.footerSocialLinks : DEFAULT_FOOTER_SETTINGS.footerSocialLinks,
          })
        }
      } catch (e) {
        console.error("Failed to load footer settings")
      }
    }
  }, [])

  return (
    <footer className="bg-[#020B1C] text-white border-t border-[#062B63]">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block relative mb-2">
               <Image 
                  src={footerData.footerLogoUrl || "/img/logo_transparent.png"} 
                  alt="Aventiq Logo" 
                  width={400} 
                  height={133} 
                  className="h-20 md:h-28 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]"
               />
            </Link>
            <p className="text-[#CBD5E1] max-w-sm font-medium leading-relaxed">
              {footerData.footerDescription}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {footerData.footerSocialLinks.map((social) => (
                <a 
                  key={social.id}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#CBD5E1] hover:text-[#00C6F7] transition-colors text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-sm text-[#CBD5E1]">
              {footerData.footerCompanyLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="hover:text-[#00C6F7] transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-4 text-sm text-[#CBD5E1]">
              <li><Link href="/services/web-development" className="hover:text-[#00C6F7] transition-colors font-medium">Web Development</Link></li>
              <li><Link href="/services/saas-development" className="hover:text-[#00C6F7] transition-colors font-medium">SaaS Development</Link></li>
              <li><Link href="/services/ui-ux-design" className="hover:text-[#00C6F7] transition-colors font-medium">UI/UX Design</Link></li>
              <li><Link href="/services/ai-development" className="hover:text-[#00C6F7] transition-colors font-medium">AI Development</Link></li>
              <li><Link href="/services/cloud-devops" className="hover:text-[#00C6F7] transition-colors font-medium">Cloud & DevOps</Link></li>
              <li><Link href="/services/digital-marketing" className="hover:text-[#00C6F7] transition-colors font-medium">Digital Marketing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-[#CBD5E1]">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00C6F7] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${footerData.footerEmail}`} className="hover:text-[#00C6F7] transition-colors font-medium">{footerData.footerEmail}</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00C6F7] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${footerData.footerPhone}`} className="hover:text-[#00C6F7] transition-colors font-medium">{footerData.footerPhone}</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00C6F7] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(footerData.footerLocation)}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#00C6F7] transition-colors font-medium">{footerData.footerLocation}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#062B63] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#CBD5E1]">
          <p>{footerData.footerCopyrightText}</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
