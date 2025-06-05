import { create } from "zustand";
import { Professional } from "../types";
import { popularProfessionals } from "../data/mockData";
import { api } from "../services/api";

interface ProfessionalState {
  professionals: Professional[];
  loading: boolean;
  error: string | null;
  fetchProfessionals: () => Promise<void>;
  getProfessionalById: (id: string) => Professional | undefined;
}

export const useProfessionalStore = create<ProfessionalState>((set, get) => ({
  professionals: [],
  loading: false,
  error: null,
  fetchProfessionals: async () => {
    try {
      set({ loading: true, error: null });
      const professionals = await api.getProfessionals();
      set({ professionals, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch professionals", loading: false });
    }
  },
  getProfessionalById: (id: string) => {
    return get().professionals.find((professional) => professional.id === id);
  },
}));
