"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Send } from "lucide-react"

// ===== FEEDBACK FORM COMPONENT =====
export function FeedbackForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ===== HANDLE FORM SUBMISSION =====
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const feedbackData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      timestamp: new Date().toISOString(),
    }

    try {
      // Simulate sending feedback to admin
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would send an email to admin
      console.log("Feedback submitted:", feedbackData)

      toast({
        title: "Feedback Sent Successfully!",
        description: "Thank you for your feedback. We'll review it and get back to you soon.",
      })

      // Reset form
      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: "Failed to Send Feedback",
        description: "There was an error sending your feedback. Please try again.",
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
          <MessageSquare className="h-5 w-5 text-orange-500" />
          <CardTitle>Send Us Your Feedback</CardTitle>
        </div>
        <CardDescription>Help us improve REHMO by sharing your thoughts and suggestions</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ===== NAME FIELD ===== */}
          <div className="space-y-2">
            <Label htmlFor="feedback-name">Name *</Label>
            <Input id="feedback-name" name="name" placeholder="Enter your full name" required />
          </div>

          {/* ===== EMAIL FIELD ===== */}
          <div className="space-y-2">
            <Label htmlFor="feedback-email">Email *</Label>
            <Input id="feedback-email" name="email" type="email" placeholder="Enter your email address" required />
          </div>

          {/* ===== MESSAGE FIELD ===== */}
          <div className="space-y-2">
            <Label htmlFor="feedback-message">Feedback Message *</Label>
            <Textarea
              id="feedback-message"
              name="message"
              placeholder="Share your thoughts, suggestions, or report any issues..."
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
            {isSubmitting ? "Sending..." : "Send Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
