import { Router } from 'express';

const router = Router();

// GET /api/reglas - Obtener todas las reglas
router.get('/', async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Ruta de reglas funcionando',
            data: []
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en ruta reglas',
            error: error
        });
    }
});

// POST /api/reglas - Crear nueva regla
router.post('/', async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Crear regla - en desarrollo'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creando regla'
        });
    }
});

export default router;