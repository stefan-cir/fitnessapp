"""
Food Tracker — OpenFoodFacts Barcode Lookup
Enter a product barcode to retrieve its nutritional information.

Usage:
    python food_tracker.py                  # interactive mode (prompts for barcode)
    python food_tracker.py <barcode>        # single lookup from command line

Examples:
    python food_tracker.py 3017620422003    # Nutella
    python food_tracker.py 5449000000996    # Coca-Cola
"""

import sys
import requests

OPENFOODFACTS_URL = "https://world.openfoodfacts.org/api/v0/product/{barcode}.json"

# Nutrients to display and their human-readable labels
NUTRIENTS = [
    ("energy-kcal_100g", "Energy", "kcal"),
    ("fat_100g", "Fat", "g"),
    ("saturated-fat_100g", "  of which saturates", "g"),
    ("carbohydrates_100g", "Carbohydrates", "g"),
    ("sugars_100g", "  of which sugars", "g"),
    ("fiber_100g", "Fiber", "g"),
    ("proteins_100g", "Protein", "g"),
    ("salt_100g", "Salt", "g"),
    ("sodium_100g", "Sodium", "g"),
]


def fetch_product(barcode: str) -> dict:
    """Fetch product data from OpenFoodFacts for the given barcode."""
    url = OPENFOODFACTS_URL.format(barcode=barcode)
    headers = {"User-Agent": "FitnessApp/1.0 (github.com/stefan-cir/fitnessapp)"}
    response = requests.get(url, headers=headers, timeout=15)
    response.raise_for_status()
    return response.json()


def display_product(data: dict, barcode: str) -> None:
    """Print nutritional information for a product."""
    status = data.get("status", 0)
    if status != 1:
        print(f"  Product with barcode '{barcode}' was not found in the OpenFoodFacts database.")
        return

    product = data.get("product", {})

    # Basic product info
    name = product.get("product_name") or product.get("product_name_en") or "Unknown product"
    brands = product.get("brands") or "Unknown brand"
    quantity = product.get("quantity") or ""
    serving_size = product.get("serving_size") or ""
    nutriscore = product.get("nutriscore_grade") or product.get("nutrition_grade_fr") or ""

    print(f"\n{'=' * 60}")
    print(f"  {name}")
    print(f"{'=' * 60}")
    print(f"  Brand:        {brands}")
    if quantity:
        print(f"  Quantity:     {quantity}")
    if serving_size:
        print(f"  Serving size: {serving_size}")
    if nutriscore:
        print(f"  Nutri-Score:  {nutriscore.upper()}")

    # Nutritional values per 100 g
    nutriments = product.get("nutriments", {})
    if not nutriments:
        print("\n  No nutritional information available.")
        return

    print("\n  Nutritional values per 100 g / 100 ml:")
    print(f"  {'-' * 42}")
    for key, label, unit in NUTRIENTS:
        value = nutriments.get(key)
        if value is not None:
            print(f"  {label:<28} {value:>8.2f} {unit}")

    # Ingredients
    ingredients = product.get("ingredients_text") or product.get("ingredients_text_en")
    if ingredients:
        print(f"\n  Ingredients:")
        # Wrap long ingredient lists at 56 characters
        words = ingredients.split()
        line = "  "
        for word in words:
            if len(line) + len(word) + 1 > 58:
                print(line)
                line = "    " + word + " "
            else:
                line += word + " "
        if line.strip():
            print(line)

    print()


def lookup_barcode(barcode: str) -> None:
    """Look up a barcode and display the result."""
    barcode = barcode.strip()
    if not barcode:
        print("  Please enter a valid barcode.")
        return

    print(f"\nLooking up barcode: {barcode} …")
    try:
        data = fetch_product(barcode)
        display_product(data, barcode)
    except requests.exceptions.ConnectionError:
        print("  Error: Could not connect to OpenFoodFacts. Check your internet connection.")
    except requests.exceptions.HTTPError as exc:
        print(f"  Error: HTTP {exc.response.status_code} from OpenFoodFacts.")
    except requests.exceptions.Timeout:
        print("  Error: Request timed out. Please try again.")


def interactive_mode() -> None:
    """Prompt the user to enter barcodes until they quit."""
    print("=" * 60)
    print("  Food Tracker — OpenFoodFacts Barcode Lookup")
    print("=" * 60)
    print("  Enter a product barcode to see its nutritional info.")
    print("  Type 'q' or press Ctrl-C to quit.\n")

    while True:
        try:
            barcode = input("  Barcode: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            break

        if barcode.lower() in ("q", "quit", "exit"):
            print("Goodbye!")
            break

        lookup_barcode(barcode)


def main() -> None:
    if len(sys.argv) > 1:
        # Command-line mode: look up each barcode provided as an argument
        for barcode in sys.argv[1:]:
            lookup_barcode(barcode)
    else:
        # Interactive mode
        interactive_mode()


if __name__ == "__main__":
    main()
