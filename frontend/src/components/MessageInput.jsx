import { useState } from "react";
import { useChatStore } from "../store/useChatStore.js";

function MessageInput() {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    sendMessage({ text: text.trim() });
    setText("");
  };

  return (
    <form
      onSubmit={handleSend}
      className="p-4 border-t border-gray-800 bg-gray-900 flex gap-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;