import { useAuthStore } from "../store/useAuthStore.js";

function HomePage() {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-2">Home Page (Chat UI goes here)</h1>
      <p className="text-gray-500 mb-6">Logged in as: {authUser?.fullName}</p>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default HomePage;