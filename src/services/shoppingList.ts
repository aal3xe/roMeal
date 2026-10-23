import { WeeklyMealPlan, AggregatedShoppingItem, Ingredient } from '../types';

export const CATEGORY_LABELS: Record<Ingredient['category'], { label: string; icon: string }> = {
  legume_fructe: { label: 'Fresh Produce (Fruits & Vegetables)', icon: '🥕' },
  carne_peste: { label: 'Meat, Poultry & Seafood', icon: '🥩' },
  lactate_oua: { label: 'Dairy, Cheeses & Eggs', icon: '🧀' },
  panificatie_cereale: { label: 'Bakery, Grains & Pasta', icon: '🌾' },
  bacanie_condimente: { label: 'Pantry, Oils & Seasonings', icon: '🫒' },
  altele: { label: 'Other Essentials', icon: '📦' }
};

// Backwards compatibility alias
export const CATEGORY_LABELS_RO = CATEGORY_LABELS;

export class ShoppingListService {
  /**
   * Aggregates ingredient quantities across all 7 days of the meal plan,
   * scaled by household size.
   */
  aggregateWeeklyShoppingList(plan: WeeklyMealPlan, householdSize: number = 1): AggregatedShoppingItem[] {
    const itemMap = new Map<string, AggregatedShoppingItem>();
    const scale = Math.max(1, householdSize);

    for (const day of plan.days) {
      const dayDisplayName = day.day_name_en || day.day_name_ro;
      for (const entry of day.entries) {
        const recipe = entry.recipe;
        if (!recipe || !recipe.ingredients) continue;

        const recipeTitle = recipe.title_en || recipe.title_ro;

        for (const ri of recipe.ingredients) {
          const ing = ri.ingredient;
          if (!ing) continue;

          const amountForRecipe = ri.amount_grams * scale;
          const existing = itemMap.get(ing.id);
          const ingName = ing.name_en || ing.name_ro;

          if (existing) {
            existing.total_grams += amountForRecipe;
            existing.recipe_appearances.push({
              recipe_title: recipeTitle,
              day_name: dayDisplayName,
              amount_grams: amountForRecipe
            });
            // Update display amount
            existing.display_amount = this.formatGramsDisplay(existing.total_grams, ing.default_unit);
          } else {
            itemMap.set(ing.id, {
              ingredient_id: ing.id,
              name_ro: ingName,
              name_en: ing.name_en || ing.name_ro,
              category: ing.category,
              total_grams: amountForRecipe,
              display_amount: this.formatGramsDisplay(amountForRecipe, ing.default_unit),
              recipe_appearances: [
                {
                  recipe_title: recipeTitle,
                  day_name: dayDisplayName,
                  amount_grams: amountForRecipe
                }
              ],
              checked: false,
              allergens: ing.allergens,
              estimated_cost_ron: ing.estimated_price_per_kg_ron 
                ? Math.round((ing.estimated_price_per_kg_ron * (amountForRecipe / 1000)) * 100) / 100
                : undefined
            });
          }
        }
      }
    }

    // Return sorted by category and name
    return Array.from(itemMap.values()).sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return (a.name_en || a.name_ro).localeCompare(b.name_en || b.name_ro);
    });
  }

  /**
   * Universal display formatting for international shoppers
   */
  private formatGramsDisplay(totalGrams: number, defaultUnit: string): string {
    if (defaultUnit === 'buc' || defaultUnit === 'pcs') {
      const pieces = Math.ceil(totalGrams / 60); // approx 60g per piece/egg
      return `${pieces} pcs (~${Math.round(totalGrams)}g)`;
    }
    if (defaultUnit === 'ml') {
      if (totalGrams >= 1000) {
        return `${(totalGrams / 1000).toFixed(1)} L`;
      }
      return `${Math.round(totalGrams)} ml`;
    }
    if (totalGrams >= 1000) {
      return `${(totalGrams / 1000).toFixed(2)} kg`;
    }
    return `${Math.round(totalGrams)} g`;
  }

  /**
   * Group items by category
   */
  groupByCategory(items: AggregatedShoppingItem[]): Record<string, AggregatedShoppingItem[]> {
    const grouped: Record<string, AggregatedShoppingItem[]> = {};

    items.forEach(item => {
      const cat = item.category || 'altele';
      if (!grouped[cat]) {
        grouped[cat] = [];
      }
      grouped[cat].push(item);
    });

    return grouped;
  }
}

export const shoppingListService = new ShoppingListService();
