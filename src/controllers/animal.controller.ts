// src/controllers/animal.controller.ts
import { Request, Response } from 'express';
import Animal from '../models/Animal';

export const createAnimal = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const newAnimal = Array.isArray(data)
            ? await Animal.insertMany(data)
            : await Animal.create(data);
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar animal', error });
    }
};

export const getAnimals = async (req: Request, res: Response) => {
    try {
        // 1. Lemos a página e o limite da query (URL)
        // Se a app não enviar nada, assumimos Página 1 e 10 animais
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        // Calculamos quantos animais temos de "saltar" (skip)
        // Ex: Na página 2, saltamos os primeiros 10 ( (2-1) * 10 = 10 )
        const skip = (page - 1) * limit;

        const { species, status } = req.query;
        let filter: any = {};

        if (species) filter.species = species;
        if (status) filter.status = status;
        else filter.status = { $ne: 'Adotado' }; // Por defeito não mostra adotados

        // 2. Query otimizada com Paginação
        const animals = await Animal.find(filter)
            .sort({ createdAt: -1 }) // Mais recentes primeiro
            .skip(skip)              // Salta os anteriores
            .limit(limit);           // Traz só 10

        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar animais', error });
    }
};

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