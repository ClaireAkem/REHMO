"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { BannerAd } from "@/components/ads/banner-ad"
import { SidebarAd } from "@/components/ads/sidebar-ad"
import { InlineAd } from "@/components/ads/inline-ad"
import { AdFreePromotion } from "@/components/ads/ad-free-promotion"
import { useAuth } from "@/components/auth-provider"
import { Calendar, ChevronLeft, ChevronRight, Lock } from "lucide-react"

// ===== MEAL PLAN DATA =====
const generateMealPlan = () => {
  const meals = []
  const mealTypes = ["breakfast", "lunch", "supper"]
  const sampleMeals = [
    "Nigerian Jollof Rice",
    "Ethiopian Injera",
    "Moroccan Tagine",
    "South African Bobotie",
    "Kenyan Ugali",
    "Ghanaian Banku",
    "Tunisian Couscous",
    "Senegalese Thieboudienne",
    "Cameroonian Ndole",
    "Zimbabwean Sadza",
    "Libyan Shorba",
    "Malian Tiguadege Na",
  ]

  for (let day = 1; day <= 30; day++) {
    const dayMeals = {}
    mealTypes.forEach((type, index) => {
      const mealIndex = (day - 1) * 3 + index
      dayMeals[type] = {
        id: `${type}-${day}`,
        name: sampleMeals[mealIndex % sampleMeals.length],
        description: `Delicious ${type} featuring authentic African flavors and ingredients.`,
      }
    })
    meals.push(dayMeals)
  }
  return meals
}

const mealPlanData = generateMealPlan()

// ===== MEAL PLAN PAGE =====
export default function MealPlanPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [currentWeek, setCurrentWeek] = useState(1)

  // Calculate the range of days to display based on current week
  const startDay = (currentWeek - 1) * 7 + 1
  const endDay = Math.min(startDay + 6, 30)

  // Check if a day is premium (days 6-30)
  const isPremiumDay = (day: number) => day > 5

  // Handle clicking on a meal
  const handleMealClick = (day: number, meal: any) => {
    if (isPremiumDay(day) && (!user || !user.isPremium)) {
      router.push("/premium")
    } else {
      // Navigate to recipe detail page
      router.push(`/recipes/${meal.id}`)
    }
  }

  // Navigate to previous week
  const prevWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1)
    }
  }

  // Navigate to next week
  const nextWeek = () => {
    if (currentWeek < 5) {
      setCurrentWeek(currentWeek + 1)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        {/* ===== HEADER SECTION ===== */}
        <div className="relative food-gradient">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative z-10 py-16 md:py-20">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">30-Day Meal Plan</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                A complete month of delicious African-inspired meals to keep your diet varied and exciting.
              </p>
            </div>
          </div>
        </div>

        {/* ===== BANNER AD ===== */}
        <div className="container py-4">
          <BannerAd />
        </div>

        {/* ===== MEAL PLAN CONTENT ===== */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* ===== MEAL PLAN NAVIGATION ===== */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <h2 className="text-2xl font-bold">Week {currentWeek} of 5</h2>
                  <Badge variant={currentWeek === 1 ? "default" : "outline"} className="ml-2">
                    Days {startDay}-{endDay}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={prevWeek} disabled={currentWeek === 1}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous week</span>
                  </Button>

                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((week) => (
                      <Button
                        key={week}
                        variant={currentWeek === week ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentWeek(week)}
                      >
                        {week}
                      </Button>
                    ))}
                  </div>

                  <Button variant="outline" size="icon" onClick={nextWeek} disabled={currentWeek === 5}>
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next week</span>
                  </Button>
                </div>
              </div>

              {/* ===== FREE VS PREMIUM INDICATOR ===== */}
              {currentWeek === 1 ? (
                <div className="flex items-center justify-center mb-8 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    Days 1-5 are available for all users
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center mb-8 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  <Lock className="h-4 w-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                    Premium access required for days 6-30
                  </span>
                </div>
              )}

              {/* ===== MEAL PLAN GRID ===== */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: endDay - startDay + 1 }).map((_, index) => {
                  const day = startDay + index
                  const dayData = mealPlanData[day - 1]
                  const isPremium = isPremiumDay(day)

                  return (
                    <Card
                      key={day}
                      className={`overflow-hidden ${isPremium ? "border-yellow-300 dark:border-yellow-700" : ""}`}
                    >
                      <CardHeader
                        className={`pb-2 ${
                          isPremium ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-green-50 dark:bg-green-900/20"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <CardTitle>Day {day}</CardTitle>
                          {isPremium && (
                            <Badge className="bg-yellow-500 text-white">
                              <Lock className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                        <CardDescription>
                          {new Date(2024, 0, day).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-4">
                        {/* ===== BREAKFAST ===== */}
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Breakfast</h3>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-normal text-left justify-start text-foreground hover:text-orange-500"
                            onClick={() => handleMealClick(day, dayData.breakfast)}
                          >
                            {dayData.breakfast.name}
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {dayData.breakfast.description}
                          </p>
                        </div>

                        {/* ===== LUNCH ===== */}
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Lunch</h3>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-normal text-left justify-start text-foreground hover:text-orange-500"
                            onClick={() => handleMealClick(day, dayData.lunch)}
                          >
                            {dayData.lunch.name}
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{dayData.lunch.description}</p>
                        </div>

                        {/* ===== SUPPER ===== */}
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Supper</h3>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-normal text-left justify-start text-foreground hover:text-orange-500"
                            onClick={() => handleMealClick(day, dayData.supper)}
                          >
                            {dayData.supper.name}
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {dayData.supper.description}
                          </p>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-2 pb-4 flex justify-center">
                        {isPremium && (!user || !user.isPremium) ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => router.push("/premium")}
                          >
                            <Lock className="h-3 w-3 mr-1" />
                            Unlock Premium
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            View All Recipes
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>

              {/* ===== INLINE AD AFTER MEAL CARDS ===== */}
              <div className="mt-8">
                <InlineAd />
              </div>

              {/* ===== PREMIUM PROMOTION ===== */}
              {currentWeek > 1 && (
                <div className="mt-12 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-bold mb-4">Unlock the Full 30-Day Meal Plan</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Get access to all 30 days of our carefully crafted meal plans, including exclusive premium recipes
                    and nutritional information.
                  </p>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => router.push("/premium")}
                  >
                    Go Premium Now
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar with Ads */}
            <div className="lg:col-span-1 space-y-6">
              <SidebarAd />
              <AdFreePromotion />
              <SidebarAd />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
