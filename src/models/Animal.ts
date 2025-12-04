// src/models/Animal.ts
import mongoose, { Schema } from 'mongoose';
import { IAnimal } from '../interfaces/IAnimal';

const AnimalSchema: Schema = new Schema({
    name: { type: String, required: true },
    species: { type: String, required: true }, // Cão, Gato...
    breed: { type: String, required: true },
    age_years: { type: Number, required: true },
    age_months: { type: Number, required: true },
    gender: { type: String, enum: ['Macho', 'Fêmea'], required: true },
    size: { type: String, enum: ['Pequeno', 'Médio', 'Grande'], required: true },
    color: [{ type: String }],
    weight_kg: { type: Number },
    description: { type: String },
    personality: [{ type: String }],

    medical_record: {
        vaccinated: { type: Boolean, default: false },
        dewormed: { type: Boolean, default: false },
        sterilized: { type: Boolean, default: false },
        microchipped: { type: Boolean, default: false },
        notes: { type: String }
    },

    images: [{ type: String }], // Array de URLs
    status: {
        type: String,
        enum: ['Disponível', 'Reservado', 'Adotado', 'Urgente', 'Em Processo de Adoção'],
        default: 'Disponível'
    },
    arrival_date: { type: Date, default: Date.now },

    // Embeddamos o Shelter aqui para simplificar o teu MVP inicial
    shelter: {
        name: { type: String, required: true },
        email: String,
        phone: String,
        address: {
            street: String,
            city: String,
            postal_code: String,
            country: String
        },
        location: {
            type: { type: String, enum: ['Point'], default: 'Point' },
            coordinates: { type: [Number], required: true } // [Longitude, Latitude]
        }
    }
}, {
    timestamps: true // Cria createdAt e updatedAt automaticamente
});

// ÍNDICE GEOESPACIAL: Permite pesquisar "Cães num raio de 20km"
AnimalSchema.index({ "shelter.location": "2dsphere" });

export default mongoose.model<IAnimal>('Animal', AnimalSchema);