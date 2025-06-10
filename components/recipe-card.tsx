"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronDown, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Recipe } from "@/types/recipe"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)

  // Function to handle premium content click
  const handlePremiumClick = (e: React.MouseEvent) => {
    if (recipe.isPremium) {
      e.preventDefault()
      router.push("/premium")
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {/* Recipe Image with Premium Badge (if applicable) */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={recipe.image || "/placeholder.svg?height=400&width=600"}
          alt={recipe.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {recipe.isPremium && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-yellow-500 text-white">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-bold">{recipe.name}</h3>
          <p className="text-white/80 text-sm">{recipe.region}</p>
        </div>
      </div>

      {/* Recipe Content */}
      <CardContent className="pt-4 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">{recipe.description}</p>

        {/* Conditionally show expanded content */}
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-1">Preparation Time</h4>
              <p className="text-sm text-muted-foreground">{recipe.prepTime}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Difficulty</h4>
              <p className="text-sm text-muted-foreground">{recipe.difficulty}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Key Ingredients</h4>
              <div className="flex flex-wrap gap-1">
                {recipe.keyIngredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {/* Recipe Actions */}
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-xs">
          {isExpanded ? "Show Less" : "Show More"}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" className="text-xs">
              View More <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* Conditional rendering for premium content */}
            {recipe.isPremium ? (
              <>
                <DropdownMenuItem onClick={handlePremiumClick}>
                  <Lock className="mr-2 h-4 w-4" />
                  View Full Recipe
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePremiumClick}>
                  <Lock className="mr-2 h-4 w-4" />
                  View Ingredients
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePremiumClick}>
                  <Lock className="mr-2 h-4 w-4" />
                  View Instructions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePremiumClick}>
                  <Lock className="mr-2 h-4 w-4" />
                  View Nutritional Info
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>View Full Recipe</DropdownMenuItem>
                <DropdownMenuItem>View Ingredients</DropdownMenuItem>
                <DropdownMenuItem>View Instructions</DropdownMenuItem>
                <DropdownMenuItem>View Nutritional Info</DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem>Save Recipe</DropdownMenuItem>
            <DropdownMenuItem>Share Recipe</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
