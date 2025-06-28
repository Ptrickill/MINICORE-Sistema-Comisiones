import React, { useState, useEffect } from 'react';
import { ComisionCalculada, Vendedor, EstadoCarga, FiltroComisiones } from '../types';
import { obtenerComisionesPorFechas, obtenerVendedores } from '../services/api';
import { format } from 'date-fns';
import './ComisionCalculator.css';

const ComisionCalculator: React.FC = () => {
    // Estados
    const [filtros, setFiltros] = useState<FiltroComisiones>({
        fecha_inicio: '2024-06-01',
        fecha_fin: '2024-06-30',
        vendedor_id: undefined
    });

    const [estado, setEstado] = useState<EstadoCarga>({
        cargando: false,
        error: null,
        datos: null,
        resumen: null
    });

    const [vendedores, setVendedores] = useState<Vendedor[]>([]);

    // Cargar vendedores al montar el componente
    useEffect(() => {
        cargarVendedores();
    }, []);

    const cargarVendedores = async () => {
        try {
            const response = await obtenerVendedores();
            if (response.success && response.data) {
                setVendedores(response.data);
            }
        } catch (error) {
            console.error('Error cargando vendedores:', error);
        }
    };

    // FUNCIONALIDAD CORE: Calcular comisiones
    const calcularComisiones = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setEstado(prev => ({ ...prev, cargando: true, error: null }));

        try {
            console.log('🔍 Calculando comisiones con filtros:', filtros);
            
            const response = await obtenerComisionesPorFechas(filtros);
            
            if (response.success) {
                setEstado({
                    cargando: false,
                    error: null,
                    datos: response.data || [],
                    resumen: response.resumen || null
                });
                
                console.log('✅ Comisiones calculadas:', response.data);
            } else {
                setEstado(prev => ({
                    ...prev,
                    cargando: false,
                    error: response.message || 'Error calculando comisiones'
                }));
            }
        } catch (error: any) {
            setEstado(prev => ({
                ...prev,
                cargando: false,
                error: error.message || 'Error inesperado'
            }));
            console.error('❌ Error calculando comisiones:', error);
        }
    };

    const handleFiltroChange = (campo: keyof FiltroComisiones, valor: string) => {
        setFiltros(prev => ({
            ...prev,
            [campo]: campo === 'vendedor_id' ? (valor ? parseInt(valor) : undefined) : valor
        }));
    };

    const limpiarFiltros = () => {
        setFiltros({
            fecha_inicio: '2024-06-01',
            fecha_fin: '2024-06-30',
            vendedor_id: undefined
        });
        setEstado({
            cargando: false,
            error: null,
            datos: null,
            resumen: null
        });
    };

    const formatearMoneda = (monto: number): string => {
        return new Intl.NumberFormat('es-US', {
            style: 'currency',
            currency: 'USD'
        }).format(monto);
    };

    const formatearFecha = (fecha: string | Date): string => {
        const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
        return format(fechaObj, 'dd/MM/yyyy');
    };

    return (
        <div className="comision-calculator">
            <div className="calculator-header">
                <h2>⚡ Cálculo de Comisiones por Fechas</h2>
                <p>Funcionalidad CORE - Filtra y calcula comisiones de vendedores</p>
            </div>

            {/* Formulario de filtros */}
            <form onSubmit={calcularComisiones} className="filtros-form">
                <div className="filtros-grid">
                    <div className="campo">
                        <label htmlFor="fecha_inicio">📅 Fecha Inicio:</label>
                        <input
                            type="date"
                            id="fecha_inicio"
                            value={filtros.fecha_inicio}
                            onChange={(e) => handleFiltroChange('fecha_inicio', e.target.value)}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="fecha_fin">📅 Fecha Fin:</label>
                        <input
                            type="date"
                            id="fecha_fin"
                            value={filtros.fecha_fin}
                            onChange={(e) => handleFiltroChange('fecha_fin', e.target.value)}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="vendedor_id">👤 Vendedor (Opcional):</label>
                        <select
                            id="vendedor_id"
                            value={filtros.vendedor_id || ''}
                            onChange={(e) => handleFiltroChange('vendedor_id', e.target.value)}
                        >
                            <option value="">Todos los vendedores</option>
                            {vendedores.map(vendedor => (
                                <option key={vendedor.id} value={vendedor.id}>
                                    {vendedor.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="botones">
                    <button 
                        type="submit" 
                        disabled={estado.cargando}
                        className="btn-calcular"
                    >
                        {estado.cargando ? '⏳ Calculando...' : '🧮 Calcular Comisiones'}
                    </button>
                    
                    <button 
                        type="button" 
                        onClick={limpiarFiltros}
                        className="btn-limpiar"
                    >
                        🗑️ Limpiar
                    </button>
                </div>
            </form>

            {/* Estados de la aplicación */}
            {estado.error && (
                <div className="error">
                    <h3>❌ Error</h3>
                    <p>{estado.error}</p>
                </div>
            )}

            {estado.cargando && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Calculando comisiones...</p>
                </div>
            )}

            {/* Resumen de resultados */}
            {estado.resumen && (
                <div className="resumen">
                    <h3>📊 Resumen del Período</h3>
                    <div className="resumen-grid">
                        <div className="resumen-item">
                            <span className="label">Vendedores con ventas:</span>
                            <span className="valor">{estado.resumen.total_vendedores}</span>
                        </div>
                        <div className="resumen-item">
                            <span className="label">Total en ventas:</span>
                            <span className="valor">{formatearMoneda(estado.resumen.total_ventas_periodo)}</span>
                        </div>
                        <div className="resumen-item destacado">
                            <span className="label">Total comisiones:</span>
                            <span className="valor">{formatearMoneda(estado.resumen.total_comision_general)}</span>
                        </div>
                        <div className="resumen-item">
                            <span className="label">Ventas encontradas:</span>
                            <span className="valor">{estado.resumen.ventas_encontradas}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Resultados detallados */}
            {estado.datos && estado.datos.length > 0 && (
                <div className="resultados">
                    <h3>💰 Comisiones Calculadas</h3>
                    
                    {estado.datos.map((comision, index) => (
                        <div key={index} className="comision-card">
                            <div className="comision-header">
                                <h4>👤 {comision.vendedor.nombre}</h4>
                                <p className="email">{comision.vendedor.email}</p>
                            </div>

                            <div className="comision-stats">
                                <div className="stat">
                                    <span className="label">Total Ventas:</span>
                                    <span className="valor">{formatearMoneda(comision.total_ventas)}</span>
                                </div>
                                <div className="stat destacado">
                                    <span className="label">Comisión:</span>
                                    <span className="valor">{formatearMoneda(comision.comision_total)}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Regla aplicada:</span>
                                    <span className="valor">
                                        {comision.regla_aplicada.nombre} ({comision.regla_aplicada.porcentaje_comision}%)
                                    </span>
                                </div>
                                <div className="stat">
                                    <span className="label">Cantidad de ventas:</span>
                                    <span className="valor">{comision.ventas.length}</span>
                                </div>
                            </div>

                            {/* Detalle de ventas */}
                            <details className="ventas-detalle">
                                <summary>Ver detalle de ventas ({comision.ventas.length})</summary>
                                <div className="ventas-lista">
                                    {comision.ventas.map((venta, vIndex) => (
                                        <div key={vIndex} className="venta-item">
                                            <div className="venta-info">
                                                <span className="fecha">{formatearFecha(venta.fecha_venta)}</span>
                                                <span className="producto">{venta.producto}</span>
                                                <span className="cliente">{venta.cliente}</span>
                                                <span className="monto">{formatearMoneda(venta.monto)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            )}

            {estado.datos && estado.datos.length === 0 && !estado.cargando && (
                <div className="sin-resultados">
                    <h3>📭 Sin resultados</h3>
                    <p>No se encontraron ventas en el período seleccionado.</p>
                    <p>Intenta cambiar las fechas o seleccionar otro vendedor.</p>
                </div>
            )}
        </div>
    );
};

export default ComisionCalculator;