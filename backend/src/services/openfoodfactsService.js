import { AppError } from "../lib/errors.js";

const BASE_URL = "https://world.openfoodfacts.org";

export const fetchRecentFoodEntries = async (query = "chicken") => {
  const url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": process.env.OPENFOODFACTS_USER_AGENT || "fitness-progress-hub/1.0"
    }
  });

  if (!response.ok) {
    throw new AppError("Failed to fetch nutrition data", response.status);
  }

  const payload = await response.json();
  const products = payload.products || [];

  return products.slice(0, 10).map((item) => ({
    source: "openfoodfacts",
    source_id: item.id || item.code || null,
    consumed_at: new Date().toISOString(),
    meal_name: "Imported",
    product_name: item.product_name || "Unknown product",
    calories_kcal: Number(item.nutriments?.["energy-kcal_100g"] || 0),
    protein_g: Number(item.nutriments?.proteins_100g || 0),
    carbs_g: Number(item.nutriments?.carbohydrates_100g || 0),
    fat_g: Number(item.nutriments?.fat_100g || 0),
    image_path: null,
    raw_payload: JSON.stringify(item)
  }));
};
