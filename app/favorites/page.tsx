"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { BannerAd } from "@/components/ads/banner-ad"
import { SidebarAd } from "@/components/ads/sidebar-ad"
import { InlineAd } from "@/components/ads/inline-ad"
import { AdFreePromotion } from "@/components/ads/ad-free-promotion"
import { useAuth } from "@/components/auth-provider"
import { useFavorites } from "@/components/favorites-manager"
import { useToast } from "@/hooks/use-toast"
import { ChevronDown, Clock, Lock, Star, Heart, Share2, User, HeartOff } from "lucide-react"

// ===== RECIPE DATA (same as recipes page) =====
const generateRecipes = (category: string, count: number) => {
  const recipes = []
  const premiumIndices = new Set()

  // Randomly select 3 indices for premium recipes
  while (premiumIndices.size < 3) {
    premiumIndices.add(Math.floor(Math.random() * count))
  }

  for (let i = 0; i < count; i++) {
    recipes.push({
      id: `${category}-${i + 1}`,
      name: `${category} Recipe ${i + 1}`,
      description: `A delicious ${category.toLowerCase()} African dish with authentic flavors and traditional cooking methods.`,
      image: `/placeholder.svg?height=400&width=600`,
      region: ["West Africa", "East Africa", "North Africa", "Southern Africa"][i % 4],
      isPremium: premiumIndices.has(i),
      prepTime: `${20 + ((i * 5) % 60)} mins`,
      difficulty: ["Easy", "Medium", "Hard"][i % 3],
      rating: (4.0 + Math.random()).toFixed(1),
      isUserSubmitted: false,
    })
  }

  return recipes
}

const vegetarianRecipes = generateRecipes("Vegetarian", 12)
const nonVegetarianRecipes = generateRecipes("Non-Vegetarian", 12)
const otherRecipes = generateRecipes("Other", 12)

// ===== RECIPE CARD COMPONENT =====
function RecipeCard({ recipe }: { recipe: any }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [isExpanded, setIsExpanded] = useState(false)

  // ===== HANDLE SHARE RECIPE =====
  const handleShareRecipe = async () => {
    const recipeUrl = `${window.location.origin}/recipes/${recipe.id}`

    try {
      await navigator.clipboard.writeText(recipeUrl)
      toast({
        title: "Recipe Link Copied!",
        description: "The recipe URL has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Failed to Copy",
        description: "Unable to copy the recipe link. Please try again.",
        variant: "destructive",
      })
    }
  }

  // ===== HANDLE FAVORITE TOGGLE =====
  const handleFavoriteToggle = () => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id)
    } else {
      addToFavorites(recipe.id)
    }
  }

  const handlePremiumClick = () => {
    if (recipe.isPremium && (!user || !user.isPremium)) {
      router.push("/premium")
    } else {
      // Navigate to recipe detail page
      router.push(`/recipes/${recipe.id}`)
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {/* Recipe Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {recipe.isPremium && (
            <Badge className="bg-yellow-500 text-white">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
          {recipe.isUserSubmitted && (
            <Badge className="bg-blue-500 text-white">
              <User className="h-3 w-3 mr-1" />
              User-Submitted
            </Badge>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-bold">{recipe.name}</h3>
          <p className="text-white/80 text-sm">{recipe.region}</p>
        </div>
      </div>

      {/* Recipe Content */}
      <CardContent className="pt-4 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">{recipe.description}</p>

        {isExpanded && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{recipe.prepTime}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                <span>{recipe.rating}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Difficulty: {recipe.difficulty}</p>
          </div>
        )}
      </CardContent>

      {/* Recipe Actions */}
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-xs">
            {isExpanded ? "Show Less" : "Show More"}
          </Button>

          {/* ===== FAVORITE BUTTON ===== */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleFavoriteToggle}
            className={`text-xs ${isFavorite(recipe.id) ? "text-red-500 border-red-500" : ""}`}
          >
            <Heart className={`h-3 w-3 ${isFavorite(recipe.id) ? "fill-current" : ""}`} />
          </Button>

          {/* ===== SHARE BUTTON ===== */}
          <Button variant="outline" size="sm" onClick={handleShareRecipe} className="text-xs">
            <Share2 className="h-3 w-3" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" className="text-xs">
              View More <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {recipe.isPremium && (!user || !user.isPremium) ? (
              <>
                <DropdownMenuItem onClick={handlePremiumClick}>
                  <Lock className="mr-2 h-4 w-4" />
                  View Full Recipe
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePremiumClick}>
                  <Lock className="mr-2 h-4 w-4" />
                  View Ingredients
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={handlePremiumClick}>View Full Recipe</DropdownMenuItem>
                <DropdownMenuItem onClick={handlePremiumClick}>View Ingredients</DropdownMenuItem>
                <DropdownMenuItem onClick={handlePremiumClick}>View Instructions</DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem onClick={handleShareRecipe}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Recipe
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}

// ===== FAVORITES PAGE =====
export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const router = useRouter()

  // Get favorite recipes
  const favoriteRecipes = [...vegetarianRecipes, ...nonVegetarianRecipes, ...otherRecipes].filter((recipe) =>
    favorites.includes(recipe.id),
  )

  // Function to insert ads between recipe cards
  const insertAdsInRecipes = (recipes: any[]) => {
    const recipesWithAds = []
    recipes.forEach((recipe, index) => {
      recipesWithAds.push(recipe)
      // Insert ad after every 6 recipes
      if ((index + 1) % 6 === 0 && index < recipes.length - 1) {
        recipesWithAds.push({ isAd: true, id: `ad-${index}` })
      }
    })
    return recipesWithAds
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        {/* ===== HEADER SECTION ===== */}
        <div className="relative food-gradient">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative z-10 py-16 md:py-24">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">My Favorite Recipes</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Your personal collection of saved African recipes that you love the most.
              </p>
            </div>
          </div>
        </div>

        {/* ===== BANNER AD ===== */}
        <div className="container py-4">
          <BannerAd />
        </div>

        {/* ===== FAVORITES CONTENT ===== */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {favoriteRecipes.length > 0 ? (
                <>
                  {/* Stats Section */}
                  <div className="mb-8 bg-muted/50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Your Recipe Collection</h2>
                        <p className="text-muted-foreground">
                          You have saved {favoriteRecipes.length} recipe{favoriteRecipes.length !== 1 ? "s" : ""} to
                          your favorites
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="h-8 w-8 text-red-500 fill-current" />
                        <span className="text-3xl font-bold text-red-500">{favoriteRecipes.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recipes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {insertAdsInRecipes(favoriteRecipes).map((item, index) =>
                      item.isAd ? (
                        <div key={item.id} className="md:col-span-2 lg:col-span-3">
                          <InlineAd />
                        </div>
                      ) : (
                        <RecipeCard key={item.id} recipe={item} />
                      ),
                    )}
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <HeartOff className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      You haven't saved any recipes to your favorites yet. Start exploring our collection of authentic
                      African recipes and save the ones you love by clicking the heart icon.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        onClick={() => router.push("/recipes")}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Browse Recipes
                      </Button>
                      <Button variant="outline" onClick={() => router.push("/meal-plan")}>
                        View Meal Plans
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar with Ads */}
            <div className="lg:col-span-1 space-y-6">
              <SidebarAd />
              <AdFreePromotion />

              {/* Favorites Tips Card */}
              <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold">Favorites Tips</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Click the heart icon on any recipe to save it</li>
                    <li>• Your favorites sync across all devices</li>
                    <li>• Create meal plans from your favorite recipes</li>
                    <li>• Share your favorite recipes with friends</li>
                  </ul>
                </CardContent>
              </Card>

              <SidebarAd />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
