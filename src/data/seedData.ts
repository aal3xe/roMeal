import { Recipe, Ingredient } from '../types';

export const INITIAL_INGREDIENTS: Ingredient[] = [
  {
    "id": "ing-1",
    "name_ro": "Fresh tomatoes",
    "name_en": "Fresh tomatoes",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 18,
    "protein_per_100g": 0.9,
    "carbs_per_100g": 3.9,
    "fat_per_100g": 0.2,
    "allergens": [],
    "estimated_price_per_kg_ron": 9.99
  },
  {
    "id": "ing-2",
    "name_ro": "Cucumbers",
    "name_en": "Cucumbers",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 15,
    "protein_per_100g": 0.7,
    "carbs_per_100g": 3.6,
    "fat_per_100g": 0.1,
    "allergens": [],
    "estimated_price_per_kg_ron": 7.49
  },
  {
    "id": "ing-3",
    "name_ro": "Yellow onion",
    "name_en": "Yellow onion",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 40,
    "protein_per_100g": 1.1,
    "carbs_per_100g": 9.3,
    "fat_per_100g": 0.1,
    "allergens": [],
    "estimated_price_per_kg_ron": 3.99
  },
  {
    "id": "ing-4",
    "name_ro": "Garlic",
    "name_en": "Garlic",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 149,
    "protein_per_100g": 6.4,
    "carbs_per_100g": 33.1,
    "fat_per_100g": 0.5,
    "allergens": [],
    "estimated_price_per_kg_ron": 18
  },
  {
    "id": "ing-5",
    "name_ro": "Baby spinach",
    "name_en": "Baby spinach",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 23,
    "protein_per_100g": 2.9,
    "carbs_per_100g": 3.6,
    "fat_per_100g": 0.4,
    "allergens": [],
    "estimated_price_per_kg_ron": 34
  },
  {
    "id": "ing-6",
    "name_ro": "Red bell pepper",
    "name_en": "Red bell pepper",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 31,
    "protein_per_100g": 1,
    "carbs_per_100g": 6,
    "fat_per_100g": 0.3,
    "allergens": [],
    "estimated_price_per_kg_ron": 12.99
  },
  {
    "id": "ing-7",
    "name_ro": "Carrots",
    "name_en": "Carrots",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 41,
    "protein_per_100g": 0.9,
    "carbs_per_100g": 9.6,
    "fat_per_100g": 0.2,
    "allergens": [],
    "estimated_price_per_kg_ron": 4.29
  },
  {
    "id": "ing-8",
    "name_ro": "Fresh broccoli",
    "name_en": "Fresh broccoli",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 34,
    "protein_per_100g": 2.8,
    "carbs_per_100g": 6.6,
    "fat_per_100g": 0.4,
    "allergens": [],
    "estimated_price_per_kg_ron": 11.9
  },
  {
    "id": "ing-9",
    "name_ro": "Apples",
    "name_en": "Apples",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 52,
    "protein_per_100g": 0.3,
    "carbs_per_100g": 13.8,
    "fat_per_100g": 0.2,
    "allergens": [],
    "estimated_price_per_kg_ron": 5.49
  },
  {
    "id": "ing-10",
    "name_ro": "Bananas",
    "name_en": "Bananas",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 89,
    "protein_per_100g": 1.1,
    "carbs_per_100g": 22.8,
    "fat_per_100g": 0.3,
    "allergens": [],
    "estimated_price_per_kg_ron": 6.99
  },
  {
    "id": "ing-11",
    "name_ro": "Fresh blueberries",
    "name_en": "Fresh blueberries",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 57,
    "protein_per_100g": 0.7,
    "carbs_per_100g": 14.5,
    "fat_per_100g": 0.3,
    "allergens": [],
    "estimated_price_per_kg_ron": 45
  },
  {
    "id": "ing-12",
    "name_ro": "Avocado Hass",
    "name_en": "Avocado Hass",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 160,
    "protein_per_100g": 2,
    "carbs_per_100g": 8.5,
    "fat_per_100g": 14.7,
    "allergens": [],
    "estimated_price_per_kg_ron": 24
  },
  {
    "id": "ing-13",
    "name_ro": "White potatoes",
    "name_en": "White potatoes",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 77,
    "protein_per_100g": 2,
    "carbs_per_100g": 17.5,
    "fat_per_100g": 0.1,
    "allergens": [],
    "estimated_price_per_kg_ron": 3.49
  },
  {
    "id": "ing-14",
    "name_ro": "White mushrooms",
    "name_en": "White mushrooms",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 22,
    "protein_per_100g": 3.1,
    "carbs_per_100g": 3.3,
    "fat_per_100g": 0.3,
    "allergens": [],
    "estimated_price_per_kg_ron": 13.99
  },
  {
    "id": "ing-20",
    "name_ro": "Skinless chicken breast",
    "name_en": "Skinless chicken breast",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 120,
    "protein_per_100g": 22.5,
    "carbs_per_100g": 0,
    "fat_per_100g": 2.6,
    "allergens": [],
    "estimated_price_per_kg_ron": 28.5
  },
  {
    "id": "ing-21",
    "name_ro": "Chicken thighs boneless",
    "name_en": "Chicken thighs boneless",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 170,
    "protein_per_100g": 19.5,
    "carbs_per_100g": 0,
    "fat_per_100g": 10,
    "allergens": [],
    "estimated_price_per_kg_ron": 25.99
  },
  {
    "id": "ing-22",
    "name_ro": "Fresh salmon fillet",
    "name_en": "Fresh salmon fillet",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 208,
    "protein_per_100g": 20.4,
    "carbs_per_100g": 0,
    "fat_per_100g": 13.4,
    "allergens": [
      "peste_fructe_de_mare"
    ],
    "estimated_price_per_kg_ron": 79.99
  },
  {
    "id": "ing-23",
    "name_ro": "White fish fillet",
    "name_en": "White fish fillet",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 82,
    "protein_per_100g": 17.8,
    "carbs_per_100g": 0,
    "fat_per_100g": 0.7,
    "allergens": [
      "peste_fructe_de_mare"
    ],
    "estimated_price_per_kg_ron": 44
  },
  {
    "id": "ing-24",
    "name_ro": "Lean ground beef",
    "name_en": "Lean ground beef",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 176,
    "protein_per_100g": 21,
    "carbs_per_100g": 0,
    "fat_per_100g": 10,
    "allergens": [],
    "estimated_price_per_kg_ron": 39.99
  },
  {
    "id": "ing-25",
    "name_ro": "Fresh eggs L",
    "name_en": "Fresh eggs L",
    "category": "lactate_oua",
    "default_unit": "buc",
    "calories_per_100g": 143,
    "protein_per_100g": 12.6,
    "carbs_per_100g": 0.7,
    "fat_per_100g": 9.5,
    "allergens": [
      "oua"
    ],
    "estimated_price_per_kg_ron": 18
  },
  {
    "id": "ing-26",
    "name_ro": "Pork tenderloin",
    "name_en": "Pork tenderloin",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 143,
    "protein_per_100g": 21.8,
    "carbs_per_100g": 0,
    "fat_per_100g": 5.5,
    "allergens": [],
    "estimated_price_per_kg_ron": 36.9
  },
  {
    "id": "ing-27",
    "name_ro": "Canned tuna in water",
    "name_en": "Canned tuna in water",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 116,
    "protein_per_100g": 26,
    "carbs_per_100g": 0,
    "fat_per_100g": 1,
    "allergens": [
      "peste_fructe_de_mare"
    ],
    "estimated_price_per_kg_ron": 55
  },
  {
    "id": "ing-30",
    "name_ro": "Romanian cows telemea cheese",
    "name_en": "Romanian cows telemea cheese",
    "category": "lactate_oua",
    "default_unit": "g",
    "calories_per_100g": 260,
    "protein_per_100g": 18,
    "carbs_per_100g": 1.5,
    "fat_per_100g": 20,
    "allergens": [
      "lactoza"
    ],
    "estimated_price_per_kg_ron": 38
  },
  {
    "id": "ing-31",
    "name_ro": "Greek yogurt 2%",
    "name_en": "Greek yogurt 2%",
    "category": "lactate_oua",
    "default_unit": "g",
    "calories_per_100g": 73,
    "protein_per_100g": 10,
    "carbs_per_100g": 3.8,
    "fat_per_100g": 2,
    "allergens": [
      "lactoza"
    ],
    "estimated_price_per_kg_ron": 16.5
  },
  {
    "id": "ing-32",
    "name_ro": "Low fat cottage cheese",
    "name_en": "Low fat cottage cheese",
    "category": "lactate_oua",
    "default_unit": "g",
    "calories_per_100g": 85,
    "protein_per_100g": 13,
    "carbs_per_100g": 3,
    "fat_per_100g": 1.8,
    "allergens": [
      "lactoza"
    ],
    "estimated_price_per_kg_ron": 22
  },
  {
    "id": "ing-33",
    "name_ro": "Cow milk 1.5%",
    "name_en": "Cow milk 1.5%",
    "category": "lactate_oua",
    "default_unit": "ml",
    "calories_per_100g": 45,
    "protein_per_100g": 3.2,
    "carbs_per_100g": 4.8,
    "fat_per_100g": 1.5,
    "allergens": [
      "lactoza"
    ],
    "estimated_price_per_kg_ron": 6.2
  },
  {
    "id": "ing-34",
    "name_ro": "Butter 82%",
    "name_en": "Butter 82%",
    "category": "lactate_oua",
    "default_unit": "g",
    "calories_per_100g": 740,
    "protein_per_100g": 0.8,
    "carbs_per_100g": 0.7,
    "fat_per_100g": 82,
    "allergens": [
      "lactoza"
    ],
    "estimated_price_per_kg_ron": 48
  },
  {
    "id": "ing-35",
    "name_ro": "Almond / Oat milk unsweetened",
    "name_en": "Almond / Oat milk unsweetened",
    "category": "lactate_oua",
    "default_unit": "ml",
    "calories_per_100g": 24,
    "protein_per_100g": 0.9,
    "carbs_per_100g": 2.5,
    "fat_per_100g": 1.2,
    "allergens": [
      "arahide_nuci"
    ],
    "estimated_price_per_kg_ron": 11.5
  },
  {
    "id": "ing-40",
    "name_ro": "Rolled oats",
    "name_en": "Rolled oats",
    "category": "panificatie_cereale",
    "default_unit": "g",
    "calories_per_100g": 389,
    "protein_per_100g": 16.9,
    "carbs_per_100g": 66.3,
    "fat_per_100g": 6.9,
    "allergens": [
      "gluten"
    ],
    "estimated_price_per_kg_ron": 7.99
  },
  {
    "id": "ing-41",
    "name_ro": "Whole grain rye bread",
    "name_en": "Whole grain rye bread",
    "category": "panificatie_cereale",
    "default_unit": "g",
    "calories_per_100g": 240,
    "protein_per_100g": 9,
    "carbs_per_100g": 43,
    "fat_per_100g": 3.5,
    "allergens": [
      "gluten",
      "susan"
    ],
    "estimated_price_per_kg_ron": 12
  },
  {
    "id": "ing-42",
    "name_ro": "Cornmeal for polenta",
    "name_en": "Cornmeal for polenta",
    "category": "panificatie_cereale",
    "default_unit": "g",
    "calories_per_100g": 350,
    "protein_per_100g": 7,
    "carbs_per_100g": 75,
    "fat_per_100g": 1.2,
    "allergens": [],
    "estimated_price_per_kg_ron": 4.8
  },
  {
    "id": "ing-43",
    "name_ro": "Basmati rice",
    "name_en": "Basmati rice",
    "category": "panificatie_cereale",
    "default_unit": "g",
    "calories_per_100g": 355,
    "protein_per_100g": 8,
    "carbs_per_100g": 78,
    "fat_per_100g": 0.8,
    "allergens": [],
    "estimated_price_per_kg_ron": 10.99
  },
  {
    "id": "ing-44",
    "name_ro": "Whole wheat pasta",
    "name_en": "Whole wheat pasta",
    "category": "panificatie_cereale",
    "default_unit": "g",
    "calories_per_100g": 348,
    "protein_per_100g": 13,
    "carbs_per_100g": 65,
    "fat_per_100g": 2,
    "allergens": [
      "gluten"
    ],
    "estimated_price_per_kg_ron": 9.5
  },
  {
    "id": "ing-45",
    "name_ro": "Whole wheat wraps",
    "name_en": "Whole wheat wraps",
    "category": "panificatie_cereale",
    "default_unit": "g",
    "calories_per_100g": 290,
    "protein_per_100g": 9.5,
    "carbs_per_100g": 48,
    "fat_per_100g": 5.5,
    "allergens": [
      "gluten"
    ],
    "estimated_price_per_kg_ron": 18
  },
  {
    "id": "ing-46",
    "name_ro": "White quinoa",
    "name_en": "White quinoa",
    "category": "panificatie_cereale",
    "default_unit": "g",
    "calories_per_100g": 368,
    "protein_per_100g": 14.1,
    "carbs_per_100g": 64.2,
    "fat_per_100g": 6.1,
    "allergens": [],
    "estimated_price_per_kg_ron": 22
  },
  {
    "id": "ing-50",
    "name_ro": "Extra virgin olive oil",
    "name_en": "Extra virgin olive oil",
    "category": "bacanie_condimente",
    "default_unit": "ml",
    "calories_per_100g": 884,
    "protein_per_100g": 0,
    "carbs_per_100g": 0,
    "fat_per_100g": 100,
    "allergens": [],
    "estimated_price_per_kg_ron": 48
  },
  {
    "id": "ing-51",
    "name_ro": "Brown / green lentils",
    "name_en": "Brown / green lentils",
    "category": "bacanie_condimente",
    "default_unit": "g",
    "calories_per_100g": 350,
    "protein_per_100g": 24.5,
    "carbs_per_100g": 60,
    "fat_per_100g": 1.1,
    "allergens": [],
    "estimated_price_per_kg_ron": 9.9
  },
  {
    "id": "ing-52",
    "name_ro": "Cooked chickpeas",
    "name_en": "Cooked chickpeas",
    "category": "bacanie_condimente",
    "default_unit": "g",
    "calories_per_100g": 130,
    "protein_per_100g": 8,
    "carbs_per_100g": 20,
    "fat_per_100g": 2.2,
    "allergens": [],
    "estimated_price_per_kg_ron": 7.5
  },
  {
    "id": "ing-53",
    "name_ro": "Walnuts",
    "name_en": "Walnuts",
    "category": "bacanie_condimente",
    "default_unit": "g",
    "calories_per_100g": 654,
    "protein_per_100g": 15.2,
    "carbs_per_100g": 13.7,
    "fat_per_100g": 65.2,
    "allergens": [
      "arahide_nuci"
    ],
    "estimated_price_per_kg_ron": 52
  },
  {
    "id": "ing-54",
    "name_ro": "Chia seeds",
    "name_en": "Chia seeds",
    "category": "bacanie_condimente",
    "default_unit": "g",
    "calories_per_100g": 486,
    "protein_per_100g": 16.5,
    "carbs_per_100g": 42.1,
    "fat_per_100g": 30.7,
    "allergens": [],
    "estimated_price_per_kg_ron": 32
  },
  {
    "id": "ing-55",
    "name_ro": "Polyfloral honey",
    "name_en": "Polyfloral honey",
    "category": "bacanie_condimente",
    "default_unit": "g",
    "calories_per_100g": 304,
    "protein_per_100g": 0.3,
    "carbs_per_100g": 82.4,
    "fat_per_100g": 0,
    "allergens": [],
    "estimated_price_per_kg_ron": 28
  },
  {
    "id": "ing-56",
    "name_ro": "Organic firm tofu",
    "name_en": "Organic firm tofu",
    "category": "bacanie_condimente",
    "default_unit": "g",
    "calories_per_100g": 120,
    "protein_per_100g": 12,
    "carbs_per_100g": 2,
    "fat_per_100g": 7,
    "allergens": [
      "soia"
    ],
    "estimated_price_per_kg_ron": 24
  },
  {
    "id": "ing-60",
    "name_ro": "Turkey breast fillet",
    "name_en": "Turkey breast fillet",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 110,
    "protein_per_100g": 24,
    "carbs_per_100g": 0,
    "fat_per_100g": 1.5,
    "allergens": [],
    "estimated_price_per_kg_ron": 38.99
  },
  {
    "id": "ing-61",
    "name_ro": "Fresh trout",
    "name_en": "Fresh trout",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 141,
    "protein_per_100g": 20,
    "carbs_per_100g": 0,
    "fat_per_100g": 6.6,
    "allergens": [
      "peste_fructe_de_mare"
    ],
    "estimated_price_per_kg_ron": 36
  },
  {
    "id": "ing-62",
    "name_ro": "Green peas",
    "name_en": "Green peas",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 81,
    "protein_per_100g": 5.4,
    "carbs_per_100g": 14.5,
    "fat_per_100g": 0.4,
    "allergens": [],
    "estimated_price_per_kg_ron": 8.5
  },
  {
    "id": "ing-63",
    "name_ro": "Kalamata olives",
    "name_en": "Kalamata olives",
    "category": "bacanie_condimente",
    "default_unit": "g",
    "calories_per_100g": 239,
    "protein_per_100g": 1.8,
    "carbs_per_100g": 6,
    "fat_per_100g": 22,
    "allergens": [],
    "estimated_price_per_kg_ron": 32
  },
  {
    "id": "ing-64",
    "name_ro": "Fresh dill and parsley",
    "name_en": "Fresh dill and parsley",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 36,
    "protein_per_100g": 3,
    "carbs_per_100g": 6,
    "fat_per_100g": 0.5,
    "allergens": [],
    "estimated_price_per_kg_ron": 20
  },
  {
    "id": "ing-65",
    "name_ro": "Zucchini",
    "name_en": "Zucchini",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 17,
    "protein_per_100g": 1.2,
    "carbs_per_100g": 3.1,
    "fat_per_100g": 0.3,
    "allergens": [],
    "estimated_price_per_kg_ron": 6.99
  },
  {
    "id": "ing-66",
    "name_ro": "Chicken livers",
    "name_en": "Chicken livers",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 119,
    "protein_per_100g": 17,
    "carbs_per_100g": 0.7,
    "fat_per_100g": 4.8,
    "allergens": [],
    "estimated_price_per_kg_ron": 16.5
  },
  {
    "id": "ing-67",
    "name_ro": "Sugar-free oat granola",
    "name_en": "Sugar-free oat granola",
    "category": "panificatie_cereale",
    "default_unit": "g",
    "calories_per_100g": 420,
    "protein_per_100g": 12,
    "carbs_per_100g": 58,
    "fat_per_100g": 15,
    "allergens": [
      "gluten",
      "arahide_nuci"
    ],
    "estimated_price_per_kg_ron": 28
  },
  {
    "id": "ing-68",
    "name_ro": "Raspberries",
    "name_en": "Raspberries",
    "category": "legume_fructe",
    "default_unit": "g",
    "calories_per_100g": 52,
    "protein_per_100g": 1.2,
    "carbs_per_100g": 11.9,
    "fat_per_100g": 0.7,
    "allergens": [],
    "estimated_price_per_kg_ron": 48
  },
  {
    "id": "ing-69",
    "name_ro": "Turkey breast ham lean",
    "name_en": "Turkey breast ham lean",
    "category": "carne_peste",
    "default_unit": "g",
    "calories_per_100g": 95,
    "protein_per_100g": 19,
    "carbs_per_100g": 1,
    "fat_per_100g": 1.5,
    "allergens": [],
    "estimated_price_per_kg_ron": 39
  }
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    "id": "rec-1",
    "spoonacular_id": 1001,
    "title_ro": "Overnight Oats with Blueberries & Greek Yogurt",
    "title_en": "Overnight Oats with Blueberries & Greek Yogurt",
    "description_ro": "A protein- and fiber-rich breakfast prepared in just 5 minutes the night before. Provides sustained satiety and clean morning energy.",
    "image_url": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 0,
    "servings_default": 1,
    "meal_types": [
      "breakfast"
    ],
    "calories": 385,
    "protein_g": 21,
    "carbs_g": 54,
    "fat_g": 8,
    "fiber_g": 7,
    "calories_per_100g": 145,
    "protein_per_100g": 7.9,
    "carbs_per_100g": 20.3,
    "fat_per_100g": 3,
    "allergens": [
      "gluten",
      "lactoza"
    ],
    "diet_tags": [
      "vegetarian",
      "bogata_in_proteine"
    ],
    "equipment_needed": [],
    "instructions_ro": [
      "In a mason jar or glass bowl, add 50g rolled oats and 10g chia seeds.",
      "Pour in 100ml milk and stir thoroughly with a spoon.",
      "Fold in 100g Greek yogurt (2%) and 1 teaspoon of honey (10g).",
      "Top with 50g fresh or frozen blueberries.",
      "Cover and refrigerate overnight (or for at least 4 hours)."
    ],
    "ingredients": [
      {
        "id": "ri-1-1",
        "recipe_id": "rec-1",
        "ingredient_id": "ing-40",
        "ingredient": {
          "id": "ing-40",
          "name_ro": "Rolled oats",
          "name_en": "Rolled oats",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 389,
          "protein_per_100g": 16.9,
          "carbs_per_100g": 66.3,
          "fat_per_100g": 6.9,
          "allergens": [
            "gluten"
          ],
          "estimated_price_per_kg_ron": 7.99
        },
        "amount_grams": 50,
        "unit_display": "50g rolled oats"
      },
      {
        "id": "ri-1-2",
        "recipe_id": "rec-1",
        "ingredient_id": "ing-31",
        "ingredient": {
          "id": "ing-31",
          "name_ro": "Greek yogurt 2%",
          "name_en": "Greek yogurt 2%",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 73,
          "protein_per_100g": 10,
          "carbs_per_100g": 3.8,
          "fat_per_100g": 2,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 16.5
        },
        "amount_grams": 100,
        "unit_display": "100g Greek yogurt 2%"
      },
      {
        "id": "ri-1-3",
        "recipe_id": "rec-1",
        "ingredient_id": "ing-33",
        "ingredient": {
          "id": "ing-33",
          "name_ro": "Cow milk 1.5%",
          "name_en": "Cow milk 1.5%",
          "category": "lactate_oua",
          "default_unit": "ml",
          "calories_per_100g": 45,
          "protein_per_100g": 3.2,
          "carbs_per_100g": 4.8,
          "fat_per_100g": 1.5,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 6.2
        },
        "amount_grams": 100,
        "unit_display": "100ml milk 1.5%"
      },
      {
        "id": "ri-1-4",
        "recipe_id": "rec-1",
        "ingredient_id": "ing-54",
        "ingredient": {
          "id": "ing-54",
          "name_ro": "Chia seeds",
          "name_en": "Chia seeds",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 486,
          "protein_per_100g": 16.5,
          "carbs_per_100g": 42.1,
          "fat_per_100g": 30.7,
          "allergens": [],
          "estimated_price_per_kg_ron": 32
        },
        "amount_grams": 10,
        "unit_display": "10g chia seeds"
      },
      {
        "id": "ri-1-5",
        "recipe_id": "rec-1",
        "ingredient_id": "ing-11",
        "ingredient": {
          "id": "ing-11",
          "name_ro": "Fresh blueberries",
          "name_en": "Fresh blueberries",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 57,
          "protein_per_100g": 0.7,
          "carbs_per_100g": 14.5,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 45
        },
        "amount_grams": 50,
        "unit_display": "50g fresh blueberries"
      },
      {
        "id": "ri-1-6",
        "recipe_id": "rec-1",
        "ingredient_id": "ing-55",
        "ingredient": {
          "id": "ing-55",
          "name_ro": "Polyfloral honey",
          "name_en": "Polyfloral honey",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 304,
          "protein_per_100g": 0.3,
          "carbs_per_100g": 82.4,
          "fat_per_100g": 0,
          "allergens": [],
          "estimated_price_per_kg_ron": 28
        },
        "amount_grams": 10,
        "unit_display": "1 tsp honey (10g)"
      }
    ],
    "description_en": "A protein- and fiber-rich breakfast prepared in just 5 minutes the night before. Provides sustained satiety and clean morning energy.",
    "instructions_en": [
      "In a mason jar or glass bowl, add 50g rolled oats and 10g chia seeds.",
      "Pour in 100ml milk and stir thoroughly with a spoon.",
      "Fold in 100g Greek yogurt (2%) and 1 teaspoon of honey (10g).",
      "Top with 50g fresh or frozen blueberries.",
      "Cover and refrigerate overnight (or for at least 4 hours)."
    ]
  },
  {
    "id": "rec-2",
    "spoonacular_id": 1002,
    "title_ro": "Fluffy Omelette with Mushrooms, Spinach & Telemea",
    "title_en": "Fluffy Omelette with Mushrooms, Spinach & Telemea",
    "description_ro": "Classic fluffy omelette loaded with protein and micronutrients, pan-seared with fresh eggs, mushrooms, and spinach.",
    "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 8,
    "servings_default": 1,
    "meal_types": [
      "breakfast"
    ],
    "calories": 360,
    "protein_g": 24,
    "carbs_g": 5,
    "fat_g": 27,
    "fiber_g": 2,
    "calories_per_100g": 138,
    "protein_per_100g": 9.2,
    "carbs_per_100g": 1.9,
    "fat_per_100g": 10.3,
    "allergens": [
      "oua",
      "lactoza"
    ],
    "diet_tags": [
      "vegetarian",
      "low_carb",
      "bogata_in_proteine"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Wash and slice 80g white button mushrooms.",
      "Heat 5ml extra virgin olive oil in a non-stick skillet over medium heat.",
      "Sauté mushrooms for 3-4 minutes, then add 40g baby spinach until just wilted (1 minute).",
      "In a bowl, whisk 2 whole eggs with a pinch of salt and black pepper.",
      "Pour eggs over the vegetables, let set at the base, then sprinkle 40g crumbled telemea or feta cheese.",
      "Fold the omelette in half and serve warm with a sliced tomato."
    ],
    "ingredients": [
      {
        "id": "ri-2-1",
        "recipe_id": "rec-2",
        "ingredient_id": "ing-25",
        "ingredient": {
          "id": "ing-25",
          "name_ro": "Fresh eggs L",
          "name_en": "Fresh eggs L",
          "category": "lactate_oua",
          "default_unit": "buc",
          "calories_per_100g": 143,
          "protein_per_100g": 12.6,
          "carbs_per_100g": 0.7,
          "fat_per_100g": 9.5,
          "allergens": [
            "oua"
          ],
          "estimated_price_per_kg_ron": 18
        },
        "amount_grams": 120,
        "unit_display": "2 large eggs"
      },
      {
        "id": "ri-2-2",
        "recipe_id": "rec-2",
        "ingredient_id": "ing-14",
        "ingredient": {
          "id": "ing-14",
          "name_ro": "White mushrooms",
          "name_en": "White mushrooms",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 22,
          "protein_per_100g": 3.1,
          "carbs_per_100g": 3.3,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 13.99
        },
        "amount_grams": 80,
        "unit_display": "80g fresh mushrooms"
      },
      {
        "id": "ri-2-3",
        "recipe_id": "rec-2",
        "ingredient_id": "ing-5",
        "ingredient": {
          "id": "ing-5",
          "name_ro": "Baby spinach",
          "name_en": "Baby spinach",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 23,
          "protein_per_100g": 2.9,
          "carbs_per_100g": 3.6,
          "fat_per_100g": 0.4,
          "allergens": [],
          "estimated_price_per_kg_ron": 34
        },
        "amount_grams": 40,
        "unit_display": "40g baby spinach"
      },
      {
        "id": "ri-2-4",
        "recipe_id": "rec-2",
        "ingredient_id": "ing-30",
        "ingredient": {
          "id": "ing-30",
          "name_ro": "Romanian cows telemea cheese",
          "name_en": "Romanian cows telemea cheese",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 260,
          "protein_per_100g": 18,
          "carbs_per_100g": 1.5,
          "fat_per_100g": 20,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 38
        },
        "amount_grams": 40,
        "unit_display": "40g telemea cheese"
      },
      {
        "id": "ri-2-5",
        "recipe_id": "rec-2",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 5,
        "unit_display": "1 tsp olive oil"
      }
    ],
    "description_en": "Classic fluffy omelette loaded with protein and micronutrients, pan-seared with fresh eggs, mushrooms, and spinach.",
    "instructions_en": [
      "Wash and slice 80g white button mushrooms.",
      "Heat 5ml extra virgin olive oil in a non-stick skillet over medium heat.",
      "Sauté mushrooms for 3-4 minutes, then add 40g baby spinach until just wilted (1 minute).",
      "In a bowl, whisk 2 whole eggs with a pinch of salt and black pepper.",
      "Pour eggs over the vegetables, let set at the base, then sprinkle 40g crumbled telemea or feta cheese.",
      "Fold the omelette in half and serve warm with a sliced tomato."
    ]
  },
  {
    "id": "rec-3",
    "spoonacular_id": 1003,
    "title_ro": "Whole Grain Toast with Mashed Avocado & Soft Egg",
    "title_en": "Whole Grain Toast with Mashed Avocado & Soft Egg",
    "description_ro": "Crisp whole grain rye toast topped with freshly mashed avocado, fresh lemon juice, and a soft-boiled egg.",
    "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 6,
    "servings_default": 1,
    "meal_types": [
      "breakfast"
    ],
    "calories": 345,
    "protein_g": 15,
    "carbs_g": 28,
    "fat_g": 19,
    "fiber_g": 7,
    "calories_per_100g": 150,
    "protein_per_100g": 6.5,
    "carbs_per_100g": 12.2,
    "fat_per_100g": 8.3,
    "allergens": [
      "gluten",
      "oua",
      "susan"
    ],
    "diet_tags": [
      "vegetarian",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Toast 60g whole grain rye bread in a toaster or dry pan until golden and crisp.",
      "Mash 60g avocado pulp with a fork, seasoning with salt, pepper, and a few drops of lemon juice.",
      "Boil 1 large egg for 6 minutes for a creamy runny yolk, peel and slice in half.",
      "Spread mashed avocado over toast, place egg on top, and serve with fresh tomato slices."
    ],
    "ingredients": [
      {
        "id": "ri-3-1",
        "recipe_id": "rec-3",
        "ingredient_id": "ing-41",
        "ingredient": {
          "id": "ing-41",
          "name_ro": "Whole grain rye bread",
          "name_en": "Whole grain rye bread",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 240,
          "protein_per_100g": 9,
          "carbs_per_100g": 43,
          "fat_per_100g": 3.5,
          "allergens": [
            "gluten",
            "susan"
          ],
          "estimated_price_per_kg_ron": 12
        },
        "amount_grams": 60,
        "unit_display": "2 slices whole grain bread (60g)"
      },
      {
        "id": "ri-3-2",
        "recipe_id": "rec-3",
        "ingredient_id": "ing-12",
        "ingredient": {
          "id": "ing-12",
          "name_ro": "Avocado Hass",
          "name_en": "Avocado Hass",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 160,
          "protein_per_100g": 2,
          "carbs_per_100g": 8.5,
          "fat_per_100g": 14.7,
          "allergens": [],
          "estimated_price_per_kg_ron": 24
        },
        "amount_grams": 60,
        "unit_display": "1/2 medium avocado (60g)"
      },
      {
        "id": "ri-3-3",
        "recipe_id": "rec-3",
        "ingredient_id": "ing-25",
        "ingredient": {
          "id": "ing-25",
          "name_ro": "Fresh eggs L",
          "name_en": "Fresh eggs L",
          "category": "lactate_oua",
          "default_unit": "buc",
          "calories_per_100g": 143,
          "protein_per_100g": 12.6,
          "carbs_per_100g": 0.7,
          "fat_per_100g": 9.5,
          "allergens": [
            "oua"
          ],
          "estimated_price_per_kg_ron": 18
        },
        "amount_grams": 60,
        "unit_display": "1 large egg"
      },
      {
        "id": "ri-3-4",
        "recipe_id": "rec-3",
        "ingredient_id": "ing-1",
        "ingredient": {
          "id": "ing-1",
          "name_ro": "Fresh tomatoes",
          "name_en": "Fresh tomatoes",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 18,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 3.9,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 9.99
        },
        "amount_grams": 70,
        "unit_display": "1 small tomato"
      }
    ],
    "description_en": "Crisp whole grain rye toast topped with freshly mashed avocado, fresh lemon juice, and a soft-boiled egg.",
    "instructions_en": [
      "Toast 60g whole grain rye bread in a toaster or dry pan until golden and crisp.",
      "Mash 60g avocado pulp with a fork, seasoning with salt, pepper, and a few drops of lemon juice.",
      "Boil 1 large egg for 6 minutes for a creamy runny yolk, peel and slice in half.",
      "Spread mashed avocado over toast, place egg on top, and serve with fresh tomato slices."
    ]
  },
  {
    "id": "rec-4",
    "spoonacular_id": 1004,
    "title_ro": "Grilled Chicken Breast with Basmati Rice & Steamed Broccoli",
    "title_en": "Grilled Chicken Breast with Basmati Rice & Steamed Broccoli",
    "description_ro": "Clean lean protein, complex slow-digesting carbohydrates for lasting energy, and essential vitamins from tender steamed broccoli.",
    "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 10,
    "cook_time_minutes": 18,
    "servings_default": 1,
    "meal_types": [
      "lunch",
      "dinner"
    ],
    "calories": 520,
    "protein_g": 46,
    "carbs_g": 58,
    "fat_g": 10,
    "fiber_g": 6,
    "calories_per_100g": 110,
    "protein_per_100g": 9.8,
    "carbs_per_100g": 12.3,
    "fat_per_100g": 2.1,
    "allergens": [],
    "diet_tags": [
      "bogata_in_proteine",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita",
      "gratar"
    ],
    "instructions_ro": [
      "Season 180g skinless chicken breast with salt, pepper, paprika, and garlic powder.",
      "Cook basmati rice (70g dry) in 140ml lightly salted water for 12-14 minutes on low heat with the lid on.",
      "Grill chicken breast on a hot grill pan for 4-5 minutes per side until thoroughly cooked.",
      "Steam broccoli florets (150g) for 4 minutes until vibrant green and tender-crisp.",
      "Plate the chicken and rice, drizzling the broccoli with 5ml olive oil and fresh lemon juice."
    ],
    "ingredients": [
      {
        "id": "ri-4-1",
        "recipe_id": "rec-4",
        "ingredient_id": "ing-20",
        "ingredient": {
          "id": "ing-20",
          "name_ro": "Skinless chicken breast",
          "name_en": "Skinless chicken breast",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 120,
          "protein_per_100g": 22.5,
          "carbs_per_100g": 0,
          "fat_per_100g": 2.6,
          "allergens": [],
          "estimated_price_per_kg_ron": 28.5
        },
        "amount_grams": 180,
        "unit_display": "180g chicken breast"
      },
      {
        "id": "ri-4-2",
        "recipe_id": "rec-4",
        "ingredient_id": "ing-43",
        "ingredient": {
          "id": "ing-43",
          "name_ro": "Basmati rice",
          "name_en": "Basmati rice",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 355,
          "protein_per_100g": 8,
          "carbs_per_100g": 78,
          "fat_per_100g": 0.8,
          "allergens": [],
          "estimated_price_per_kg_ron": 10.99
        },
        "amount_grams": 70,
        "unit_display": "70g basmati rice"
      },
      {
        "id": "ri-4-3",
        "recipe_id": "rec-4",
        "ingredient_id": "ing-8",
        "ingredient": {
          "id": "ing-8",
          "name_ro": "Fresh broccoli",
          "name_en": "Fresh broccoli",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 34,
          "protein_per_100g": 2.8,
          "carbs_per_100g": 6.6,
          "fat_per_100g": 0.4,
          "allergens": [],
          "estimated_price_per_kg_ron": 11.9
        },
        "amount_grams": 150,
        "unit_display": "150g fresh broccoli"
      },
      {
        "id": "ri-4-4",
        "recipe_id": "rec-4",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 5,
        "unit_display": "1 tsp olive oil"
      }
    ],
    "description_en": "Clean lean protein, complex slow-digesting carbohydrates for lasting energy, and essential vitamins from tender steamed broccoli.",
    "instructions_en": [
      "Season 180g skinless chicken breast with salt, pepper, paprika, and garlic powder.",
      "Cook basmati rice (70g dry) in 140ml lightly salted water for 12-14 minutes on low heat with the lid on.",
      "Grill chicken breast on a hot grill pan for 4-5 minutes per side until thoroughly cooked.",
      "Steam broccoli florets (150g) for 4 minutes until vibrant green and tender-crisp.",
      "Plate the chicken and rice, drizzling the broccoli with 5ml olive oil and fresh lemon juice."
    ]
  },
  {
    "id": "rec-5",
    "spoonacular_id": 1005,
    "title_ro": "Traditional Polenta with Romanian Telemea Cheese & Egg",
    "title_en": "Traditional Polenta with Romanian Telemea Cheese & Egg",
    "description_ro": "Authentic comfort food: warm golden cornmeal polenta topped with crumbled telemea cheese and a soft egg. Naturally gluten-free.",
    "image_url": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 15,
    "servings_default": 1,
    "meal_types": [
      "lunch",
      "dinner"
    ],
    "calories": 460,
    "protein_g": 22,
    "carbs_g": 54,
    "fat_g": 17,
    "fiber_g": 4,
    "calories_per_100g": 125,
    "protein_per_100g": 6,
    "carbs_per_100g": 14.7,
    "fat_per_100g": 4.6,
    "allergens": [
      "lactoza",
      "oua"
    ],
    "diet_tags": [
      "vegetarian",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Bring 250ml water to a boil with a pinch of salt.",
      "Whisk in 70g fine cornmeal in a steady stream to prevent lumps.",
      "Simmer on low heat for 10-12 minutes, stirring regularly with a wooden spoon until thick.",
      "In a small skillet, fry or poach 1 egg with a light touch of butter.",
      "Spoon steaming polenta onto your plate, top with 60g crumbled telemea cheese, and crown with the soft egg."
    ],
    "ingredients": [
      {
        "id": "ri-5-1",
        "recipe_id": "rec-5",
        "ingredient_id": "ing-42",
        "ingredient": {
          "id": "ing-42",
          "name_ro": "Cornmeal for polenta",
          "name_en": "Cornmeal for polenta",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 350,
          "protein_per_100g": 7,
          "carbs_per_100g": 75,
          "fat_per_100g": 1.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 4.8
        },
        "amount_grams": 70,
        "unit_display": "70g polenta cornmeal"
      },
      {
        "id": "ri-5-2",
        "recipe_id": "rec-5",
        "ingredient_id": "ing-30",
        "ingredient": {
          "id": "ing-30",
          "name_ro": "Romanian cows telemea cheese",
          "name_en": "Romanian cows telemea cheese",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 260,
          "protein_per_100g": 18,
          "carbs_per_100g": 1.5,
          "fat_per_100g": 20,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 38
        },
        "amount_grams": 60,
        "unit_display": "60g telemea cheese"
      },
      {
        "id": "ri-5-3",
        "recipe_id": "rec-5",
        "ingredient_id": "ing-25",
        "ingredient": {
          "id": "ing-25",
          "name_ro": "Fresh eggs L",
          "name_en": "Fresh eggs L",
          "category": "lactate_oua",
          "default_unit": "buc",
          "calories_per_100g": 143,
          "protein_per_100g": 12.6,
          "carbs_per_100g": 0.7,
          "fat_per_100g": 9.5,
          "allergens": [
            "oua"
          ],
          "estimated_price_per_kg_ron": 18
        },
        "amount_grams": 60,
        "unit_display": "1 large egg"
      },
      {
        "id": "ri-5-4",
        "recipe_id": "rec-5",
        "ingredient_id": "ing-34",
        "ingredient": {
          "id": "ing-34",
          "name_ro": "Butter 82%",
          "name_en": "Butter 82%",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 740,
          "protein_per_100g": 0.8,
          "carbs_per_100g": 0.7,
          "fat_per_100g": 82,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 5,
        "unit_display": "5g butter"
      }
    ],
    "description_en": "Authentic comfort food: warm golden cornmeal polenta topped with crumbled telemea cheese and a soft egg. Naturally gluten-free.",
    "instructions_en": [
      "Bring 250ml water to a boil with a pinch of salt.",
      "Whisk in 70g fine cornmeal in a steady stream to prevent lumps.",
      "Simmer on low heat for 10-12 minutes, stirring regularly with a wooden spoon until thick.",
      "In a small skillet, fry or poach 1 egg with a light touch of butter.",
      "Spoon steaming polenta onto your plate, top with 60g crumbled telemea cheese, and crown with the soft egg."
    ]
  },
  {
    "id": "rec-6",
    "spoonacular_id": 1006,
    "title_ro": "Hearty Lentil Stew with Vegetables & Herbs",
    "title_en": "Hearty Lentil Stew with Vegetables & Herbs",
    "description_ro": "Hearty plant-based lentil stew, budget-friendly and packed with dietary fiber, iron, and aromatic garden herbs.",
    "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 10,
    "cook_time_minutes": 25,
    "servings_default": 1,
    "meal_types": [
      "lunch",
      "dinner"
    ],
    "calories": 410,
    "protein_g": 22,
    "carbs_g": 62,
    "fat_g": 8,
    "fiber_g": 16,
    "calories_per_100g": 95,
    "protein_per_100g": 5.1,
    "carbs_per_100g": 14.4,
    "fat_per_100g": 1.8,
    "allergens": [],
    "diet_tags": [
      "vegetarian",
      "vegan",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Finely dice 1/2 yellow onion (50g), 1 garlic clove, and 1/2 carrot (50g).",
      "In a pot, sauté onion and carrot in 10ml olive oil for 4 minutes.",
      "Add 80g rinsed brown lentils and 250ml hot water or vegetable broth.",
      "Simmer on medium heat for 20 minutes until lentils are tender.",
      "Stir in 100g chopped tomatoes, diced red bell pepper, salt, pepper, thyme, and bay leaf; simmer 5 more minutes.",
      "Garnish with freshly chopped flat-leaf parsley before serving."
    ],
    "ingredients": [
      {
        "id": "ri-6-1",
        "recipe_id": "rec-6",
        "ingredient_id": "ing-51",
        "ingredient": {
          "id": "ing-51",
          "name_ro": "Brown / green lentils",
          "name_en": "Brown / green lentils",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 350,
          "protein_per_100g": 24.5,
          "carbs_per_100g": 60,
          "fat_per_100g": 1.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 9.9
        },
        "amount_grams": 80,
        "unit_display": "80g dry lentils"
      },
      {
        "id": "ri-6-2",
        "recipe_id": "rec-6",
        "ingredient_id": "ing-3",
        "ingredient": {
          "id": "ing-3",
          "name_ro": "Yellow onion",
          "name_en": "Yellow onion",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 40,
          "protein_per_100g": 1.1,
          "carbs_per_100g": 9.3,
          "fat_per_100g": 0.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 3.99
        },
        "amount_grams": 50,
        "unit_display": "1/2 yellow onion"
      },
      {
        "id": "ri-6-3",
        "recipe_id": "rec-6",
        "ingredient_id": "ing-7",
        "ingredient": {
          "id": "ing-7",
          "name_ro": "Carrots",
          "name_en": "Carrots",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 41,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 9.6,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 4.29
        },
        "amount_grams": 50,
        "unit_display": "1/2 carrot"
      },
      {
        "id": "ri-6-4",
        "recipe_id": "rec-6",
        "ingredient_id": "ing-1",
        "ingredient": {
          "id": "ing-1",
          "name_ro": "Fresh tomatoes",
          "name_en": "Fresh tomatoes",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 18,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 3.9,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 9.99
        },
        "amount_grams": 100,
        "unit_display": "100g fresh tomatoes"
      },
      {
        "id": "ri-6-5",
        "recipe_id": "rec-6",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 10,
        "unit_display": "10ml olive oil"
      }
    ],
    "description_en": "Hearty plant-based lentil stew, budget-friendly and packed with dietary fiber, iron, and aromatic garden herbs.",
    "instructions_en": [
      "Finely dice 1/2 yellow onion (50g), 1 garlic clove, and 1/2 carrot (50g).",
      "In a pot, sauté onion and carrot in 10ml olive oil for 4 minutes.",
      "Add 80g rinsed brown lentils and 250ml hot water or vegetable broth.",
      "Simmer on medium heat for 20 minutes until lentils are tender.",
      "Stir in 100g chopped tomatoes, diced red bell pepper, salt, pepper, thyme, and bay leaf; simmer 5 more minutes.",
      "Garnish with freshly chopped flat-leaf parsley before serving."
    ]
  },
  {
    "id": "rec-7",
    "spoonacular_id": 1007,
    "title_ro": "Baked Salmon Fillet with Roasted Potatoes & Broccoli",
    "title_en": "Baked Salmon Fillet with Roasted Potatoes & Broccoli",
    "description_ro": "Premium dinner rich in Omega-3 fatty acids and lean protein. Bakes quickly in the oven or air fryer with golden crispy potatoes.",
    "image_url": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 10,
    "cook_time_minutes": 22,
    "servings_default": 1,
    "meal_types": [
      "dinner",
      "lunch"
    ],
    "calories": 540,
    "protein_g": 38,
    "carbs_g": 32,
    "fat_g": 27,
    "fiber_g": 5,
    "calories_per_100g": 135,
    "protein_per_100g": 9.5,
    "carbs_per_100g": 8,
    "fat_per_100g": 6.8,
    "allergens": [
      "peste_fructe_de_mare"
    ],
    "diet_tags": [
      "pescetarian",
      "bogata_in_proteine"
    ],
    "equipment_needed": [
      "cuptor",
      "airfryer"
    ],
    "instructions_ro": [
      "Preheat oven to 200°C (400°F) or air fryer to 190°C (375°F).",
      "Dice 150g potatoes into small cubes and toss with 5ml olive oil, rosemary, salt, and pepper.",
      "Roast potatoes for 12 minutes before adding the fish.",
      "Season 160g salmon fillet with lemon juice, minced garlic, and fresh dill.",
      "Place salmon and 100g broccoli florets beside the potatoes and roast 10-12 minutes until salmon flakes easily."
    ],
    "ingredients": [
      {
        "id": "ri-7-1",
        "recipe_id": "rec-7",
        "ingredient_id": "ing-22",
        "ingredient": {
          "id": "ing-22",
          "name_ro": "Fresh salmon fillet",
          "name_en": "Fresh salmon fillet",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 208,
          "protein_per_100g": 20.4,
          "carbs_per_100g": 0,
          "fat_per_100g": 13.4,
          "allergens": [
            "peste_fructe_de_mare"
          ],
          "estimated_price_per_kg_ron": 79.99
        },
        "amount_grams": 160,
        "unit_display": "160g salmon fillet"
      },
      {
        "id": "ri-7-2",
        "recipe_id": "rec-7",
        "ingredient_id": "ing-13",
        "ingredient": {
          "id": "ing-13",
          "name_ro": "White potatoes",
          "name_en": "White potatoes",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 77,
          "protein_per_100g": 2,
          "carbs_per_100g": 17.5,
          "fat_per_100g": 0.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 3.49
        },
        "amount_grams": 150,
        "unit_display": "150g potatoes"
      },
      {
        "id": "ri-7-3",
        "recipe_id": "rec-7",
        "ingredient_id": "ing-8",
        "ingredient": {
          "id": "ing-8",
          "name_ro": "Fresh broccoli",
          "name_en": "Fresh broccoli",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 34,
          "protein_per_100g": 2.8,
          "carbs_per_100g": 6.6,
          "fat_per_100g": 0.4,
          "allergens": [],
          "estimated_price_per_kg_ron": 11.9
        },
        "amount_grams": 100,
        "unit_display": "100g broccoli"
      },
      {
        "id": "ri-7-4",
        "recipe_id": "rec-7",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 5,
        "unit_display": "1 tsp olive oil"
      }
    ],
    "description_en": "Premium dinner rich in Omega-3 fatty acids and lean protein. Bakes quickly in the oven or air fryer with golden crispy potatoes.",
    "instructions_en": [
      "Preheat oven to 200°C (400°F) or air fryer to 190°C (375°F).",
      "Dice 150g potatoes into small cubes and toss with 5ml olive oil, rosemary, salt, and pepper.",
      "Roast potatoes for 12 minutes before adding the fish.",
      "Season 160g salmon fillet with lemon juice, minced garlic, and fresh dill.",
      "Place salmon and 100g broccoli florets beside the potatoes and roast 10-12 minutes until salmon flakes easily."
    ]
  },
  {
    "id": "rec-8",
    "spoonacular_id": 1008,
    "title_ro": "Mediterranean Tuna & Chickpea Salad Bowl",
    "title_en": "Mediterranean Tuna & Chickpea Salad Bowl",
    "description_ro": "Ready in 7 minutes with zero cooking required! Perfect for busy workdays and meal prepping.",
    "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 7,
    "cook_time_minutes": 0,
    "servings_default": 1,
    "meal_types": [
      "lunch",
      "dinner"
    ],
    "calories": 420,
    "protein_g": 36,
    "carbs_g": 34,
    "fat_g": 14,
    "fiber_g": 8,
    "calories_per_100g": 105,
    "protein_per_100g": 9,
    "carbs_per_100g": 8.5,
    "fat_per_100g": 3.5,
    "allergens": [
      "peste_fructe_de_mare"
    ],
    "diet_tags": [
      "pescetarian",
      "bogata_in_proteine",
      "fara_porc"
    ],
    "equipment_needed": [],
    "instructions_ro": [
      "Drain 1 can of tuna in spring water (120g).",
      "Rinse and drain 120g cooked chickpeas.",
      "Dice 1 tomato, 1 cucumber, and 1/4 red bell pepper.",
      "Combine all ingredients in a large salad bowl.",
      "Dress with 10ml extra virgin olive oil, lemon juice, sea salt, dried oregano, and fresh parsley."
    ],
    "ingredients": [
      {
        "id": "ri-8-1",
        "recipe_id": "rec-8",
        "ingredient_id": "ing-27",
        "ingredient": {
          "id": "ing-27",
          "name_ro": "Canned tuna in water",
          "name_en": "Canned tuna in water",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 116,
          "protein_per_100g": 26,
          "carbs_per_100g": 0,
          "fat_per_100g": 1,
          "allergens": [
            "peste_fructe_de_mare"
          ],
          "estimated_price_per_kg_ron": 55
        },
        "amount_grams": 120,
        "unit_display": "1 can tuna in water (120g)"
      },
      {
        "id": "ri-8-2",
        "recipe_id": "rec-8",
        "ingredient_id": "ing-52",
        "ingredient": {
          "id": "ing-52",
          "name_ro": "Cooked chickpeas",
          "name_en": "Cooked chickpeas",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 130,
          "protein_per_100g": 8,
          "carbs_per_100g": 20,
          "fat_per_100g": 2.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 7.5
        },
        "amount_grams": 120,
        "unit_display": "120g cooked chickpeas"
      },
      {
        "id": "ri-8-3",
        "recipe_id": "rec-8",
        "ingredient_id": "ing-1",
        "ingredient": {
          "id": "ing-1",
          "name_ro": "Fresh tomatoes",
          "name_en": "Fresh tomatoes",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 18,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 3.9,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 9.99
        },
        "amount_grams": 100,
        "unit_display": "100g fresh tomatoes"
      },
      {
        "id": "ri-8-4",
        "recipe_id": "rec-8",
        "ingredient_id": "ing-2",
        "ingredient": {
          "id": "ing-2",
          "name_ro": "Cucumbers",
          "name_en": "Cucumbers",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 15,
          "protein_per_100g": 0.7,
          "carbs_per_100g": 3.6,
          "fat_per_100g": 0.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 7.49
        },
        "amount_grams": 80,
        "unit_display": "80g cucumber"
      },
      {
        "id": "ri-8-5",
        "recipe_id": "rec-8",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 10,
        "unit_display": "10ml olive oil"
      }
    ],
    "description_en": "Ready in 7 minutes with zero cooking required! Perfect for busy workdays and meal prepping.",
    "instructions_en": [
      "Drain 1 can of tuna in spring water (120g).",
      "Rinse and drain 120g cooked chickpeas.",
      "Dice 1 tomato, 1 cucumber, and 1/4 red bell pepper.",
      "Combine all ingredients in a large salad bowl.",
      "Dress with 10ml extra virgin olive oil, lemon juice, sea salt, dried oregano, and fresh parsley."
    ]
  },
  {
    "id": "rec-9",
    "spoonacular_id": 1009,
    "title_ro": "Greek Yogurt with Baked Apple, Cinnamon & Walnuts",
    "title_en": "Greek Yogurt with Baked Apple, Cinnamon & Walnuts",
    "description_ro": "Wholesome dessert or afternoon snack with the warm nostalgic flavor of spiced baked apples, with zero refined sugar.",
    "image_url": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 5,
    "servings_default": 1,
    "meal_types": [
      "snack"
    ],
    "calories": 235,
    "protein_g": 13,
    "carbs_g": 22,
    "fat_g": 10,
    "fiber_g": 3,
    "calories_per_100g": 110,
    "protein_per_100g": 6.1,
    "carbs_per_100g": 10.3,
    "fat_per_100g": 4.7,
    "allergens": [
      "lactoza",
      "arahide_nuci"
    ],
    "diet_tags": [
      "vegetarian",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Dice 1 medium apple (100g) into small cubes.",
      "Simmer apple in a small pan with 2 tbsp water and ground cinnamon for 4-5 minutes until tender and fragrant.",
      "Spoon 120g Greek yogurt (2%) into a bowl.",
      "Top with the warm spiced apples and sprinkle 15g chopped raw walnuts."
    ],
    "ingredients": [
      {
        "id": "ri-9-1",
        "recipe_id": "rec-9",
        "ingredient_id": "ing-31",
        "ingredient": {
          "id": "ing-31",
          "name_ro": "Greek yogurt 2%",
          "name_en": "Greek yogurt 2%",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 73,
          "protein_per_100g": 10,
          "carbs_per_100g": 3.8,
          "fat_per_100g": 2,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 16.5
        },
        "amount_grams": 120,
        "unit_display": "120g Greek yogurt 2%"
      },
      {
        "id": "ri-9-2",
        "recipe_id": "rec-9",
        "ingredient_id": "ing-9",
        "ingredient": {
          "id": "ing-9",
          "name_ro": "Apples",
          "name_en": "Apples",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 52,
          "protein_per_100g": 0.3,
          "carbs_per_100g": 13.8,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 5.49
        },
        "amount_grams": 100,
        "unit_display": "1 apple (100g)"
      },
      {
        "id": "ri-9-3",
        "recipe_id": "rec-9",
        "ingredient_id": "ing-53",
        "ingredient": {
          "id": "ing-53",
          "name_ro": "Walnuts",
          "name_en": "Walnuts",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 654,
          "protein_per_100g": 15.2,
          "carbs_per_100g": 13.7,
          "fat_per_100g": 65.2,
          "allergens": [
            "arahide_nuci"
          ],
          "estimated_price_per_kg_ron": 52
        },
        "amount_grams": 15,
        "unit_display": "15g walnuts"
      }
    ],
    "description_en": "Wholesome dessert or afternoon snack with the warm nostalgic flavor of spiced baked apples, with zero refined sugar.",
    "instructions_en": [
      "Dice 1 medium apple (100g) into small cubes.",
      "Simmer apple in a small pan with 2 tbsp water and ground cinnamon for 4-5 minutes until tender and fragrant.",
      "Spoon 120g Greek yogurt (2%) into a bowl.",
      "Top with the warm spiced apples and sprinkle 15g chopped raw walnuts."
    ]
  },
  {
    "id": "rec-10",
    "spoonacular_id": 1010,
    "title_ro": "Crunchy Veggie Sticks with Cottage Cheese Dip",
    "title_en": "Crunchy Veggie Sticks with Cottage Cheese Dip",
    "description_ro": "Light, hydrating, and low-calorie crunchy snack perfect for beating cravings between meals.",
    "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 0,
    "servings_default": 1,
    "meal_types": [
      "snack"
    ],
    "calories": 145,
    "protein_g": 14,
    "carbs_g": 13,
    "fat_g": 2,
    "fiber_g": 3,
    "calories_per_100g": 58,
    "protein_per_100g": 5.6,
    "carbs_per_100g": 5.2,
    "fat_per_100g": 0.8,
    "allergens": [
      "lactoza"
    ],
    "diet_tags": [
      "vegetarian",
      "low_carb",
      "fara_porc"
    ],
    "equipment_needed": [],
    "instructions_ro": [
      "Cut carrots and cucumbers into long matchstick batons.",
      "In a bowl, mix 100g cottage cheese with fresh dill, salt, and black pepper (optionally blend for smooth dip texture).",
      "Dip crunchy veggie batons into the herbed cottage cheese."
    ],
    "ingredients": [
      {
        "id": "ri-10-1",
        "recipe_id": "rec-10",
        "ingredient_id": "ing-32",
        "ingredient": {
          "id": "ing-32",
          "name_ro": "Low fat cottage cheese",
          "name_en": "Low fat cottage cheese",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 85,
          "protein_per_100g": 13,
          "carbs_per_100g": 3,
          "fat_per_100g": 1.8,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 22
        },
        "amount_grams": 100,
        "unit_display": "100g cottage cheese"
      },
      {
        "id": "ri-10-2",
        "recipe_id": "rec-10",
        "ingredient_id": "ing-7",
        "ingredient": {
          "id": "ing-7",
          "name_ro": "Carrots",
          "name_en": "Carrots",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 41,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 9.6,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 4.29
        },
        "amount_grams": 80,
        "unit_display": "80g carrot"
      },
      {
        "id": "ri-10-3",
        "recipe_id": "rec-10",
        "ingredient_id": "ing-2",
        "ingredient": {
          "id": "ing-2",
          "name_ro": "Cucumbers",
          "name_en": "Cucumbers",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 15,
          "protein_per_100g": 0.7,
          "carbs_per_100g": 3.6,
          "fat_per_100g": 0.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 7.49
        },
        "amount_grams": 80,
        "unit_display": "80g cucumber"
      }
    ],
    "description_en": "Light, hydrating, and low-calorie crunchy snack perfect for beating cravings between meals.",
    "instructions_en": [
      "Cut carrots and cucumbers into long matchstick batons.",
      "In a bowl, mix 100g cottage cheese with fresh dill, salt, and black pepper (optionally blend for smooth dip texture).",
      "Dip crunchy veggie batons into the herbed cottage cheese."
    ]
  },
  {
    "id": "rec-11",
    "spoonacular_id": 1011,
    "title_ro": "Roast Chicken Thighs with Garlic Potatoes",
    "title_en": "Roast Chicken Thighs with Garlic Potatoes",
    "description_ro": "Juicy roasted chicken thighs with golden garlic potatoes and aromatic thyme crust, baked to perfection.",
    "image_url": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 10,
    "cook_time_minutes": 35,
    "servings_default": 1,
    "meal_types": [
      "lunch",
      "dinner"
    ],
    "calories": 560,
    "protein_g": 40,
    "carbs_g": 38,
    "fat_g": 26,
    "fiber_g": 5,
    "calories_per_100g": 140,
    "protein_per_100g": 10,
    "carbs_per_100g": 9.5,
    "fat_per_100g": 6.5,
    "allergens": [],
    "diet_tags": [
      "fara_porc"
    ],
    "equipment_needed": [
      "cuptor"
    ],
    "instructions_ro": [
      "Preheat oven to 190°C (375°F).",
      "Arrange 180g boneless chicken thighs and 180g quartered potatoes in a baking dish.",
      "Crush 2 garlic cloves and mix with 5ml olive oil, salt, black pepper, paprika, and dried thyme.",
      "Rub chicken and potatoes evenly with the garlic herb marinade.",
      "Bake for 35-40 minutes until potatoes are tender inside and chicken skin is golden and crispy."
    ],
    "ingredients": [
      {
        "id": "ri-11-1",
        "recipe_id": "rec-11",
        "ingredient_id": "ing-21",
        "ingredient": {
          "id": "ing-21",
          "name_ro": "Chicken thighs boneless",
          "name_en": "Chicken thighs boneless",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 170,
          "protein_per_100g": 19.5,
          "carbs_per_100g": 0,
          "fat_per_100g": 10,
          "allergens": [],
          "estimated_price_per_kg_ron": 25.99
        },
        "amount_grams": 180,
        "unit_display": "180g chicken thighs"
      },
      {
        "id": "ri-11-2",
        "recipe_id": "rec-11",
        "ingredient_id": "ing-13",
        "ingredient": {
          "id": "ing-13",
          "name_ro": "White potatoes",
          "name_en": "White potatoes",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 77,
          "protein_per_100g": 2,
          "carbs_per_100g": 17.5,
          "fat_per_100g": 0.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 3.49
        },
        "amount_grams": 180,
        "unit_display": "180g potatoes"
      },
      {
        "id": "ri-11-3",
        "recipe_id": "rec-11",
        "ingredient_id": "ing-4",
        "ingredient": {
          "id": "ing-4",
          "name_ro": "Garlic",
          "name_en": "Garlic",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 149,
          "protein_per_100g": 6.4,
          "carbs_per_100g": 33.1,
          "fat_per_100g": 0.5,
          "allergens": [],
          "estimated_price_per_kg_ron": 18
        },
        "amount_grams": 8,
        "unit_display": "2 garlic cloves"
      },
      {
        "id": "ri-11-4",
        "recipe_id": "rec-11",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 5,
        "unit_display": "1 tsp olive oil"
      }
    ],
    "description_en": "Juicy roasted chicken thighs with golden garlic potatoes and aromatic thyme crust, baked to perfection.",
    "instructions_en": [
      "Preheat oven to 190°C (375°F).",
      "Arrange 180g boneless chicken thighs and 180g quartered potatoes in a baking dish.",
      "Crush 2 garlic cloves and mix with 5ml olive oil, salt, black pepper, paprika, and dried thyme.",
      "Rub chicken and potatoes evenly with the garlic herb marinade.",
      "Bake for 35-40 minutes until potatoes are tender inside and chicken skin is golden and crispy."
    ]
  },
  {
    "id": "rec-12",
    "spoonacular_id": 1012,
    "title_ro": "Crispy Pan-Seared Tofu with Stir-Fry Veggies & Rice",
    "title_en": "Crispy Pan-Seared Tofu with Stir-Fry Veggies & Rice",
    "description_ro": "High-protein vegan stir-fry with golden crisp tofu cubes, colorful peppers, and fluffy basmati rice.",
    "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "servings_default": 1,
    "meal_types": [
      "lunch",
      "dinner"
    ],
    "calories": 450,
    "protein_g": 23,
    "carbs_g": 58,
    "fat_g": 13,
    "fiber_g": 7,
    "calories_per_100g": 112,
    "protein_per_100g": 5.7,
    "carbs_per_100g": 14.5,
    "fat_per_100g": 3.2,
    "allergens": [
      "soia"
    ],
    "diet_tags": [
      "vegetarian",
      "vegan",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Press 150g firm tofu with a paper towel to remove excess moisture, then cut into 2cm cubes.",
      "Heat 10ml olive oil in a skillet and sear tofu for 6-8 minutes until golden on all sides.",
      "Transfer tofu to a plate and add sliced bell pepper (60g), mushrooms (60g), and onions (40g) to the pan.",
      "Stir-fry vegetables for 4-5 minutes, add minced garlic, and return tofu to the skillet.",
      "Serve over 60g cooked basmati rice."
    ],
    "ingredients": [
      {
        "id": "ri-12-1",
        "recipe_id": "rec-12",
        "ingredient_id": "ing-56",
        "ingredient": {
          "id": "ing-56",
          "name_ro": "Organic firm tofu",
          "name_en": "Organic firm tofu",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 120,
          "protein_per_100g": 12,
          "carbs_per_100g": 2,
          "fat_per_100g": 7,
          "allergens": [
            "soia"
          ],
          "estimated_price_per_kg_ron": 24
        },
        "amount_grams": 150,
        "unit_display": "150g firm tofu"
      },
      {
        "id": "ri-12-2",
        "recipe_id": "rec-12",
        "ingredient_id": "ing-43",
        "ingredient": {
          "id": "ing-43",
          "name_ro": "Basmati rice",
          "name_en": "Basmati rice",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 355,
          "protein_per_100g": 8,
          "carbs_per_100g": 78,
          "fat_per_100g": 0.8,
          "allergens": [],
          "estimated_price_per_kg_ron": 10.99
        },
        "amount_grams": 60,
        "unit_display": "60g basmati rice"
      },
      {
        "id": "ri-12-3",
        "recipe_id": "rec-12",
        "ingredient_id": "ing-6",
        "ingredient": {
          "id": "ing-6",
          "name_ro": "Red bell pepper",
          "name_en": "Red bell pepper",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 31,
          "protein_per_100g": 1,
          "carbs_per_100g": 6,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 12.99
        },
        "amount_grams": 60,
        "unit_display": "60g red bell pepper"
      },
      {
        "id": "ri-12-4",
        "recipe_id": "rec-12",
        "ingredient_id": "ing-14",
        "ingredient": {
          "id": "ing-14",
          "name_ro": "White mushrooms",
          "name_en": "White mushrooms",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 22,
          "protein_per_100g": 3.1,
          "carbs_per_100g": 3.3,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 13.99
        },
        "amount_grams": 60,
        "unit_display": "60g mushrooms"
      },
      {
        "id": "ri-12-5",
        "recipe_id": "rec-12",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 10,
        "unit_display": "10ml olive oil"
      }
    ],
    "description_en": "High-protein vegan stir-fry with golden crisp tofu cubes, colorful peppers, and fluffy basmati rice.",
    "instructions_en": [
      "Press 150g firm tofu with a paper towel to remove excess moisture, then cut into 2cm cubes.",
      "Heat 10ml olive oil in a skillet and sear tofu for 6-8 minutes until golden on all sides.",
      "Transfer tofu to a plate and add sliced bell pepper (60g), mushrooms (60g), and onions (40g) to the pan.",
      "Stir-fry vegetables for 4-5 minutes, add minced garlic, and return tofu to the skillet.",
      "Serve over 60g cooked basmati rice."
    ]
  },
  {
    "id": "rec-13",
    "spoonacular_id": 1013,
    "title_ro": "Whole Grain Pasta with Lean Beef Bolognese",
    "title_en": "Whole Grain Pasta with Lean Beef Bolognese",
    "description_ro": "Comforting hearty whole grain pasta with a rich lean ground beef bolognese sauce simmered with Italian herbs.",
    "image_url": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 8,
    "cook_time_minutes": 20,
    "servings_default": 1,
    "meal_types": [
      "lunch",
      "dinner"
    ],
    "calories": 510,
    "protein_g": 38,
    "carbs_g": 58,
    "fat_g": 13,
    "fiber_g": 9,
    "calories_per_100g": 125,
    "protein_per_100g": 9.3,
    "carbs_per_100g": 14.2,
    "fat_per_100g": 3.2,
    "allergens": [
      "gluten"
    ],
    "diet_tags": [
      "bogata_in_proteine",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Boil 70g whole wheat pasta in salted water according to package directions (about 9 minutes al dente).",
      "In a pan, sauté diced onion and minced garlic in 5ml olive oil for 2-3 minutes.",
      "Add 140g lean ground beef and brown thoroughly, breaking it apart with a spoon.",
      "Pour in 120g crushed tomatoes, basil, oregano, salt, and pepper.",
      "Simmer sauce on low heat for 12-15 minutes until thick, then toss with hot drained pasta."
    ],
    "ingredients": [
      {
        "id": "ri-13-1",
        "recipe_id": "rec-13",
        "ingredient_id": "ing-44",
        "ingredient": {
          "id": "ing-44",
          "name_ro": "Whole wheat pasta",
          "name_en": "Whole wheat pasta",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 348,
          "protein_per_100g": 13,
          "carbs_per_100g": 65,
          "fat_per_100g": 2,
          "allergens": [
            "gluten"
          ],
          "estimated_price_per_kg_ron": 9.5
        },
        "amount_grams": 70,
        "unit_display": "70g whole wheat pasta"
      },
      {
        "id": "ri-13-2",
        "recipe_id": "rec-13",
        "ingredient_id": "ing-24",
        "ingredient": {
          "id": "ing-24",
          "name_ro": "Lean ground beef",
          "name_en": "Lean ground beef",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 176,
          "protein_per_100g": 21,
          "carbs_per_100g": 0,
          "fat_per_100g": 10,
          "allergens": [],
          "estimated_price_per_kg_ron": 39.99
        },
        "amount_grams": 140,
        "unit_display": "140g lean ground beef"
      },
      {
        "id": "ri-13-3",
        "recipe_id": "rec-13",
        "ingredient_id": "ing-1",
        "ingredient": {
          "id": "ing-1",
          "name_ro": "Fresh tomatoes",
          "name_en": "Fresh tomatoes",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 18,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 3.9,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 9.99
        },
        "amount_grams": 120,
        "unit_display": "120g crushed tomatoes"
      },
      {
        "id": "ri-13-4",
        "recipe_id": "rec-13",
        "ingredient_id": "ing-3",
        "ingredient": {
          "id": "ing-3",
          "name_ro": "Yellow onion",
          "name_en": "Yellow onion",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 40,
          "protein_per_100g": 1.1,
          "carbs_per_100g": 9.3,
          "fat_per_100g": 0.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 3.99
        },
        "amount_grams": 40,
        "unit_display": "1/2 onion"
      },
      {
        "id": "ri-13-5",
        "recipe_id": "rec-13",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 5,
        "unit_display": "1 tsp olive oil"
      }
    ],
    "description_en": "Comforting hearty whole grain pasta with a rich lean ground beef bolognese sauce simmered with Italian herbs.",
    "instructions_en": [
      "Boil 70g whole wheat pasta in salted water according to package directions (about 9 minutes al dente).",
      "In a pan, sauté diced onion and minced garlic in 5ml olive oil for 2-3 minutes.",
      "Add 140g lean ground beef and brown thoroughly, breaking it apart with a spoon.",
      "Pour in 120g crushed tomatoes, basil, oregano, salt, and pepper.",
      "Simmer sauce on low heat for 12-15 minutes until thick, then toss with hot drained pasta."
    ]
  },
  {
    "id": "rec-14",
    "spoonacular_id": 1014,
    "title_ro": "Energy Snack with Banana & Walnuts",
    "title_en": "Energy Snack with Banana & Walnuts",
    "description_ro": "The ideal balance of fast-acting carbohydrates and heart-healthy fats, ideal as a pre- or post-workout fuel.",
    "image_url": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 2,
    "cook_time_minutes": 0,
    "servings_default": 1,
    "meal_types": [
      "snack"
    ],
    "calories": 220,
    "protein_g": 4,
    "carbs_g": 30,
    "fat_g": 10,
    "fiber_g": 4,
    "calories_per_100g": 157,
    "protein_per_100g": 2.8,
    "carbs_per_100g": 21.4,
    "fat_per_100g": 7.1,
    "allergens": [
      "arahide_nuci"
    ],
    "diet_tags": [
      "vegetarian",
      "vegan",
      "fara_porc"
    ],
    "equipment_needed": [],
    "instructions_ro": [
      "Peel 1 medium banana and slice into rounds.",
      "Sprinkle 15g raw chopped walnut halves over the banana slices.",
      "Enjoy fresh as a quick nutritious energy boost."
    ],
    "ingredients": [
      {
        "id": "ri-14-1",
        "recipe_id": "rec-14",
        "ingredient_id": "ing-10",
        "ingredient": {
          "id": "ing-10",
          "name_ro": "Bananas",
          "name_en": "Bananas",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 89,
          "protein_per_100g": 1.1,
          "carbs_per_100g": 22.8,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 6.99
        },
        "amount_grams": 120,
        "unit_display": "1 medium banana"
      },
      {
        "id": "ri-14-2",
        "recipe_id": "rec-14",
        "ingredient_id": "ing-53",
        "ingredient": {
          "id": "ing-53",
          "name_ro": "Walnuts",
          "name_en": "Walnuts",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 654,
          "protein_per_100g": 15.2,
          "carbs_per_100g": 13.7,
          "fat_per_100g": 65.2,
          "allergens": [
            "arahide_nuci"
          ],
          "estimated_price_per_kg_ron": 52
        },
        "amount_grams": 15,
        "unit_display": "15g walnuts"
      }
    ],
    "description_en": "The ideal balance of fast-acting carbohydrates and heart-healthy fats, ideal as a pre- or post-workout fuel.",
    "instructions_en": [
      "Peel 1 medium banana and slice into rounds.",
      "Sprinkle 15g raw chopped walnut halves over the banana slices.",
      "Enjoy fresh as a quick nutritious energy boost."
    ]
  },
  {
    "id": "rec-br-4",
    "title_ro": "Romanian Style Shakshuka with Eggs & Roasted Peppers",
    "title_en": "Romanian Style Shakshuka with Eggs & Roasted Peppers",
    "description_ro": "Gently poached eggs simmering in a rich, spiced sweet pepper and tomato reduction, finished with fresh parsley.",
    "image_url": "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 12,
    "servings_default": 1,
    "meal_types": [
      "breakfast"
    ],
    "calories": 360,
    "protein_g": 22,
    "carbs_g": 18,
    "fat_g": 22,
    "fiber_g": 5,
    "calories_per_100g": 115,
    "protein_per_100g": 7,
    "carbs_per_100g": 5.7,
    "fat_per_100g": 7,
    "allergens": [
      "oua"
    ],
    "diet_tags": [
      "vegetarian",
      "low_carb",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Sauté chopped onion and sweet red pepper in 5ml olive oil for 4 minutes.",
      "Pour in 150g crushed tomatoes, paprika, salt, and pepper; simmer for 3 minutes.",
      "Make two wells in the sauce and crack in 2 fresh eggs.",
      "Cover with lid and cook on low heat for 5-6 minutes until egg whites are set and yolks remain runny.",
      "Garnish with finely chopped fresh parsley."
    ],
    "ingredients": [
      {
        "id": "ri-br4-1",
        "recipe_id": "rec-br-4",
        "ingredient_id": "ing-25",
        "ingredient": {
          "id": "ing-25",
          "name_ro": "Fresh eggs L",
          "name_en": "Fresh eggs L",
          "category": "lactate_oua",
          "default_unit": "buc",
          "calories_per_100g": 143,
          "protein_per_100g": 12.6,
          "carbs_per_100g": 0.7,
          "fat_per_100g": 9.5,
          "allergens": [
            "oua"
          ],
          "estimated_price_per_kg_ron": 18
        },
        "amount_grams": 120,
        "unit_display": "2 large eggs"
      },
      {
        "id": "ri-br4-2",
        "recipe_id": "rec-br-4",
        "ingredient_id": "ing-1",
        "ingredient": {
          "id": "ing-1",
          "name_ro": "Fresh tomatoes",
          "name_en": "Fresh tomatoes",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 18,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 3.9,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 9.99
        },
        "amount_grams": 150,
        "unit_display": "150g crushed tomatoes"
      },
      {
        "id": "ri-br4-3",
        "recipe_id": "rec-br-4",
        "ingredient_id": "ing-6",
        "ingredient": {
          "id": "ing-6",
          "name_ro": "Red bell pepper",
          "name_en": "Red bell pepper",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 31,
          "protein_per_100g": 1,
          "carbs_per_100g": 6,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 12.99
        },
        "amount_grams": 60,
        "unit_display": "60g red bell pepper"
      },
      {
        "id": "ri-br4-4",
        "recipe_id": "rec-br-4",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 5,
        "unit_display": "1 tsp olive oil"
      }
    ],
    "description_en": "Gently poached eggs simmering in a rich, spiced sweet pepper and tomato reduction, finished with fresh parsley.",
    "instructions_en": [
      "Sauté chopped onion and sweet red pepper in 5ml olive oil for 4 minutes.",
      "Pour in 150g crushed tomatoes, paprika, salt, and pepper; simmer for 3 minutes.",
      "Make two wells in the sauce and crack in 2 fresh eggs.",
      "Cover with lid and cook on low heat for 5-6 minutes until egg whites are set and yolks remain runny.",
      "Garnish with finely chopped fresh parsley."
    ]
  },
  {
    "id": "rec-br-5",
    "title_ro": "Oat & Banana Protein Pancakes",
    "title_en": "Oat & Banana Protein Pancakes",
    "description_ro": "Healthy American-style fluffy pancakes whipped in a blender from 3 simple natural ingredients.",
    "image_url": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 8,
    "servings_default": 1,
    "meal_types": [
      "breakfast"
    ],
    "calories": 390,
    "protein_g": 19,
    "carbs_g": 58,
    "fat_g": 9,
    "fiber_g": 7,
    "calories_per_100g": 165,
    "protein_per_100g": 8,
    "carbs_per_100g": 24.5,
    "fat_per_100g": 3.8,
    "allergens": [
      "gluten",
      "oua"
    ],
    "diet_tags": [
      "vegetarian",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita",
      "blender"
    ],
    "instructions_ro": [
      "Blend 50g rolled oats, 1 medium banana, 1 egg, and a dash of cinnamon until smooth.",
      "Heat a non-stick skillet lightly greased with a drop of butter or oil over medium heat.",
      "Pour batter into small rounds and cook 2 minutes until bubbles appear on the surface.",
      "Flip with a spatula and cook 1-2 more minutes until golden brown.",
      "Serve topped with 30g fresh blueberries."
    ],
    "ingredients": [
      {
        "id": "ri-br5-1",
        "recipe_id": "rec-br-5",
        "ingredient_id": "ing-40",
        "ingredient": {
          "id": "ing-40",
          "name_ro": "Rolled oats",
          "name_en": "Rolled oats",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 389,
          "protein_per_100g": 16.9,
          "carbs_per_100g": 66.3,
          "fat_per_100g": 6.9,
          "allergens": [
            "gluten"
          ],
          "estimated_price_per_kg_ron": 7.99
        },
        "amount_grams": 50,
        "unit_display": "50g rolled oats"
      },
      {
        "id": "ri-br5-2",
        "recipe_id": "rec-br-5",
        "ingredient_id": "ing-10",
        "ingredient": {
          "id": "ing-10",
          "name_ro": "Bananas",
          "name_en": "Bananas",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 89,
          "protein_per_100g": 1.1,
          "carbs_per_100g": 22.8,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 6.99
        },
        "amount_grams": 100,
        "unit_display": "1 medium banana"
      },
      {
        "id": "ri-br5-3",
        "recipe_id": "rec-br-5",
        "ingredient_id": "ing-25",
        "ingredient": {
          "id": "ing-25",
          "name_ro": "Fresh eggs L",
          "name_en": "Fresh eggs L",
          "category": "lactate_oua",
          "default_unit": "buc",
          "calories_per_100g": 143,
          "protein_per_100g": 12.6,
          "carbs_per_100g": 0.7,
          "fat_per_100g": 9.5,
          "allergens": [
            "oua"
          ],
          "estimated_price_per_kg_ron": 18
        },
        "amount_grams": 60,
        "unit_display": "1 large egg"
      },
      {
        "id": "ri-br5-4",
        "recipe_id": "rec-br-5",
        "ingredient_id": "ing-11",
        "ingredient": {
          "id": "ing-11",
          "name_ro": "Fresh blueberries",
          "name_en": "Fresh blueberries",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 57,
          "protein_per_100g": 0.7,
          "carbs_per_100g": 14.5,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 45
        },
        "amount_grams": 30,
        "unit_display": "30g blueberries"
      }
    ],
    "description_en": "Healthy American-style fluffy pancakes whipped in a blender from 3 simple natural ingredients.",
    "instructions_en": [
      "Blend 50g rolled oats, 1 medium banana, 1 egg, and a dash of cinnamon until smooth.",
      "Heat a non-stick skillet lightly greased with a drop of butter or oil over medium heat.",
      "Pour batter into small rounds and cook 2 minutes until bubbles appear on the surface.",
      "Flip with a spatula and cook 1-2 more minutes until golden brown.",
      "Serve topped with 30g fresh blueberries."
    ]
  },
  {
    "id": "rec-br-6",
    "title_ro": "Greek Yogurt Bowl with Granola & Raspberries",
    "title_en": "Greek Yogurt Bowl with Granola & Raspberries",
    "description_ro": "A crunchy, creamy breakfast bowl packed with calcium, beneficial probiotics, and antioxidant-rich berries.",
    "image_url": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 3,
    "cook_time_minutes": 0,
    "servings_default": 1,
    "meal_types": [
      "breakfast"
    ],
    "calories": 340,
    "protein_g": 20,
    "carbs_g": 44,
    "fat_g": 8,
    "fiber_g": 6,
    "calories_per_100g": 130,
    "protein_per_100g": 7.6,
    "carbs_per_100g": 16.8,
    "fat_per_100g": 3.1,
    "allergens": [
      "lactoza",
      "gluten",
      "arahide_nuci"
    ],
    "diet_tags": [
      "vegetarian",
      "bogata_in_proteine"
    ],
    "equipment_needed": [],
    "instructions_ro": [
      "Spoon 150g Greek yogurt (2%) into a wide breakfast bowl.",
      "Scatter 40g crisp sugar-free granola evenly across the top.",
      "Add 50g fresh raspberries and drizzle with 1 tsp raw honey."
    ],
    "ingredients": [
      {
        "id": "ri-br6-1",
        "recipe_id": "rec-br-6",
        "ingredient_id": "ing-31",
        "ingredient": {
          "id": "ing-31",
          "name_ro": "Greek yogurt 2%",
          "name_en": "Greek yogurt 2%",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 73,
          "protein_per_100g": 10,
          "carbs_per_100g": 3.8,
          "fat_per_100g": 2,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 16.5
        },
        "amount_grams": 150,
        "unit_display": "150g Greek yogurt 2%"
      },
      {
        "id": "ri-br6-2",
        "recipe_id": "rec-br-6",
        "ingredient_id": "ing-67",
        "ingredient": {
          "id": "ing-67",
          "name_ro": "Sugar-free oat granola",
          "name_en": "Sugar-free oat granola",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 420,
          "protein_per_100g": 12,
          "carbs_per_100g": 58,
          "fat_per_100g": 15,
          "allergens": [
            "gluten",
            "arahide_nuci"
          ],
          "estimated_price_per_kg_ron": 28
        },
        "amount_grams": 40,
        "unit_display": "40g sugar-free granola"
      },
      {
        "id": "ri-br6-3",
        "recipe_id": "rec-br-6",
        "ingredient_id": "ing-68",
        "ingredient": {
          "id": "ing-68",
          "name_ro": "Raspberries",
          "name_en": "Raspberries",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 52,
          "protein_per_100g": 1.2,
          "carbs_per_100g": 11.9,
          "fat_per_100g": 0.7,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 50,
        "unit_display": "50g raspberries"
      },
      {
        "id": "ri-br6-4",
        "recipe_id": "rec-br-6",
        "ingredient_id": "ing-55",
        "ingredient": {
          "id": "ing-55",
          "name_ro": "Polyfloral honey",
          "name_en": "Polyfloral honey",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 304,
          "protein_per_100g": 0.3,
          "carbs_per_100g": 82.4,
          "fat_per_100g": 0,
          "allergens": [],
          "estimated_price_per_kg_ron": 28
        },
        "amount_grams": 10,
        "unit_display": "1 tsp honey"
      }
    ],
    "description_en": "A crunchy, creamy breakfast bowl packed with calcium, beneficial probiotics, and antioxidant-rich berries.",
    "instructions_en": [
      "Spoon 150g Greek yogurt (2%) into a wide breakfast bowl.",
      "Scatter 40g crisp sugar-free granola evenly across the top.",
      "Add 50g fresh raspberries and drizzle with 1 tsp raw honey."
    ]
  },
  {
    "id": "rec-br-7",
    "title_ro": "Toasted Turkey & Telemea Cheese Sandwich",
    "title_en": "Toasted Turkey & Telemea Cheese Sandwich",
    "description_ro": "Golden toasted whole grain rye sandwich filled with lean smoked turkey, melted telemea cheese, and crisp cucumbers.",
    "image_url": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 4,
    "servings_default": 1,
    "meal_types": [
      "breakfast"
    ],
    "calories": 330,
    "protein_g": 23,
    "carbs_g": 32,
    "fat_g": 11,
    "fiber_g": 5,
    "calories_per_100g": 155,
    "protein_per_100g": 10.8,
    "carbs_per_100g": 15,
    "fat_per_100g": 5.2,
    "allergens": [
      "gluten",
      "lactoza",
      "susan"
    ],
    "diet_tags": [
      "fara_porc",
      "bogata_in_proteine"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Layer 50g lean turkey breast ham and 35g telemea cheese between 2 slices of whole wheat bread (60g).",
      "Toast in a sandwich press or dry non-stick skillet for 2 minutes per side until bread is golden and cheese begins to soften.",
      "Open sandwich and add fresh crunchy cucumber slices before enjoying."
    ],
    "ingredients": [
      {
        "id": "ri-br7-1",
        "recipe_id": "rec-br-7",
        "ingredient_id": "ing-41",
        "ingredient": {
          "id": "ing-41",
          "name_ro": "Whole grain rye bread",
          "name_en": "Whole grain rye bread",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 240,
          "protein_per_100g": 9,
          "carbs_per_100g": 43,
          "fat_per_100g": 3.5,
          "allergens": [
            "gluten",
            "susan"
          ],
          "estimated_price_per_kg_ron": 12
        },
        "amount_grams": 60,
        "unit_display": "2 slices whole grain bread (60g)"
      },
      {
        "id": "ri-br7-2",
        "recipe_id": "rec-br-7",
        "ingredient_id": "ing-69",
        "ingredient": {
          "id": "ing-69",
          "name_ro": "Turkey breast ham lean",
          "name_en": "Turkey breast ham lean",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 95,
          "protein_per_100g": 19,
          "carbs_per_100g": 1,
          "fat_per_100g": 1.5,
          "allergens": [],
          "estimated_price_per_kg_ron": 39
        },
        "amount_grams": 50,
        "unit_display": "50g turkey ham"
      },
      {
        "id": "ri-br7-3",
        "recipe_id": "rec-br-7",
        "ingredient_id": "ing-30",
        "ingredient": {
          "id": "ing-30",
          "name_ro": "Romanian cows telemea cheese",
          "name_en": "Romanian cows telemea cheese",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 260,
          "protein_per_100g": 18,
          "carbs_per_100g": 1.5,
          "fat_per_100g": 20,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 38
        },
        "amount_grams": 35,
        "unit_display": "35g telemea cheese"
      },
      {
        "id": "ri-br7-4",
        "recipe_id": "rec-br-7",
        "ingredient_id": "ing-2",
        "ingredient": {
          "id": "ing-2",
          "name_ro": "Cucumbers",
          "name_en": "Cucumbers",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 15,
          "protein_per_100g": 0.7,
          "carbs_per_100g": 3.6,
          "fat_per_100g": 0.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 7.49
        },
        "amount_grams": 50,
        "unit_display": "50g cucumber"
      }
    ],
    "description_en": "Golden toasted whole grain rye sandwich filled with lean smoked turkey, melted telemea cheese, and crisp cucumbers.",
    "instructions_en": [
      "Layer 50g lean turkey breast ham and 35g telemea cheese between 2 slices of whole wheat bread (60g).",
      "Toast in a sandwich press or dry non-stick skillet for 2 minutes per side until bread is golden and cheese begins to soften.",
      "Open sandwich and add fresh crunchy cucumber slices before enjoying."
    ]
  },
  {
    "id": "rec-br-8",
    "title_ro": "Warm Apple Cinnamon Oatmeal with Walnuts",
    "title_en": "Warm Apple Cinnamon Oatmeal with Walnuts",
    "description_ro": "Comforting, naturally sweet plant-based oatmeal with tender baked apples, aromatic cinnamon, and raw walnuts.",
    "image_url": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 6,
    "servings_default": 1,
    "meal_types": [
      "breakfast"
    ],
    "calories": 375,
    "protein_g": 11,
    "carbs_g": 58,
    "fat_g": 12,
    "fiber_g": 8,
    "calories_per_100g": 125,
    "protein_per_100g": 3.7,
    "carbs_per_100g": 19.3,
    "fat_per_100g": 4,
    "allergens": [
      "gluten",
      "arahide_nuci"
    ],
    "diet_tags": [
      "vegetarian",
      "vegan",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "In a saucepan, simmer 50g rolled oats with 150ml almond milk or water for 4-5 minutes until creamy.",
      "Stir in 100g diced apple and ground cinnamon, cooking 2 more minutes until apples are soft.",
      "Pour oatmeal into a bowl and top with 15g chopped walnuts."
    ],
    "ingredients": [
      {
        "id": "ri-br8-1",
        "recipe_id": "rec-br-8",
        "ingredient_id": "ing-40",
        "ingredient": {
          "id": "ing-40",
          "name_ro": "Rolled oats",
          "name_en": "Rolled oats",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 389,
          "protein_per_100g": 16.9,
          "carbs_per_100g": 66.3,
          "fat_per_100g": 6.9,
          "allergens": [
            "gluten"
          ],
          "estimated_price_per_kg_ron": 7.99
        },
        "amount_grams": 50,
        "unit_display": "50g rolled oats"
      },
      {
        "id": "ri-br8-2",
        "recipe_id": "rec-br-8",
        "ingredient_id": "ing-35",
        "ingredient": {
          "id": "ing-35",
          "name_ro": "Almond / Oat milk unsweetened",
          "name_en": "Almond / Oat milk unsweetened",
          "category": "lactate_oua",
          "default_unit": "ml",
          "calories_per_100g": 24,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 2.5,
          "fat_per_100g": 1.2,
          "allergens": [
            "arahide_nuci"
          ],
          "estimated_price_per_kg_ron": 11.5
        },
        "amount_grams": 150,
        "unit_display": "150ml almond/oat milk"
      },
      {
        "id": "ri-br8-3",
        "recipe_id": "rec-br-8",
        "ingredient_id": "ing-9",
        "ingredient": {
          "id": "ing-9",
          "name_ro": "Apples",
          "name_en": "Apples",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 52,
          "protein_per_100g": 0.3,
          "carbs_per_100g": 13.8,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 5.49
        },
        "amount_grams": 100,
        "unit_display": "1 apple"
      },
      {
        "id": "ri-br8-4",
        "recipe_id": "rec-br-8",
        "ingredient_id": "ing-53",
        "ingredient": {
          "id": "ing-53",
          "name_ro": "Walnuts",
          "name_en": "Walnuts",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 654,
          "protein_per_100g": 15.2,
          "carbs_per_100g": 13.7,
          "fat_per_100g": 65.2,
          "allergens": [
            "arahide_nuci"
          ],
          "estimated_price_per_kg_ron": 52
        },
        "amount_grams": 15,
        "unit_display": "15g walnuts"
      }
    ],
    "description_en": "Comforting, naturally sweet plant-based oatmeal with tender baked apples, aromatic cinnamon, and raw walnuts.",
    "instructions_en": [
      "In a saucepan, simmer 50g rolled oats with 150ml almond milk or water for 4-5 minutes until creamy.",
      "Stir in 100g diced apple and ground cinnamon, cooking 2 more minutes until apples are soft.",
      "Pour oatmeal into a bowl and top with 15g chopped walnuts."
    ]
  },
  {
    "id": "rec-br-9",
    "title_ro": "Fried Eggs on Garlicky Sautéed Baby Spinach",
    "title_en": "Fried Eggs on Garlicky Sautéed Baby Spinach",
    "description_ro": "Low-carb, keto-friendly power breakfast loaded with bioavailable iron, lutein, and healthy fats.",
    "image_url": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 6,
    "servings_default": 1,
    "meal_types": [
      "breakfast"
    ],
    "calories": 290,
    "protein_g": 17,
    "carbs_g": 4,
    "fat_g": 23,
    "fiber_g": 3,
    "calories_per_100g": 130,
    "protein_per_100g": 7.6,
    "carbs_per_100g": 1.8,
    "fat_per_100g": 10.3,
    "allergens": [
      "oua"
    ],
    "diet_tags": [
      "vegetarian",
      "low_carb",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Heat 5ml olive oil in a pan and sauté 80g baby spinach with 1 crushed garlic clove for 2 minutes.",
      "Push spinach to the edge and crack 2 eggs into the center of the pan.",
      "Cover and cook on low heat for 3-4 minutes until whites are cooked through.",
      "Season with flaky sea salt, black pepper, and sprinkle 5g chia or sesame seeds."
    ],
    "ingredients": [
      {
        "id": "ri-br9-1",
        "recipe_id": "rec-br-9",
        "ingredient_id": "ing-25",
        "ingredient": {
          "id": "ing-25",
          "name_ro": "Fresh eggs L",
          "name_en": "Fresh eggs L",
          "category": "lactate_oua",
          "default_unit": "buc",
          "calories_per_100g": 143,
          "protein_per_100g": 12.6,
          "carbs_per_100g": 0.7,
          "fat_per_100g": 9.5,
          "allergens": [
            "oua"
          ],
          "estimated_price_per_kg_ron": 18
        },
        "amount_grams": 120,
        "unit_display": "2 large eggs"
      },
      {
        "id": "ri-br9-2",
        "recipe_id": "rec-br-9",
        "ingredient_id": "ing-5",
        "ingredient": {
          "id": "ing-5",
          "name_ro": "Baby spinach",
          "name_en": "Baby spinach",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 23,
          "protein_per_100g": 2.9,
          "carbs_per_100g": 3.6,
          "fat_per_100g": 0.4,
          "allergens": [],
          "estimated_price_per_kg_ron": 34
        },
        "amount_grams": 80,
        "unit_display": "80g baby spinach"
      },
      {
        "id": "ri-br9-3",
        "recipe_id": "rec-br-9",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 5,
        "unit_display": "1 tsp olive oil"
      }
    ],
    "description_en": "Low-carb, keto-friendly power breakfast loaded with bioavailable iron, lutein, and healthy fats.",
    "instructions_en": [
      "Heat 5ml olive oil in a pan and sauté 80g baby spinach with 1 crushed garlic clove for 2 minutes.",
      "Push spinach to the edge and crack 2 eggs into the center of the pan.",
      "Cover and cook on low heat for 3-4 minutes until whites are cooked through.",
      "Season with flaky sea salt, black pepper, and sprinkle 5g chia or sesame seeds."
    ]
  },
  {
    "id": "rec-br-10",
    "title_ro": "Herbed Cottage Cheese Wrap",
    "title_en": "Herbed Cottage Cheese Wrap",
    "description_ro": "Refreshing high-protein morning wrap filled with creamy herbed cottage cheese and crisp sweet peppers.",
    "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 5,
    "cook_time_minutes": 0,
    "servings_default": 1,
    "meal_types": [
      "breakfast"
    ],
    "calories": 320,
    "protein_g": 25,
    "carbs_g": 38,
    "fat_g": 7,
    "fiber_g": 5,
    "calories_per_100g": 110,
    "protein_per_100g": 8.6,
    "carbs_per_100g": 13.1,
    "fat_per_100g": 2.4,
    "allergens": [
      "gluten",
      "lactoza"
    ],
    "diet_tags": [
      "vegetarian",
      "bogata_in_proteine",
      "fara_porc"
    ],
    "equipment_needed": [],
    "instructions_ro": [
      "In a bowl, mix 140g cottage cheese with fresh dill, salt, black pepper, and 1 tsp yogurt.",
      "Spread cottage cheese evenly over a whole wheat tortilla wrap (60g).",
      "Add thin strips of sweet bell pepper and cucumber, roll tightly, and slice diagonally."
    ],
    "ingredients": [
      {
        "id": "ri-br10-1",
        "recipe_id": "rec-br-10",
        "ingredient_id": "ing-32",
        "ingredient": {
          "id": "ing-32",
          "name_ro": "Low fat cottage cheese",
          "name_en": "Low fat cottage cheese",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 85,
          "protein_per_100g": 13,
          "carbs_per_100g": 3,
          "fat_per_100g": 1.8,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 22
        },
        "amount_grams": 140,
        "unit_display": "140g cottage cheese"
      },
      {
        "id": "ri-br10-2",
        "recipe_id": "rec-br-10",
        "ingredient_id": "ing-45",
        "ingredient": {
          "id": "ing-45",
          "name_ro": "Whole wheat wraps",
          "name_en": "Whole wheat wraps",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 290,
          "protein_per_100g": 9.5,
          "carbs_per_100g": 48,
          "fat_per_100g": 5.5,
          "allergens": [
            "gluten"
          ],
          "estimated_price_per_kg_ron": 18
        },
        "amount_grams": 60,
        "unit_display": "1 whole wheat wrap (60g)"
      },
      {
        "id": "ri-br10-3",
        "recipe_id": "rec-br-10",
        "ingredient_id": "ing-6",
        "ingredient": {
          "id": "ing-6",
          "name_ro": "Red bell pepper",
          "name_en": "Red bell pepper",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 31,
          "protein_per_100g": 1,
          "carbs_per_100g": 6,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 12.99
        },
        "amount_grams": 50,
        "unit_display": "50g red bell pepper"
      }
    ],
    "description_en": "Refreshing high-protein morning wrap filled with creamy herbed cottage cheese and crisp sweet peppers.",
    "instructions_en": [
      "In a bowl, mix 140g cottage cheese with fresh dill, salt, black pepper, and 1 tsp yogurt.",
      "Spread cottage cheese evenly over a whole wheat tortilla wrap (60g).",
      "Add thin strips of sweet bell pepper and cucumber, roll tightly, and slice diagonally."
    ]
  },
  {
    "id": "rec-lu-18",
    "title_ro": "Light Romanian Radauti Chicken Soup",
    "title_en": "Light Romanian Radauti Chicken Soup",
    "description_ro": "Traditional comforting chicken soup adapted for fitness: tender chicken breast shreds, sweet carrots, and a light garlicky yogurt liaison.",
    "image_url": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 15,
    "cook_time_minutes": 25,
    "servings_default": 1,
    "meal_types": [
      "lunch"
    ],
    "calories": 410,
    "protein_g": 42,
    "carbs_g": 22,
    "fat_g": 16,
    "fiber_g": 4,
    "calories_per_100g": 78,
    "protein_per_100g": 8,
    "carbs_per_100g": 4.2,
    "fat_per_100g": 3,
    "allergens": [
      "lactoza",
      "oua"
    ],
    "diet_tags": [
      "bogata_in_proteine",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Boil 180g chicken breast with sliced carrots and onion in salted water for 20 minutes.",
      "Remove chicken and shred into fine strips; grate the boiled carrot.",
      "Return chicken and carrot to the hot simmering broth.",
      "In a bowl, whisk 1 egg yolk with 100g Greek yogurt (2%) and 2 crushed garlic cloves.",
      "Temper the liaison with two ladles of warm broth, then gently stir back into the pot. Finish with lemon juice and parsley."
    ],
    "ingredients": [
      {
        "id": "ri-lu18-1",
        "recipe_id": "rec-lu-18",
        "ingredient_id": "ing-20",
        "ingredient": {
          "id": "ing-20",
          "name_ro": "Skinless chicken breast",
          "name_en": "Skinless chicken breast",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 120,
          "protein_per_100g": 22.5,
          "carbs_per_100g": 0,
          "fat_per_100g": 2.6,
          "allergens": [],
          "estimated_price_per_kg_ron": 28.5
        },
        "amount_grams": 180,
        "unit_display": "180g chicken breast"
      },
      {
        "id": "ri-lu18-2",
        "recipe_id": "rec-lu-18",
        "ingredient_id": "ing-31",
        "ingredient": {
          "id": "ing-31",
          "name_ro": "Greek yogurt 2%",
          "name_en": "Greek yogurt 2%",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 73,
          "protein_per_100g": 10,
          "carbs_per_100g": 3.8,
          "fat_per_100g": 2,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 16.5
        },
        "amount_grams": 100,
        "unit_display": "100g Greek yogurt"
      },
      {
        "id": "ri-lu18-3",
        "recipe_id": "rec-lu-18",
        "ingredient_id": "ing-7",
        "ingredient": {
          "id": "ing-7",
          "name_ro": "Carrots",
          "name_en": "Carrots",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 41,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 9.6,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 4.29
        },
        "amount_grams": 60,
        "unit_display": "60g Carrots"
      },
      {
        "id": "ri-lu18-4",
        "recipe_id": "rec-lu-18",
        "ingredient_id": "ing-25",
        "ingredient": {
          "id": "ing-25",
          "name_ro": "Fresh eggs L",
          "name_en": "Fresh eggs L",
          "category": "lactate_oua",
          "default_unit": "buc",
          "calories_per_100g": 143,
          "protein_per_100g": 12.6,
          "carbs_per_100g": 0.7,
          "fat_per_100g": 9.5,
          "allergens": [
            "oua"
          ],
          "estimated_price_per_kg_ron": 18
        },
        "amount_grams": 20,
        "unit_display": "20g Fresh eggs L"
      },
      {
        "id": "ri-lu18-5",
        "recipe_id": "rec-lu-18",
        "ingredient_id": "ing-4",
        "ingredient": {
          "id": "ing-4",
          "name_ro": "Garlic",
          "name_en": "Garlic",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 149,
          "protein_per_100g": 6.4,
          "carbs_per_100g": 33.1,
          "fat_per_100g": 0.5,
          "allergens": [],
          "estimated_price_per_kg_ron": 18
        },
        "amount_grams": 8,
        "unit_display": "2 garlic cloves"
      }
    ],
    "description_en": "Traditional comforting chicken soup adapted for fitness: tender chicken breast shreds, sweet carrots, and a light garlicky yogurt liaison.",
    "instructions_en": [
      "Boil 180g chicken breast with sliced carrots and onion in salted water for 20 minutes.",
      "Remove chicken and shred into fine strips; grate the boiled carrot.",
      "Return chicken and carrot to the hot simmering broth.",
      "In a bowl, whisk 1 egg yolk with 100g Greek yogurt (2%) and 2 crushed garlic cloves.",
      "Temper the liaison with two ladles of warm broth, then gently stir back into the pot. Finish with lemon juice and parsley."
    ]
  },
  {
    "id": "rec-lu-19",
    "title_ro": "Green Pea & Chicken Stew with Fresh Dill",
    "title_en": "Green Pea & Chicken Stew with Fresh Dill",
    "description_ro": "Classic savory chicken and sweet tender green pea stew simmered in light tomato sauce with fresh garden dill.",
    "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "servings_default": 1,
    "meal_types": [
      "lunch",
      "dinner"
    ],
    "calories": 470,
    "protein_g": 44,
    "carbs_g": 42,
    "fat_g": 12,
    "fiber_g": 10,
    "calories_per_100g": 98,
    "protein_per_100g": 9.2,
    "carbs_per_100g": 8.8,
    "fat_per_100g": 2.5,
    "allergens": [],
    "diet_tags": [
      "bogata_in_proteine",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Dice 180g chicken breast and brown for 4 minutes in 5ml olive oil.",
      "Add diced onion and cook until translucent.",
      "Add 160g green peas and 150ml broth or hot water.",
      "Simmer on low heat for 15 minutes, then add 80g crushed tomatoes, salt, and pepper.",
      "Remove from heat and stir in plenty of freshly chopped dill."
    ],
    "ingredients": [
      {
        "id": "ri-lu19-1",
        "recipe_id": "rec-lu-19",
        "ingredient_id": "ing-20",
        "ingredient": {
          "id": "ing-20",
          "name_ro": "Skinless chicken breast",
          "name_en": "Skinless chicken breast",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 120,
          "protein_per_100g": 22.5,
          "carbs_per_100g": 0,
          "fat_per_100g": 2.6,
          "allergens": [],
          "estimated_price_per_kg_ron": 28.5
        },
        "amount_grams": 180,
        "unit_display": "180g chicken breast"
      },
      {
        "id": "ri-lu19-2",
        "recipe_id": "rec-lu-19",
        "ingredient_id": "ing-62",
        "ingredient": {
          "id": "ing-62",
          "name_ro": "Green peas",
          "name_en": "Green peas",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 81,
          "protein_per_100g": 5.4,
          "carbs_per_100g": 14.5,
          "fat_per_100g": 0.4,
          "allergens": [],
          "estimated_price_per_kg_ron": 8.5
        },
        "amount_grams": 160,
        "unit_display": "160g green peas"
      },
      {
        "id": "ri-lu19-3",
        "recipe_id": "rec-lu-19",
        "ingredient_id": "ing-1",
        "ingredient": {
          "id": "ing-1",
          "name_ro": "Fresh tomatoes",
          "name_en": "Fresh tomatoes",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 18,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 3.9,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 9.99
        },
        "amount_grams": 80,
        "unit_display": "80g crushed tomatoes"
      },
      {
        "id": "ri-lu19-4",
        "recipe_id": "rec-lu-19",
        "ingredient_id": "ing-64",
        "ingredient": {
          "id": "ing-64",
          "name_ro": "Fresh dill and parsley",
          "name_en": "Fresh dill and parsley",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 36,
          "protein_per_100g": 3,
          "carbs_per_100g": 6,
          "fat_per_100g": 0.5,
          "allergens": [],
          "estimated_price_per_kg_ron": 20
        },
        "amount_grams": 15,
        "unit_display": "15g Fresh dill and parsley"
      }
    ],
    "description_en": "Classic savory chicken and sweet tender green pea stew simmered in light tomato sauce with fresh garden dill.",
    "instructions_en": [
      "Dice 180g chicken breast and brown for 4 minutes in 5ml olive oil.",
      "Add diced onion and cook until translucent.",
      "Add 160g green peas and 150ml broth or hot water.",
      "Simmer on low heat for 15 minutes, then add 80g crushed tomatoes, salt, and pepper.",
      "Remove from heat and stir in plenty of freshly chopped dill."
    ]
  },
  {
    "id": "rec-di-21",
    "title_ro": "Baked River Trout with Lemon, Dill & Polenta",
    "title_en": "Baked River Trout with Lemon, Dill & Polenta",
    "description_ro": "Tender baked whole river trout seasoned with lemon and fresh dill, served alongside hot steaming polenta.",
    "image_url": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 10,
    "cook_time_minutes": 20,
    "servings_default": 1,
    "meal_types": [
      "dinner",
      "lunch"
    ],
    "calories": 490,
    "protein_g": 44,
    "carbs_g": 48,
    "fat_g": 14,
    "fiber_g": 3,
    "calories_per_100g": 110,
    "protein_per_100g": 9.8,
    "carbs_per_100g": 10.7,
    "fat_per_100g": 3.1,
    "allergens": [
      "peste_fructe_de_mare"
    ],
    "diet_tags": [
      "pescetarian",
      "bogata_in_proteine",
      "fara_porc"
    ],
    "equipment_needed": [
      "cuptor",
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Season whole trout (220g) with salt, pepper, lemon slices, and fresh dill sprigs stuffed inside the cavity.",
      "Place fish on a parchment-lined baking sheet, drizzle with 5ml olive oil, and bake at 190°C (375°F) for 20 minutes.",
      "Simmer 60g cornmeal in 200ml lightly salted boiling water for 10 minutes to prepare fresh polenta.",
      "Serve hot trout alongside the polenta and a wedge of lemon."
    ],
    "ingredients": [
      {
        "id": "ri-di21-1",
        "recipe_id": "rec-di-21",
        "ingredient_id": "ing-61",
        "ingredient": {
          "id": "ing-61",
          "name_ro": "Fresh trout",
          "name_en": "Fresh trout",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 141,
          "protein_per_100g": 20,
          "carbs_per_100g": 0,
          "fat_per_100g": 6.6,
          "allergens": [
            "peste_fructe_de_mare"
          ],
          "estimated_price_per_kg_ron": 36
        },
        "amount_grams": 220,
        "unit_display": "1 whole trout (220g)"
      },
      {
        "id": "ri-di21-2",
        "recipe_id": "rec-di-21",
        "ingredient_id": "ing-42",
        "ingredient": {
          "id": "ing-42",
          "name_ro": "Cornmeal for polenta",
          "name_en": "Cornmeal for polenta",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 350,
          "protein_per_100g": 7,
          "carbs_per_100g": 75,
          "fat_per_100g": 1.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 4.8
        },
        "amount_grams": 60,
        "unit_display": "60g polenta cornmeal"
      },
      {
        "id": "ri-di21-3",
        "recipe_id": "rec-di-21",
        "ingredient_id": "ing-64",
        "ingredient": {
          "id": "ing-64",
          "name_ro": "Fresh dill and parsley",
          "name_en": "Fresh dill and parsley",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 36,
          "protein_per_100g": 3,
          "carbs_per_100g": 6,
          "fat_per_100g": 0.5,
          "allergens": [],
          "estimated_price_per_kg_ron": 20
        },
        "amount_grams": 10,
        "unit_display": "10g Fresh dill and parsley"
      }
    ],
    "description_en": "Tender baked whole river trout seasoned with lemon and fresh dill, served alongside hot steaming polenta.",
    "instructions_en": [
      "Season whole trout (220g) with salt, pepper, lemon slices, and fresh dill sprigs stuffed inside the cavity.",
      "Place fish on a parchment-lined baking sheet, drizzle with 5ml olive oil, and bake at 190°C (375°F) for 20 minutes.",
      "Simmer 60g cornmeal in 200ml lightly salted boiling water for 10 minutes to prepare fresh polenta.",
      "Serve hot trout alongside the polenta and a wedge of lemon."
    ]
  },
  {
    "id": "rec-di-22",
    "title_ro": "Grilled Pork Tenderloin with Mashed Potatoes",
    "title_en": "Grilled Pork Tenderloin with Mashed Potatoes",
    "description_ro": "Lean, tender pork tenderloin medallions seared on the grill, served over creamy mashed potatoes.",
    "image_url": "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 10,
    "cook_time_minutes": 15,
    "servings_default": 1,
    "meal_types": [
      "dinner",
      "lunch"
    ],
    "calories": 495,
    "protein_g": 40,
    "carbs_g": 42,
    "fat_g": 17,
    "fiber_g": 5,
    "calories_per_100g": 128,
    "protein_per_100g": 10.3,
    "carbs_per_100g": 10.9,
    "fat_per_100g": 4.4,
    "allergens": [
      "lactoza"
    ],
    "diet_tags": [
      "bogata_in_proteine"
    ],
    "equipment_needed": [
      "aragaz_plita",
      "gratar"
    ],
    "instructions_ro": [
      "Slice 180g pork tenderloin into 2cm thick medallions and season with thyme, garlic powder, salt, and pepper.",
      "Sear medallions on a hot grill pan for 3-4 minutes per side until juicy and cooked through.",
      "Boil 180g diced potatoes until tender, then mash with 5g butter and 30ml warm milk until smooth.",
      "Plate medallions over the mashed potatoes and serve with a crisp cucumber and tomato salad."
    ],
    "ingredients": [
      {
        "id": "ri-di22-1",
        "recipe_id": "rec-di-22",
        "ingredient_id": "ing-26",
        "ingredient": {
          "id": "ing-26",
          "name_ro": "Pork tenderloin",
          "name_en": "Pork tenderloin",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 143,
          "protein_per_100g": 21.8,
          "carbs_per_100g": 0,
          "fat_per_100g": 5.5,
          "allergens": [],
          "estimated_price_per_kg_ron": 36.9
        },
        "amount_grams": 180,
        "unit_display": "180g pork tenderloin"
      },
      {
        "id": "ri-di22-2",
        "recipe_id": "rec-di-22",
        "ingredient_id": "ing-13",
        "ingredient": {
          "id": "ing-13",
          "name_ro": "White potatoes",
          "name_en": "White potatoes",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 77,
          "protein_per_100g": 2,
          "carbs_per_100g": 17.5,
          "fat_per_100g": 0.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 3.49
        },
        "amount_grams": 180,
        "unit_display": "180g potatoes"
      },
      {
        "id": "ri-di22-3",
        "recipe_id": "rec-di-22",
        "ingredient_id": "ing-34",
        "ingredient": {
          "id": "ing-34",
          "name_ro": "Butter 82%",
          "name_en": "Butter 82%",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 740,
          "protein_per_100g": 0.8,
          "carbs_per_100g": 0.7,
          "fat_per_100g": 82,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 5,
        "unit_display": "5g butter"
      }
    ],
    "description_en": "Lean, tender pork tenderloin medallions seared on the grill, served over creamy mashed potatoes.",
    "instructions_en": [
      "Slice 180g pork tenderloin into 2cm thick medallions and season with thyme, garlic powder, salt, and pepper.",
      "Sear medallions on a hot grill pan for 3-4 minutes per side until juicy and cooked through.",
      "Boil 180g diced potatoes until tender, then mash with 5g butter and 30ml warm milk until smooth.",
      "Plate medallions over the mashed potatoes and serve with a crisp cucumber and tomato salad."
    ]
  },
  {
    "id": "rec-di-23",
    "title_ro": "Greek Salad with Romanian Telemea & Kalamata Olives",
    "title_en": "Greek Salad with Romanian Telemea & Kalamata Olives",
    "description_ro": "Crisp, refreshing Mediterranean salad with juicy ripe tomatoes, cucumbers, tangy telemea cheese, and Kalamata olives.",
    "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 8,
    "cook_time_minutes": 0,
    "servings_default": 1,
    "meal_types": [
      "dinner"
    ],
    "calories": 380,
    "protein_g": 17,
    "carbs_g": 16,
    "fat_g": 28,
    "fiber_g": 6,
    "calories_per_100g": 95,
    "protein_per_100g": 4.2,
    "carbs_per_100g": 4,
    "fat_per_100g": 7,
    "allergens": [
      "lactoza"
    ],
    "diet_tags": [
      "vegetarian",
      "low_carb",
      "fara_porc"
    ],
    "equipment_needed": [],
    "instructions_ro": [
      "Chop 150g ripe tomatoes, 100g cucumbers, and 50g sweet bell pepper into bite-sized chunks.",
      "Add 30g Kalamata olives and thin red onion slivers.",
      "Top with 70g cubed telemea or feta cheese.",
      "Drizzle with 10ml extra virgin olive oil, salt, and fragrant dried oregano."
    ],
    "ingredients": [
      {
        "id": "ri-di23-1",
        "recipe_id": "rec-di-23",
        "ingredient_id": "ing-1",
        "ingredient": {
          "id": "ing-1",
          "name_ro": "Fresh tomatoes",
          "name_en": "Fresh tomatoes",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 18,
          "protein_per_100g": 0.9,
          "carbs_per_100g": 3.9,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 9.99
        },
        "amount_grams": 150,
        "unit_display": "150g Fresh tomatoes"
      },
      {
        "id": "ri-di23-2",
        "recipe_id": "rec-di-23",
        "ingredient_id": "ing-2",
        "ingredient": {
          "id": "ing-2",
          "name_ro": "Cucumbers",
          "name_en": "Cucumbers",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 15,
          "protein_per_100g": 0.7,
          "carbs_per_100g": 3.6,
          "fat_per_100g": 0.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 7.49
        },
        "amount_grams": 100,
        "unit_display": "100g Cucumbers"
      },
      {
        "id": "ri-di23-3",
        "recipe_id": "rec-di-23",
        "ingredient_id": "ing-30",
        "ingredient": {
          "id": "ing-30",
          "name_ro": "Romanian cows telemea cheese",
          "name_en": "Romanian cows telemea cheese",
          "category": "lactate_oua",
          "default_unit": "g",
          "calories_per_100g": 260,
          "protein_per_100g": 18,
          "carbs_per_100g": 1.5,
          "fat_per_100g": 20,
          "allergens": [
            "lactoza"
          ],
          "estimated_price_per_kg_ron": 38
        },
        "amount_grams": 70,
        "unit_display": "70g telemea cheese"
      },
      {
        "id": "ri-di23-4",
        "recipe_id": "rec-di-23",
        "ingredient_id": "ing-63",
        "ingredient": {
          "id": "ing-63",
          "name_ro": "Kalamata olives",
          "name_en": "Kalamata olives",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 239,
          "protein_per_100g": 1.8,
          "carbs_per_100g": 6,
          "fat_per_100g": 22,
          "allergens": [],
          "estimated_price_per_kg_ron": 32
        },
        "amount_grams": 30,
        "unit_display": "30g Kalamata olives"
      },
      {
        "id": "ri-di23-5",
        "recipe_id": "rec-di-23",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 10,
        "unit_display": "10g Extra virgin olive oil"
      }
    ],
    "description_en": "Crisp, refreshing Mediterranean salad with juicy ripe tomatoes, cucumbers, tangy telemea cheese, and Kalamata olives.",
    "instructions_en": [
      "Chop 150g ripe tomatoes, 100g cucumbers, and 50g sweet bell pepper into bite-sized chunks.",
      "Add 30g Kalamata olives and thin red onion slivers.",
      "Top with 70g cubed telemea or feta cheese.",
      "Drizzle with 10ml extra virgin olive oil, salt, and fragrant dried oregano."
    ]
  },
  {
    "id": "rec-di-24",
    "title_ro": "Grilled Turkey Breast with Zucchini & Herbs",
    "title_en": "Grilled Turkey Breast with Zucchini & Herbs",
    "description_ro": "Ultra-lean grilled turkey breast with charred tender zucchini rounds, ideal for clean digestion before sleep.",
    "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 8,
    "cook_time_minutes": 14,
    "servings_default": 1,
    "meal_types": [
      "dinner",
      "lunch"
    ],
    "calories": 360,
    "protein_g": 45,
    "carbs_g": 10,
    "fat_g": 14,
    "fiber_g": 4,
    "calories_per_100g": 90,
    "protein_per_100g": 11.2,
    "carbs_per_100g": 2.5,
    "fat_per_100g": 3.5,
    "allergens": [],
    "diet_tags": [
      "bogata_in_proteine",
      "low_carb",
      "fara_porc"
    ],
    "equipment_needed": [
      "gratar",
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Season 180g turkey breast fillet with salt, black pepper, and paprika.",
      "Slice 150g zucchini into rounds and toss with 5ml olive oil and dried thyme.",
      "Grill turkey breast for 4-5 minutes per side until thoroughly cooked and juicy.",
      "Grill zucchini rounds on the same pan for 3 minutes until tender with nice grill marks."
    ],
    "ingredients": [
      {
        "id": "ri-di24-1",
        "recipe_id": "rec-di-24",
        "ingredient_id": "ing-60",
        "ingredient": {
          "id": "ing-60",
          "name_ro": "Turkey breast fillet",
          "name_en": "Turkey breast fillet",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 110,
          "protein_per_100g": 24,
          "carbs_per_100g": 0,
          "fat_per_100g": 1.5,
          "allergens": [],
          "estimated_price_per_kg_ron": 38.99
        },
        "amount_grams": 180,
        "unit_display": "180g turkey breast"
      },
      {
        "id": "ri-di24-2",
        "recipe_id": "rec-di-24",
        "ingredient_id": "ing-65",
        "ingredient": {
          "id": "ing-65",
          "name_ro": "Zucchini",
          "name_en": "Zucchini",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 17,
          "protein_per_100g": 1.2,
          "carbs_per_100g": 3.1,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 6.99
        },
        "amount_grams": 150,
        "unit_display": "150g zucchini"
      },
      {
        "id": "ri-di24-3",
        "recipe_id": "rec-di-24",
        "ingredient_id": "ing-50",
        "ingredient": {
          "id": "ing-50",
          "name_ro": "Extra virgin olive oil",
          "name_en": "Extra virgin olive oil",
          "category": "bacanie_condimente",
          "default_unit": "ml",
          "calories_per_100g": 884,
          "protein_per_100g": 0,
          "carbs_per_100g": 0,
          "fat_per_100g": 100,
          "allergens": [],
          "estimated_price_per_kg_ron": 48
        },
        "amount_grams": 5,
        "unit_display": "1 tsp olive oil"
      }
    ],
    "description_en": "Ultra-lean grilled turkey breast with charred tender zucchini rounds, ideal for clean digestion before sleep.",
    "instructions_en": [
      "Season 180g turkey breast fillet with salt, black pepper, and paprika.",
      "Slice 150g zucchini into rounds and toss with 5ml olive oil and dried thyme.",
      "Grill turkey breast for 4-5 minutes per side until thoroughly cooked and juicy.",
      "Grill zucchini rounds on the same pan for 3 minutes until tender with nice grill marks."
    ]
  },
  {
    "id": "rec-di-25",
    "title_ro": "Stewed Chicken Livers with Sweet Onion & Polenta",
    "title_en": "Stewed Chicken Livers with Sweet Onion & Polenta",
    "description_ro": "Quick 15-minute iron and B-vitamin powerhouse: tender chicken livers gently braised with sweet caramelized onions and warm polenta.",
    "image_url": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 8,
    "cook_time_minutes": 15,
    "servings_default": 1,
    "meal_types": [
      "dinner",
      "lunch"
    ],
    "calories": 460,
    "protein_g": 37,
    "carbs_g": 50,
    "fat_g": 13,
    "fiber_g": 4,
    "calories_per_100g": 115,
    "protein_per_100g": 9.2,
    "carbs_per_100g": 12.5,
    "fat_per_100g": 3.2,
    "allergens": [],
    "diet_tags": [
      "bogata_in_proteine",
      "fara_porc"
    ],
    "equipment_needed": [
      "aragaz_plita"
    ],
    "instructions_ro": [
      "Thinly slice 1 large onion and sauté in 5ml olive oil until soft and golden.",
      "Add 180g cleaned chicken livers and 2 crushed garlic cloves.",
      "Cover and braise on medium heat for 10-12 minutes (avoid salting early to keep livers tender).",
      "Season with salt, pepper, and fresh parsley at the very end.",
      "Serve hot with 60g cornmeal cooked into soft polenta."
    ],
    "ingredients": [
      {
        "id": "ri-di25-1",
        "recipe_id": "rec-di-25",
        "ingredient_id": "ing-66",
        "ingredient": {
          "id": "ing-66",
          "name_ro": "Chicken livers",
          "name_en": "Chicken livers",
          "category": "carne_peste",
          "default_unit": "g",
          "calories_per_100g": 119,
          "protein_per_100g": 17,
          "carbs_per_100g": 0.7,
          "fat_per_100g": 4.8,
          "allergens": [],
          "estimated_price_per_kg_ron": 16.5
        },
        "amount_grams": 180,
        "unit_display": "180g chicken livers"
      },
      {
        "id": "ri-di25-2",
        "recipe_id": "rec-di-25",
        "ingredient_id": "ing-3",
        "ingredient": {
          "id": "ing-3",
          "name_ro": "Yellow onion",
          "name_en": "Yellow onion",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 40,
          "protein_per_100g": 1.1,
          "carbs_per_100g": 9.3,
          "fat_per_100g": 0.1,
          "allergens": [],
          "estimated_price_per_kg_ron": 3.99
        },
        "amount_grams": 80,
        "unit_display": "80g Yellow onion"
      },
      {
        "id": "ri-di25-3",
        "recipe_id": "rec-di-25",
        "ingredient_id": "ing-42",
        "ingredient": {
          "id": "ing-42",
          "name_ro": "Cornmeal for polenta",
          "name_en": "Cornmeal for polenta",
          "category": "panificatie_cereale",
          "default_unit": "g",
          "calories_per_100g": 350,
          "protein_per_100g": 7,
          "carbs_per_100g": 75,
          "fat_per_100g": 1.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 4.8
        },
        "amount_grams": 60,
        "unit_display": "60g polenta cornmeal"
      }
    ],
    "description_en": "Quick 15-minute iron and B-vitamin powerhouse: tender chicken livers gently braised with sweet caramelized onions and warm polenta.",
    "instructions_en": [
      "Thinly slice 1 large onion and sauté in 5ml olive oil until soft and golden.",
      "Add 180g cleaned chicken livers and 2 crushed garlic cloves.",
      "Cover and braise on medium heat for 10-12 minutes (avoid salting early to keep livers tender).",
      "Season with salt, pepper, and fresh parsley at the very end.",
      "Serve hot with 60g cornmeal cooked into soft polenta."
    ]
  },
  {
    "id": "rec-sn-26",
    "title_ro": "Green Energy Smoothie with Spinach, Banana & Chia",
    "title_en": "Green Energy Smoothie with Spinach, Banana & Chia",
    "description_ro": "Vibrant chlorophyll, potassium, and omega-3 rich smoothie for an instant clean afternoon energy surge.",
    "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "prep_time_minutes": 3,
    "cook_time_minutes": 0,
    "servings_default": 1,
    "meal_types": [
      "snack"
    ],
    "calories": 190,
    "protein_g": 5,
    "carbs_g": 36,
    "fat_g": 4,
    "fiber_g": 7,
    "calories_per_100g": 65,
    "protein_per_100g": 1.7,
    "carbs_per_100g": 12.4,
    "fat_per_100g": 1.4,
    "allergens": [],
    "diet_tags": [
      "vegetarian",
      "vegan",
      "fara_porc"
    ],
    "equipment_needed": [
      "blender"
    ],
    "instructions_ro": [
      "Place 50g baby spinach, 1/2 banana, 1/2 apple, and 10g chia seeds into a high-speed blender.",
      "Pour in 150ml chilled water or unsweetened almond milk.",
      "Blend on high speed for 45 seconds until silky smooth and creamy."
    ],
    "ingredients": [
      {
        "id": "ri-sn26-1",
        "recipe_id": "rec-sn-26",
        "ingredient_id": "ing-5",
        "ingredient": {
          "id": "ing-5",
          "name_ro": "Baby spinach",
          "name_en": "Baby spinach",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 23,
          "protein_per_100g": 2.9,
          "carbs_per_100g": 3.6,
          "fat_per_100g": 0.4,
          "allergens": [],
          "estimated_price_per_kg_ron": 34
        },
        "amount_grams": 50,
        "unit_display": "50g Baby spinach"
      },
      {
        "id": "ri-sn26-2",
        "recipe_id": "rec-sn-26",
        "ingredient_id": "ing-10",
        "ingredient": {
          "id": "ing-10",
          "name_ro": "Bananas",
          "name_en": "Bananas",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 89,
          "protein_per_100g": 1.1,
          "carbs_per_100g": 22.8,
          "fat_per_100g": 0.3,
          "allergens": [],
          "estimated_price_per_kg_ron": 6.99
        },
        "amount_grams": 60,
        "unit_display": "60g Bananas"
      },
      {
        "id": "ri-sn26-3",
        "recipe_id": "rec-sn-26",
        "ingredient_id": "ing-9",
        "ingredient": {
          "id": "ing-9",
          "name_ro": "Apples",
          "name_en": "Apples",
          "category": "legume_fructe",
          "default_unit": "g",
          "calories_per_100g": 52,
          "protein_per_100g": 0.3,
          "carbs_per_100g": 13.8,
          "fat_per_100g": 0.2,
          "allergens": [],
          "estimated_price_per_kg_ron": 5.49
        },
        "amount_grams": 60,
        "unit_display": "60g Apples"
      },
      {
        "id": "ri-sn26-4",
        "recipe_id": "rec-sn-26",
        "ingredient_id": "ing-54",
        "ingredient": {
          "id": "ing-54",
          "name_ro": "Chia seeds",
          "name_en": "Chia seeds",
          "category": "bacanie_condimente",
          "default_unit": "g",
          "calories_per_100g": 486,
          "protein_per_100g": 16.5,
          "carbs_per_100g": 42.1,
          "fat_per_100g": 30.7,
          "allergens": [],
          "estimated_price_per_kg_ron": 32
        },
        "amount_grams": 10,
        "unit_display": "10g chia seeds"
      }
    ],
    "description_en": "Vibrant chlorophyll, potassium, and omega-3 rich smoothie for an instant clean afternoon energy surge.",
    "instructions_en": [
      "Place 50g baby spinach, 1/2 banana, 1/2 apple, and 10g chia seeds into a high-speed blender.",
      "Pour in 150ml chilled water or unsweetened almond milk.",
      "Blend on high speed for 45 seconds until silky smooth and creamy."
    ]
  }
];
