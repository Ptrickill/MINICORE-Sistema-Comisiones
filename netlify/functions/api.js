// Netlify Function para API de comisiones
const express = require('express');
const cors = require('cors');

// Importar tus servicios existentes
const { ComisionService } = require('../../backend/src/services/ComisionService');
const { VentaRepository } = require('../../backend/src/repositories/VentaRepository');

const app = express();
app.use(cors());
app.use(express.json());

// Crear instancias
const ventaRepo = new VentaRepository();
const comisionService = new ComisionService(ventaRepo);

// Ruta principal de comisiones
app.get('/api/ventas/comisiones', async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin, vendedor_id } = req.query;
    
    const resultado = await comisionService.calcularComisionesPorPeriodo(
      fecha_inicio,
      fecha_fin,
      vendedor_id ? parseInt(vendedor_id) : undefined
    );
    
    res.json(resultado);
  } catch (error) {
    console.error('Error en comisiones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta de vendedores
app.get('/api/vendedores', async (req, res) => {
  try {
    const vendedores = await ventaRepo.obtenerVendedores();
    res.json(vendedores);
  } catch (error) {
    console.error('Error en vendedores:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta de reglas
app.get('/api/reglas', (req, res) => {
  res.json([
    { rango: "$0 - $600", porcentaje: 6, tipo: "Básica" },
    { rango: "$601 - $800", porcentaje: 8, tipo: "Media" },
    { rango: "$801 - $1,000", porcentaje: 10, tipo: "Alta" },
    { rango: "$1,001+", porcentaje: 15, tipo: "Premium" }
  ]);
});

// Exportar para Netlify
exports.handler = require('serverless-http')(app);