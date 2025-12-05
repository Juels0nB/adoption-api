import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'API de Adoção de Animais',
            version: '0.1.0',
            description: 'Documentação da API para a App iOS',
            contact: { name: 'Suporte' },
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Servidor Local (Dev)' },
            { url: 'https://api-adocao-xpto.onrender.com', description: 'Produção (Render)' }
        ],
        // O Schema (Modelo de dados)
        components: {
            schemas: {
                Animal: {
                    type: 'object',
                    required: ['name', 'species'],
                    properties: {
                        name: { type: 'string', description: 'Nome do animal' },
                        species: { type: 'string', description: 'Espécie' },
                        breed: { type: 'string' },
                        age_years: { type: 'integer' },
                        age_months: { type: 'integer' },
                        gender: { type: 'string', enum: ['Macho', 'Fêmea'] },
                        size: { type: 'string', enum: ['Pequeno', 'Médio', 'Grande'] },
                        status: { type: 'string', enum: ['Disponível', 'Reservado', 'Adotado'] },
                        description: { type: ['string', 'null'] },
                        images: { type: 'array', items: { type: 'string' } },
                        shelter: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                location: {
                                    type: 'object',
                                    properties: {
                                        coordinates: { type: 'array', items: { type: 'number' } }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    // --- A CORREÇÃO ESTÁ AQUI ---
    // Usamos process.cwd() para garantir que ele acha a pasta src independentemente de onde esteja o ficheiro
    apis: [
        './src/routes/*.ts',
        './src/controllers/*.ts'
    ],
};

export const swaggerSpec = swaggerJsdoc(options);