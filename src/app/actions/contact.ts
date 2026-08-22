"use server"

import { z } from "zod"
// In a real scenario, you'd import Prisma Client here and save it to the DB
// import prisma from "@/lib/prisma"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(10, "Please provide more details about your project"),
})

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      description: formData.get("description"),
    }

    const validatedData = contactSchema.parse(data)

    // Simulate DB operation
    // await prisma.contactLead.create({ data: validatedData })
    
    // Simulate artificial delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      success: true,
      message: "Thank you for contacting Aventiq. We have received your project inquiry and will be in touch shortly.",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
