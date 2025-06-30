// services/ComisionService.ts

import { ComisionFactory } from '../factories/ComisionFactory';
import { VentaRepository } from '../repositories/VentaRepository';

export class ComisionService {
  constructor(private ventaRepo: VentaRepository) {}

  // Solo se encarga de calcular comisiones por periodo
  calcularComisionesPorPeriodo(fechaInicio: string, fechaFin: string, vendedorId?: string) {
    // Obtener ventas filtradas
    let ventasFiltradas;
    if (vendedorId) {
      ventasFiltradas = this.ventaRepo.filtrarVentasPorFechaYVendedor(
        fechaInicio, 
        fechaFin, 
        parseInt(vendedorId)
      );
    } else {
      ventasFiltradas = this.ventaRepo.filtrarVentasPorFecha(fechaInicio, fechaFin);
    }

    // Agrupar ventas por vendedor
    const vendedoresMap = new Map();
    
    ventasFiltradas.forEach(venta => {
      const vendedor = this.ventaRepo.buscarVendedorPorId(venta.vendedor_id);
      
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

    // Calcular comisiones usando Strategy Pattern
    const comisiones = Array.from(vendedoresMap.values()).map((vendedorData: any) => {
      const totalVentas = vendedorData.total_ventas;
      
      // Usar Factory para obtener estrategia correcta
      const strategy = ComisionFactory.crearEstrategia(totalVentas);
      const comisionTotal = strategy.calcular(totalVentas);
      
      return {
        vendedor: vendedorData.vendedor,
        ventas: vendedorData.ventas,
        total_ventas: totalVentas,
        comision_total: Math.round(comisionTotal * 100) / 100,
        regla_aplicada: {
          nombre: strategy.getTipo(),
          rango: strategy.getRango(),
          porcentaje_comision: totalVentas <= 1000 ? 5.0 : totalVentas <= 5000 ? 7.5 : 10.0
        },
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
      };
    });

    return {
      comisiones,
      resumen: this.generarResumen(comisiones, ventasFiltradas, fechaInicio, fechaFin, vendedorId)
    };
  }

  // Genera resumen ejecutivo
  private generarResumen(comisiones: any[], ventasFiltradas: any[], fechaInicio: string, fechaFin: string, vendedorId?: string) {
    const totalComisionGeneral = comisiones.reduce((sum, c) => sum + c.comision_total, 0);
    const totalVentasPeriodo = comisiones.reduce((sum, c) => sum + c.total_ventas, 0);

    return {
      filtros: { fecha_inicio: fechaInicio, fecha_fin: fechaFin, vendedor_id: vendedorId },
      total_vendedores: comisiones.length,
      total_ventas_periodo: totalVentasPeriodo,
      total_comision_general: Math.round(totalComisionGeneral * 100) / 100,
      ventas_encontradas: ventasFiltradas.length
    };
  }
}