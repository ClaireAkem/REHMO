export interface Recipe {
  id: string
  name: string
  description: string
  image: string
  region: string
  category: "vegetarian" | "non-vegetarian" | "other"
  isPremium: boolean
  prepTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  keyIngredients: string[]
}
