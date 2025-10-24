/**
 * 🚀 MINICORE - Sistema de Comisiones de Ventas
 * Arquitectura MVC con TypeScript y Express
 * 
 * @author Danny (Ptrickill)
 * @version 1.0.0
 * @description API RESTful para cálculo de comisiones con patrones de diseño
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas principales
import vendedorRoutes from './routes/vendedor.routes';
import ventasRoutes from './routes/ventas.routes';
import reglasRoutes from './routes/reglas.routes';

// Importar middlewares personalizados
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Configuración de variables de entorno
dotenv.config();

// Configuración de la aplicación
const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// 🔧 Configuración de middlewares
app.use(cors({
    origin: NODE_ENV === 'development' 
        ? ['http://localhost:3000', 'http://127.0.0.1:3000']
        : [
            /\.netlify\.app$/,  // Permitir todos los dominios de Netlify
            /\.onrender\.com$/  // Permitir Render para testing
          ],
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging para desarrollo
if (NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`📝 ${req.method} ${req.url} - ${new Date().toISOString()}`);
        next();
    });
}

// 🛣️ Configuración de rutas principales
app.use('/api/vendedores', vendedorRoutes);  // Gestión de vendedores
app.use('/api/ventas', ventasRoutes);        // ⭐ CORE: Cálculo de comisiones
app.use('/api/reglas', reglasRoutes);        // Reglas de comisión

// Ruta de salud del servidor
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servidor MINICORE funcionando correctamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: '🚀 API MINICORE - Sistema de Comisiones de Ventas',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            vendedores: '/api/vendedores',
            ventas: '/api/ventas',
            reglas: '/api/reglas',
            comisiones: '/api/ventas/comisiones'
        }
    });
});

// 🛡️ Manejo de errores centralizado
app.use(notFoundHandler);  // Rutas no encontradas
app.use(errorHandler);     // Errores generales

// Inicializar servidor
const startServer = async () => {
    try {
        // TODO: Inicializar base de datos después
        // await initializeDatabase();
        
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor MINICORE ejecutándose en puerto ${PORT}`);
            console.log(`📡 API disponible en: http://localhost:${PORT}/api`);
            console.log(`🏠 Página principal: http://localhost:${PORT}`);
            console.log(`⚡ Funcionalidad core: http://localhost:${PORT}/api/ventas/comisiones`);
        });
    } catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
};

// Iniciar aplicación
startServer();

export default app;