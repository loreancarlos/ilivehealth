import { 
  Category, 
  Clinic, 
  Professional, 
  Procedure, 
  SpecialOffer, 
  Review,
  Schedule,
} from "@/types";
import { generateRandomId } from "@/lib/utils";

// Categories
export const categories: Category[] = [
  {
    id: "cat1",
    name: "Consultas",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    bgColor: "bg-blue-100",
  },
  {
    id: "cat2",
    name: "Estética",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    bgColor: "bg-pink-100",
  },
  {
    id: "cat3",
    name: "Exames",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    bgColor: "bg-green-100",
  },
  {
    id: "cat4",
    name: "Dentistas",
    icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    bgColor: "bg-yellow-100",
  },
  {
    id: "cat5",
    name: "Mais",
    icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    bgColor: "bg-purple-100",
  },
];

// Procedures
export const procedures: Procedure[] = [
  {
    id: "proc1",
    name: "Consulta - Clínico Geral",
    description: "Consulta inicial com clínico geral para avaliação de saúde.",
    duration: "45 minutos",
    price: 180,
    categoryId: "cat1",
    tags: ["Primeira consulta", "Convênios"],
    professionalIds: ["prof1", "prof2"],
    clinicIds: ["clinic1", "clinic2"],
  },
  {
    id: "proc2",
    name: "Consulta - Dermatologia",
    description: "Consulta com dermatologista para tratamento de pele.",
    duration: "50 minutos",
    price: 250,
    categoryId: "cat1",
    tags: ["Especializada", "Convênios"],
    professionalIds: ["prof1"],
    clinicIds: ["clinic1"],
  },
  {
    id: "proc3",
    name: "Limpeza de Pele Profunda",
    description: "Procedimento estético para remoção de impurezas e cravos.",
    duration: "1 hora e 30 minutos",
    price: 220,
    categoryId: "cat2",
    tags: ["Estética"],
    professionalIds: ["prof1", "prof3"],
    clinicIds: ["clinic1", "clinic3"],
  },
  {
    id: "proc4",
    name: "Checkup Completo",
    description: "Avaliação completa de saúde incluindo exames laboratoriais.",
    duration: "2 horas",
    price: 480,
    categoryId: "cat3",
    tags: ["Exames", "Convênios"],
    professionalIds: ["prof2"],
    clinicIds: ["clinic1", "clinic2"],
  },
  {
    id: "proc5",
    name: "Consulta Nutricional",
    description: "Avaliação nutricional e elaboração de plano alimentar.",
    duration: "1 hora",
    price: 150,
    categoryId: "cat1",
    tags: ["Nutrição", "Avaliação"],
    professionalIds: ["prof3"],
    clinicIds: ["clinic1", "clinic3"],
  },
  {
    id: "proc6",
    name: "Massagem Terapêutica",
    description: "Técnica de massagem para relaxamento e alívio de tensões.",
    duration: "1 hora",
    price: 130,
    categoryId: "cat2",
    tags: ["Estética", "Relaxamento"],
    professionalIds: ["prof4"],
    clinicIds: ["clinic3"],
  },
];

// Professionals
export const popularProfessionals: Professional[] = [
  {
    id: "prof1",
    name: "Dra. Ana Silva",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
    specialty: "Dermatologista",
    registrationNumber: "CRM 45678",
    bio: "Dra. Ana Silva é especializada em dermatologia clínica e estética, com mais de 10 anos de experiência. Formada pela USP, com residência no Hospital das Clínicas.",
    rating: 4.8,
    reviewCount: 98,
    clinicIds: ["clinic1"],
    procedures: [procedures[1], procedures[2]],
    availability: [
      {
        date: "2023-08-10",
        timeSlots: ["09:00", "10:00", "14:00", "15:00"]
      },
      {
        date: "2023-08-11",
        timeSlots: ["11:00", "13:00", "16:00"]
      },
      {
        date: "2023-08-12",
        timeSlots: ["09:00", "10:00", "11:00"]
      }
    ]
  },
  {
    id: "prof2",
    name: "Dr. Carlos Mendes",
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
    specialty: "Clínico Geral",
    registrationNumber: "CRM 34567",
    bio: "Dr. Carlos Mendes é um clínico geral com foco em medicina preventiva e tratamento de doenças crônicas. Possui mais de 15 anos de experiência clínica.",
    rating: 4.7,
    reviewCount: 126,
    clinicIds: ["clinic1", "clinic2"],
    procedures: [procedures[0], procedures[3]],
    availability: [
      {
        date: "2023-08-10",
        timeSlots: ["08:00", "09:00", "10:00"]
      },
      {
        date: "2023-08-11",
        timeSlots: ["14:00", "15:00", "16:00"]
      }
    ]
  },
  {
    id: "prof3",
    name: "Dra. Juliana Fontes",
    profileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
    specialty: "Nutricionista",
    registrationNumber: "CRN 12345",
    bio: "Nutricionista especializada em nutrição clínica e esportiva, com abordagem personalizada para emagrecimento saudável e ganho de massa muscular.",
    rating: 4.9,
    reviewCount: 87,
    clinicIds: ["clinic1"],
    procedures: [procedures[4]],
    availability: [
      {
        date: "2023-08-12",
        timeSlots: ["13:00", "14:00", "15:00"]
      },
      {
        date: "2023-08-13",
        timeSlots: ["10:00", "11:00", "12:00"]
      }
    ]
  },
  {
    id: "prof4",
    name: "Dr. Ricardo Torres",
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200",
    specialty: "Fisioterapeuta",
    registrationNumber: "CREFITO 56789",
    bio: "Fisioterapeuta com especialização em terapia manual, pilates e reabilitação de lesões esportivas. Atende pacientes de todas as idades.",
    rating: 4.6,
    reviewCount: 104,
    clinicIds: ["clinic2", "clinic3"],
    procedures: [procedures[5]],
    availability: [
      {
        date: "2023-08-14",
        timeSlots: ["08:00", "09:00", "10:00", "11:00"]
      },
      {
        date: "2023-08-15",
        timeSlots: ["14:00", "15:00", "16:00", "17:00"]
      }
    ]
  }
];

// Reviews
const reviewsClinic1: Review[] = [
  {
    id: generateRandomId(),
    userId: "user1",
    userName: "Maria Oliveira",
    rating: 5,
    comment: "Excelente atendimento! Fui muito bem recebida, o ambiente é limpo e organizado. A Dra. Ana é muito atenciosa e competente, recomendo!",
    date: "2 semanas atrás"
  },
  {
    id: generateRandomId(),
    userId: "user2",
    userName: "João Paulo",
    rating: 4,
    comment: "Clínica bem localizada, com boa estrutura. O Dr. Carlos foi pontual e o atendimento foi rápido e eficiente. Único ponto negativo foi o tempo de espera na recepção.",
    date: "1 mês atrás"
  }
];

const reviewsClinic2: Review[] = [
  {
    id: generateRandomId(),
    userId: "user3",
    userName: "Pedro Almeida",
    rating: 5,
    comment: "Atendimento de qualidade, profissionais muito bem preparados. As instalações são modernas e confortáveis. Recomendo!",
    date: "3 semanas atrás"
  },
  {
    id: generateRandomId(),
    userId: "user4",
    userName: "Carla Santos",
    rating: 4,
    comment: "Muito bom atendimento. A equipe é atenciosa e os médicos são excelentes. Apenas senti falta de um espaço mais amplo na recepção.",
    date: "2 meses atrás"
  }
];

const reviewsClinic3: Review[] = [
  {
    id: generateRandomId(),
    userId: "user5",
    userName: "Ana Carolina",
    rating: 5,
    comment: "Tratamento estético de alto nível! Adorei os resultados da limpeza de pele profunda. Ambiente super agradável e equipe muito profissional.",
    date: "1 semana atrás"
  },
  {
    id: generateRandomId(),
    userId: "user6",
    userName: "Rodrigo Ferreira",
    rating: 5,
    comment: "As sessões de massagem terapêutica são excelentes. O Ricardo é um profissional muito competente e atencioso. Já estou sentindo os resultados.",
    date: "1 mês atrás"
  }
];

// Schedule hours
const scheduleClinic1: Schedule[] = [
  {
    weekdays: "Seg - Sex",
    hours: "08:00 - 19:00"
  },
  {
    weekdays: "Sáb",
    hours: "08:00 - 13:00"
  }
];

const scheduleClinic2: Schedule[] = [
  {
    weekdays: "Seg - Sex",
    hours: "07:00 - 20:00"
  },
  {
    weekdays: "Sáb",
    hours: "08:00 - 14:00"
  }
];

const scheduleClinic3: Schedule[] = [
  {
    weekdays: "Seg - Sex",
    hours: "09:00 - 21:00"
  },
  {
    weekdays: "Sáb",
    hours: "10:00 - 16:00"
  },
  {
    weekdays: "Dom",
    hours: "Fechado"
  }
];

// Clinics
export const nearbyClinics: Clinic[] = [
  {
    id: "clinic1",
    name: "Clínica São Paulo",
    images: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=200"
    ],
    address: {
      street: "Av. Paulista",
      number: "1000",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      latitude: -23.5651,
      longitude: -46.6551
    },
    distance: 2.3,
    specialties: ["Clínico Geral", "Dermatologia", "Nutrição"],
    openingHours: scheduleClinic1,
    description: "A Clínica São Paulo é referência em atendimento multidisciplinar na região central da cidade. Com mais de 15 anos de experiência, oferecemos atendimento humanizado e infraestrutura moderna para cuidar da sua saúde com excelência. Nossa equipe é formada por profissionais altamente qualificados em diversas especialidades.",
    rating: 4.7,
    reviewCount: 213,
    reviews: reviewsClinic1,
    professionals: [popularProfessionals[0], popularProfessionals[1], popularProfessionals[2]],
    isOpen: true,
    phoneNumber: "(11) 3456-7890"
  },
  {
    id: "clinic2",
    name: "Clínica Estética Renova",
    images: [
      "https://pixabay.com/get/g3cdf3c9c2fd4afd6cee593d38758191126cf152c580c03ea7085f16530511f575f4398f39453fd1ed38e65c18d4f313f3ee3435c9237ea09392b02039fc11db0_1280.jpg"
    ],
    address: {
      street: "Rua Oscar Freire",
      number: "500",
      neighborhood: "Jardins",
      city: "São Paulo",
      state: "SP",
      zipCode: "01426-000",
      latitude: -23.5661,
      longitude: -46.6789
    },
    distance: 3.1,
    specialties: ["Estética Facial", "Estética Corporal", "Massagem"],
    openingHours: scheduleClinic2,
    description: "A Clínica Estética Renova é especializada em tratamentos de beleza e bem-estar. Contamos com os mais modernos equipamentos e profissionais especializados para oferecer os melhores resultados em procedimentos estéticos faciais e corporais.",
    rating: 4.9,
    reviewCount: 156,
    reviews: reviewsClinic2,
    professionals: [popularProfessionals[1], popularProfessionals[3]],
    isOpen: true,
    phoneNumber: "(11) 3456-9876"
  },
  {
    id: "clinic3",
    name: "Centro Médico Vida",
    images: [
      "https://pixabay.com/get/g5f72c1b3fb69db5f26a22b6d6b9cb3f3a7fa7e9d7ca0cb9ec61cf069f30d2c7d88d4a73e1bffd5c23c2dc4c31afbf89de5e0ae86bcd26f2e3cf01fceb95bd8c9_1280.jpg"
    ],
    address: {
      street: "Av. Brigadeiro Faria Lima",
      number: "2000",
      neighborhood: "Pinheiros",
      city: "São Paulo",
      state: "SP",
      zipCode: "01451-000",
      latitude: -23.5759,
      longitude: -46.6893
    },
    distance: 4.5,
    specialties: ["Fisioterapia", "Nutrição", "Psicologia"],
    openingHours: scheduleClinic3,
    description: "O Centro Médico Vida oferece um conjunto integrado de serviços para cuidar da sua saúde física e mental. Com foco no bem-estar completo, nossos profissionais trabalham de forma interdisciplinar para proporcionar o melhor atendimento personalizado.",
    rating: 4.6,
    reviewCount: 89,
    reviews: reviewsClinic3,
    professionals: [popularProfessionals[2], popularProfessionals[3]],
    isOpen: false,
    phoneNumber: "(11) 2345-6789"
  }
];

// Special Offers
export const specialOffers: SpecialOffer[] = [
  {
    id: "offer1",
    clinicId: "clinic1",
    clinicName: "Clínica Bella Skin",
    procedureId: "proc3",
    procedureName: "Tratamento facial completo",
    originalPrice: 300,
    discountedPrice: 225,
    discount: 25,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160"
  },
  {
    id: "offer2",
    clinicId: "clinic2",
    clinicName: "OdontoVida Clínica",
    procedureId: "proc4",
    procedureName: "Limpeza + Clareamento",
    originalPrice: 490,
    discountedPrice: 416.50,
    discount: 15,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160"
  }
];
