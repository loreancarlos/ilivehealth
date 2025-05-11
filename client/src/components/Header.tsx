import { useContext } from "react";
import { useLocation } from "wouter";
import { AppContext } from "@/context/AppContext";

const Header = () => {
  const { showBackButton, setShowLoginModal } = useContext(AppContext);
  const [location, navigate] = useLocation();

  const handleBackNavigation = () => {
    if (location === '/appointment/success') {
      navigate('/');
    } else {
      window.history.back();
    }
  };

  const handleProfileClick = () => {
    setShowLoginModal(true);
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <button onClick={handleBackNavigation} className="mr-2 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <div className="flex items-center">
            <span className="text-primary font-bold text-2xl">iLive</span>
          </div>
        </div>
        <div>
          <button onClick={handleProfileClick} className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
