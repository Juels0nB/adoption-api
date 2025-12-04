// src/server.ts
import dotenv from 'dotenv';
import app from './app'; // Importa a configuração do app.ts
import connectDB from './config/db';

dotenv.config();

// Conectar à Base de Dados
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor a correr na porta ${PORT}`);
});