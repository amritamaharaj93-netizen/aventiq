"use server"

import { z } from "zod"
import nodemailer from "nodemailer"

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

    // Setup nodemailer transporter using provided Gmail credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aventiq34@gmail.com",
        pass: "pzfs pmex nyuo foou",
      },
    })

    // Construct the email content
    const mailOptions = {
      from: "aventiq34@gmail.com", // Send from the authenticated account
      to: "aventiq34@gmail.com",   // Receive on the same account (as requested)
      replyTo: validatedData.email,
      subject: `New Project Inquiry from ${validatedData.name} - ${validatedData.projectType}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
        ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
        <p><strong>Project Type:</strong> ${validatedData.projectType}</p>
        ${validatedData.budget ? `<p><strong>Budget:</strong> ${validatedData.budget}</p>` : ''}
        ${validatedData.timeline ? `<p><strong>Timeline:</strong> ${validatedData.timeline}</p>` : ''}
        <h3>Message/Project Description:</h3>
        <p>${validatedData.description.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

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
    console.error("Email sending failed:", error)
    return {
      success: false,
      message: "Failed to send the email. Please verify the SMTP credentials or try again later.",
    }
  }
}

