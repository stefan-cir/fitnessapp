"""
Hevy Workout Fetcher
Fetches your latest workouts from the Hevy API and displays them in a readable format.

Usage:
    python hevy_workout.py

Requirements:
    Set the HEVY_API_KEY environment variable with your Hevy API key.
    You can find your API key at https://hevy.com/settings (API tab).
"""

import os
import sys
import requests
from datetime import datetime

HEVY_API_URL = "https://api.hevyapp.com/v1/workouts"


def format_duration(seconds: int) -> str:
    """Convert seconds to a human-readable duration string."""
    if seconds is None:
        return "N/A"
    minutes, secs = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    if hours > 0:
        return f"{hours}h {minutes}m {secs}s"
    if minutes > 0:
        return f"{minutes}m {secs}s"
    return f"{secs}s"


def format_date(date_str: str) -> str:
    """Format an ISO 8601 date string to a readable format."""
    if not date_str:
        return "N/A"
    try:
        dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        return dt.strftime("%A, %B %d %Y at %I:%M %p")
    except ValueError:
        return date_str


def display_workout(workout: dict, index: int) -> None:
    """Print a single workout's details to stdout."""
    title = workout.get("title") or "Untitled Workout"
    start_time = format_date(workout.get("start_time"))
    end_time = format_date(workout.get("end_time"))
    description = workout.get("description") or ""

    print(f"\n{'=' * 60}")
    print(f"  Workout #{index}: {title}")
    print(f"{'=' * 60}")
    print(f"  Date:        {start_time}")
    if description:
        print(f"  Description: {description}")

    exercises = workout.get("exercises", [])
    if not exercises:
        print("  No exercises recorded.")
        return

    print(f"\n  Exercises ({len(exercises)} total):")
    for exercise in exercises:
        ex_title = exercise.get("title") or exercise.get("exercise_template_id", "Unknown")
        sets = exercise.get("sets", [])
        print(f"\n    • {ex_title}")
        for i, s in enumerate(sets, start=1):
            weight_kg = s.get("weight_kg")
            reps = s.get("reps")
            duration_seconds = s.get("duration_seconds")
            distance_meters = s.get("distance_meters")
            set_type = s.get("type", "normal")

            parts = []
            if weight_kg is not None:
                parts.append(f"{weight_kg} kg")
            if reps is not None:
                parts.append(f"{reps} reps")
            if duration_seconds is not None:
                parts.append(format_duration(duration_seconds))
            if distance_meters is not None:
                parts.append(f"{distance_meters} m")

            detail = " × ".join(parts) if parts else "N/A"
            type_label = f" [{set_type}]" if set_type and set_type != "normal" else ""
            print(f"        Set {i}{type_label}: {detail}")


def fetch_workouts(api_key: str, page: int = 1, page_size: int = 5) -> dict:
    """Fetch workouts from the Hevy API."""
    headers = {
        "api-key": api_key,
        "Accept": "application/json",
    }
    params = {"page": page, "pageSize": page_size}

    response = requests.get(HEVY_API_URL, headers=headers, params=params, timeout=15)

    if response.status_code == 401:
        print("Error: Unauthorized. Please check your HEVY_API_KEY.", file=sys.stderr)
        sys.exit(1)
    if response.status_code == 404:
        print("Error: No workouts found.", file=sys.stderr)
        sys.exit(1)
    response.raise_for_status()

    return response.json()


def main() -> None:
    api_key = os.environ.get("HEVY_API_KEY")
    if not api_key:
        print(
            "Error: HEVY_API_KEY environment variable is not set.\n"
            "Get your API key from https://hevy.com/settings (API tab) and run:\n"
            "  export HEVY_API_KEY=your_api_key_here",
            file=sys.stderr,
        )
        sys.exit(1)

    print("Fetching your latest workouts from Hevy…")
    data = fetch_workouts(api_key)

    workouts = data.get("workouts", [])
    if not workouts:
        print("No workouts found.")
        return

    page_count = data.get("page_count", 1)
    current_page = data.get("page", 1)
    print(f"Showing {len(workouts)} workout(s) — page {current_page} of {page_count}")

    for i, workout in enumerate(workouts, start=1):
        display_workout(workout, i)

    print(f"\n{'=' * 60}\n")


if __name__ == "__main__":
    main()
