
export enum AppTab {
  DASHBOARD = 'dashboard',
  MAP = 'map',
  HEALTH = 'health',
  CALENDAR = 'calendar',
  INSURANCE = 'insurance',
  COMMUNITY = 'community',
  PET_EDIT = 'pet_edit',
  PET_ADD = 'pet_add'
}

export interface Pet {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Other';
  breed: string;
  avatar: string;
  birthDate: string; // YYYY-MM-DD
  weight: number;    // kg
  regNumber?: string;
}

export interface PetRecord {
  id: string;
  petId: string;
  type: 'Weight' | 'Vaccine' | 'Symptom' | 'Medicine' | 'Food' | 'Water';
  date: string;
  value: string;
  note?: string;
}

export interface WalkRecord {
  id: string;
  petId: string;
  date: string;
  duration: number;
  distance: number;
  media?: string[]; // URLs for photos/videos
  path?: [number, number][]; // GPS path
}
