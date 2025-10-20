/**
 * ✅ Servicio de Validación - Single Responsibility Principle
 * 
 * Se encarga únicamente de validar parámetros de entrada
 * Separa la lógica de validación del proceso de cálculo
 * 
 * @author Danny (Ptrickill)
 * @version 1.1.0
 * @description Validaciones centralizadas para mantener consistencia
 */

export class ValidacionService {
  
  /**
   * 📅 Validar parámetros de fechas para comisiones
   * @param fechaInicio Fecha de inicio (formato YYYY-MM-DD)
   * @param fechaFin Fecha de fin (formato YYYY-MM-DD)
   * @returns Objeto con resultado de validación
   */
  validarParametrosComision(fechaInicio: any, fechaFin: any) {
    if (!fechaInicio || !fechaFin) {
      return {
        valido: false,
        mensaje: 'Se requieren fecha_inicio y fecha_fin',
        ejemplo: '/api/ventas/comisiones?fecha_inicio=2024-06-01&fecha_fin=2024-06-30'
      };
    }

    // Validar formato de fechas
    const fechaInicioValida = !isNaN(Date.parse(fechaInicio));
    const fechaFinValida = !isNaN(Date.parse(fechaFin));

    if (!fechaInicioValida || !fechaFinValida) {
      return {
        valido: false,
        mensaje: 'Formato de fecha inválido. Use YYYY-MM-DD'
      };
    }

    return { valido: true };
  }

  /**
   * 👤 Validar ID de vendedor
   * @param vendedorId ID del vendedor a validar
   * @returns Objeto con resultado de validación
   */
  validarVendedorId(vendedorId: any) {
    if (vendedorId && isNaN(parseInt(vendedorId))) {
      return {
        valido: false,
        mensaje: 'vendor_id debe ser un número válido',
        ejemplo: 'vendor_id=1 o vendor_id=2'
      };
    }
    return { valido: true };
  }

  /**
   * 📊 Validar rango de fechas lógico
   * @param fechaInicio Fecha de inicio
   * @param fechaFin Fecha de fin  
   * @returns Objeto con resultado de validación
   */
  validarRangoFechas(fechaInicio: string, fechaFin: string) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    
    if (inicio > fin) {
      return {
        valido: false,
        mensaje: 'La fecha de inicio no puede ser mayor que la fecha de fin'
      };
    }
    
    // Validar que no sea más de 1 año
    const unAno = 365 * 24 * 60 * 60 * 1000;
    if (fin.getTime() - inicio.getTime() > unAno) {
      return {
        valido: false,
        mensaje: 'El rango de fechas no puede ser mayor a 1 año'
      };
    }
    
    return { valido: true };
  }
}