import { Router } from 'express';

const router = Router();

// Datos simulados para desarrollo
const vendedoresSimulados = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@email.com' },
    { id: 2, nombre: 'María García', email: 'maria.garcia@email.com' },
    { id: 3, nombre: 'Carlos López', email: 'carlos.lopez@email.com' }
];

const ventasSimuladas = [
    { id: 1, vendedor_id: 1, monto: 800.00, fecha_venta: '2024-06-01', producto: 'Producto A', cliente: 'Cliente 1' },
    { id: 2, vendedor_id: 1, monto: 1200.00, fecha_venta: '2024-06-15', producto: 'Producto B', cliente: 'Cliente 2' },
    { id: 3, vendedor_id: 2, monto: 3500.00, fecha_venta: '2024-06-10', producto: 'Producto C', cliente: 'Cliente 3' },
    { id: 4, vendedor_id: 2, monto: 750.00, fecha_venta: '2024-06-20', producto: 'Producto A', cliente: 'Cliente 4' },
    { id: 5, vendedor_id: 3, monto: 6000.00, fecha_venta: '2024-06-05', producto: 'Producto D', cliente: 'Cliente 5' },
    { id: 6, vendedor_id: 1, monto: 2200.00, fecha_venta: '2024-06-25', producto: 'Producto E', cliente: 'Cliente 6' },
    { id: 7, vendedor_id: 3, monto: 1500.00, fecha_venta: '2024-06-12', producto: 'Producto F', cliente: 'Cliente 7' }
];

const reglasSimuladas = [
    { id: 1, nombre: 'Comisión Básica', monto_min: 0, monto_max: 1000, porcentaje_comision: 5.0, activo: true },
    { id: 2, nombre: 'Comisión Media', monto_min: 1000, monto_max: 5000, porcentaje_comision: 7.5, activo: true },
    { id: 3, nombre: 'Comisión Alta', monto_min: 5000, monto_max: null, porcentaje_comision: 10.0, activo: true }
];

// FUNCIONALIDAD CORE: Filtrar y calcular comisiones por fechas
router.get('/comisiones', async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin, vendedor_id } = req.query;
        
        if (!fecha_inicio || !fecha_fin) {
            return res.status(400).json({
                success: false,
                message: 'Se requieren fecha_inicio y fecha_fin',
                ejemplo: '/api/ventas/comisiones?fecha_inicio=2024-06-01&fecha_fin=2024-06-30'
            });
        }

        console.log(`🔍 Filtrando comisiones: ${fecha_inicio} a ${fecha_fin}${vendedor_id ? `, vendedor: ${vendedor_id}` : ''}`);

        // Filtrar ventas por fecha
        const ventasFiltradas = ventasSimuladas.filter(venta => {
            const fechaVenta = new Date(venta.fecha_venta);
            const fechaInicio = new Date(fecha_inicio as string);
            const fechaFin = new Date(fecha_fin as string);
            
            const enRangoFecha = fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
            const esVendedorCorrect = vendedor_id ? venta.vendedor_id === parseInt(vendedor_id as string) : true;
            
            return enRangoFecha && esVendedorCorrect;
        });

        // Agrupar ventas por vendedor
        const vendedoresMap = new Map();
        
        ventasFiltradas.forEach(venta => {
            const vendedor = vendedoresSimulados.find(v => v.id === venta.vendedor_id);
            
            if (!vendedoresMap.has(venta.vendedor_id)) {
                vendedoresMap.set(venta.vendedor_id, {
                    vendedor: vendedor,
                    ventas: [],
                    total_ventas: 0
                });
            }
            
            vendedoresMap.get(venta.vendedor_id).ventas.push(venta);
            vendedoresMap.get(venta.vendedor_id).total_ventas += venta.monto;
        });

        // Calcular comisiones
        const comisiones = Array.from(vendedoresMap.values()).map((vendedorData: any) => {
            const totalVentas = vendedorData.total_ventas;
            
            // Encontrar regla aplicable
            let reglaAplicable = reglasSimuladas.find(regla => {
                return totalVentas >= regla.monto_min && 
                       (regla.monto_max === null || totalVentas <= regla.monto_max);
            });
            
            if (!reglaAplicable) {
                reglaAplicable = reglasSimuladas[0]; // Regla por defecto
            }
            
            const comisionTotal = totalVentas * (reglaAplicable.porcentaje_comision / 100);
            
            return {
                vendedor: vendedorData.vendedor,
                ventas: vendedorData.ventas,
                total_ventas: totalVentas,
                comision_total: Math.round(comisionTotal * 100) / 100, // Redondear a 2 decimales
                regla_aplicada: reglaAplicable,
                fecha_inicio: fecha_inicio,
                fecha_fin: fecha_fin
            };
        });

        const totalComisionGeneral = comisiones.reduce((sum, c) => sum + c.comision_total, 0);

        res.json({
            success: true,
            message: '🎯 MINICORE - Comisiones calculadas exitosamente (datos simulados)',
            data: comisiones,
            resumen: {
                filtros: { fecha_inicio, fecha_fin, vendedor_id },
                total_vendedores: comisiones.length,
                total_ventas_periodo: comisiones.reduce((sum, c) => sum + c.total_ventas, 0),
                total_comision_general: Math.round(totalComisionGeneral * 100) / 100,
                ventas_encontradas: ventasFiltradas.length
            },
            nota: 'Usando datos simulados - SQL Server se conectará después'
        });

    } catch (error) {
        console.error('Error calculando comisiones:', error);
        res.status(500).json({
            success: false,
            message: 'Error calculando comisiones',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

router.get('/', async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Ruta de ventas funcionando - MINICORE',
            data: ventasSimuladas,
            total_ventas: ventasSimuladas.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en ruta ventas'
        });
    }
});

export default router;