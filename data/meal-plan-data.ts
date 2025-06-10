// This file contains the data for the 30-day meal plan
// Each day has breakfast, lunch, and supper meals

interface Meal {
  id: string
  name: string
  description: string
}

interface DayPlan {
  breakfast: Meal
  lunch: Meal
  supper: Meal
}

// Generate 30 days of meal plans
export const mealPlanData: DayPlan[] = [
  // ===== DAY 1 (FREE) =====
  {
    breakfast: {
      id: "moroccan-mint-tea-with-msemen",
      name: "Moroccan Mint Tea with Msemen",
      description: "Start your day with sweet mint tea and flaky Moroccan pancakes filled with honey.",
    },
    lunch: {
      id: "tunisian-shakshuka",
      name: "Tunisian Shakshuka",
      description: "Eggs poached in a spiced tomato and pepper sauce, served with crusty bread.",
    },
    supper: {
      id: "nigerian-jollof-rice-with-chicken",
      name: "Nigerian Jollof Rice with Chicken",
      description: "Flavorful one-pot rice dish with tomatoes, peppers, and tender chicken pieces.",
    },
  },

  // ===== DAY 2 (FREE) =====
  {
    breakfast: {
      id: "ethiopian-genfo",
      name: "Ethiopian Genfo",
      description: "Barley porridge served with spiced clarified butter and berbere spice mix.",
    },
    lunch: {
      id: "moroccan-chickpea-salad",
      name: "Moroccan Chickpea Salad",
      description: "Refreshing salad with chickpeas, tomatoes, cucumbers, and a lemon-cumin dressing.",
    },
    supper: {
      id: "south-african-bobotie",
      name: "South African Bobotie",
      description: "Spiced minced meat baked with an egg-based topping, served with yellow rice.",
    },
  },

  // ===== DAY 3 (FREE) =====
  {
    breakfast: {
      id: "kenyan-mandazi",
      name: "Kenyan Mandazi",
      description: "Lightly sweetened fried bread flavored with cardamom and coconut milk.",
    },
    lunch: {
      id: "egyptian-koshari",
      name: "Egyptian Koshari",
      description: "A hearty mix of rice, lentils, and macaroni topped with spiced tomato sauce and crispy onions.",
    },
    supper: {
      id: "senegalese-yassa-chicken",
      name: "Senegalese Yassa Chicken",
      description: "Marinated chicken cooked with caramelized onions, lemon, and olives.",
    },
  },

  // ===== DAY 4 (FREE) =====
  {
    breakfast: {
      id: "algerian-baghrir",
      name: "Algerian Baghrir",
      description: "Thousand-hole pancakes served with honey and butter, perfect with mint tea.",
    },
    lunch: {
      id: "ghanaian-red-red",
      name: "Ghanaian Red Red",
      description: "Black-eyed pea stew with palm oil and fried plantains on the side.",
    },
    supper: {
      id: "moroccan-lamb-tagine",
      name: "Moroccan Lamb Tagine",
      description: "Slow-cooked lamb with dried fruits, nuts, and aromatic spices.",
    },
  },

  // ===== DAY 5 (FREE) =====
  {
    breakfast: {
      id: "nigerian-akara",
      name: "Nigerian Akara",
      description: "Deep-fried bean cakes made from black-eyed peas, served with a spicy sauce.",
    },
    lunch: {
      id: "ethiopian-misir-wat",
      name: "Ethiopian Misir Wat",
      description: "Spicy red lentil stew seasoned with berbere spice mix, served with injera bread.",
    },
    supper: {
      id: "tanzanian-mchuzi-wa-samaki",
      name: "Tanzanian Mchuzi wa Samaki",
      description: "Fish curry cooked with coconut milk, tomatoes, and a blend of spices.",
    },
  },

  // ===== DAY 6 (PREMIUM) =====
  {
    breakfast: {
      id: "south-african-melktert",
      name: "South African Melktert",
      description: "Creamy milk tart with a hint of cinnamon, a beloved South African dessert.",
    },
    lunch: {
      id: "libyan-sharba-libiya",
      name: "Libyan Sharba Libiya",
      description: "Spiced lamb and vegetable soup with orzo pasta and aromatic herbs.",
    },
    supper: {
      id: "ethiopian-doro-wat",
      name: "Ethiopian Doro Wat",
      description: "Spicy chicken stew with hard-boiled eggs, a national dish of Ethiopia.",
    },
  },

  // ===== DAY 7 (PREMIUM) =====
  {
    breakfast: {
      id: "moroccan-bissara",
      name: "Moroccan Bissara",
      description: "Creamy fava bean soup drizzled with olive oil and cumin, served with bread.",
    },
    lunch: {
      id: "kenyan-sukuma-wiki",
      name: "Kenyan Sukuma Wiki",
      description: "Sautéed collard greens with onions and spices, served with ugali (cornmeal porridge).",
    },
    supper: {
      id: "cameroonian-ndole",
      name: "Cameroonian Ndolé",
      description: "Bitter leaf stew with ground peanuts, typically made with fish or beef.",
    },
  },

  // Days 8-30 (all PREMIUM)
  // ===== DAY 8 (PREMIUM) =====
  {
    breakfast: {
      id: "tunisian-lablabi",
      name: "Tunisian Lablabi",
      description: "Chickpea soup flavored with cumin and garlic, topped with bread and a poached egg.",
    },
    lunch: {
      id: "somali-sambusa",
      name: "Somali Sambusa",
      description: "Triangular pastries filled with spiced meat or vegetables, similar to samosas.",
    },
    supper: {
      id: "congolese-moambe-chicken",
      name: "Congolese Moambe Chicken",
      description: "Chicken cooked in a sauce made from palm butter, often considered the national dish of Congo.",
    },
  },

  // ===== DAY 9 (PREMIUM) =====
  {
    breakfast: {
      id: "egyptian-ful-medames",
      name: "Egyptian Ful Medames",
      description: "Stewed fava beans seasoned with olive oil, lemon juice, and cumin.",
    },
    lunch: {
      id: "zimbabwean-sadza-with-greens",
      name: "Zimbabwean Sadza with Greens",
      description: "Cornmeal porridge served with sautéed leafy greens and tomatoes.",
    },
    supper: {
      id: "libyan-mbakbaka",
      name: "Libyan Mbakbaka",
      description: "Pasta dish with a spicy tomato sauce and tender pieces of meat.",
    },
  },

  // ===== DAY 10 (PREMIUM) =====
  {
    breakfast: {
      id: "ghanaian-hausa-koko",
      name: "Ghanaian Hausa Koko",
      description: "Spiced millet porridge served with koose (bean cakes) or bread.",
    },
    lunch: {
      id: "rwandan-isombe",
      name: "Rwandan Isombe",
      description: "Cassava leaves stewed with eggplant, spinach, and peanuts.",
    },
    supper: {
      id: "kenyan-nyama-choma",
      name: "Kenyan Nyama Choma",
      description: "Grilled meat (usually goat or beef) seasoned with a blend of spices.",
    },
  },

  // Generate remaining days (11-30) with placeholder data
  ...Array.from({ length: 20 }).map((_, index) => {
    const day = index + 11
    return {
      breakfast: {
        id: `premium-breakfast-${day}`,
        name: `Premium Breakfast ${day}`,
        description: "Exclusive breakfast recipe available only for premium subscribers.",
      },
      lunch: {
        id: `premium-lunch-${day}`,
        name: `Premium Lunch ${day}`,
        description: "Exclusive lunch recipe available only for premium subscribers.",
      },
      supper: {
        id: `premium-supper-${day}`,
        name: `Premium Supper ${day}`,
        description: "Exclusive dinner recipe available only for premium subscribers.",
      },
    }
  }),
]
