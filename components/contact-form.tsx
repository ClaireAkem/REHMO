"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Send } from "lucide-react"

// ===== CONTACT FORM COMPONENT =====
export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ===== HANDLE FORM SUBMISSION =====
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const contactData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      timestamp: new Date().toISOString(),
    }

    try {
      // Simulate sending email to admin
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would send an email to admin@rehmo.com
      console.log("Contact form submitted:", contactData)

      toast({
        title: "Message Sent Successfully!",
        description: "We've received your message and will get back to you within 24 hours.",
      })

      // Reset form
      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: "There was an error sending your message. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-orange-500" />
          <CardTitle>Contact Us</CardTitle>
        </div>
        <CardDescription>Get in touch with our team for any questions or support</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ===== FULL NAME FIELD ===== */}
          <div className="space-y-2">
            <Label htmlFor="contact-fullName">Full Name *</Label>
            <Input id="contact-fullName" name="fullName" placeholder="Enter your full name" required />
          </div>

          {/* ===== EMAIL FIELD ===== */}
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email Address *</Label>
            <Input id="contact-email" name="email" type="email" placeholder="Enter your email address" required />
          </div>

          {/* ===== SUBJECT FIELD ===== */}
          <div className="space-y-2">
            <Label htmlFor="contact-subject">Subject *</Label>
            <Input id="contact-subject" name="subject" placeholder="What is this regarding?" required />
          </div>

          {/* ===== MESSAGE FIELD ===== */}
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message *</Label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder="Please provide details about your inquiry..."
              rows={6}
              required
            />
          </div>

          {/* ===== SUBMIT BUTTON ===== */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            disabled={isSubmitting}
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
