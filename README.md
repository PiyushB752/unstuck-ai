# Unstuck AI

**One small step at a time.**

Unstuck AI is an AI-powered productivity assistant that helps people overcome overwhelm by turning messy thoughts and competing priorities into one small, practical next action.

Instead of giving users another long to-do list, Unstuck AI helps them figure out what to do right now.

## Live Demo

**Deployed Link:** Add your deployment URL here.

## Features

- **AI-powered suggestions:** Generates practical next actions based on user input.
- **Identify blockers:** Understands what's preventing users from getting started.
- **Alternative suggestions:** Offers different actions when the first suggestion doesn't fit.
- **Next-step guidance:** Generates another action after the current one is completed.
- **Action tracking:** Mark actions as completed.
- **Session history:** View previous problems and generated actions.
- **Delete controls:** Delete individual actions, entire sessions, or all history.
- **Responsive interface:** Designed for desktop and mobile screens.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Groq AI
- MongoDB Atlas
- Zod

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
MONGODB_URI=your_mongodb_connection_string
ADAPTION_API_KEY=your_adaption_api_key
```

Replace the placeholder values with your actual credentials.

Never commit your `.env` file or expose API keys publicly.

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## How It Works

1. The user describes what's overwhelming them.
2. The application sends the problem to the backend.
3. Groq AI identifies the main blocker and generates one practical action.
4. The application saves the session and action in MongoDB.
5. The user can complete the action, request a different suggestion, or ask for the next step.
6. Previous sessions and actions can be viewed in History.

## Project Structure

```text
unstuck-ai/
│
├── app/
│   ├── api/
│   ├── history/
│   ├── privacy/
│   ├── terms/
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   ├── client-id.ts
│   ├── db.ts
│   ├── groq.ts
│   ├── mongodb.ts
│   └── storage.ts
│
├── types/
│
├── adaption_workflow/
│   ├── ADAPTION_REPORT.md
│   ├── final_training_data.csv
│   ├── final_dataset_id.txt
│   ├── final_run_id.txt
│   ├── generate_training_data.py
│   ├── train_final_model.py
│   ├── upload_final_dataset.py
│   └── requirements.txt
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

*Note: This is a simplified structure. API routes, components, and other application files are organized inside their respective folders.*

## Environment Variables

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Groq API authentication |
| `GROQ_MODEL` | AI model configuration |
| `MONGODB_URI` | MongoDB Atlas connection |
| `ADAPTION_API_KEY` | Adaption Labs authentication for the experimental workflow |

## Adaption Labs Integration

Unstuck AI includes an experimental model-adaptation workflow using Adaption Labs.

### Dataset

- Dataset: `final_training_data`
- Training examples: 1,000
- Dataset upload and processing: Successful

### Model Experiment

- Base model: `Qwen/Qwen3.5-2B`
- Training method: Instruction fine-tuning
- Configuration: LoRA
- AutoScientist run: `16ce0468-1332-42b4-88db-f262fc777c01`

### Experiment Result

The AutoScientist run was launched successfully. One of three iterations completed, reaching a recorded best win rate of 22.29%.

The run was subsequently cancelled before training completed.

No fine-tuned model was produced or integrated into the application.

### Current AI Provider

The application continues to use Groq AI:

- Model: `llama-3.3-70b-versatile`

### Running the Adaption Workflow

Install the Python dependencies:

```bash
pip install -r adaption_workflow/requirements.txt
```

The scripts for dataset generation, upload, and the experimental training workflow are available in `adaption_workflow/`.

## Privacy

Unstuck AI stores user sessions and generated actions in MongoDB. Avoid entering passwords, financial details, or other sensitive personal information.

See the application's Privacy Policy for more information.

## Project Goal

The goal of Unstuck AI is simple:

**Don't overwhelm users with a complete plan. Help them take the next step.**