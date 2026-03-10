# fitnessapp

A simple fitness app with two Python scripts:

1. **`hevy_workout.py`** — Fetches your latest workouts from the [Hevy API](https://hevy.com/)
2. **`food_tracker.py`** — Looks up nutritional information by barcode via the [OpenFoodFacts API](https://world.openfoodfacts.org/)

---

## Requirements

- Python 3.8+
- Install dependencies:

```bash
pip install -r requirements.txt
```

---

## hevy_workout.py

Fetches your 5 most recent workouts and displays exercises, sets, reps, and weights.

### Setup

Get your API key from <https://hevy.com/settings> (API tab) and export it:

```bash
export HEVY_API_KEY=your_api_key_here
```

### Usage

```bash
python hevy_workout.py
```

### Example output

```
Fetching your latest workouts from Hevy…
Showing 5 workout(s) — page 1 of 12

============================================================
  Workout #1: Push Day
============================================================
  Date:        Monday, March 10 2026 at 06:30 AM

  Exercises (3 total):

    • Bench Press (Barbell)
        Set 1: 80 kg × 8 reps
        Set 2: 80 kg × 8 reps
        Set 3: 85 kg × 6 reps
    ...
```

---

## food_tracker.py

Look up nutritional values for any packaged food by scanning or typing its barcode.

### Usage

**Interactive mode** (prompts for barcodes until you quit):

```bash
python food_tracker.py
```

**Single lookup from the command line:**

```bash
python food_tracker.py 3017620422003      # Nutella
python food_tracker.py 5449000000996      # Coca-Cola
```

### Example output

```
Looking up barcode: 3017620422003 …

============================================================
  Nutella
============================================================
  Brand:        Ferrero
  Quantity:     400 g
  Nutri-Score:  E

  Nutritional values per 100 g / 100 ml:
  ------------------------------------------
  Energy                       539.00 kcal
  Fat                           30.90 g
    of which saturates          10.60 g
  Carbohydrates                 57.50 g
    of which sugars             56.30 g
  Fiber                          0.00 g
  Protein                        6.30 g
  Salt                           0.11 g
```
