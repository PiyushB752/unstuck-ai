
import os
from pathlib import Path
from dotenv import load_dotenv
from adaption import Adaption

load_dotenv()

client = Adaption(api_key=os.getenv("ADAPTION_API_KEY"))

folder = Path(__file__).parent
dataset_id = (folder / "final_dataset_id.txt").read_text().strip()

run = client.autoscientist.create(
    dataset_id=dataset_id,
    model="Qwen/Qwen3.5-2B",
    training_method="instruction",
)

run_id = run.id

(folder / "final_run_id.txt").write_text(run_id)

print("Training launched!")
print("Run ID:", run_id)
print("Status:", run.status)
