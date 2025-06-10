import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { Bell, Heart, Lightbulb, Star, TrendingUp, Users } from "lucide-react"

// ===== NOTIFICATIONS DATA =====
const notifications = [
  {
    id: 1,
    type: "update",
    title: "New Recipe Collection Added",
    description: "Discover 15 new Moroccan dessert recipes perfect for Ramadan celebrations.",
    time: "2 hours ago",
    icon: <Star className="h-5 w-5 text-yellow-500" />,
    isNew: true,
  },
  {
    id: 2,
    type: "update",
    title: "App Update Available",
    description: "Version 2.1 includes improved meal planning and new dietary filters.",
    time: "1 day ago",
    icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    isNew: true,
  },
  {
    id: 3,
    type: "update",
    title: "Community Milestone",
    description: "REHMO now has over 50,000 active users sharing African recipes!",
    time: "3 days ago",
    icon: <Users className="h-5 w-5 text-green-500" />,
    isNew: false,
  },
  {
    id: 4,
    type: "update",
    title: "Premium Features Enhanced",
    description: "New nutritional analysis and advanced meal customization options added.",
    time: "1 week ago",
    icon: <Heart className="h-5 w-5 text-red-500" />,
    isNew: false,
  },
  {
    id: 5,
    type: "update",
    title: "Recipe Contest Winners",
    description: "Congratulations to our monthly recipe contest winners! Check out their amazing creations.",
    time: "2 weeks ago",
    icon: <Star className="h-5 w-5 text-yellow-500" />,
    isNew: false,
  },
]

// ===== HEALTH TIPS DATA =====
const healthTips = [
  {
    id: 1,
    tip: "Start your day with warm lemon water and a pinch of ginger to boost digestion and immunity.",
    category: "Morning Routine",
  },
  {
    id: 2,
    tip: "Include colorful vegetables in every meal - the more colors, the more nutrients you're getting!",
    category: "Nutrition",
  },
  {
    id: 3,
    tip: "Traditional African grains like teff, fonio, and sorghum are excellent sources of protein and fiber.",
    category: "Ingredients",
  },
  {
    id: 4,
    tip: "Cooking with spices like turmeric, ginger, and garlic provides natural anti-inflammatory benefits.",
    category: "Cooking Tips",
  },
  {
    id: 5,
    tip: "Stay hydrated by drinking herbal teas made from African herbs like rooibos and honeybush.",
    category: "Hydration",
  },
]

// ===== NOTIFICATIONS PAGE =====
export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        {/* ===== HEADER SECTION ===== */}
        <div className="relative food-gradient">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative z-10 py-16 md:py-24">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Notifications</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Stay updated with the latest news, updates, and health tips from REHMO.
              </p>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ===== APP UPDATES AND ALERTS ===== */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Bell className="h-5 w-5 text-orange-500" />
                <h2 className="text-2xl font-bold">App Updates & Alerts</h2>
              </div>

              {notifications.map((notification) => (
                <Card key={notification.id} className="relative">
                  {notification.isNew && <Badge className="absolute top-4 right-4 bg-orange-500 text-white">New</Badge>}
                  <CardHeader className="pb-3">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">{notification.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{notification.time}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground">{notification.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ===== DAILY HEALTH TIPS ===== */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <h2 className="text-2xl font-bold">Daily Health Tips</h2>
              </div>

              {healthTips.map((tip) => (
                <Card
                  key={tip.id}
                  className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <Badge variant="outline" className="text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip.tip}</p>
                  </CardContent>
                </Card>
              ))}

              {/* ===== QUICK STATS ===== */}
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                <CardHeader>
                  <CardTitle className="text-lg">Your REHMO Journey</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Recipes Tried</span>
                    <span className="font-bold text-orange-500">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Favorites Saved</span>
                    <span className="font-bold text-orange-500">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Days Active</span>
                    <span className="font-bold text-orange-500">15</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
