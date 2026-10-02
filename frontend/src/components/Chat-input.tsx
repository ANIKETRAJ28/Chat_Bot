import { useState } from "react";

export function ChatInput() {
  const [inputVal, setInputVal] = useState<string>("");

  const hitLLM = async () => {
    const messages = [
      {
        role: "user",
        content:
          "Explain what an API is. Explain it in detail with a simple real-world analogy, how a frontend communicates with a backend API, and give a small example using React and FastAPI.",
      },
    ];
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error("Response body is not readable");
    }

    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const tempBuffer = decoder.decode(value, { stream: true });
      const events = tempBuffer.split("\n\n");
      const strEvents = events.pop() || "";
      for (const event of strEvents) {
        if (!event.startsWith("data: ")) continue;
        const data = event.slice(6);
        buffer += data;
      }
    }
    console.log("data: \n", buffer);
  };

  return (
    <div className="flex h-full w-full flex-col justify-end gap-2 pb-3">
      <div className="flex w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3">
        <input
          className="min-w-0 flex-1 bg-transparent px-2 outline-none"
          placeholder="Message..."
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
        />
        <button
          className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-white"
          type="button"
          onClick={() => hitLLM()}
        >
          send
        </button>
      </div>
      <div className="px-2 text-sm text-gray-500">
        Press Enter to send, Shift + Enter for new line
      </div>
    </div>
  );
}
