<div align="center">
  <img src="./src/assets/images/romeal_logo_1790593298182.jpg" alt="roMeal Logo" width="96" style="border-radius: 22px; box-shadow: 0 10px 30px rgba(245,158,11,0.25);" />
  <h1>roMeal</h1>
  <p><strong>Smart Meal Planner, Precision Nutrition Concierge & Dual-Weight Food Science Engine 🥗</strong></p>
  <p><em>Weigh raw on the kitchen scale, eat balanced on your plate. Zero guesswork, zero weight-conversion confusion.</em></p>
</div>

<p align="center">
  <img src="./src/assets/images/romeal_github_banner_1790596743022.jpg" alt="roMeal GitHub Banner" width="100%" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 14px 40px rgba(0,0,0,0.6);" />
</p>

<p align="center">
  <a href="#key-features"><img src="https://img.shields.io/badge/Release-1.0.0_Production_Ready-amber?style=for-the-badge&logo=rocket" alt="Release" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite" alt="Vite" /></a>
  <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-Firestore_%26_Auth-FFA611?style=for-the-badge&logo=firebase" alt="Firebase" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-15+_Ready-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" /></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="License" /></a>
</p>

---

## 🌟 About roMeal

**roMeal** is an open-source, high-performance web application designed to solve one of the most frustrating problems in personal nutrition: **the raw vs. cooked weight discrepancy**. 

Most calorie-tracking and meal-planning platforms assume either raw ingredients or generic cooked estimates, leading to massive caloric discrepancies (such as raw chicken breast shrinking ~25% due to water evaporation or rice tripling in weight after absorbing water). 

**roMeal** solves this through scientific kitchen mathematics: every meal is dynamically calculated with **both raw preparation weights** (for your digital scale during prep) and **cooked plate weights** (for portioning when dishing out for family or meal prep containers).

### Why roMeal Stands Out
1. **⚖️ Dual-Weight Science (Raw Prep Scale vs. Cooked Plate Portion)**  
   Never guess whether "150g chicken" means raw breast or grilled fillet. roMeal explicitly calculates water retention, oil absorption, and dehydration coefficients.
2. **🧮 Clinically Grounded BMR & TDEE Calculations**  
   Employs the **Mifflin-St Jeor equation** alongside customizable activity multipliers, dietary goals (fat loss, maintenance, muscle hypertrophy), and exact macro targets.
3. **🔄 7-Day Dynamic Meal Planner with 1-Click Nutrient Swaps**  
   Generates a balanced weekly menu with breakfast, lunch, dinner, and optional snacks. If you don't like a meal, swap it in one click for a nutritionally equivalent alternative.
4. **🛒 Automated Supermarket Grocery Aggregator & WhatsApp Export**  
   Consolidates a full week of ingredients into organized supermarket aisles (*Produce, Meat & Poultry, Dairy, Pantry & Oils, Bakery*). Check off items live in the store or export directly to WhatsApp/SMS.
5. **☁️ Multi-Device Cloud Sync with Firebase & Offline Resiliency**  
   Built on Firebase Firestore and Google/Email Auth with automatic local offline fallback. Works seamlessly across desktop, tablets, and smartphones.
6. **🌐 Spoonacular API Integration & Built-in Culinary Catalog**  
   Comes pre-packaged with a rich culinary catalog and allows plugging in a free **Spoonacular API key** to pull over 300,000 international recipes on demand.

---

<a id="key-features"></a>
## ✨ Key Features

### 1. ⚖️ The Dual-Weight Food Science Engine
Food changes mass drastically during cooking. roMeal automatically computes both:
* **Raw Weight (Digital Scale)**: What you weigh out before cooking, trimming, or marinating.
* **Cooked Weight (On Plate)**: What you weigh after roasting, searing, boiling, or baking.
* **Cooking Method & Moisture Loss Indicators**: Clear visual tags explaining percentage changes (e.g., `-25% moisture loss from searing` or `+180% hydration from boiling`).
* **Interactive Mode Switcher**: Toggle between **Both Weights**, **Raw Only**, or **Plate Only** directly in any recipe or meal plan view.

### 2. 🎯 Precision Profiling Wizard
A responsive onboarding flow that captures:
* **Biometrics**: Gender, age, height, weight, activity factor.
* **Target Objective**: Deficit (-350 to -500 kcal for sustainable fat loss), Maintenance, or Surplus (+300 kcal for clean bulking).
* **Macronutrient Split**: Target grams for proteins (4 kcal/g), carbohydrates (4 kcal/g), and dietary fats (9 kcal/g).
* **Strict Allergen Exclusions (Hard Constraints)**: Gluten, dairy, eggs, peanuts, tree nuts, fish, shellfish, soy, mustard, celery, sesame.
* **Household Multiplier**: Scale recipes automatically for 1 to 10+ people.

### 3. 📅 7-Day Interactive Meal Schedule
* Color-coded macronutrient progress bars matching daily calorie ceilings.
* Detailed recipe drawer with step-by-step culinary instructions, nutritional breakdown, and allergen notices.
* **Smart Swap Modal**: Compares caloric differences (`+12 kcal`, `-30 kcal`) and ensures the swap respects your allergens.

### 4. 🛒 Smart Grocery List Aggregator
* Aggregates identical ingredients across different meals and days.
* Categorized by supermarket department for optimal shopping flow.
* Persistent interactive checkboxes that remember your checked status.
* 1-Click plain-text clipboard export formatted cleanly for messaging apps.

### 5. 🗄️ Dual Database Architecture
* **Cloud Firestore**: Real-time cloud sync with secure user document isolation.
* **PostgreSQL 15+ Enterprise Schema**: Full SQL DDL schema provided in-app (`src/db/schema.sql`) for backend developers building relational APIs with FastAPI, Express, or Django.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | **React 19** | Functional components, reactive hooks, modular design |
| **Language** | **TypeScript 5.7** | Strict type definitions (`Recipe`, `UserProfile`, `MealPlanEntry`, etc.) |
| **Styling** | **Tailwind CSS v4** | Custom dark luxury palette (`#080c12`), amber & emerald accents |
| **Icons** | **Lucide React** | Modern, lightweight SVG vector icons |
| **Build Tool** | **Vite 6** | Instant HMR, lightning-fast dev server and bundle optimization |
| **Cloud Database & Auth** | **Firebase (Firestore & Auth)** | Seamless Google Sign-In and cloud data persistence |
| **Relational Database** | **PostgreSQL 15+** | Normalized schema with UUIDs, Citext, Enums, and JSONB constraints |
| **External API** | **Spoonacular API** | Real-time global recipe fetching & nutritional analysis |

---

## 📁 Project Structure

```bash
roMeal/
├── src/
│   ├── assets/
│   │   └── images/              # Official roMeal brand assets (logo, GitHub banner)
│   ├── components/
│   │   ├── Header.tsx           # Global navigation bar & user session indicator
│   │   ├── MealPlanView.tsx     # 7-day schedule with daily macro progress bars
│   │   ├── RecipeDetailModal.tsx# Recipe drawer with dual-weight scale toggles
│   │   ├── MealSwapModal.tsx    # Intelligent 1-click meal replacement modal
│   │   ├── ShoppingListView.tsx # Supermarket aisle grocery aggregator & export
│   │   ├── RecipeCatalogView.tsx# Searchable catalog with allergen & meal filters
│   │   ├── ProfilingWizard.tsx  # Multi-step Mifflin-St Jeor onboarding wizard
│   │   ├── ProfileView.tsx      # User profile, targets, and allergy management
│   │   ├── SettingsModal.tsx    # Spoonacular API key configuration & data reset
│   │   ├── AuthModal.tsx        # Firebase Google & Email sign-in modal
│   │   └── DatabaseSchemaView.tsx# Interactive PostgreSQL 15+ DDL viewer
│   ├── services/
│   │   ├── firebase.ts          # Firestore database synchronization & Auth
│   │   ├── db.ts                # Local storage cache & persistence manager
│   │   ├── planner.ts           # 7-day meal plan scheduling engine
│   │   ├── weightConverter.ts   # Food science raw vs. cooked weight algorithms
│   │   ├── spoonacular.ts       # Spoonacular API client with fallback catalog
│   │   └── shoppingList.ts      # Grocery aggregator & supermarket aisle sorter
│   ├── types/
│   │   └── index.ts             # Central TypeScript domain interfaces
│   ├── data/
│   │   └── seedData.ts          # Calibrated recipes and ingredient nutrition catalog
│   ├── App.tsx                  # Root component and top-level state coordinator
│   ├── index.css                # Tailwind CSS v4 directives and animation keyframes
│   └── main.tsx                 # Application entry point
├── public/
├── index.html                   # HTML5 template with SEO, OpenGraph, and viewport config
├── firestore.rules              # Production security rules for Firebase Firestore
├── metadata.json                # Project configuration and capabilities
└── README.md                    # Comprehensive documentation
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/roMeal.git
   cd roMeal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   If you want to use the Spoonacular API globally without manual UI input, create a `.env` file in the project root:
   ```env
   VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled assets will be placed in the `dist/` directory.

---

## 🗄️ Database & Cloud Persistence

* **Firebase Firestore**: Users can log in using their Google account or email. All profile settings, dietary constraints, weekly meal plans, and grocery checkboxes are automatically stored in their isolated Firestore collection (`users/{uid}`).
* **PostgreSQL Schema**: For full-stack developers wishing to deploy a relational backend, inspect the complete SQL DDL script located in `src/db/schema.sql` or explore it directly within the application's **"DB Schema"** tab.

---

## 🤝 Contributing

Contributions are welcomed from developers, nutritionists, and food science enthusiasts worldwide!

1. **Fork** the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add awesome feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/awesome-feature
   ```
5. Open a **Pull Request**.

---

<a id="license"></a>
## 📄 License

This project is licensed under the **MIT License** — feel free to use it for personal, educational, or commercial projects.

---

<div align="center">
  Crafted with precision for smart nutrition, clean cooking, and exact digital kitchen scales. 🥗<br />
  <strong>roMeal</strong> — Weigh raw, portion smart, eat balanced.
</div>

---

### 🏷️ Hashtags
`#mealplanner` `#nutrition` `#healthtech` `#foodscience` `#mealprep` `#macros` `#react19` `#typescript` `#tailwindcss` `#firebase` `#postgresql` `#spoonacular` `#fitness` `#diet` `#opensource` `#healthyfood` `#dietplan`
