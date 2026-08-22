import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#020B1C] text-white border-t border-[#062B63]">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block relative">
               <Image 
                  src="/img/aventiq-logo.jpeg" 
                  alt="Aventiq Logo" 
                  width={240} 
                  height={80} 
                  className="h-14 md:h-16 w-auto object-contain bg-white p-2 rounded-xl"
               />
            </Link>
            <p className="text-[#CBD5E1] max-w-sm">
              Aventiq is a modern software development company that helps businesses transform ideas into scalable digital products and technology solutions.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#CBD5E1] hover:text-[#00C6F7] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#CBD5E1] hover:text-[#00C6F7] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#CBD5E1] hover:text-[#00C6F7] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                <span className="sr-only">X/Twitter</span>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#CBD5E1] hover:text-[#00C6F7] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-sm text-[#CBD5E1]">
              <li><Link href="/about" className="hover:text-[#00C6F7] transition-colors">About</Link></li>
              <li><Link href="/projects" className="hover:text-[#00C6F7] transition-colors">Projects</Link></li>
              <li><Link href="/technologies" className="hover:text-[#00C6F7] transition-colors">Technologies</Link></li>
              <li><Link href="/careers" className="hover:text-[#00C6F7] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-[#00C6F7] transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-[#00C6F7] transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-[#00C6F7] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-4 text-sm text-[#CBD5E1]">
              <li><Link href="/services/web-development" className="hover:text-[#00C6F7] transition-colors">Web Development</Link></li>
              <li><Link href="/services/saas-development" className="hover:text-[#00C6F7] transition-colors">SaaS Development</Link></li>
              <li><Link href="/services/ui-ux-design" className="hover:text-[#00C6F7] transition-colors">UI/UX Design</Link></li>
              <li><Link href="/services/ai-development" className="hover:text-[#00C6F7] transition-colors">AI Development</Link></li>
              <li><Link href="/services/cloud-devops" className="hover:text-[#00C6F7] transition-colors">Cloud & DevOps</Link></li>
              <li><Link href="/services/digital-marketing" className="hover:text-[#00C6F7] transition-colors">Digital Marketing</Link></li>
              <li><Link href="/services/seo" className="hover:text-[#00C6F7] transition-colors">SEO</Link></li>
              <li><Link href="/services/meta-ads" className="hover:text-[#00C6F7] transition-colors">Meta Ads</Link></li>
              <li><Link href="/services/google-ads" className="hover:text-[#00C6F7] transition-colors">Google Ads</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-[#CBD5E1]">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00C6F7] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@aventiq.com</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00C6F7] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00C6F7] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Innovation Drive<br/>Tech City, TC 90210</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#062B63] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#CBD5E1]">
          <p>© {new Date().getFullYear()} Aventiq. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
