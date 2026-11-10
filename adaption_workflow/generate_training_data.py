
import pandas as pd
import random
from pathlib import Path

random.seed(42)

folder = Path(__file__).parent

scenarios = [
    ("exam preparation", "You have an upcoming exam and don't know where to begin", "Study one important topic for 15 minutes", "Starting with one topic makes exam preparation manageable", 15),
    ("college assignments", "You have several pending college assignments", "Open the assignment with the nearest deadline and complete its first question", "One concrete question is easier to start than the entire assignment", 15),
    ("project work", "Your college project has many unfinished features", "Choose the most important unfinished feature and implement its smallest part", "Breaking development into smaller tasks reduces overwhelm", 20),
    ("procrastination", "You keep postponing an important task", "Work on the task for just five uninterrupted minutes", "A short starting session reduces resistance", 5),
    ("resume preparation", "You need to update your resume but feel overwhelmed", "Update the project section with one recent project", "Completing one section creates immediate progress", 15),
    ("interview preparation", "You have an upcoming technical interview", "Practice answering one common technical interview question", "Focused practice is more useful than preparing everything at once", 15),
    ("learning programming", "You want to learn programming but don't know where to start", "Complete one beginner exercise on your current topic", "One exercise turns learning into an actionable task", 15),
    ("time management", "You have many tasks and cannot decide what to do first", "Write down your three nearest deadlines and choose the earliest one", "Comparing deadlines helps identify the immediate priority", 10),
    ("coding problems", "You are stuck debugging a coding problem", "Reproduce the error and identify the exact failing line", "A reproducible error gives you a specific debugging starting point", 10),
    ("study distraction", "You keep getting distracted while studying", "Put your phone away and study one topic for ten minutes", "A short distraction-free session helps rebuild focus", 10),
]

openings = [
    "I feel overwhelmed with {topic}.",
    "I am struggling with {topic}.",
    "I don't know how to start with {topic}.",
    "I keep delaying {topic}.",
    "There is too much to do related to {topic}.",
    "Help me get unstuck with {topic}.",
    "I need one practical next step for {topic}.",
    "I am confused about what to do first with {topic}.",
    "I have limited time for {topic}.",
    "Can you simplify {topic} for me?",
    "I have been avoiding {topic} for several days.",
    "I need to make progress on {topic} today.",
    "I keep switching between tasks related to {topic}.",
    "I am worried about falling behind on {topic}.",
    "I want to stop overthinking {topic} and begin.",
    "I have very little motivation for {topic}.",
    "I need a realistic starting point for {topic}.",
    "I cannot decide which part of {topic} to do first.",
    "I want to make progress without feeling overwhelmed by {topic}.",
    "Please help me take the first step with {topic}.",
]

situations = [
    "I have been postponing it.",
    "I have other responsibilities too.",
    "I don't have much time today.",
    "I feel confused about the first step.",
    "I keep thinking about the entire workload.",
    "I have already tried but lost focus.",
    "I am afraid I won't finish on time.",
    "I need something small that I can do immediately.",
    "I keep jumping between different tasks.",
    "I want to make progress today.",
]

rows = []

# Generate varied combinations from each scenario.
for topic, problem, action, reason, minutes in scenarios:
    for opening in openings:
        for situation in situations:
            prompt = (
                f"{opening.format(topic=topic)} "
                f"{problem}. {situation} "
                "Give me one small practical next action."
            )

            completion = (
                f"MAIN BLOCKER: Difficulty getting started with {topic}.\n"
                f"YOUR ACTION: {action}.\n"
                f"WHY THIS HELPS: {reason}.\n"
                f"ESTIMATED TIME: {minutes} minutes."
            )

            rows.append({
                "prompt": prompt,
                "completion": completion
            })

# Shuffle and remove duplicate prompts.
random.shuffle(rows)

df = pd.DataFrame(rows)
df = df.drop_duplicates(subset=["prompt"])

# Keep the first 1,000 unique examples.
df = df.head(1000).reset_index(drop=True)

output_file = folder / "final_training_data.csv"
df.to_csv(output_file, index=False)

print("Training rows:", len(df))
print("Unique prompts:", df["prompt"].nunique())
print("Saved:", output_file)
