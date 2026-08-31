export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  newsletterSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  cabinClass: 'economy' | 'business' | 'first';
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlightSearch {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  cabinClass?: string;
  passengers?: number;
}

export interface FlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  price: number;
  originalPrice: number;
  savings: number;
  cabinClass: string;
}