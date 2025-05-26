import { create } from "zustand";
import { Clinic } from "../types";
import { api } from "../services/api";

interface ClinicState {
  clinics: Clinic[];
  loading: boolean;
  error: string | null;
  fetchClinics: () => Promise<void>;
  getClinicById: (id: string) => Promise<Clinic | undefined>;
}

export const useClinicStore = create<ClinicState>((set, get) => ({
  clinics: [],
  loading: false,
  error: null,

  fetchClinics: async () => {
    try {
      set({ loading: true, error: null });
      const clinics = await api.getClinics();
      set({ clinics, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch clinics", loading: false });
    }
  },
  getClinicById: async (id: string) => {
    try {
      const clinic = await api.getClinicById(id);
      return clinic;
    } catch (error) {
      console.error("Failed to fetch clinic:", error);
      return undefined;
    }
  },
}));
