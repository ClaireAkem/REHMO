"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { RecipeSubmissionForm } from "@/components/recipe-submission-form"
import { BannerAd } from "@/components/ads/banner-ad"
import { SidebarAd } from "@/components/ads/sidebar-ad"
import { InlineAd } from "@/components/ads/inline-ad"
import { AdFreePromotion } from "@/components/ads/ad-free-promotion"
import { useAuth } from "@/components/auth-provider"
import { useFavorites } from "@/components/favorites-manager"
import { useToast } from "@/hooks/use-toast"
import { ChevronDown, Clock, Lock, Star, Heart, Share2, User, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  region: string;
  isPremium: boolean;
  prepTime: string;
  difficulty: string;
  rating: string;
  isUserSubmitted: boolean;
  category?: string;
}

const generateRecipes = (category: string, count: number): Recipe[] => {
  const recipes = []
  const premiumIndices = new Set()

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
      category: category,
    })
  }

  return recipes
}

const vegetarianRecipes = generateRecipes("Vegetarian", 12)
const nonVegetarianRecipes = generateRecipes("Non-Vegetarian", 12)
const otherRecipes = generateRecipes("Other", 12)

const MOCK_RECIPES_TO_KEEP: Recipe[] = [
  vegetarianRecipes[0],
  nonVegetarianRecipes[0],
  otherRecipes[0],
  otherRecipes[1],
];

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [isExpanded, setIsExpanded] = useState(false)

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
      router.push(`/recipes/${recipe.id}`)
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
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

      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-xs">
            {isExpanded ? "Show Less" : "Show More"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFavoriteToggle}
            className={`text-xs ${isFavorite(recipe.id) ? "text-red-500 border-red-500" : ""}`}
          >
            <Heart className={`h-3 w-3 ${isFavorite(recipe.id) ? "fill-current" : ""}`} />
          </Button>

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

export default function RecipesPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all-recipes")
  const [supabaseRecipes, setSupabaseRecipes] = useState<Recipe[]>([])
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([...MOCK_RECIPES_TO_KEEP])
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true)
  const { toast } = useToast()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const fetchSupabaseRecipes = async () => {
    setIsLoadingRecipes(true)
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching recipes:', error)
        toast({
          title: "Error",
          description: "Could not fetch recipes from the database.",
          variant: "destructive",
        })
        setSupabaseRecipes([]) 
      } else if (data) {
        const transformedRecipes: Recipe[] = data.map((dbRecipe: any) => ({
          id: dbRecipe.id,
          name: dbRecipe.title,
          description: dbRecipe.introduction || 'No description available.',
          image: dbRecipe.image_path && supabaseUrl
            ? `${supabaseUrl}/storage/v1/object/public/recipe-images/${dbRecipe.image_path}`
            : '/placeholder.svg?height=400&width=600', 
          region: dbRecipe.category || 'N/A', 
          isPremium: false, 
          prepTime: 'N/A', 
          difficulty: 'N/A', 
          rating: 'N/A', 
          isUserSubmitted: true,
          category: dbRecipe.category, 
        }))
        setSupabaseRecipes(transformedRecipes)
      }
    } catch (e: any) {
      console.error('Exception fetching recipes:', e)
      toast({
        title: "Error",
        description: e.message || "An unexpected error occurred while fetching recipes.",
        variant: "destructive",
      })
      setSupabaseRecipes([])
    } finally {
      setIsLoadingRecipes(false)
    }
  }

  useEffect(() => {
    fetchSupabaseRecipes()
  }, [])

  useEffect(() => {
    setDisplayedRecipes([...MOCK_RECIPES_TO_KEEP, ...supabaseRecipes])
  }, [supabaseRecipes])

  const getCategorizedRecipes = (category: string) => {
    if (category === "Vegetarian") return vegetarianRecipes;
    if (category === "Non-Vegetarian") return nonVegetarianRecipes;
    if (category === "Other") return otherRecipes;
    return [];
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="relative food-gradient">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative z-10 py-16 md:py-24">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">African Recipes</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Explore our collection of authentic African dishes, from traditional favorites to modern
                interpretations.
              </p>
            </div>
          </div>
        </div>

        <div className="container py-4">
          {/* <BannerAd /> */}
        </div>
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-4">
              <Tabs defaultValue="all-recipes" className="space-y-8" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
                  <TabsTrigger value="all-recipes">All Recipes</TabsTrigger>
                  <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
                  <TabsTrigger value="non-vegetarian">Non-Vegetarian</TabsTrigger>
                  <TabsTrigger value="other">Other</TabsTrigger>
                  <TabsTrigger value="submit-recipe">Submit Recipe</TabsTrigger>
                </TabsList>

                <TabsContent value="all-recipes">
                  {isLoadingRecipes ? (
                    <div className="flex justify-center items-center py-10">
                      <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                      <p className="ml-2">Loading recipes...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                      {displayedRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="vegetarian">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {getCategorizedRecipes("Vegetarian").map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="non-vegetarian">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {getCategorizedRecipes("Non-Vegetarian").map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="other">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {getCategorizedRecipes("Other").map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="submit-recipe">
                  <RecipeSubmissionForm onRecipeSubmitted={fetchSupabaseRecipes} />
                </TabsContent>
              </Tabs>
            </div>

            {/* <div className="lg:col-span-1 space-y-6">
              <SidebarAd />
              <AdFreePromotion />http://localhost:3000/recipes/Non-Vegetarian-1
              <SidebarAd />
            </div> */}
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
