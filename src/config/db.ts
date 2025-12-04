import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1); // Encerra o processo se falhar
    }
};

export default connectDB;