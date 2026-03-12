# Data Model: Fitness Progress Hub

## Entities

## UserProfile
- `id` (integer, PK)
- `timezone` (text)
- `created_at` (datetime)
- `updated_at` (datetime)

## NutritionEntry
- `id` (integer, PK)
- `source` (text)
- `source_id` (text)
- `consumed_at` (datetime)
- `meal_name` (text)
- `product_name` (text)
- `calories_kcal` (real)
- `protein_g` (real)
- `carbs_g` (real)
- `fat_g` (real)
- `image_path` (text)
- `raw_payload` (text)

## WorkoutSession
- `id` (integer, PK)
- `source` (text)
- `source_id` (text)
- `performed_at` (datetime)
- `title` (text)
- `duration_minutes` (integer)
- `total_volume` (real)
- `raw_payload` (text)

## GoalProfile
- `id` (integer, PK)
- `goal_type` (enum: `fat_loss`, `maingain`, `bulk`)
- `target_rate` (real, optional)
- `active` (boolean/integer)
- `effective_from` (datetime)

## ProgressSnapshot
- `id` (integer, PK)
- `goal_profile_id` (FK -> GoalProfile.id)
- `period_start` (datetime)
- `period_end` (datetime)
- `nutrition_adherence_score` (real)
- `workout_consistency_score` (real)
- `summary` (text)

## Recommendation
- `id` (integer, PK)
- `rec_type` (enum: `training`, `calories`)
- `recommendation_text` (text)
- `rationale` (text)
- `confidence` (real)
- `created_at` (datetime)

## DashboardSnapshot
- `id` (integer, PK)
- `payload` (JSON text)
- `created_at` (datetime)

## Relationships

- GoalProfile (1) -> ProgressSnapshot (many)
- DashboardSnapshot is independent and stores denormalized read model for fallback rendering.
- NutritionEntry and WorkoutSession are source-normalized records used by progress and recommendation services.
