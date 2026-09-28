import { Recipe, RecipeIngredient, Ingredient } from '../types';

export interface WeightInfo {
  rawGrams: number;
  cookedGrams: number;
  stateLabel: string;
  changeNote: string;
}

/**
 * Calculates accurate raw (negătit) vs cooked (gătit / în farfurie) weights
 * based on culinary food science evaporation & water absorption factors.
 */
export function getIngredientWeights(ri: RecipeIngredient): WeightInfo {
  const rawGrams = ri.amount_grams;
  const ingId = ri.ingredient_id || ri.ingredient?.id || '';
  const name = (ri.ingredient?.name_ro || ri.unit_display || '').toLowerCase();

  // Explicit override if already defined
  if (ri.amount_grams_cooked) {
    return {
      rawGrams,
      cookedGrams: ri.amount_grams_cooked,
      stateLabel: ri.cooked_state_label || 'gătit',
      changeNote: rawGrams > ri.amount_grams_cooked ? 'scade prin gătire' : 'crește prin absorbție apă'
    };
  }

  // 1. CARNE DE PUI, CURCAN, VITĂ, PORC (Pierd apă ~25%)
  if (
    ingId === 'ing-20' || ingId === 'ing-21' || ingId === 'ing-24' || 
    ingId === 'ing-26' || ingId === 'ing-60' || ingId === 'ing-66' ||
    name.includes('pui') || name.includes('curcan') || name.includes('vită') || name.includes('porc') || name.includes('ficăței')
  ) {
    const cookedGrams = Math.round(rawGrams * 0.75);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'fript / copt / fiert',
      changeNote: 'scade cu ~25% din greutate prin evaporarea apei'
    };
  }

  // 2. PEȘTE & FRUCTE DE MARE (Pierd apă ~20%)
  if (
    ingId === 'ing-22' || ingId === 'ing-23' || ingId === 'ing-61' ||
    name.includes('somon') || name.includes('păstrăv') || name.includes('cod') || name.includes('pește')
  ) {
    const cookedGrams = Math.round(rawGrams * 0.80);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'copt la cuptor / pe grătar',
      changeNote: 'scade cu ~20% prin rumenire'
    };
  }

  // 3. OREZ & QUINOA (Absorb apă: cresc de ~2.8x)
  if (ingId === 'ing-43' || ingId === 'ing-46' || name.includes('orez') || name.includes('quinoa')) {
    const cookedGrams = Math.round(rawGrams * 2.85);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'fiert pufos al dente',
      changeNote: 'crește de aproape 3x prin absorbția apei la fiert'
    };
  }

  // 4. MĂLAI PENTRU MĂMĂLIGĂ (Crește de ~3.8x)
  if (ingId === 'ing-42' || name.includes('mălai')) {
    const cookedGrams = Math.round(rawGrams * 3.8);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'mămăliguță fiartă caldă',
      changeNote: 'absoarbe apa și crește de ~3.8 ori'
    };
  }

  // 5. PASTE INTEGRALE (Cresc de ~2.3x)
  if (ingId === 'ing-44' || name.includes('paste') || name.includes('spaghete') || name.includes('penne')) {
    const cookedGrams = Math.round(rawGrams * 2.3);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'fierte al dente',
      changeNote: 'cresc de ~2.3 ori prin fierbere'
    };
  }

  // 6. LINTE & NĂUT USCAT (Crește de ~2.4x)
  if (ingId === 'ing-51' || name.includes('linte uscată')) {
    const cookedGrams = Math.round(rawGrams * 2.4);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'fiert în mâncare / sos',
      changeNote: 'crește de ~2.4 ori prin fierbere'
    };
  }

  // 7. CIUPERCI (Pierd multă apă ~40%)
  if (ingId === 'ing-14' || name.includes('ciuperci')) {
    const cookedGrams = Math.round(rawGrams * 0.60);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'sotate la tigaie',
      changeNote: 'scad cu ~40% prin eliminarea apei'
    };
  }

  // 8. SPANAC BABY (Scade dramatic ~50%)
  if (ingId === 'ing-5' || name.includes('spanac')) {
    const cookedGrams = Math.round(rawGrams * 0.50);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'înăbușit / sotat',
      changeNote: 'se restrânge cu ~50% volum și apă'
    };
  }

  // 9. CARTOFI (Pierdere ușoară ~5-10% la copt/fiert)
  if (ingId === 'ing-13' || name.includes('cartofi')) {
    const cookedGrams = Math.round(rawGrams * 0.92);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'copți / fierți piure',
      changeNote: 'pierdere minoră de apă'
    };
  }

  // 10. MAZĂRE, BROCCOLI (La abur / opărite)
  if (ingId === 'ing-8' || ingId === 'ing-62' || name.includes('broccoli') || name.includes('mazăre')) {
    const cookedGrams = Math.round(rawGrams * 0.95);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'opărit / la abur',
      changeNote: 'greutate stabilă'
    };
  }

  // 11. OUĂ (Pierd ~8% coajă/evaporare la gătit)
  if (ingId === 'ing-25' || name.includes('ouă') || name.includes('ou')) {
    const cookedGrams = Math.round(rawGrams * 0.90);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'ochi / omletă / fiert',
      changeNote: 'fără coajă, gătit'
    };
  }

  // 12. TOFU (Scade ușor la rumenit ~15%)
  if (ingId === 'ing-56' || name.includes('tofu')) {
    const cookedGrams = Math.round(rawGrams * 0.85);
    return {
      rawGrams,
      cookedGrams,
      stateLabel: 'rumenit la tigaie',
      changeNote: 'crustă rumenă crocantă'
    };
  }

  // 13. ALIMENTE CONSUMATE PROASPETE / CRUDE (roșii, castraveți, telemea, iaurt, avocado, nuci, pâine)
  return {
    rawGrams,
    cookedGrams: rawGrams,
    stateLabel: 'crud proaspăt / porționat',
    changeNote: 'nu necesită gătire termică'
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
