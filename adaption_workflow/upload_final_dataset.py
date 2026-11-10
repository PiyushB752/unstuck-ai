import os
from pathlib import Path
from dotenv import load_dotenv
from adaption import Adaption

load_dotenv()

client = Adaption(api_key=os.getenv("ADAPTION_API_KEY"))

folder = Path(__file__).parent
csv_file = folder / "final_training_data.csv"

# Upload directly as training-ready data.
dataset = client.datasets.upload_file(
    str(csv_file),
    processing_mode="raw",
    column_mapping={
        "prompt": "prompt",
        "completion": "completion",
    },
)

dataset_id = dataset.dataset_id

print("Dataset ID:", dataset_id)
print("Initial status:", dataset.status)

# Wait for dataset processing.
status = client.datasets.wait_for_completion(dataset_id)

print("Final status:", status.status)
print("Training rows:", status.row_count)

if status.status == "failed":
    raise RuntimeError(f"Dataset processing failed: {status.error_data}")

if status.row_count is None or status.row_count < 1000:
    raise RuntimeError("Dataset has fewer than 1,000 available rows.")

(folder / "final_dataset_id.txt").write_text(dataset_id)

print("Dataset ready for training!")
