import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

// ===== CONTACT PAGE =====
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ===== HEADER SECTION ===== */}
      <div className="relative food-gradient">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative z-10 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Contact Us</h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Have questions or need support? We're here to help you on your African culinary journey.
            </p>
          </div>
        </div>
      </div>

      {/* ===== CONTACT CONTENT ===== */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ===== CONTACT FORM ===== */}
          <div>
            <ContactForm />
          </div>

          {/* ===== CONTACT INFORMATION ===== */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>We'd love to hear from you. Here's how you can reach us.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ===== EMAIL ===== */}
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">support@rehmo.com</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* ===== PHONE ===== */}
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                {/* ===== ADDRESS ===== */}
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">123 Culinary Street</p>
                    <p className="text-muted-foreground">Food City, FC 12345</p>
                  </div>
                </div>

                {/* ===== BUSINESS HOURS ===== */}
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ===== FAQ SECTION ===== */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">How do I submit my own recipe?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sign in to your account and visit the Recipes page. You'll find a recipe submission form where you
                    can share your African dishes.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">What's included in Premium?</h4>
                  <p className="text-sm text-muted-foreground">
                    Premium includes access to exclusive recipes, full 30-day meal plans, nutritional information, and
                    cooking videos.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Can I cancel my subscription?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can cancel your subscription at any time from your account settings. You'll continue to
                    have access until the end of your billing period.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
