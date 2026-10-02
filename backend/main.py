import os

from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from google import genai
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

client = genai.Client(api_key = os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

class Person(BaseModel):
  name: str
  age: int

class ChatMessage(BaseModel):
  role: str
  content: str

class ChatRequest(BaseModel):
  messages: list[ChatMessage]

@app.get("/")
def root():
  return { "message": "Server running" }


@app.post("/chat")
async def getChat(chat: ChatRequest):

  contents = [
    {
      "role": "model" if message.role == "assistant" else "user",
      "parts": [
        {
          "text": message.content
        }
      ]
    }
    for message in chat.messages
  ]

  # response = client.models.generate_content(
  #   model = "gemini-3.6-flash",
  #   contents = contents,
  #   config={
  #     "system_instruction": """
  #       You are a helpful programming tutor.
  #       Explain concepts in simple language.
  #       Use practical examples whenever useful.
  #     """,
  #     "temperature": 0.7,
  #     "max_output_tokens": 500,
  #     # "top_k": 40,
  #     # "top_p": 0.9
  #     # "response_mime_type": "application/json",
  #     # "response_schema": Person
  #   }
  # )
  # return { "response": response.text }

  # To get the response in stream of chunks

  def generate_response(contents):
    response = client.models.generate_content_stream(
      model="gemini-3.6-flash",
      contents=contents
    )

    for chunk in response:
      if chunk.text:
        yield f"data: {chunk.text}\n\n"
    
  return StreamingResponse(
    generate_response(contents),
    media_type="text/event-stream"
  )