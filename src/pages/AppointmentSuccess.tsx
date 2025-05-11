import { useLocation } from "wouter";
import { formatCurrency } from "../lib/utils";

const AppointmentSuccess: React.FC = () => {
  const [_, navigate] = useLocation();

  const handleViewAppointments = () => {
    // In a real app this would navigate to an appointments list
    // For now, we'll go back to the home screen
    navigate("/");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="px-4 py-10 flex flex-col items-center pb-16">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-2">Agendamento confirmado!</h1>
      <p className="text-gray-600 text-center mb-8">Sua consulta foi agendada com sucesso.</p>
      
      <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-8">
        <div className="p-4 bg-primary text-white">
          <h2 className="font-semibold text-lg">Detalhes do agendamento</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Procedimento</h3>
              <p className="font-medium">Consulta - Dermatologia</p>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500">Profissional</h3>
              <p className="font-medium">Dra. Ana Silva</p>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500">Local</h3>
              <p className="font-medium">Clínica São Paulo</p>
              <p className="text-sm text-gray-600">Av. Paulista, 1000 - Bela Vista, São Paulo/SP</p>
            </div>
            
            <div className="flex space-x-6">
              <div>
                <h3 className="text-sm text-gray-500">Data</h3>
                <p className="font-medium">Sábado, 12/08/2023</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">Horário</h3>
                <p className="font-medium">11:00</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500">Valor</h3>
              <p className="font-medium">{formatCurrency(260)}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500">ID da reserva</h3>
              <p className="font-medium">#IL789456123</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full space-y-3">
        <button
          className="w-full bg-primary text-white py-3 rounded-lg font-medium"
          onClick={handleViewAppointments}
        >
          Ver meus agendamentos
        </button>
        
        <button
          className="w-full bg-white text-primary py-3 rounded-lg font-medium border border-primary"
          onClick={handleBackToHome}
        >
          Voltar para o início
        </button>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
