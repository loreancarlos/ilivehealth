import { useLocation } from "wouter";
import { SpecialOffer } from "../types";
import { formatCurrency } from "../lib/utils";

interface SpecialOffersProps {
  offers: SpecialOffer[];
}

const SpecialOffers: React.FC<SpecialOffersProps> = ({ offers }) => {
  const [_, navigate] = useLocation();

  return (
    <div className="px-4 pt-6 pb-2">
      <h2 className="text-lg font-semibold mb-4">Ofertas especiais</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="min-w-[280px] rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 relative"
            onClick={() => navigate(`/clinic/${offer.clinicId}`)}
          >
            <img
              src={offer.image}
              alt={offer.procedureName}
              className="w-full h-32 object-cover"
            />
            <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
              -{offer.discount}%
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-base mb-1">{offer.procedureName}</h3>
              <p className="text-sm text-gray-500 mb-2">{offer.clinicName}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm line-through text-gray-400">
                    {formatCurrency(offer.originalPrice)}
                  </span>
                  <span className="text-primary font-semibold block">
                    {formatCurrency(offer.discountedPrice)}
                  </span>
                </div>
                <button className="bg-primary text-white rounded-full text-sm px-3 py-1">
                  Agendar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
