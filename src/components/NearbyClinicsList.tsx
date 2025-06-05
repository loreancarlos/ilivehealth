import { useLocation } from "wouter";
import { Clinic } from "../types";
import { Badge } from "../components/ui/badge";

interface NearbyClinicListProps {
  clinics: Clinic[];
}

const NearbyClinicsList: React.FC<NearbyClinicListProps> = ({ clinics }) => {
  const [_, navigate] = useLocation();

  const handleClinicClick = (clinicId: string) => {
    navigate(`/clinic/${clinicId}`);
  };

  return (
    <div className="px-4 pt-6 pb-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Clínicas próximas</h2>
        {clinics.length > 0 && (
          <button className="text-primary text-sm font-medium">
            Ver todas
          </button>
        )}
      </div>

      {clinics.length > 0 ? (
        clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            onClick={() => handleClinicClick(clinic.id)}>
            <img
              src={
                /* clinic?.images[0] || */
                "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=200"
              }
              alt={`Fachada da ${clinic.fantasyName}`}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {clinic.fantasyName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {clinic.address.neighborhood}, {clinic.address.city}
                  </p>
                </div>
                <div
                  className={`flex items-center ${
                    clinic.isOpen ? "bg-green-50" : "bg-red-50"
                  } px-2 py-1 rounded-md`}>
                  {clinic.isOpen ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-accent mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-xs font-medium text-accent">
                        Aberto
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-xs font-medium text-red-500">
                        Fechado
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 font-medium">{clinic.rating}</span>
                <span className="ml-1 text-gray-500">
                  ({clinic.reviewCount} avaliações)
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {/* {clinic.specialties.slice(0, 3).map((specialty, index) => (
                <Badge
                  key={index}
                  variant="blue"
                  className="text-xs px-2 py-1 rounded-full">
                  {specialty}
                </Badge>
              ))} */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <h2 className="text-lg font-semibold">Nenhuma clínica próxima</h2>
          <p className="mt-2 text-sm">
            Mas não se preocupe! Em breve você poderá ver as opções disponíveis
            por aqui. 😊
          </p>
        </div>
      )}
    </div>
  );
};

export default NearbyClinicsList;
