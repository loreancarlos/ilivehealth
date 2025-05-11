import { useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LocationButton = () => {
  const { userLocation, setUserLocation } = useContext(AppContext);
  const { location, loading, error, getCurrentPosition } = useGeolocation();
  const { toast } = useToast();

  // Set the user location when the component loads and the location is available
  useEffect(() => {
    if (location && !userLocation) {
      setUserLocation(location);
    }
  }, [location, setUserLocation, userLocation]);

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

  const handleGetLocation = () => {
    getCurrentPosition();
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1 bg-white" 
      onClick={handleGetLocation}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      ) : (
        <MapPin className="h-4 w-4 text-blue-500" />
      )}
      <span className="text-xs font-medium">
        {userLocation ? 'Atualizar localização' : 'Usar minha localização'}
      </span>
    </Button>
  );
};

export default LocationButton;