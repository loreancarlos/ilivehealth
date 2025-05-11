import { useContext } from "react";
import { useLocation } from "wouter";
import { AppContext } from "../context/AppContext";

const LoginModal: React.FC = () => {
  const { showLoginModal, setShowLoginModal } = useContext(AppContext);
  const [_, navigate] = useLocation();

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleRegister = () => {
    setShowLoginModal(false);
    navigate("/register");
  };

  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl slide-in">
        <div className="p-4">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold">Entre ou crie uma conta</h3>
            <button onClick={closeLoginModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">Faça login para continuar com o agendamento</p>
          
          <button
            className="w-full bg-primary text-white py-3 rounded-lg font-medium mb-4"
            onClick={handleLogin}
          >
            Entrar
          </button>
          
          <button
            className="w-full bg-white border border-primary text-primary py-3 rounded-lg font-medium mb-4"
            onClick={handleRegister}
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
