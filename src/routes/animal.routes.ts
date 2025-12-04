// src/routes/animal.routes.ts
import { Router } from 'express';
import { createAnimal, getAnimals, getAnimalById } from '../controllers/animal.controller';

const router = Router();

// GET /api/animals -> Lista todos
router.get('/', getAnimals);

// GET /api/animals/:id -> Detalhe de um
router.get('/:id', getAnimalById);

// POST /api/animals -> Cria um (ou carrega a tua lista inicial)
router.post('/', createAnimal);

export default router;