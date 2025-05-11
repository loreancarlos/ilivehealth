import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { MapPin } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useToast } from '@/hooks/use-toast';

interface AddressBarProps {
  address?: string;
}

const AddressBar: React.FC<AddressBarProps> = ({ address }) => {
  // Hooks devem ser chamados na mesma ordem em todas as renderizações
  const { userLocation, setUserLocation } = useContext(AppContext);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { location, loading: geoLoading, error, getCurrentPosition } = useGeolocation();

  // Auto-get location when component mounts
  useEffect(() => {
    // Short delay to ensure UI is rendered before requesting permissions
    const timer = setTimeout(() => {
      getCurrentPosition();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [getCurrentPosition]);

  // Set the user location when the location is available
  useEffect(() => {
    if (location) {
      setUserLocation(location);
    }
  }, [location, setUserLocation]);

  // Show error toast if geolocation failed
  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro de localização',
        description: `Não foi possível obter sua localização: ${error}`,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

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
    <div className="bg-white w-full py-2 px-4 flex items-center shadow-sm">
      <div className="flex items-center">
        <MapPin className="h-5 w-5 text-blue-500 mr-2" />
        <div>
          <p className="text-sm font-semibold">
            {loading || geoLoading ? 'Buscando sua localização...' : 
             currentAddress ? currentAddress : 
             address ? address : 
             'Aguardando permissão de localização'}
          </p>
          <p className="text-xs text-gray-500">Entregar em</p>
        </div>
      </div>
    </div>
  );
};

export default AddressBar;