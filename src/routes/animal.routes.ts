import { Router } from 'express';
import { createAnimal, getAnimals, getAnimalById } from '../controllers/animal.controller';

const router = Router();

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Retorna a lista de todos os animais
 *     tags: [Animais]
 *     parameters:
 *       - in: query
 *         name: species
 *         schema:
 *           type: string
 *         description: Filtrar por espécie (ex. Cão, Gato)
 *     responses:
 *       200:
 *         description: Lista de animais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 */
router.get('/', getAnimals);

/**
 * @swagger
 * /api/animals/{id}:
 *   get:
 *     summary: Retorna os detalhes de um animal pelo ID
 *     tags: [Animais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID do MongoDB
 *     responses:
 *       200:
 *         description: Detalhes do animal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       404:
 *         description: Animal não encontrado
 */
router.get('/:id', getAnimalById);

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Cria um novo animal
 *     tags: [Animais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: Animal criado com sucesso
 */
router.post('/', createAnimal);

export default router;
