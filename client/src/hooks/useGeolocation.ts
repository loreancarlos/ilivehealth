import { useState } from 'react';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    location: null,
  });

  // Function to get the current position
  const getCurrentPosition = () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: 'Geolocalização não é suportada pelo seu navegador',
        location: null,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          error: null,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        let errorMessage = 'Erro desconhecido ao buscar localização';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permissão negada para acessar sua localização';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Informações de localização indisponíveis';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tempo esgotado ao buscar sua localização';
            break;
        }
        
        setState({
          loading: false,
          error: errorMessage,
          location: null,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Return the state and a function to refresh the location
  return {
    ...state,
    getCurrentPosition,
  };
};