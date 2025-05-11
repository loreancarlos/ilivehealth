import { useState } from "react";
import { useLocation } from "wouter";
import { formatCurrency } from "@/lib/utils";
import { getDayName, getDayOfMonth, getMonthShortName } from "@/lib/utils";

// Mock data for appointment scheduling
const mockProcedure = {
  id: "proc1",
  name: "Consulta - Dermatologia",
  duration: "50 minutos", 
  price: 250
};

const mockProfessional = {
  id: "prof1",
  name: "Dra. Ana Silva",
  specialty: "Dermatologista",
  profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
};

interface DateOption {
  date: string;
  dayName: string;
  dayOfMonth: string;
  month: string;
}

// Generate mock dates for the next 5 days
const generateDateOptions = (): DateOption[] => {
  const today = new Date();
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    return {
      date: dateString,
      dayName: getDayName(dateString, true),
      dayOfMonth: getDayOfMonth(dateString),
      month: getMonthShortName(dateString)
    };
  });
};

const availableDates = generateDateOptions();
const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const AppointmentScheduling: React.FC = () => {
  const [_, navigate] = useLocation();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState({
    name: "João da Silva",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    notes: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handlePatientInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmAppointment = () => {
    navigate("/appointment/success");
  };

  return (
    <div className="px-4 py-4 pb-16">
      <h1 className="text-xl font-bold mb-4">Agendar consulta</h1>
      
      {/* Selected procedure */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-semibold">{mockProcedure.name}</h2>
        <p className="text-sm text-gray-500 mt-1">{mockProcedure.duration}</p>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <img
              src={mockProfessional.profileImage}
              alt={`Foto do(a) ${mockProfessional.name}`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <div className="font-medium text-sm">{mockProfessional.name}</div>
              <div className="text-xs text-gray-500">{mockProfessional.specialty}</div>
            </div>
          </div>
          <span className="font-medium text-primary">{formatCurrency(mockProcedure.price)}</span>
        </div>
      </div>
      
      {/* Date selection */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3">Selecione uma data</h2>
        <div className="flex overflow-x-auto space-x-3 py-2 scrollbar-hide">
          {availableDates.map((dateOption) => (
            <button
              key={dateOption.date}
              className={`min-w-[60px] flex flex-col items-center justify-center py-2 px-1 bg-white rounded-lg border ${
                selectedDate === dateOption.date
                  ? "border-primary"
                  : "border-gray-300"
              }`}
              onClick={() => handleDateSelect(dateOption.date)}
            >
              <span className={`text-xs ${selectedDate === dateOption.date ? "text-primary" : "text-gray-500"} uppercase`}>
                {dateOption.dayName}
              </span>
              <span className={`text-lg font-semibold ${selectedDate === dateOption.date ? "text-primary" : ""}`}>
                {dateOption.dayOfMonth}
              </span>
              <span className={`text-xs ${selectedDate === dateOption.date ? "text-primary" : "text-gray-500"}`}>
                {dateOption.month}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Time selection */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3">Selecione um horário</h2>
        <div className="grid grid-cols-3 gap-3">
          {availableTimes.map(time => (
            <button
              key={time}
              className={`py-3 bg-white rounded-lg border ${
                selectedTime === time
                  ? "border-primary text-primary"
                  : "border-gray-300 text-gray-700"
              } text-sm`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      {/* Patient info */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3">Informações do paciente</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={patientInfo.name}
              onChange={handlePatientInfoChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
            <input
              type="text"
              name="cpf"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={patientInfo.cpf}
              onChange={handlePatientInfoChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="text"
              name="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={patientInfo.phone}
              onChange={handlePatientInfoChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={patientInfo.email}
              onChange={handlePatientInfoChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações (opcional)</label>
            <textarea
              name="notes"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              placeholder="Informe qualquer detalhe importante para o profissional..."
              value={patientInfo.notes}
              onChange={handlePatientInfoChange}
            />
          </div>
        </div>
      </div>
      
      {/* Payment section */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3">Forma de pagamento</h2>
        <div className="space-y-3">
          <div className={`flex items-center p-3 border ${paymentMethod === 'credit_card' ? 'border-primary' : 'border-gray-300'} rounded-lg bg-white`}>
            <input
              type="radio"
              id="credit_card"
              name="payment_method"
              value="credit_card"
              checked={paymentMethod === 'credit_card'}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 text-primary"
            />
            <label htmlFor="credit_card" className="ml-3 text-sm font-medium">Cartão de crédito</label>
          </div>
          
          <div className={`flex items-center p-3 border ${paymentMethod === 'debit_card' ? 'border-primary' : 'border-gray-300'} rounded-lg bg-white`}>
            <input
              type="radio"
              id="debit_card"
              name="payment_method"
              value="debit_card"
              checked={paymentMethod === 'debit_card'}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 text-primary"
            />
            <label htmlFor="debit_card" className="ml-3 text-sm font-medium">Cartão de débito</label>
          </div>
          
          <div className={`flex items-center p-3 border ${paymentMethod === 'pix' ? 'border-primary' : 'border-gray-300'} rounded-lg bg-white`}>
            <input
              type="radio"
              id="pix"
              name="payment_method"
              value="pix"
              checked={paymentMethod === 'pix'}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 text-primary"
            />
            <label htmlFor="pix" className="ml-3 text-sm font-medium">Pix</label>
          </div>
          
          <div className={`flex items-center p-3 border ${paymentMethod === 'insurance' ? 'border-primary' : 'border-gray-300'} rounded-lg bg-white`}>
            <input
              type="radio"
              id="insurance"
              name="payment_method"
              value="insurance"
              checked={paymentMethod === 'insurance'}
              onChange={handlePaymentMethodChange}
              className="h-4 w-4 text-primary"
            />
            <label htmlFor="insurance" className="ml-3 text-sm font-medium">Convênio médico</label>
          </div>
        </div>
      </div>
      
      {/* Summary and confirmation */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
        <h2 className="font-semibold mb-3">Resumo</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">{mockProcedure.name}</span>
            <span className="text-sm font-medium">{formatCurrency(mockProcedure.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Taxa de agendamento</span>
            <span className="text-sm font-medium">{formatCurrency(10)}</span>
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-semibold text-primary">{formatCurrency(mockProcedure.price + 10)}</span>
          </div>
        </div>
      </div>
      
      <button
        className="w-full bg-primary text-white py-3 rounded-lg font-medium"
        onClick={handleConfirmAppointment}
        disabled={!selectedDate || !selectedTime}
      >
        Confirmar agendamento
      </button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Ao confirmar, você concorda com os <a href="#" className="text-primary">Termos de Uso</a> e <a href="#" className="text-primary">Política de Privacidade</a> do iLive
      </p>
    </div>
  );
};

export default AppointmentScheduling;
