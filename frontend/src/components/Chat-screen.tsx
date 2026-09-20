import { ChatHeader } from "./Chat-header";
import { Chat } from "./Chat";
import { ChatInput } from "./Chat-input";

export function ChatScreen() {
  return (
    <div className="w-full h-full min-w-0 flex flex-1 flex-col">
      <div className="h-[8%] shrink-0 pl-5 pr-5">
        <ChatHeader />
      </div>
      <div className="flex-1 min-h-0 border-b border-t border-gray-300">
        <Chat />
      </div>
      <div className="h-[15%] shrink-0 pl-5 pr-5">
        <ChatInput />
      </div>
    </div>
  );
}
