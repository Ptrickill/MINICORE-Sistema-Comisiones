/**
 * 💰 Servicio de Cálculo de Comisiones - CORE BUSINESS LOGIC
 * 
 * Implementa el patrón Strategy para diferentes tipos de comisión
 * Calcula comisiones basadas en la sumatoria mensual de ventas
 * 
 * @author Danny (Ptrickill)
 * @version 1.2.0
 * @description Servicio principal para cálculo de comisiones por período
 */

import { ComisionFactory } from '../factories/ComisionFactory';
import { VentaRepository } from '../repositories/VentaRepository';

export class ComisionService {
  constructor(private ventaRepo: VentaRepository) {}

  /**
   * 🎯 MÉTODO PRINCIPAL: Calcula comisiones por período
   * 
   * @param fechaInicio Fecha inicio del período (YYYY-MM-DD)
   * @param fechaFin Fecha fin del período (YYYY-MM-DD)  
   * @param vendedorId ID específico del vendedor (opcional)
   * @returns Objeto con comisiones calculadas y resumen ejecutivo
   */
  calcularComisionesPorPeriodo(fechaInicio: string, fechaFin: string, vendedorId?: string) {
    // Obtener ventas filtradas DEL PERIODO EXACTO
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

    // Agrupar ventas por vendedor Y SUMAR POR MES
    const vendedoresMap = new Map();
    
    ventasFiltradas.forEach(venta => {
      const vendedor = this.ventaRepo.buscarVendedorPorId(venta.vendedor_id);
      
      if (!vendedoresMap.has(venta.vendedor_id)) {
        vendedoresMap.set(venta.vendedor_id, {
          vendedor: vendedor,
          ventas: [],
          total_ventas_periodo: 0  // SUMATORIA DEL PERIODO
        });
      }
      
      vendedoresMap.get(venta.vendedor_id).ventas.push(venta);
      vendedoresMap.get(venta.vendedor_id).total_ventas_periodo += venta.monto;
    });

    // Calcular comisiones usando reglas directas por rangos (más simple)
    const comisiones = Array.from(vendedoresMap.values()).map((vendedorData: any) => {
      const totalVentasPeriodo = vendedorData.total_ventas_periodo;

      // Cálculo directo: 0-600:6%, 601-800:8%, 801-1000:10%, >1000:15%
      const { comisionTotal, nombre, rango, porcentaje } = this.calcularPorRango(totalVentasPeriodo);

      return {
        vendedor: vendedorData.vendedor,
        ventas: vendedorData.ventas,
        total_ventas: totalVentasPeriodo,
        comision_total: Math.round(comisionTotal * 100) / 100,
        regla_aplicada: {
          nombre,
          rango,
          porcentaje_comision: porcentaje
        },
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        nota_calculo: `Comisión calculada sobre sumatoria total del periodo: $${totalVentasPeriodo}`
      };
    });

    return {
      comisiones,
      resumen: this.generarResumen(comisiones, ventasFiltradas, fechaInicio, fechaFin, vendedorId)
    };
  }

  // Obtener porcentaje segun estrategia
  private getPorcentajeStrategy(strategy: any): number {
    const tipo = strategy.getTipo();
    if (tipo.includes('Básica')) return 6.0;
    if (tipo.includes('Media')) return 8.0;
    if (tipo.includes('Alta')) return 10.0;
    if (tipo.includes('Premium')) return 15.0;
    return 0;
  }

  // Cálculo simple por rangos (directo y fácil de leer)
  private calcularPorRango(monto: number) {
    if (monto <= 600) {
      return { comisionTotal: monto * 0.06, nombre: 'Comisión Básica', rango: '$0 - $600', porcentaje: 6 };
    }
    if (monto <= 800) {
      return { comisionTotal: monto * 0.08, nombre: 'Comisión Media', rango: '$601 - $800', porcentaje: 8 };
    }
    if (monto <= 1000) {
      return { comisionTotal: monto * 0.10, nombre: 'Comisión Alta', rango: '$801 - $1,000', porcentaje: 10 };
    }
    return { comisionTotal: monto * 0.15, nombre: 'Comisión Premium', rango: '$1,001+', porcentaje: 15 };
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
      ventas_encontradas: ventasFiltradas.length,
      sistema_calculo: "Comisiones calculadas sobre sumatoria mensual de ventas del período"
    };
  }
}