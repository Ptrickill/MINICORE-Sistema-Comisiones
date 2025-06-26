import { Router } from 'express';

const router = Router();

// Datos simulados - VENDEDORES MINICORE
const vendedoresSimulados = [
    { 
        id: 1, 
        nombre: 'Juan Pérez', 
        email: 'juan.perez@email.com', 
        telefono: '0991234567', 
        fecha_ingreso: '2024-01-15', 
        activo: true 
    },
    { 
        id: 2, 
        nombre: 'María García', 
        email: 'maria.garcia@email.com', 
        telefono: '0987654321', 
        fecha_ingreso: '2024-02-01', 
        activo: true 
    },
    { 
        id: 3, 
        nombre: 'Carlos López', 
        email: 'carlos.lopez@email.com', 
        telefono: '0976543210', 
        fecha_ingreso: '2024-03-10', 
        activo: true 
    }
];

console.log('📊 MINICORE - Vendedores simulados cargados:', vendedoresSimulados.length);

// GET /api/vendedores - Obtener todos los vendedores
router.get('/', (req, res) => {
    try {
        console.log('📋 MINICORE - Solicitando vendedores...');
        console.log('📊 Vendedores encontrados:', vendedoresSimulados.length);
        
        res.json({
            success: true,
            message: 'Vendedores obtenidos exitosamente - MINICORE',
            data: vendedoresSimulados,
            total: vendedoresSimulados.length
        });
    } catch (error) {
        console.error('❌ Error obteniendo vendedores:', error);
        res.status(500).json({
            success: false,
            message: 'Error obteniendo vendedores',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

export default router;