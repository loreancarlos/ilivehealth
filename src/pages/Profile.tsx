import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  MessageCircle,
  Bell,
  User,
  CreditCard,
  Heart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building2,
  Stethoscope,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";

interface Conversation {
  id: string;
  clinicName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "appointment" | "payment" | "general";
}

interface Payment {
  id: string;
  serviceName: string;
  clinicName: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "cancelled";
}

interface CreditCard {
  id: string;
  lastFour: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface Favorite {
  id: string;
  name: string;
  type: "clinic" | "professional";
  specialty?: string;
  rating: number;
  image?: string;
}

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [_, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("conversations");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) {
    return null; // Ou um <Navigate to="/login" /> se estiver usando React Router
  }
  // Mock data - In real app, these would come from API
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      clinicName: "Clínica São Lucas",
      lastMessage: "Seu exame está pronto para retirada",
      timestamp: "2024-01-15T10:30:00Z",
      unread: true,
    },
    {
      id: "2",
      clinicName: "Centro Médico Vida",
      lastMessage: "Confirmação de consulta para amanhã às 14h",
      timestamp: "2024-01-14T16:45:00Z",
      unread: false,
    },
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Consulta Agendada",
      message: "Sua consulta foi confirmada para 16/01 às 09:00",
      timestamp: "2024-01-15T08:00:00Z",
      read: false,
      type: "appointment",
    },
    {
      id: "2",
      title: "Pagamento Processado",
      message: "Pagamento de R$ 180,00 foi processado com sucesso",
      timestamp: "2024-01-14T14:30:00Z",
      read: true,
      type: "payment",
    },
  ]);

  const [payments] = useState<Payment[]>([
    {
      id: "1",
      serviceName: "Consulta Cardiologista",
      clinicName: "Clínica São Lucas",
      amount: 180.0,
      date: "2024-01-14",
      status: "paid",
    },
    {
      id: "2",
      serviceName: "Exame de Sangue",
      clinicName: "Lab Diagnóstico",
      amount: 85.0,
      date: "2024-01-10",
      status: "paid",
    },
  ]);

  const [creditCards] = useState<CreditCard[]>([
    {
      id: "1",
      lastFour: "1234",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true,
    },
    {
      id: "2",
      lastFour: "5678",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
    },
  ]);

  const [favorites] = useState<Favorite[]>([
    {
      id: "1",
      name: "Clínica São Lucas",
      type: "clinic",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Dr. Carlos Silva",
      type: "professional",
      specialty: "Cardiologista",
      rating: 4.9,
    },
    {
      id: "3",
      name: "Dra. Ana Santos",
      type: "professional",
      specialty: "Dermatologista",
      rating: 4.7,
    },
  ]);

  const [addresses] = useState<Address[]>([
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
  ]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Agora mesmo";
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      return date.toLocaleDateString("pt-BR");
    }
  };

  return (
    <div className="px-4 py-6 pb-20">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{user.name}</h1>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="conversations" className="text-xs">
            <MessageCircle className="h-4 w-4 mr-1" />
            Conversas
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs">
            <Bell className="h-4 w-4 mr-1" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="personal" className="text-xs">
            <User className="h-4 w-4 mr-1" />
            Dados
          </TabsTrigger>
        </TabsList>

        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="payments" className="text-xs">
            <CreditCard className="h-4 w-4 mr-1" />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="favorites" className="text-xs">
            <Heart className="h-4 w-4 mr-1" />
            Favoritos
          </TabsTrigger>
          <TabsTrigger value="addresses" className="text-xs">
            <MapPin className="h-4 w-4 mr-1" />
            Endereços
          </TabsTrigger>
        </TabsList>

        {/* Conversations Tab */}
        <TabsContent value="conversations" className="space-y-4">
          {conversations.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Nenhuma conversa ainda</p>
              </CardContent>
            </Card>
          ) : (
            conversations.map((conversation) => (
              <Card
                key={conversation.id}
                className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {conversation.clinicName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">
                          {conversation.clinicName}
                        </p>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(conversation.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Nenhuma notificação</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={notification.read ? "opacity-75" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        notification.type === "appointment"
                          ? "bg-blue-100 text-blue-600"
                          : notification.type === "payment"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                      {notification.type === "appointment" ? (
                        <Calendar className="h-4 w-4" />
                      ) : notification.type === "payment" ? (
                        <CreditCard className="h-4 w-4" />
                      ) : (
                        <Bell className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Personal Data Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Nome Completo</label>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">E-mail</label>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Telefone</label>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full mb-3">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
                <Button variant="outline" className="w-full mb-3">
                  Alterar Senha
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full">
                  Sair da Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Histórico de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{payment.serviceName}</p>
                    <p className="text-xs text-gray-500">
                      {payment.clinicName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(payment.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(payment.amount)}
                    </p>
                    <Badge
                      variant={
                        payment.status === "paid" ? "default" : "secondary"
                      }
                      className="text-xs">
                      {payment.status === "paid" ? "Pago" : "Pendente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Cartões de Crédito
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {creditCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {card.brand} •••• {card.lastFour}
                      </p>
                      <p className="text-xs text-gray-500">
                        {card.expiryMonth}/{card.expiryYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {card.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Padrão
                      </Badge>
                    )}
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-4">
          {favorites.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Nenhum favorito ainda</p>
              </CardContent>
            </Card>
          ) : (
            favorites.map((favorite) => (
              <Card key={favorite.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        favorite.type === "clinic"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                      {favorite.type === "clinic" ? (
                        <Building2 className="h-5 w-5" />
                      ) : (
                        <Stethoscope className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{favorite.name}</p>
                      {favorite.specialty && (
                        <p className="text-sm text-gray-600">
                          {favorite.specialty}
                        </p>
                      )}
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm text-gray-600 ml-1">
                          {favorite.rating}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Heart className="h-4 w-4 text-red-500 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Meus Endereços</h2>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>

          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{address.label}</p>
                        {address.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Padrão
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {address.street}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state}
                      </p>
                      <p className="text-sm text-gray-600">
                        CEP: {address.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
