"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChevronLeft, ChevronRight, Star, Users, BookOpen, Heart } from "lucide-react"

// ===== CAROUSEL DATA =====
const carouselSlides = [
  {
    id: 1,
    title: "About REHMO",
    content:
      "REHMO is your gateway to authentic African cuisine. We celebrate the rich culinary heritage of Africa by bringing together traditional recipes, modern cooking techniques, and a vibrant community of food lovers.",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Heart className="h-8 w-8 text-orange-500" />,
  },
  {
    id: 2,
    title: "Our Services",
    content:
      "We offer comprehensive meal planning, thousands of authentic African recipes, nutritional guidance, and a supportive community platform where food enthusiasts can share their culinary adventures.",
    image: "/placeholder.svg?height=400&width=600",
    icon: <BookOpen className="h-8 w-8 text-orange-500" />,
  },
  {
    id: 3,
    title: "Benefits of REHMO",
    content:
      "Discover new flavors, maintain a healthy lifestyle with traditional African ingredients, connect with your cultural roots, and enjoy the convenience of personalized meal planning tailored to your preferences.",
    image: "/placeholder.svg?height=400&width=600",
    icon: <Users className="h-8 w-8 text-orange-500" />,
  },
]

// ===== TESTIMONIALS DATA =====
const testimonials = [
  {
    id: 1,
    name: "Adaora Nwankwo",
    role: "Food Blogger",
    content:
      "REHMO has helped me reconnect with my Nigerian roots through food. The recipes are authentic and the meal planning feature is incredibly helpful for my busy lifestyle.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: 2,
    name: "Kofi Mensah",
    role: "Home Chef",
    content:
      "As a Ghanaian living abroad, REHMO brings the taste of home to my kitchen. The step-by-step instructions make even complex dishes accessible.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: 3,
    name: "Amina Hassan",
    role: "Nutritionist",
    content:
      "I love how REHMO showcases the nutritional benefits of African ingredients. It's helping my clients embrace healthier eating habits with familiar flavors.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: 4,
    name: "Thabo Mthembu",
    role: "Restaurant Owner",
    content:
      "REHMO is an incredible resource for authentic African recipes. It's helped me expand my restaurant's menu with traditional dishes from across the continent.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
]

// ===== ABOUT PAGE =====
export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1))
  }

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ===== HEADER SECTION ===== */}
      <div className="relative food-gradient">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative z-10 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">About REHMO</h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Celebrating African cuisine and bringing authentic flavors to kitchens around the world.
            </p>
          </div>
        </div>
      </div>

      {/* ===== CAROUSEL SECTION ===== */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-muted/50 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-muted">
                <Button variant="ghost" size="icon" onClick={prevSlide}>
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous slide</span>
                </Button>

                <div className="flex space-x-2">
                  {carouselSlides.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-orange-500" : "bg-muted-foreground/30"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>

                <Button variant="ghost" size="icon" onClick={nextSlide}>
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next slide</span>
                </Button>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      {carouselSlides[currentSlide].icon}
                      <h2 className="text-3xl font-bold">{carouselSlides[currentSlide].title}</h2>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {carouselSlides[currentSlide].content}
                    </p>
                  </div>
                  <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={carouselSlides[currentSlide].image || "/placeholder.svg"}
                      alt={carouselSlides[currentSlide].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-muted-foreground max-w-2xl">
              Hear from food lovers who have discovered the joy of African cuisine through REHMO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-background">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-orange-500">1000+</h3>
              <p className="text-muted-foreground">Authentic Recipes</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-orange-500">50K+</h3>
              <p className="text-muted-foreground">Happy Users</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-orange-500">54</h3>
              <p className="text-muted-foreground">African Countries</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
