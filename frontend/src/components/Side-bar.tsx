export function SideBar() {
  return (
    <div className="w-1/5 shrink-0 flex flex-col gap-8 p-8 pl-2 pr-2">
      <button
        className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-white"
        type="button"
      >
        + New Chat
      </button>
      <div>Chats</div>
    </div>
  );
}
