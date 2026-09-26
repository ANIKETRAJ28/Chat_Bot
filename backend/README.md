# LLM Chat Bot Backend Setup

## Prerequisites

- Python
- uv

## Installation

Clone the repository:

```bash
git clone https://github.com/ANIKETRAJ28/Chat_Bot.git
cd backend
```

Install dependencies:

```bash
uv sync
```

Create a `.env` file based on the `.env.example` file:

```bash
cp .env.example .env
```

And your api key to the `.env` file.

Run the backend server:

```bash
uv run fastapi dev
```

The API will be available at:

```
http://localhost:8000
```
