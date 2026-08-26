"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to admin (simulated via standard window location for demo)
      window.location.href = "/admin"
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#020B1C] flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Premium Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#00C6F7] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#0067D9] rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Glassmorphic Login Card */}
          <div className="bg-[#031A3D]/60 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
            {/* Logo Inside Card */}
            <div className="flex justify-center mb-8">
              <Link href="/">
                 <Image 
                    src="/img/logo_transparent.png" 
                    alt="Aventiq Logo" 
                    width={240} 
                    height={80} 
                    className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]"
                    priority
                 />
              </Link>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h1>
              <p className="text-[#94A3B8] text-sm">Enter your credentials to access the admin portal.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#CBD5E1] pl-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B]">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 pl-11 pr-4 bg-[#020B1C]/50 border border-white/10 rounded-xl text-white placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00C6F7] focus:border-transparent transition-all"
                    placeholder="admin@aventiq.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center pl-1 pr-1">
                  <label className="text-sm font-medium text-[#CBD5E1]">Password</label>
                  <Link href="#" className="text-xs text-[#00C6F7] hover:text-white transition-colors">Forgot password?</Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B]">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-14 pl-11 pr-12 bg-[#020B1C]/50 border border-white/10 rounded-xl text-white placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00C6F7] focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#64748B] hover:text-[#00C6F7] transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-[#0067D9] to-[#00C6F7] hover:from-[#00C6F7] hover:to-[#0067D9] text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(0,198,247,0.3)] hover:shadow-[0_0_30px_rgba(0,198,247,0.5)] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Sign In <ArrowRight size={20} />
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-[#64748B] text-sm">
              Secure access restricted to authorized personnel only.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
