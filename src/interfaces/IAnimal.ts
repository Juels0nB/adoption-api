// src/interfaces/IAnimal.ts
import { Document } from 'mongoose';

export interface IMedicalRecord {
    vaccinated: boolean;
    dewormed: boolean;
    sterilized: boolean;
    microchipped: boolean;
    notes: string;
}

export interface IShelterLocation {
    type: 'Point';
    coordinates: number[]; // [longitude, latitude]
}

export interface IShelter {
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        postal_code: string;
        country: string;
    };
    location: IShelterLocation;
}

export interface IAnimal extends Document {
    name: string;
    species: string;
    breed: string;
    age_years: number;
    age_months: number;
    gender: 'Macho' | 'Fêmea';
    size: 'Pequeno' | 'Médio' | 'Grande';
    color: string[];
    weight_kg: number;
    description: string;
    personality: string[];
    medical_record: IMedicalRecord;
    images: string[];
    status: 'Disponível' | 'Reservado' | 'Adotado' | 'Urgente' | 'Em Processo de Adoção';
    arrival_date: Date;
    shelter: IShelter;
}