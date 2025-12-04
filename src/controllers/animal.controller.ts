// src/controllers/animal.controller.ts
import { Request, Response } from 'express';
import Animal from '../models/Animal';

// Criar um novo animal (ou vários)
export const createAnimal = async (req: Request, res: Response) => {
    try {
        // Verifica se é um array (para inserires o teu JSON gigante de uma vez) ou um objeto só
        const data = req.body;

        // Se for array, usa insertMany, se for objeto usa create
        const newAnimal = Array.isArray(data)
            ? await Animal.insertMany(data)
            : await Animal.create(data);

        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar animal', error });
    }
};

// Buscar todos os animais (com filtros opcionais)
export const getAnimals = async (req: Request, res: Response) => {
    try {
        const { species, status } = req.query;
        let filter: any = {};

        // Se a App iOS pedir ?species=Cão, filtramos por isso
        if (species) filter.species = species;
        if (status) filter.status = status;
        else filter.status = { $ne: 'Adotado' }; // Por defeito não mostra os adotados

        const animals = await Animal.find(filter).sort({ createdAt: -1 }); // Mais recentes primeiro
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar animais', error });
    }
};

// Buscar um animal pelo ID (Para o ecrã de detalhes)
export const getAnimalById = async (req: Request, res: Response) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal não encontrado' });
        }
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar detalhe', error });
    }
};