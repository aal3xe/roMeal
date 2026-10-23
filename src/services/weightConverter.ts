import { Recipe, RecipeIngredient } from '../types';

export interface WeightInfo {
  rawGrams: number;
  cookedGrams: number;
  stateLabel: string;
  changeNote: string;
}

/**
 * Calculates accurate raw (uncooked) vs cooked (on the plate) weights
 * based on culinary food science evaporation & water absorption factors.
 */
export function getIngredientWeights(ri: RecipeIngredient): WeightInfo {
  const rawGrams = ri.amount_grams;
  const ingId = ri.ingredient_id || ri.ingredient?.id || '';
  const nameRo = (ri.ingredient?.name_ro || '').toLowerCase();
  const nameEn = (ri.ingredient?.name_en || ri.unit_display || '').toLowerCase();
  const combinedName = `${nameRo} ${nameEn}`;

  // Explicit override if already defined
  if (ri.amount_grams_cooked) {
    return {
      rawGrams,
      cookedGrams: ri.amount_grams_cooked,
      stateLabel: ri.cooked_state_label || 'Cooked',
      changeNote: rawGrams > ri.amount_grams_cooked ? 'Reduces via cooking' : 'Expands via water absorption'
    };
  }

  // 1. CHICKEN, TURKEY, BEEF, PORK (Moisture loss ~25%)
  if (
    ingId === 'ing-20' || ingId === 'ing-21' || ingId === 'ing-24' || 
    ingId === 'ing-26' || ingId === 'ing-60' || ingId === 'ing-66' ||
    combinedName.includes('chicken') || combinedName.includes('turkey') || 
    combinedName.includes('beef') || combinedName.includes('pork') || 
    combinedName.includes('liver') || combinedName.includes('pui') || 
    combinedName.includes('curcan') || combinedName.includes('vită')
  ) {
    const cookedGrams = Math.round(rawGrams * 0.75);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Grilled / Baked / Seared',
      changeNote: 'Reduces by ~25% weight through moisture loss'
    };
  }

  // 2. FISH & SEAFOOD (Moisture loss ~20%)
  if (
    ingId === 'ing-22' || ingId === 'ing-23' || ingId === 'ing-61' ||
    combinedName.includes('salmon') || combinedName.includes('trout') || 
    combinedName.includes('cod') || combinedName.includes('fish') || 
    combinedName.includes('shrimp') || combinedName.includes('somon') || 
    combinedName.includes('păstrăv')
  ) {
    const cookedGrams = Math.round(rawGrams * 0.80);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Oven-baked / Pan-seared',
      changeNote: 'Reduces by ~20% through searing & juices'
    };
  }

  // 3. RICE & QUINOA (Absorbs water: expands ~2.8x)
  if (
    ingId === 'ing-43' || ingId === 'ing-46' || 
    combinedName.includes('rice') || combinedName.includes('quinoa') || 
    combinedName.includes('orez')
  ) {
    const cookedGrams = Math.round(rawGrams * 2.85);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Steamed / Fluffy al dente',
      changeNote: 'Expands nearly 3x by absorbing cooking water'
    };
  }

  // 4. CORNMEAL / POLENTA (Expands ~3.8x)
  if (ingId === 'ing-42' || combinedName.includes('cornmeal') || combinedName.includes('polenta') || combinedName.includes('mălai')) {
    const cookedGrams = Math.round(rawGrams * 3.8);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Simmered warm polenta',
      changeNote: 'Absorbs water and increases ~3.8x'
    };
  }

  // 5. WHOLE WHEAT PASTA (Expands ~2.3x)
  if (
    ingId === 'ing-44' || combinedName.includes('pasta') || 
    combinedName.includes('spaghetti') || combinedName.includes('penne') || 
    combinedName.includes('paste')
  ) {
    const cookedGrams = Math.round(rawGrams * 2.3);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Boiled al dente',
      changeNote: 'Expands ~2.3x through boiling'
    };
  }

  // 6. LENTILS & CHICKPEAS (Expands ~2.4x)
  if (
    ingId === 'ing-51' || combinedName.includes('lentil') || 
    combinedName.includes('chickpea') || combinedName.includes('linte')
  ) {
    const cookedGrams = Math.round(rawGrams * 2.4);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Simmered in broth/stew',
      changeNote: 'Expands ~2.4x through hydration'
    };
  }

  // 7. MUSHROOMS (Loses ~40% water)
  if (ingId === 'ing-14' || combinedName.includes('mushroom') || combinedName.includes('ciuperci')) {
    const cookedGrams = Math.round(rawGrams * 0.60);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Pan-sautéed',
      changeNote: 'Reduces by ~40% as moisture evaporates'
    };
  }

  // 8. BABY SPINACH (Shrinks ~50%)
  if (ingId === 'ing-5' || combinedName.includes('spinach') || combinedName.includes('spanac')) {
    const cookedGrams = Math.round(rawGrams * 0.50);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Wilted / Steamed',
      changeNote: 'Reduces by ~50% in volume and water'
    };
  }

  // 9. POTATOES (Minor ~8% loss)
  if (ingId === 'ing-13' || combinedName.includes('potato') || combinedName.includes('cartofi')) {
    const cookedGrams = Math.round(rawGrams * 0.92);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Roasted / Boiled mash',
      changeNote: 'Minor moisture evaporation'
    };
  }

  // 10. PEAS & BROCCOLI (Steamed / blanched)
  if (
    ingId === 'ing-8' || ingId === 'ing-62' || 
    combinedName.includes('broccoli') || combinedName.includes('pea') || 
    combinedName.includes('mazăre')
  ) {
    const cookedGrams = Math.round(rawGrams * 0.95);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Steamed tender-crisp',
      changeNote: 'Stable weight'
    };
  }

  // 11. EGGS (Loss ~10% shell/cooking)
  if (ingId === 'ing-25' || combinedName.includes('egg') || combinedName.includes('ouă') || combinedName.includes('ou')) {
    const cookedGrams = Math.round(rawGrams * 0.90);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Poached / Scrambled / Boiled',
      changeNote: 'Shelled & cooked'
    };
  }

  // 12. TOFU (Loss ~15%)
  if (ingId === 'ing-56' || combinedName.includes('tofu')) {
    const cookedGrams = Math.round(rawGrams * 0.85);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'Pan-crisped golden',
      changeNote: 'Crisped outer crust'
    };
  }

  // 13. FRESH / RAW CONSUMED ITEMS (tomatoes, cucumbers, cheeses, yogurt, avocado, nuts, bread)
  return {
    rawGrams,
    cookedGrams: rawGrams,
    stateLabel: 'Fresh raw / Pre-portioned',
    changeNote: 'No thermal cooking required'
  };
}

/**
 * Returns total plate weight: both total raw ingredients and total weight cooked in plate
 */
export function getRecipeTotalPlateWeight(recipe: Recipe): {
  rawTotalGrams: number;
  cookedTotalGrams: number;
} {
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    return { rawTotalGrams: 300, cookedTotalGrams: 320 };
  }

  let rawTotalGrams = 0;
  let cookedTotalGrams = 0;

  for (const ri of recipe.ingredients) {
    const { rawGrams, cookedGrams } = getIngredientWeights(ri);
    rawTotalGrams += rawGrams;
    cookedTotalGrams += cookedGrams;
  }

  return {
    rawTotalGrams: Math.round(rawTotalGrams),
    cookedTotalGrams: Math.round(cookedTotalGrams)
  };
}
