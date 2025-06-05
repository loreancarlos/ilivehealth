import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatTime(timeString: string): string {
  return timeString;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return parseFloat(d.toFixed(2));
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function generateTimeSlots(start: string, end: string, intervalMinutes: number = 30): string[] {
  const timeSlots: string[] = [];
  const startTime = new Date(`2000-01-01T${start}`);
  const endTime = new Date(`2000-01-01T${end}`);
  
  let currentTime = new Date(startTime);
  
  while (currentTime < endTime) {
    timeSlots.push(
      currentTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    );
    
    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }
  
  return timeSlots;
}

export function getDayName(dateString: string, short: boolean = false): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: short ? 'short' : 'long',
  };
  return new Intl.DateTimeFormat('pt-BR', options).format(date).toUpperCase();
}

export function getMonthShortName(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date);
}

export function getDayOfMonth(dateString: string): string {
  const date = new Date(dateString);
  return date.getDate().toString();
}

export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 10);
}
