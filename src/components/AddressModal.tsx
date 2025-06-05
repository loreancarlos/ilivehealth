import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { MapPin, Navigation, Home, Building } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
  currentAddress: string | null;
}

// Mock de endereços cadastrados - em produção virá do store/API
const savedAddresses: Address[] = [
  {
    id: "1",
    label: "Casa",
    street: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    isDefault: true,
  },
  {
    id: "2",
    label: "Trabalho",
    street: "Av. Paulista, 1000",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
    isDefault: false,
  },
];

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
    if (data && data.display_name) {
      const parts = data.display_name.split(",");
      return `${parts[0]}, 70, ${parts[1]}`;
    }
    return "Localização encontrada";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Localização encontrada";
  }
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSelectAddress,
  currentAddress,
}) => {
  const { setUserLocation } = useContext(AppContext);
  const { toast } = useToast();

  const handleCurrentLocation = async () => {
    try {
      toast({
        title: "Buscando localização...",
        description: "Obtendo sua localização atual",
      });

      const location = await requestLocation();
      setUserLocation(location);

      const address = await getAddressFromCoordinates(location);
      onSelectAddress(address);
      onClose();

      toast({
        title: "Localização atualizada",
        description: "Sua localização atual foi definida",
      });
    } catch (error) {
      toast({
        title: "Erro de localização",
        description:
          error instanceof Error ? error.message : "Erro ao obter localização",
        variant: "destructive",
      });
    }
  };

  const handleSelectSavedAddress = (address: Address) => {
    const fullAddress = `${address.street}, ${address.city}`;
    onSelectAddress(fullAddress);
    onClose();
  };

  const getIconForLabel = (label: string) => {
    switch (label.toLowerCase()) {
      case "casa":
        return <Home className="h-5 w-5 text-blue-500" />;
      case "trabalho":
        return <Building className="h-5 w-5 text-green-500" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Escolher Endereço</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Localização Atual */}
          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4"
            onClick={handleCurrentLocation}>
            <div className="flex items-start space-x-3">
              <Navigation className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-left">
                <p className="font-medium">Usar localização atual</p>
                <p className="text-sm text-gray-500">
                  Buscar automaticamente sua localização
                </p>
              </div>
            </div>
          </Button>

          {/* Endereços Salvos */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Endereços salvos:
            </p>
            {savedAddresses.map((address) => (
              <Button
                key={address.id}
                variant="outline"
                className="w-full justify-start h-auto p-4"
                onClick={() => handleSelectSavedAddress(address)}>
                <div className="flex items-start space-x-3">
                  {getIconForLabel(address.label)}
                  <div className="text-left">
                    <p className="font-medium">{address.label}</p>
                    <p className="text-sm text-gray-500">{address.street}</p>
                    <p className="text-sm text-gray-500">
                      {address.city}, {address.state}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
