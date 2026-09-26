import os

from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from google import genai

load_dotenv()

client = genai.Client(api_key = os.getenv("GEMINI_API_KEY"))

app = FastAPI()

class ChatRequest(BaseModel):
  message: str

@app.get("/")
async def root():
  return { "message": "Server running" }


@app.post("/chat")
async def getChat(chat: ChatRequest):

  response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents= chat.message
  )

  return { "response": response.text }