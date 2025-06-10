"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/components/auth-provider"
import { useFavorites } from "@/components/favorites-manager"
import { useToast } from "@/hooks/use-toast"
import { Clock, Heart, Lock, Star, Users, Utensils, Play, Share2 } from "lucide-react"

// ===== RECIPE DETAIL PAGE =====
export default function RecipeDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [recipe, setRecipe] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch recipe data from Supabase
    const fetchRecipe = async () => {
      setLoading(true)
      try {
        const recipeId = id as string

        const { data, error } = await supabase
          .from("recipes")
          .select(`
            id,
            title,
            introduction,
            category,
            ingredients, 
            instructions,
            image_path,
            video_path,
            video_duration_seconds,
            submitted_by_name,
            created_at,
            user_id
          `)
          .eq("id", recipeId)
          .single()

        if (error || !data) {
          console.error("Error fetching recipe:", error)
          toast({
            title: "Error",
            description: "Failed to load recipe details. Please try again or recipe may not exist.",
            variant: "destructive",
          })
          setRecipe(null) // Ensure recipe is null if not found
          setLoading(false)
          return
        }

        // Transform Supabase data to fit the component's expected structure
        // Assuming 'recipe_media' is your Supabase storage bucket for images/videos
        const getPublicUrl = (path: string | null) => {
          if (!path) return "/placeholder.svg?height=600&width=800"; // Default placeholder
          const { data: urlData } = supabase.storage.from("recipe-images").getPublicUrl(path);
          return urlData?.publicUrl || "/placeholder.svg?height=600&width=800";
        };

        const transformedRecipe = {
          id: data.id,
          name: data.title,
          description: data.introduction?.substring(0, 150) + (data.introduction && data.introduction.length > 150 ? "..." : ""), // Short description
          longDescription: data.introduction || "No detailed description provided.",
          image: getPublicUrl(data.image_path),
          region: data.category || "Uncategorized",
          // Fields not in the current 'recipes' table schema - will be undefined or default
          isPremium: false, // Default to false, adjust if you add this to DB
          prepTime: data.prep_time || "N/A", // Assuming 'prep_time' might be added later
          cookTime: data.cook_time || "N/A", // Assuming 'cook_time' might be added later
          servings: data.servings || "N/A",   // Assuming 'servings' might be added later
          difficulty: data.difficulty || "N/A", // Assuming 'difficulty' might be added later
          rating: data.rating?.toFixed(1) || "N/A", // Assuming 'rating' might be added later
          reviews: data.reviews_count || 0, // Assuming 'reviews_count' might be added later
          calories: data.calories || "N/A", // Assuming 'calories' might be added later
          ingredients: data.ingredients ? data.ingredients.split('\n').filter((item: string) => item.trim() !== '') : [],
          instructions: data.instructions ? data.instructions.split('\n').filter((item: string) => item.trim() !== '') : [],
          nutritionalInfo: data.nutritional_info || {}, // Assuming 'nutritional_info' (JSONB) might be added later
          youtubeVideoId: data.video_path, // Assuming video_path might store a YouTube ID or a path
          videoTitle: data.video_title || "Recipe Video", // Assuming 'video_title' might be added later
          // New fields from Supabase
          submittedByName: data.submitted_by_name || "Anonymous",
          createdAt: data.created_at ? new Date(data.created_at).toLocaleDateString() : "N/A",
          userId: data.user_id
        }

        setRecipe(transformedRecipe)
      } catch (error) {
        console.error("Error fetching recipe:", error)
        toast({
          title: "Error",
          description: "Failed to load recipe details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id, toast])

  // ===== HANDLE FAVORITE TOGGLE =====
  const handleFavoriteToggle = () => {
    if (!user) {
      router.push("/auth")
      return
    }

    if (!recipe || !recipe.id) return; // Guard against null recipe
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id)
    } else {
      addToFavorites(recipe.id)
    }
  }

  // ===== HANDLE SHARE RECIPE =====
  const handleShareRecipe = async () => {
    if (!recipe || !recipe.id) return; // Guard against null recipe
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

  const handlePremiumContent = () => {
    if (!user) {
      router.push("/auth")
      return
    }

    if (!user.isPremium) {
      router.push("/premium")
      return
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 flex justify-center">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-8">The recipe you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/recipes")}>Back to Recipes</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ===== RECIPE HERO SECTION ===== */}
      <div className="relative bg-muted">
        <div className="container py-8">
          <Button variant="outline" size="sm" className="mb-4" onClick={() => router.push("/recipes")}>
            ← Back to Recipes
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge>{recipe.region}</Badge>
                {recipe.isPremium && (
                  <Badge className="bg-yellow-500 text-white">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">{recipe.name}</h1>

              <p className="text-muted-foreground">{recipe.longDescription}</p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">Prep: {recipe.prepTime}</span>
                </div>
                <div className="flex items-center">
                  <Utensils className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">Cook: {recipe.cookTime}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">Serves: {recipe.servings}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  <span className="text-sm">
                    {recipe.rating} ({recipe.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <Button onClick={handleFavoriteToggle} variant={isFavorite(recipe.id) ? "default" : "outline"}>
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite(recipe.id) ? "fill-current" : ""}`} />
                  {isFavorite(recipe.id) ? "Saved" : "Save Recipe"}
                </Button>
                <Button variant="outline" onClick={handleShareRecipe}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Recipe
                </Button>
                {!recipe.isPremium || (user && user.isPremium) ? (
                  <Button variant="outline">Print Recipe</Button>
                ) : (
                  <Button variant="outline" onClick={handlePremiumContent}>
                    <Lock className="h-4 w-4 mr-2" />
                    Unlock Premium
                  </Button>
                )}
              </div>
            </div>

            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== RECIPE CONTENT SECTION ===== */}
      <div className="container py-12">
        <Tabs defaultValue="ingredients" className="space-y-8">
          <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>

          {/* ===== INGREDIENTS TAB ===== */}
          <TabsContent value="ingredients">
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>For {recipe.servings} servings</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-orange-500 mt-2 mr-2"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== INSTRUCTIONS TAB ===== */}
          <TabsContent value="instructions">
            <Card>
              <CardHeader>
                <CardTitle>Cooking Instructions</CardTitle>
                <CardDescription>Step by step guide</CardDescription>
              </CardHeader>
              <CardContent>
                {recipe.isPremium && (!user || !user.isPremium) ? (
                  <div className="text-center py-8">
                    <Lock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Premium Content</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Unlock full cooking instructions and more with REHMO Premium.
                    </p>
                    <Button onClick={handlePremiumContent}>Upgrade to Premium</Button>
                  </div>
                ) : (
                  <ol className="space-y-4">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="flex">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange-500 text-white text-sm font-medium mr-3 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== NUTRITION TAB ===== */}
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Nutritional Information</CardTitle>
                <CardDescription>Per serving</CardDescription>
              </CardHeader>
              <CardContent>
                {recipe.isPremium && (!user || !user.isPremium) ? (
                  <div className="text-center py-8">
                    <Lock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Premium Content</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Unlock detailed nutritional information and more with REHMO Premium.
                    </p>
                    <Button onClick={handlePremiumContent}>Upgrade to Premium</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Calories</p>
                      <p className="text-xl font-bold">{recipe.nutritionalInfo.calories}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Protein</p>
                      <p className="text-xl font-bold">{recipe.nutritionalInfo.protein}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Carbs</p>
                      <p className="text-xl font-bold">{recipe.nutritionalInfo.carbs}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Fat</p>
                      <p className="text-xl font-bold">{recipe.nutritionalInfo.fat}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Fiber</p>
                      <p className="text-xl font-bold">{recipe.nutritionalInfo.fiber}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Sugar</p>
                      <p className="text-xl font-bold">{recipe.nutritionalInfo.sugar}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== VIDEO TAB (PREMIUM ONLY) ===== */}
          <TabsContent value="video">
            <Card>
              <CardHeader>
                <CardTitle>Cooking Video</CardTitle>
                <CardDescription>Watch how to prepare this dish step by step</CardDescription>
              </CardHeader>
              <CardContent>
                {!user || !user.isPremium ? (
                  <div className="text-center py-12">
                    <Play className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Premium Video Content</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Watch exclusive cooking videos with detailed instructions from professional chefs. Available only
                      for Premium members.
                    </p>
                    <Button
                      onClick={handlePremiumContent}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${recipe.youtubeVideoId}`}
                        title={recipe.videoTitle}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium">{recipe.videoTitle}</h4>
                      <p className="text-sm text-muted-foreground">
                        Learn professional cooking techniques for this authentic African recipe
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ===== RELATED RECIPES SECTION ===== */}
      <div className="container pb-16">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=400&width=600&text=Related${i}`}
                  alt={`Related Recipe ${i}`}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Related African Recipe {i}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Another delicious African recipe that complements {recipe.name} perfectly.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
