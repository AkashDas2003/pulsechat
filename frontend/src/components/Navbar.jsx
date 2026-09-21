import { useAuthStore } from "../store/useAuthStore.js";

function Navbar() {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          {authUser?.fullName?.charAt(0).toUpperCase()}
        </div>
        <span className="font-semibold text-sm">MERN Chat</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          Logged in as <span className="font-medium">{authUser?.fullName}</span>
        </span>
        <button
          onClick={logout}
          className="text-sm bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;