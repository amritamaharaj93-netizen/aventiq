import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020B1C] text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00C6F7] rounded-full mix-blend-screen filter blur-[120px]"></div>
      </div>
      
      <div className="relative z-10 space-y-6">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0067D9] to-[#00C6F7]">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold">Page Not Found</h2>
        <p className="text-[#CBD5E1] max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved to another location in our system.
        </p>
        <div className="pt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 hover:bg-white/10 text-white hover:text-white">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
