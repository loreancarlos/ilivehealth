import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddressBarProps {
  address?: string;
}

// Função para solicitar a localização do usuário
function requestLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalização não é suportada pelo seu navegador"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage = "Erro desconhecido ao buscar localização";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permissão negada para acessar sua localização";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informações de localização indisponíveis";
            break;
          case error.TIMEOUT:
            errorMessage = "Tempo esgotado ao buscar sua localização";
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

// Função para converter coordenadas em endereço
async function getAddressFromCoordinates(coords: {
  latitude: number;
  longitude: number;
}): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          "Accept-Language": "pt-BR",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data && data.display_name) {
      const parts = data.display_name.split(",");
      return `${parts[0]},${parts[1]}`;
    }
    return "Localização encontrada";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Localização encontrada";
  }
}

const AddressBar: React.FC<AddressBarProps> = ({ address }) => {
  const { userLocation, setUserLocation } = useContext(AppContext);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Efeito para solicitar a localização ao montar o componente
  useEffect(() => {
    let isMounted = true;

    async function getLocation() {
      if (isMounted) setIsLoading(true);

      try {
        const location = await requestLocation();
        if (isMounted) {
          setUserLocation(location);

          // Buscar endereço
          const address = await getAddressFromCoordinates(location);
          if (isMounted) setCurrentAddress(address);
        }
      } catch (error) {
        if (isMounted) {
          toast({
            title: "Erro de localização",
            description:
              error instanceof Error
                ? error.message
                : "Erro ao obter localização",
            variant: "destructive",
          });
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    getLocation();

    return () => {
      isMounted = false;
    };
  }, [setUserLocation, toast]);

  return (
    <div className="bg-white w-full py-2 px-4 flex items-center shadow-sm">
      <div className="flex items-center">
        <MapPin className="h-5 w-5 text-blue-500 mr-2" />
        <div>
          <p className="text-sm font-semibold">
            {isLoading
              ? "Buscando sua localização..."
              : currentAddress
              ? currentAddress
              : address
              ? address
              : "Aguardando permissão de localização"}
          </p>
          <p className="text-xs text-gray-500">Entregar em</p>
        </div>
      </div>
    </div>
  );
};

export default AddressBar;
