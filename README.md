#  MINICORE - Sistema de Comisiones de Ventas

Tutorial filtrado por fechas React + Node.js + TypeScript. 

## Arquitectura MVC

### Backend (Node.js + TypeScript + Express)
- **Models:** Interfaces TypeScript para Vendedor, Ventas y Reglas 
- **Controllers:** Controladores en las rutas para manejar requests y lógica de negocio

### Frontend (React + TypeScript)
- **Components:** Filtros de fecha, tabla de vendedores, cálculo de comisiones
- **Services:** Integración con API backend
- **Types:** Interfaces TypeScript compartidas

## Tecnologías Utilizadas
- **Backend:** Node.js + TypeScript + Express.js (Patrón MVC)
- **Frontend:** React + TypeScript
- **Deploy:** Railway (Backend) + Vercel (Frontend)

##  Funcionalidad CORE - Filtrado de Comisiones por Fechas

###  Características principales:
- ✅ **Filtrado por rango de fechas** - Selecciona período específico
- ✅ **Filtrado por vendedor** - Opción de vendedor específico o todos
- ✅ **Cálculo automático de comisiones** - Basado en reglas de negocio
- ✅ **Múltiples reglas de comisión** - Básica (5%), Media (7.5%), Alta (10%)
- ✅ **Resumen ejecutivo** - Total de ventas y comisiones del período
- ✅ **Detalle expandible** - Ver ventas individuales por vendedor

### Reglas de Comisión:
| Rango de Ventas | Porcentaje | Nombre |
|----------------|------------|---------|
| $0 - $1,000 | 5.0% | Comisión Básica |
| $1,000 - $5,000 | 7.5% | Comisión Media |
| $5,000+ | 10.0% | Comisión Alta |

## Instalación y Uso

### Backend
```bash
cd backend
npm install
npm run dev
# Servidor en http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npm start
# Aplicación en http://localhost:3000
```

### Variables de entorno
**Backend (.env):**
```env
PORT=3001
NODE_ENV=development
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:3001/api
```


##  Estructura del Proyecto

```
MINICORE/
├── backend/                    # Node.js + TypeScript + Express (MVC)
│   ├── src/
│   │   ├── controllers/        # Controladores MVC (en routes)
│   │   ├── models/            # Modelos de datos (TypeScript interfaces)
│   │   ├── routes/            # Rutas de la API (Controllers)
│   │   │   ├── vendedor.routes.ts
│   │   │   ├── ventas.routes.ts    #  CORE: Cálculo de comisiones
│   │   │   └── reglas.routes.ts
│   │   ├── types/             # Interfaces TypeScript
│   │   └── app.ts             # Configuración Express
│   ├── package.json
│   └── .env
│
├── frontend/                  # React + TypeScript
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   │   ├── ComisionCalculator.tsx  #  CORE Component
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── services/         # Llamadas API
│   │   │   └── api.ts
│   │   ├── types/           # Tipos TypeScript
│   │   └── App.tsx
│   ├── package.json
│   └── .env
│
└── README.md                 # Este archivo
```

##  Enlaces del Proyecto

- **🔗 Repositorio GitHub:** https://github.com/Carlooosfif/MINICORE-Sistema-Comisiones
- **🎥 Video Explicativo:** https://youtu.be/rXaIAjPqxwg
- **🚀 Demo Backend:** https://minicore-sistema-comisiones-production.up.railway.app
- **💻 Demo Frontend:** https://minicore-sistema-comisiones.vercel.app/

##  Documentación MVC + Stack Tecnológico

### Documentación Oficial:
- **Node.js:** https://nodejs.org/en/docs/
- **Express.js MVC:** https://expressjs.com/en/starter/generator.html
- **TypeScript:** https://www.typescriptlang.org/docs/
- **React:** https://react.dev/
- **React + TypeScript:** https://react-typescript-cheatsheet.netlify.app/

##  Casos de Uso - Demostración

### Ejemplo 1: Todas las comisiones del mes
```
Fechas: 2024-06-01 a 2024-06-30
Vendedor: Todos
Resultado: 3 vendedores, 7 ventas, $850 en comisiones
```

### Ejemplo 2: Comisiones de vendedor específico
```
Fechas: 2024-06-01 a 2024-06-30  
Vendedor: Juan Pérez
Resultado: 1 vendedor, 3 ventas, $315 en comisiones
```

### Ejemplo 3: Período corto
```
Fechas: 2024-06-01 a 2024-06-05
Vendedor: Todos
Resultado: 2 vendedores, 2 ventas, $640 en comisiones
```


##  Autor

**Carlos Ochoa**  
 **Contacto:** carlos.ochoa@udla.edu.ec | carlos.ochoa@gmail.com  
 **Universidad:** UDLA  
 **Fecha:** Junio 2025  
 **Proyecto:** Sistema de Comisiones con Patrón MVC  

---