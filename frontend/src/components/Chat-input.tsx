import { useState } from "react";

export function ChatInput() {
  const [inputVal, setInputVal] = useState<string>("");

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
