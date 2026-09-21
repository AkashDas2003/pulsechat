import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return (
      <div className="w-64 border-r border-gray-800 bg-gray-900 p-4 text-gray-400">
        Loading users...
      </div>
    );
  }

  return (
    <div className="w-64 border-r border-gray-800 bg-gray-900 flex flex-col">
      <div className="p-4 border-b border-gray-800 font-semibold text-gray-100">
        Contacts
      </div>
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center gap-3 p-3 hover:bg-gray-800 transition text-left ${
              selectedUser?._id === user._id ? "bg-gray-800" : ""
            }`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
              )}
            </div>
            <div>
              <p className="font-medium text-sm text-gray-100">{user.fullName}</p>
              <p className="text-xs text-gray-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}
        {users.length === 0 && (
          <p className="text-center text-gray-500 text-sm p-4">
            No other users yet
          </p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;