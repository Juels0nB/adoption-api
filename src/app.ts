// src/app.ts
import express from 'express';
import cors from 'cors';
import animalRoutes from './routes/animal.routes';

const app = express();

// Middlewares
app.use(cors()); // Permite conexões de fora
app.use(express.json()); // Permite ler JSON no body dos pedidos

// Rotas
app.use('/api/animals', animalRoutes);

// Rota de teste simples
app.get('/', (req, res) => {
    res.json({ message: 'API de Adoção a funcionar! 🐾' });
});

export default app;