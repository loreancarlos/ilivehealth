import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const FilterModal = () => {
  const { showFilterModal, setShowFilterModal } = useContext(AppContext);

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  if (!showFilterModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl slide-in max-h-[90vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold">Filtros</h3>
            <button onClick={closeFilterModal}>
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
          
          {/* Filter categories */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Especialidades</h4>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-full">Clínico Geral</button>
              <button className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-full">Dermatologia</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Nutrição</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Psicologia</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Fisioterapia</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Ortopedia</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Cardiologia</button>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Procedimentos</h4>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-full">Consulta</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Exame</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Limpeza de pele</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Massagem</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Tratamento facial</button>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Distância</h4>
            <div className="px-2">
              <input type="range" min="1" max="20" defaultValue="5" className="w-full accent-primary" />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 km</span>
                <span>5 km</span>
                <span>10 km</span>
                <span>20 km</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Avaliação mínima</h4>
            <div className="flex space-x-4">
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                3.0+
              </button>
              <button className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.0+
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.5+
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Horário de atendimento</h4>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Manhã</button>
              <button className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-full">Tarde</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Noite</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Fim de semana</button>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                className="flex-1 border border-gray-300 text-gray-700 font-medium rounded-lg py-3"
                onClick={closeFilterModal}
              >
                Limpar filtros
              </button>
              <button
                className="flex-1 bg-primary text-white font-medium rounded-lg py-3"
                onClick={closeFilterModal}
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
