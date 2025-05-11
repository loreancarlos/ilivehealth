import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { MapPin } from 'lucide-react';
import LocationButton from './LocationButton';

interface AddressBarProps {
  address?: string;
}

const AddressBar: React.FC<AddressBarProps> = ({ address }) => {
  const { userLocation } = useContext(AppContext);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Effect to reverse geocode the coordinates into an address
  useEffect(() => {
    const reverseGeocode = async () => {
      if (!userLocation) return;
      
      setLoading(true);
      try {
        // We'll use the browser's native fetch API to get the address from coordinates
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.latitude}&lon=${userLocation.longitude}&zoom=18&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'pt-BR',
            },
          }
        );
        const data = await response.json();
        
        if (data && data.display_name) {
          // Extract the most important parts of the address for display
          const parts = data.display_name.split(',');
          setCurrentAddress(`${parts[0]}, ${parts[1]}`);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        setCurrentAddress('Localização encontrada');
      } finally {
        setLoading(false);
      }
    };

    if (userLocation) {
      reverseGeocode();
    }
  }, [userLocation]);

  return (
    <div className="bg-white w-full py-2 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <MapPin className="h-5 w-5 text-blue-500 mr-2" />
        <div>
          <p className="text-sm font-semibold">
            {loading ? 'Buscando endereço...' : 
             currentAddress ? currentAddress : 
             address ? address : 
             'Defina sua localização'}
          </p>
          <p className="text-xs text-gray-500">Entregar em</p>
        </div>
      </div>
      
      <LocationButton />
    </div>
  );
};

export default AddressBar;