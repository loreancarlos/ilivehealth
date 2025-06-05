import { create } from "zustand";
import { Clinic } from "../types";
import { api } from "../services/api";

interface ClinicState {
  clinics: Clinic[];
  loading: boolean;
  error: string | null;
  fetchClinics: () => Promise<void>;
  getClinicById: (id: string) => Clinic | undefined;
}

export const useClinicStore = create<ClinicState>((set, get) => ({
  clinics: [],
  loading: false,
  error: null,

  fetchClinics: async () => {
    try {
      set({ loading: true, error: null });
      const clinics = await api.getClinics();
      const now = new Date();
      const dayIndex = now.getDay(); // 0 (domingo) a 6 (sábado)

      const openClinics = clinics.map((clinic) => {
        const schedule = clinic.openingHours[dayIndex];

        if (!schedule || !schedule.hours.includes("-")) {
          return { ...clinic, isOpen: false };
        }

        const [startTime, endTime] = schedule.hours.split(" - ");

        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        const start = new Date();
        start.setHours(startHour, startMinute, 0, 0);

        const end = new Date();
        end.setHours(endHour, endMinute, 0, 0);

        const isOpen = now >= start && now <= end;

        return { ...clinic, isOpen };
      });

      set({ clinics: openClinics, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch clinics", loading: false });
    }
  },

  getClinicById: (id: string) => {
    return get().clinics.find((clinic) => clinic.id === id);
  },

  /* getClinicById: async (id: string) => {
    try {
      const clinic = await api.getClinicById(id);
      return clinic;
    } catch (error) {
      console.error("Failed to fetch clinic:", error);
      return undefined;
    }
  }, */
}));
