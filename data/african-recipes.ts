import type { Recipe } from "@/types/recipe"

// Helper function to randomly mark recipes as premium
function markRandomAsPremium(recipes: Recipe[], count: number): Recipe[] {
  // Create a copy of the recipes array
  const recipesCopy = [...recipes]

  // Shuffle the array
  for (let i = recipesCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[recipesCopy[i], recipesCopy[j]] = [recipesCopy[j], recipesCopy[i]]
  }

  // Mark the first 'count' recipes as premium
  for (let i = 0; i < count; i++) {
    if (recipesCopy[i]) {
      recipesCopy[i].isPremium = true
    }
  }

  return recipesCopy
}

// ===== VEGETARIAN RECIPES =====
const vegetarianRecipesData: Recipe[] = [
  {
    id: "v1",
    name: "Moroccan Vegetable Tagine",
    description:
      "A fragrant and hearty vegetable stew cooked in a traditional clay pot with aromatic spices like cumin, coriander, and cinnamon.",
    image: "/placeholder.svg?height=400&width=600",
    region: "North Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "45 minutes",
    difficulty: "Medium",
    keyIngredients: ["Chickpeas", "Sweet Potatoes", "Carrots", "Tomatoes", "Couscous"],
  },
  {
    id: "v2",
    name: "Ethiopian Misir Wat",
    description:
      "A spicy red lentil stew seasoned with berbere spice mix, a staple in Ethiopian cuisine, typically served with injera bread.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "40 minutes",
    difficulty: "Medium",
    keyIngredients: ["Red Lentils", "Berbere Spice", "Onions", "Garlic", "Tomato Paste"],
  },
  {
    id: "v3",
    name: "Ghanaian Red Red",
    description:
      "A hearty bean stew made with black-eyed peas and palm oil, served with fried plantains. A popular street food in Ghana.",
    image: "/placeholder.svg?height=400&width=600",
    region: "West Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "1 hour",
    difficulty: "Medium",
    keyIngredients: ["Black-eyed Peas", "Palm Oil", "Plantains", "Tomatoes", "Ginger"],
  },
  {
    id: "v4",
    name: "South African Chakalaka",
    description:
      "A spicy vegetable relish typically served with bread, pap, or stews. It's colorful, flavorful, and packed with vegetables.",
    image: "/placeholder.svg?height=400&width=600",
    region: "South Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "30 minutes",
    difficulty: "Easy",
    keyIngredients: ["Carrots", "Bell Peppers", "Onions", "Beans", "Curry Powder"],
  },
  {
    id: "v5",
    name: "Tunisian Shakshuka",
    description:
      "Eggs poached in a sauce of tomatoes, olive oil, peppers, onion, and garlic, commonly spiced with cumin, paprika, and cayenne pepper.",
    image: "/placeholder.svg?height=400&width=600",
    region: "North Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "25 minutes",
    difficulty: "Easy",
    keyIngredients: ["Eggs", "Tomatoes", "Bell Peppers", "Onions", "Cumin"],
  },
  {
    id: "v6",
    name: "Kenyan Irio",
    description:
      "A traditional Kenyan dish made from mashed potatoes, peas, corn, and sometimes spinach. Simple yet nutritious and filling.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "35 minutes",
    difficulty: "Easy",
    keyIngredients: ["Potatoes", "Peas", "Corn", "Spinach", "Onions"],
  },
  {
    id: "v7",
    name: "Nigerian Moin Moin",
    description:
      "A steamed bean pudding made from a mixture of washed and peeled black-eyed peas, onions, and fresh ground peppers.",
    image: "/placeholder.svg?height=400&width=600",
    region: "West Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "1 hour 30 minutes",
    difficulty: "Hard",
    keyIngredients: ["Black-eyed Peas", "Bell Peppers", "Onions", "Vegetable Oil", "Scotch Bonnet"],
  },
  {
    id: "v8",
    name: "Zimbabwean Sadza with Greens",
    description:
      "Sadza is a staple food made from cornmeal, similar to polenta. Served with sautéed leafy greens like collards or kale.",
    image: "/placeholder.svg?height=400&width=600",
    region: "Southern Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "40 minutes",
    difficulty: "Medium",
    keyIngredients: ["Cornmeal", "Collard Greens", "Onions", "Tomatoes", "Peanut Butter"],
  },
  {
    id: "v9",
    name: "Egyptian Koshari",
    description:
      "Egypt's national dish consisting of rice, macaroni, and lentils mixed together, topped with a spiced tomato sauce and crispy onions.",
    image: "/placeholder.svg?height=400&width=600",
    region: "North Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "1 hour",
    difficulty: "Medium",
    keyIngredients: ["Rice", "Lentils", "Macaroni", "Chickpeas", "Crispy Onions"],
  },
  {
    id: "v10",
    name: "Algerian Chakchouka",
    description:
      "A flavorful dish of tomatoes, onions, and peppers, with eggs poached on top. Similar to shakshuka but with regional variations.",
    image: "/placeholder.svg?height=400&width=600",
    region: "North Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "30 minutes",
    difficulty: "Easy",
    keyIngredients: ["Eggs", "Tomatoes", "Bell Peppers", "Onions", "Harissa"],
  },
  {
    id: "v11",
    name: "Tanzanian Coconut Bean Soup",
    description:
      "A creamy and flavorful soup made with beans, coconut milk, and a blend of African spices. Perfect for a comforting meal.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "45 minutes",
    difficulty: "Medium",
    keyIngredients: ["Kidney Beans", "Coconut Milk", "Tomatoes", "Curry Powder", "Spinach"],
  },
  {
    id: "v12",
    name: "Liberian Potato Greens",
    description:
      "A nutritious dish made with sweet potato leaves (or spinach), palm oil, and seasonings. Often served with rice.",
    image: "/placeholder.svg?height=400&width=600",
    region: "West Africa",
    category: "vegetarian",
    isPremium: false,
    prepTime: "40 minutes",
    difficulty: "Medium",
    keyIngredients: ["Sweet Potato Leaves", "Palm Oil", "Onions", "Peppers", "Rice"],
  },
]

// ===== NON-VEGETARIAN RECIPES =====
const nonVegetarianRecipesData: Recipe[] = [
  {
    id: "nv1",
    name: "Nigerian Jollof Rice",
    description:
      "A one-pot rice dish cooked with tomatoes, peppers, and a variety of spices. Often served with chicken or beef.",
    image: "/placeholder.svg?height=400&width=600",
    region: "West Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "1 hour",
    difficulty: "Medium",
    keyIngredients: ["Rice", "Tomatoes", "Bell Peppers", "Chicken", "Scotch Bonnet"],
  },
  {
    id: "nv2",
    name: "Moroccan Lamb Tagine",
    description:
      "Tender lamb slow-cooked with dried fruits, nuts, and aromatic spices in a traditional clay pot called a tagine.",
    image: "/placeholder.svg?height=400&width=600",
    region: "North Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "2 hours 30 minutes",
    difficulty: "Hard",
    keyIngredients: ["Lamb", "Apricots", "Almonds", "Cinnamon", "Honey"],
  },
  {
    id: "nv3",
    name: "Ethiopian Doro Wat",
    description: "A spicy chicken stew that is the national dish of Ethiopia, traditionally served with injera bread.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "1 hour 30 minutes",
    difficulty: "Medium",
    keyIngredients: ["Chicken", "Berbere Spice", "Onions", "Hard-boiled Eggs", "Niter Kibbeh"],
  },
  {
    id: "nv4",
    name: "South African Bobotie",
    description: "A dish of spiced minced meat baked with an egg-based topping, combining sweet and savory flavors.",
    image: "/placeholder.svg?height=400&width=600",
    region: "South Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "1 hour 15 minutes",
    difficulty: "Medium",
    keyIngredients: ["Ground Beef", "Curry Powder", "Dried Fruits", "Eggs", "Bread"],
  },
  {
    id: "nv5",
    name: "Senegalese Yassa Chicken",
    description:
      "Marinated chicken cooked with caramelized onions, lemon, and olives. A popular dish throughout West Africa.",
    image: "/placeholder.svg?height=400&width=600",
    region: "West Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "1 hour",
    difficulty: "Medium",
    keyIngredients: ["Chicken", "Onions", "Lemon", "Dijon Mustard", "Olives"],
  },
  {
    id: "nv6",
    name: "Tanzanian Mchuzi wa Samaki",
    description:
      "A flavorful fish curry cooked with coconut milk, tomatoes, and a blend of spices. Popular along the East African coast.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "45 minutes",
    difficulty: "Medium",
    keyIngredients: ["Fish", "Coconut Milk", "Tomatoes", "Curry Powder", "Lime"],
  },
  {
    id: "nv7",
    name: "Cameroonian Ndolé",
    description:
      "A stew made from bitter leaves, nuts, and fish or beef. It's considered the national dish of Cameroon.",
    image: "/placeholder.svg?height=400&width=600",
    region: "Central Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "1 hour 30 minutes",
    difficulty: "Hard",
    keyIngredients: ["Bitter Leaves", "Peanuts", "Beef", "Shrimp", "Onions"],
  },
  {
    id: "nv8",
    name: "Libyan Mbakbaka",
    description: "A pasta dish with a spicy tomato sauce and tender pieces of meat, typically lamb or beef.",
    image: "/placeholder.svg?height=400&width=600",
    region: "North Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "1 hour",
    difficulty: "Medium",
    keyIngredients: ["Pasta", "Lamb", "Tomatoes", "Chickpeas", "Cumin"],
  },
  {
    id: "nv9",
    name: "Kenyan Nyama Choma",
    description:
      "Grilled meat (usually goat or beef) seasoned with a blend of spices. A popular dish at social gatherings.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "1 hour",
    difficulty: "Easy",
    keyIngredients: ["Goat Meat", "Lemon", "Salt", "Pepper", "Chili"],
  },
  {
    id: "nv10",
    name: "Ghanaian Waakye",
    description:
      "A dish of rice and beans cooked together with millet leaves, which give it a distinctive color. Served with various accompaniments.",
    image: "/placeholder.svg?height=400&width=600",
    region: "West Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "1 hour 30 minutes",
    difficulty: "Medium",
    keyIngredients: ["Rice", "Black-eyed Peas", "Millet Leaves", "Fish", "Spaghetti"],
  },
  {
    id: "nv11",
    name: "Congolese Moambe Chicken",
    description:
      "A savory chicken dish cooked in a sauce made from palm butter, often considered the national dish of Congo.",
    image: "/placeholder.svg?height=400&width=600",
    region: "Central Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "1 hour 15 minutes",
    difficulty: "Medium",
    keyIngredients: ["Chicken", "Palm Butter", "Onions", "Tomatoes", "Scotch Bonnet"],
  },
  {
    id: "nv12",
    name: "Somali Suqaar",
    description: "A quick-cooked meat dish with vegetables and Somali spices, typically served with rice or flatbread.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "non-vegetarian",
    isPremium: false,
    prepTime: "30 minutes",
    difficulty: "Easy",
    keyIngredients: ["Beef", "Bell Peppers", "Onions", "Cumin", "Coriander"],
  },
]

// ===== OTHER RECIPES =====
const otherRecipesData: Recipe[] = [
  {
    id: "o1",
    name: "Moroccan Mint Tea",
    description:
      "A refreshing and sweet tea made with fresh mint leaves and sugar. An important part of Moroccan hospitality.",
    image: "/placeholder.svg?height=400&width=600",
    region: "North Africa",
    category: "other",
    isPremium: false,
    prepTime: "15 minutes",
    difficulty: "Easy",
    keyIngredients: ["Green Tea", "Fresh Mint", "Sugar", "Water"],
  },
  {
    id: "o2",
    name: "Ethiopian Coffee Ceremony",
    description:
      "A traditional coffee preparation and serving process that is central to Ethiopian social and cultural life.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "other",
    isPremium: false,
    prepTime: "45 minutes",
    difficulty: "Medium",
    keyIngredients: ["Coffee Beans", "Water", "Frankincense", "Popcorn"],
  },
  {
    id: "o3",
    name: "South African Malva Pudding",
    description:
      "A sweet and sticky sponge pudding of Cape Dutch origin, containing apricot jam and served with a hot cream sauce.",
    image: "/placeholder.svg?height=400&width=600",
    region: "South Africa",
    category: "other",
    isPremium: false,
    prepTime: "1 hour",
    difficulty: "Medium",
    keyIngredients: ["Apricot Jam", "Butter", "Eggs", "Flour", "Cream"],
  },
  {
    id: "o4",
    name: "Nigerian Puff Puff",
    description: "Deep-fried dough balls, similar to doughnuts but with a unique African twist. A popular street food.",
    image: "/placeholder.svg?height=400&width=600",
    region: "West Africa",
    category: "other",
    isPremium: false,
    prepTime: "40 minutes",
    difficulty: "Easy",
    keyIngredients: ["Flour", "Yeast", "Sugar", "Nutmeg", "Vegetable Oil"],
  },
  {
    id: "o5",
    name: "Kenyan Mandazi",
    description: "A slightly sweet, triangular-shaped fried bread that's popular for breakfast or as a snack with tea.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "other",
    isPremium: false,
    prepTime: "45 minutes",
    difficulty: "Medium",
    keyIngredients: ["Flour", "Coconut Milk", "Sugar", "Cardamom", "Yeast"],
  },
  {
    id: "o6",
    name: "Tunisian Brik",
    description:
      "A thin pastry shell filled with egg, tuna, parsley, and onions, then deep-fried. A popular appetizer.",
    image: "/placeholder.svg?height=400&width=600",
    region: "North Africa",
    category: "other",
    isPremium: false,
    prepTime: "30 minutes",
    difficulty: "Medium",
    keyIngredients: ["Warka Pastry", "Eggs", "Tuna", "Parsley", "Capers"],
  },
  {
    id: "o7",
    name: "Ghanaian Kelewele",
    description: "Spicy fried plantains seasoned with ginger, cayenne pepper, and other spices. A popular street food.",
    image: "/placeholder.svg?height=400&width=600",
    region: "West Africa",
    category: "other",
    isPremium: false,
    prepTime: "25 minutes",
    difficulty: "Easy",
    keyIngredients: ["Plantains", "Ginger", "Cayenne Pepper", "Cloves", "Anise"],
  },
  {
    id: "o8",
    name: "Egyptian Basbousa",
    description:
      "A sweet semolina cake soaked in simple syrup, often flavored with rose water or orange blossom water.",
    image: "/placeholder.svg?height=400&width=600",
    region: "North Africa",
    category: "other",
    isPremium: false,
    prepTime: "50 minutes",
    difficulty: "Medium",
    keyIngredients: ["Semolina", "Yogurt", "Sugar", "Coconut", "Rose Water"],
  },
  {
    id: "o9",
    name: "Tanzanian Vitumbua",
    description: "Sweet rice pancakes made from rice flour and coconut milk, popular for breakfast or as a snack.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "other",
    isPremium: false,
    prepTime: "40 minutes",
    difficulty: "Medium",
    keyIngredients: ["Rice Flour", "Coconut Milk", "Yeast", "Cardamom", "Sugar"],
  },
  {
    id: "o10",
    name: "Senegalese Thiakry",
    description: "A sweet couscous pudding mixed with yogurt, raisins, and spices. Often served as a dessert.",
    image: "/placeholder.svg?height=400&width=600",
    region: "West Africa",
    category: "other",
    isPremium: false,
    prepTime: "30 minutes",
    difficulty: "Easy",
    keyIngredients: ["Millet Couscous", "Yogurt", "Raisins", "Nutmeg", "Vanilla"],
  },
  {
    id: "o11",
    name: "Libyan Magrood",
    description:
      "Date-filled semolina cookies soaked in honey or sugar syrup. Popular during Ramadan and other celebrations.",
    image: "/placeholder.svg?height=400&width=600",
    region: "North Africa",
    category: "other",
    isPremium: false,
    prepTime: "1 hour 30 minutes",
    difficulty: "Hard",
    keyIngredients: ["Semolina", "Dates", "Honey", "Vegetable Oil", "Orange Blossom Water"],
  },
  {
    id: "o12",
    name: "Somali Shaah",
    description: "Spiced tea with cardamom, cinnamon, cloves, and ginger. Often served with milk and sugar.",
    image: "/placeholder.svg?height=400&width=600",
    region: "East Africa",
    category: "other",
    isPremium: false,
    prepTime: "15 minutes",
    difficulty: "Easy",
    keyIngredients: ["Black Tea", "Cardamom", "Cinnamon", "Cloves", "Ginger"],
  },
]

// Mark 3 random recipes in each category as premium
export const vegetarianRecipes = markRandomAsPremium(vegetarianRecipesData, 3)
export const nonVegetarianRecipes = markRandomAsPremium(nonVegetarianRecipesData, 3)
export const otherRecipes = markRandomAsPremium(otherRecipesData, 3)
