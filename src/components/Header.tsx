import { useContext, useState } from "react";
import { useLocation } from "wouter";
import { AppContext } from "../context/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Badge } from "./ui/badge";
import { useAuthStore } from "../store/authStore";

const Header = () => {
  const { showBackButton, setShowNotificationModal } = useContext(AppContext);
  const { showConnectionTrouble } = useContext(AppContext);
  const [location, navigate] = useLocation();
  const [notificationCount] = useState(3);
  const { user } = useAuthStore();

  const handleBackNavigation = () => {
    if (location === "/appointment/success") {
      navigate("/");
    } else {
      window.history.back();
    }
  };

  const handleNotificationClick = () => {
    setShowNotificationModal(true);
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
                stroke="currentColor">
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
            <span className="text-primary font-bold text-2xl">
              iLive<span className="text-accent text-sm">health</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full relative">
                <Bell className="h-6 w-6" />
                {notificationCount > 0 && (
                  <Badge className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full p-0">
                    {notificationCount}
                  </Badge>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col py-1">
                    <span className="font-medium text-sm">
                      Novo agendamento confirmado
                    </span>
                    <span className="text-xs text-gray-500">
                      Carlos Oliveira confirmou o agendamento para hoje às 09:30
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col py-1">
                    <span className="font-medium text-sm">
                      Agendamento cancelado
                    </span>
                    <span className="text-xs text-gray-500">
                      Mariana Santos cancelou o agendamento de amanhã
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col py-1">
                    <span className="font-medium text-sm">
                      Pagamento recebido
                    </span>
                    <span className="text-xs text-gray-500">
                      Pagamento de R$ 250,00 recebido de Fernando Melo
                    </span>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center">
                <span className="text-primary text-sm">
                  Ver todas as notificações
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="lg:flex items-center hidden">
            {user?.professional?.profileImage ? (
              <img
                src={user.professional.profileImage}
                alt="Profile photo"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium text-xs">
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
            )}
            <div className="ml-2">
              <p className="text-sm font-medium">{user?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-red-500">
        {showConnectionTrouble && (
          <span className="text-primary font-bold text-sm text-white">
            Sem conexão com a Internet
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
