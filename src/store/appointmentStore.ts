import { create } from "zustand";
import { Appointment } from "../types";

interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: () => Promise<void>;
  createAppointment: (appointment: Omit<Appointment, "id">) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  loading: false,
  error: null,
  fetchAppointments: async () => {
    try {
      set({ loading: true, error: null });
      // Mock API call - replace with actual API
      const mockAppointments: Appointment[] = [];
      set({ appointments: mockAppointments, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch appointments", loading: false });
    }
  },
  createAppointment: async (appointmentData) => {
    try {
      set({ loading: true, error: null });
      // Mock API call - replace with actual API
      const newAppointment: Appointment = {
        ...appointmentData,
        id: Math.random().toString(36).substring(7)
      };
      set(state => ({
        appointments: [...state.appointments, newAppointment],
        loading: false
      }));
    } catch (error) {
      set({ error: "Failed to create appointment", loading: false });
      throw error;
    }
  },
  cancelAppointment: async (id: string) => {
    try {
      set({ loading: true, error: null });
      // Mock API call - replace with actual API
      set(state => ({
        appointments: state.appointments.map(apt => 
          apt.id === id ? { ...apt, status: 'canceled' } : apt
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: "Failed to cancel appointment", loading: false });
      throw error;
    }
  }
}));