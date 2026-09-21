import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";
import MessageInput from "./MessageInput.jsx";

function ChatContainer() {
  const {
    messages,
    selectedUser,
    getMessages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-950 text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-950">
      <div className="p-4 border-b border-gray-800 font-medium text-gray-100">
        {selectedUser.fullName}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => {
          const isMe = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-2 ${
                  isMe
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                {message.text && <p className="text-sm">{message.text}</p>}
                <p
                  className={`text-[10px] mt-1 ${
                    isMe ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {formatMessageTime(message.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-10">
            No messages yet. Say hi!
          </p>
        )}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;