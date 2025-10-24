# 🚀 MINICORE - Sistema de Comisiones

Sistema de cálculo de comisiones con **diseño simple para aprendizaje**.

## 💻 Tecnologías
- **Backend:** Node.js + TypeScript + Express.js
- **Frontend:** React + TypeScript + CSS Simple
- **Patrones:** Strategy, Factory, MVC

## ⚡ Funcionalidades
- ✅ **Cálculo de comisiones** por rango de fechas
- ✅ **Filtros por vendedor** - Específico o todos
- ✅ **Múltiples reglas** - 6%, 8%, 10%, 15% según ventas
- ✅ **Resumen ejecutivo** - Totales y estadísticas
- ✅ **Interfaz simple** - Diseño estático para aprender

## 💰 Reglas de Comisión
| Ventas | Porcentaje | Tipo |
|--------|------------|------|
| $0 - $600 | 6% | Básica |
| $601 - $800 | 8% | Media |
| $801 - $1,000 | 10% | Alta |
| $1,001+ | 15% | Premium |

## 🚀 Instalación

### Backend

```bash
cd backend
npm install
npm run dev
```
**Servidor:** http://localhost:3001

### Frontend
```bash
cd frontend
npm install
npm start
```
**App:** http://localhost:3000

## 📁 Estructura

```
MINICORE/
├── backend/           # API Node.js + TypeScript
│   ├── src/
│   │   ├── routes/    # Controladores
│   │   ├── services/  # Lógica de negocio
│   │   ├── strategies/ # Patrones Strategy
│   │   └── types/     # Interfaces
├── frontend/          # React + TypeScript
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   └── services/  # API calls
└── README.md
```

## 🎯 Patrones Aplicados

### Strategy Pattern
```typescript
// Diferentes estrategias según monto
const strategy = ComisionFactory.crearEstrategia(monto);
const comision = strategy.calcular(monto);
```

### Factory Pattern
```typescript
// Creación automática de estrategia correcta
ComisionFactory.crearEstrategia(500);   // → ComisionBasica
ComisionFactory.crearEstrategia(1200);  // → ComisionPremium
```

## 🔗 Enlaces
- **Repositorio:** https://github.com/Ptrickill/MINICORE-Sistema-Comisiones
- **Backend:** http://localhost:3001
- **Frontend:** http://localhost:3000

## 👤 Autor
**Danny (Ptrickill)** - Octubre 2025

