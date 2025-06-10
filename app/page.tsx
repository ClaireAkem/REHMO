import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { BannerAd } from "@/components/ads/banner-ad"
import { SidebarAd } from "@/components/ads/sidebar-ad"
import { InlineAd } from "@/components/ads/inline-ad"
import { PopupAd } from "@/components/ads/popup-ad"
import { AdFreePromotion } from "@/components/ads/ad-free-promotion"
import { Clock, FlameIcon as Fire, Heart, Leaf, Star } from "lucide-react"

// ===== LANDING PAGE COMPONENT =====
export default function LandingPage() {
  return (
    <ProtectedRoute allowBrowsing={true}>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          {/* ===== HERO SECTION ===== */}
          <section className="relative overflow-hidden">
            <div className="bg-[url('/suya.jpg')] bg-cover bg-center h-screen">
            <div className="container relative z-10 py-24 md:py-32 lg:py-40">
              <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  New Recipes Every Week
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  Discover Authentic African Recipes
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                  Explore thousands of traditional and modern African recipes, create personalized meal plans, and
                  connect with a community of food lovers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-white text-orange-500 hover:bg-white/90">
                    <Link href="/recipes">Explore Recipes</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link href="/meal-plan">View Meal Plans</Link>
                  </Button>
                </div>
              </div>
            </div>
            </div>
            {/* <div className="absolute inset-0 african-pattern" /> */}
            {/* <div className="absolute inset-0 food-gradient opacity-90" /> */}
            
          </section>

          {/* ===== BANNER AD AFTER HERO ===== */}
          {/* <section className="py-4 bg-background">
            <div className="container">
              <BannerAd />
            </div>
          </section> */}

          {/* ===== HEALTHY MEALS SECTION ===== */}
          <section className="py-16 bg-background">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-5">
                  <div className="flex flex-col items-center text-center mb-12">
                    <div className="flex items-center gap-2 mb-4">
                      <Leaf className="h-5 w-5 text-green-500" />
                      <h2 className="text-3xl font-bold">Healthy African Meals</h2>
                    </div>
                    <p className="text-muted-foreground max-w-2xl">
                      Nutritious and delicious African recipes that will help you maintain a balanced diet without
                      sacrificing authentic flavors.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Healthy Meal Card 1 */}
                    <Card className="overflow-hidden">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Ethiopian Injera with Vegetables"
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500 text-white">
                            <Leaf className="h-3 w-3 mr-1" />
                            Vegan
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Ethiopian Injera with Vegetables</CardTitle>
                        <CardDescription>Traditional sourdough flatbread with colorful vegetable stews</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>45 mins</span>
                          </div>
                          <div className="flex items-center">
                            <Fire className="h-4 w-4 mr-1 text-orange-500" />
                            <span>320 cal</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            <span>4.8</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Inline Ad between cards */}
                    {/* <div className="md:col-span-2 lg:col-span-3">
                      <InlineAd />
                    </div> */}

                    {/* Healthy Meal Card 2 */}
                    <Card className="overflow-hidden">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Moroccan Vegetable Tagine"
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500 text-white">
                            <Leaf className="h-3 w-3 mr-1" />
                            Vegetarian
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Moroccan Vegetable Tagine</CardTitle>
                        <CardDescription>Aromatic slow-cooked vegetables with North African spices</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>60 mins</span>
                          </div>
                          <div className="flex items-center">
                            <Fire className="h-4 w-4 mr-1 text-orange-500" />
                            <span>280 cal</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            <span>4.7</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Healthy Meal Card 3 */}
                    <Card className="overflow-hidden">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Nigerian Pepper Soup"
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500 text-white">
                            <Leaf className="h-3 w-3 mr-1" />
                            Low Carb
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Nigerian Pepper Soup</CardTitle>
                        <CardDescription>Spicy and warming soup with traditional African spices</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>30 mins</span>
                          </div>
                          <div className="flex items-center">
                            <Fire className="h-4 w-4 mr-1 text-orange-500" />
                            <span>180 cal</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            <span>4.9</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center mt-10">
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/recipes">View All Healthy Recipes</Link>
                    </Button>
                  </div>
                </div>

                {/* Sidebar with Ads */}
                {/* <div className="lg:col-span-1 space-y-6">
                  <SidebarAd />
                  <AdFreePromotion />
                  <SidebarAd />
                </div> */}
              </div>
            </div>
          </section>

          {/* ===== TRENDING AFRICAN DISHES SECTION ===== */}
          <section className="py-16 bg-orange-50 dark:bg-orange-950/20">
            <div className="container">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <Fire className="h-5 w-5 text-orange-500" />
                  <h2 className="text-3xl font-bold">Trending African Dishes</h2>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  Discover the most popular African recipes loved by our community from across the continent.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Featured Dish 1 */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative h-64 w-full md:w-1/2 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Jollof Rice"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <Badge className="mb-2 bg-orange-500 text-white">West African</Badge>
                    <h3 className="text-2xl font-bold mb-2">Nigerian Jollof Rice</h3>
                    <p className="text-muted-foreground mb-4">
                      The crown jewel of West African cuisine - a flavorful one-pot rice dish that brings families
                      together.
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">45 mins</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span className="text-sm">4.9 (428)</span>
                      </div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                      <Link href="/recipes">View Recipe</Link>
                    </Button>
                  </div>
                </div>

                {/* Featured Dish 2 */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative h-64 w-full md:w-1/2 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Ethiopian Doro Wat"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <Badge className="mb-2 bg-orange-500 text-white">East African</Badge>
                    <h3 className="text-2xl font-bold mb-2">Ethiopian Doro Wat</h3>
                    <p className="text-muted-foreground mb-4">
                      Ethiopia's national dish - a rich, spicy chicken stew that's perfect for special occasions.
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">2 hrs</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span className="text-sm">4.8 (356)</span>
                      </div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                      <Link href="/recipes">View Recipe</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Inline Ad in trending section */}
              {/* <div className="mt-8">
                <InlineAd />
              </div> */}

              <div className="flex justify-center mt-10">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/recipes">Explore All African Recipes</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* ===== TESTIMONIALS SECTION ===== */}
          <section className="py-16 bg-background">
            <div className="container">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5 text-red-500" />
                  <h2 className="text-3xl font-bold">What Our Community Says</h2>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  Join thousands of home cooks who have discovered the joy of African cuisine with REHMO.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Testimonial 1 */}
                <Card className="bg-background border">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Amara Okafor" />
                        <AvatarFallback>AO</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">Amara Okafor</CardTitle>
                        <CardDescription>Food Blogger</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      "REHMO has reconnected me with my grandmother's recipes. The authentic flavors and detailed
                      instructions make it easy to recreate traditional dishes."
                    </p>
                  </CardContent>
                </Card>

                {/* Testimonial 2 */}
                <Card className="bg-background border">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Kwame Asante" />
                        <AvatarFallback>KA</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">Kwame Asante</CardTitle>
                        <CardDescription>Home Cook</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      "The meal planning feature is incredible! I can plan authentic African meals for the whole week
                      and my family loves the variety."
                    </p>
                  </CardContent>
                </Card>

                {/* Testimonial 3 */}
                <Card className="bg-background border">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Fatima Al-Rashid" />
                        <AvatarFallback>FA</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">Fatima Al-Rashid</CardTitle>
                        <CardDescription>Nutrition Coach</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      "I love how REHMO showcases the nutritional benefits of African ingredients. It's helping my
                      clients embrace healthier eating habits."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* ===== CTA SECTION ===== */}
          <section className="py-16 food-gradient">
            <div className="container">
              <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Start Your Culinary Journey?</h2>
                <p className="text-lg text-white/90 max-w-2xl">
                  Join REHMO today and discover the rich flavors of African cuisine with personalized meal plans and
                  authentic recipes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-white text-orange-500 hover:bg-white/90" asChild>
                    <Link href="/auth">Get Started Free</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Popup Ad */}
        <PopupAd />
      </div>
    </ProtectedRoute>
  )
}
