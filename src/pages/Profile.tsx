import { useAuthStore } from "../store/authStore";
import { useLocation } from "wouter";

const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [_, navigate] = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-semibold text-primary">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Telefone</label>
            <p className="font-medium">{user.phone}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-medium mt-6">
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
