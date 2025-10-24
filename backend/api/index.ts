/**
 * 🚀 MINICORE - Sistema de Comisiones de Ventas
 * Configuración para Vercel Serverless
 */

import express from 'express';
import cors from 'cors';

// Importar rutas principales
import vendedorRoutes from '../src/routes/vendedor.routes';
import ventasRoutes from '../src/routes/ventas.routes';
import reglasRoutes from '../src/routes/reglas.routes';

// Crear aplicación Express
const app = express();

// 🔧 Configuración de middlewares
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-domain.vercel.app'] 
        : ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 📡 Configuración de rutas principales
app.use('/api/vendedores', vendedorRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/reglas', reglasRoutes);

// 🏠 Ruta raíz de la API
app.get('/api', (req, res) => {
    res.json({
        message: '🚀 MINICORE API - Sistema de Comisiones',
        version: '1.0.0',
        status: 'active',
        timestamp: new Date().toISOString(),
        endpoints: {
            vendedores: '/api/vendedores',
            ventas: '/api/ventas',
            comisiones: '/api/ventas/comisiones',
            reglas: '/api/reglas'
        }
    });
});

// Exportar para Vercel
export default app;