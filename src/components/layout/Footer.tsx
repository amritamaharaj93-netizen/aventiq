"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
const LinkedinIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const GithubIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const FacebookIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const YoutubeIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);
const InstagramIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const DEFAULT_FOOTER_SETTINGS = {
  footerLogoUrl: "/img/logo_transparent.png",
  footerDescription: "Apex is a modern software development company that helps businesses transform ideas into scalable digital products and technology solutions.",
  footerEmail: "apex34@gmail.com",
  footerPhone: "8239988743",
  footerLocation: "Kokar Ranchi",
  footerCopyrightText: `© ${new Date().getFullYear()} Apex. All rights reserved.`,
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
    { id: "3", platform: "Facebook", url: "https://facebook.com" },
    { id: "4", platform: "Instagram", url: "https://instagram.com" },
    { id: "5", platform: "YouTube", url: "https://youtube.com" }
  ]
}

export function Footer() {
  const SocialIcons: Record<string, any> = {
    LinkedIn: LinkedinIcon,
    GitHub: GithubIcon,
    Facebook: FacebookIcon,
    Instagram: InstagramIcon,
    YouTube: YoutubeIcon
  }

  const [footerData, setFooterData] = useState(DEFAULT_FOOTER_SETTINGS)

  useEffect(() => {
    const saved = localStorage.getItem("apex_admin_home")
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
                  alt="Apex Logo" 
                  width={400} 
                  height={133} 
                  className="h-20 md:h-28 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]"
               />
            </Link>
            <p className="text-[#CBD5E1] max-w-sm font-medium leading-relaxed">
              {footerData.footerDescription}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {footerData.footerSocialLinks.map((social: any) => {
                const Icon = SocialIcons[social.platform];
                return (
                  <a 
                    key={social.id}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#CBD5E1] hover:text-[#00C6F7] transition-colors p-2.5 rounded-lg border border-slate-800 bg-slate-900/50 flex items-center justify-center"
                    aria-label={social.platform}
                  >
                    {social.iconUrl ? (
                      <img src={social.iconUrl} alt={social.platform} className="w-5 h-5 object-contain" />
                    ) : Icon ? (
                      <Icon size={18} strokeWidth={2} />
                    ) : (
                      <span className="text-xs font-bold px-1">{social.platform}</span>
                    )}
                  </a>
                );
              })}
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
              <li><Link href="/services/web-development" className="hover:text-[#00C6F7] transition-colors font-medium">Corrugated Boxes</Link></li>
              <li><Link href="/services/saas-development" className="hover:text-[#00C6F7] transition-colors font-medium">Flexible Packaging</Link></li>
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
