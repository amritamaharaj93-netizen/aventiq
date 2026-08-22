"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const JOBS = [
  {
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time"
  },
  {
    title: "Product Designer (UI/UX)",
    department: "Design",
    location: "Remote (Global)",
    type: "Full-time"
  },
  {
    title: "Machine Learning Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time"
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#102A43] mb-6">Build the Future with Aventiq</h1>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto">
            We are always looking for passionate engineers, designers, and problem solvers to join our remote-first team.
          </p>
        </motion.div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#102A43] mb-8">Open Positions</h2>
          {JOBS.map((job, index) => (
            <motion.div 
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F8FAFC] border border-border p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="text-xl font-bold text-[#062B63] mb-2">{job.title}</h3>
                <div className="flex gap-4 text-sm text-[#475569]">
                  <span>{job.department}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <Button>Apply Now</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
