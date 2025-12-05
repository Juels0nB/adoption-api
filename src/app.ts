import express from 'express';
import cors from 'cors';
import animalRoutes from './routes/animal.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
const app = express();

// Middlewares
app.use(cors()); // Permite conexões de fora
app.use(express.json()); // Permite ler JSON no body dos pedidos

// --- ROTA DA DOCUMENTAÇÃO ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Rotas
app.use('/api/animals', animalRoutes);

// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API de Adoção a funcionar! 🐶 Aceda a /api-docs para ver a documentação.');
});

export default app;