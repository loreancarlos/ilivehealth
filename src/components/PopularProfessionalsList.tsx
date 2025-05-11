import { useLocation } from "wouter";
import { Professional } from "../types";

interface PopularProfessionalsListProps {
  professionals: Professional[];
}

const PopularProfessionalsList: React.FC<PopularProfessionalsListProps> = ({ professionals }) => {
  const [_, navigate] = useLocation();

  const handleProfessionalClick = (professionalId: string) => {
    navigate(`/professional/${professionalId}`);
  };

  return (
    <div className="px-4 pt-6 pb-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Profissionais populares</h2>
        <button className="text-primary text-sm font-medium">Ver todos</button>
      </div>
      
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {professionals.map((professional) => (
          <div
            key={professional.id}
            className="min-w-[180px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            onClick={() => handleProfessionalClick(professional.id)}
          >
            <img
              src={professional.profileImage}
              alt={`Foto do(a) ${professional.name}`}
              className="w-full h-36 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-base">{professional.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{professional.specialty}</p>
              <div className="mt-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span className="ml-1 text-xs font-medium">{professional.rating}</span>
                <span className="ml-1 text-xs text-gray-500">({professional.reviewCount})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProfessionalsList;
