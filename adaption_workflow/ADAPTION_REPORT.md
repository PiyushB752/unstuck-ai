# Adaption Labs Integration Report — Unstuck AI

## Project Overview
Unstuck AI helps users overcome overwhelm by identifying their main blocker and suggesting one small, practical next action.

## Adaption Labs Integration

Adaption Labs was used to prepare a task-specific training dataset and initiate an AutoScientist model adaptation run.

### Dataset Details

- Dataset name: `final_training_data`
- Dataset ID: `523bdd55-0d17-4bd5-8700-0c3eba18afa7`
- Training examples: 1,000
- Dataset status: Successfully uploaded and processed

### Model Details

- Base model: `Qwen/Qwen3.5-2B`
- Training method: Instruction
- Training configuration: LoRA
- AutoScientist Run ID: `16ce0468-1332-42b4-88db-f262fc777c01`

### Training Outcome

- Training successfully launched.
- One of three iterations completed.
- Best recorded win rate: 22.29%.
- The run was manually cancelled.
- Fine-tuning was not completed.
- No trained model was downloaded or integrated.

## Current AI Integration

Unstuck AI continues to use Groq AI with:

- Model: `llama-3.3-70b-versatile`

The Groq model remains the active inference model in the application.

## Conclusion

Adaption Labs was used for dataset preparation, dataset upload, model configuration, and initiating an AutoScientist training run. The training run was cancelled before completion, so the application does not currently use a fine-tuned model.