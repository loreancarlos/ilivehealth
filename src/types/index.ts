export interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Schedule {
  weekdays: string;
  hours: string;
}

export interface Professional {
  id: string;
  name: string;
  profileImage: string;
  specialty: string;
  registrationNumber: string;
  bio?: string;
  rating: number;
  reviewCount: number;
  clinicIds: string[];
  procedures: Procedure[];
  availability?: {
    date: string;
    timeSlots: string[];
  }[];
}

export interface Clinic {
  id: string;
  name: string;
  logo?: string;
  images: string[];
  address: Address;
  distance?: number;
  specialties: string[];
  openingHours: Schedule[];
  description?: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  professionals: Professional[];
  isOpen: boolean;
  phoneNumber: string;
}

export interface Procedure {
  id: string;
  name: string;
  description?: string;
  duration: string;
  price: number;
  discountedPrice?: number;
  categoryId: string;
  tags: string[];
  professionalIds: string[];
  clinicIds: string[];
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  bgColor: string;
}

export interface SpecialOffer {
  id: string;
  clinicId: string;
  clinicName: string;
  procedureId: string;
  procedureName: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: string;
}

export interface Appointment {
  id: string;
  userId: string;
  clinicId: string;
  professionalId: string;
  procedureId: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "canceled";
  price: number;
  paymentMethod: string;
  confirmationCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}
