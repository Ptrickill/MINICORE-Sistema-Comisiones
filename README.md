# 🚀 MINICORE - Sistema de Comisiones de Ventas

Sistema completo de cálculo de comisiones con arquitectura MVC, diseño moderno y código limpio para desarrolladores en aprendizaje.

## 🏗️ Arquitectura MVC

### Backend (Node.js + TypeScript + Express)
- **Models:** Interfaces TypeScript para Vendedor, Ventas y Reglas 
- **Controllers:** Controladores en las rutas para manejar requests y lógica de negocio

### Frontend (React + TypeScript)
- **Components:** Filtros de fecha, tabla de vendedores, cálculo de comisiones
- **Services:** Integración con API backend
- **Types:** Interfaces TypeScript compartidas

## 💻 Tecnologías Utilizadas
- **Backend:** Node.js + TypeScript + Express.js (Arquitectura MVC + Patrones de Diseño)
- **Frontend:** React + TypeScript + CSS Moderno
- **Estilos:** Diseño colorido y accesible para aprendizaje
- **Patrones:** Strategy, Factory, Dependency Injection
- **Desarrollo:** Hot reload, scripts automatizados, git workflow

##  Funcionalidad CORE - Filtrado de Comisiones por Fechas

###  Características principales:
- ✅ **Filtrado por rango de fechas** - Selecciona período específico
- ✅ **Filtrado por vendedor** - Opción de vendedor específico o todos
- ✅ **Cálculo automático de comisiones** - Basado en reglas de negocio
- ✅ **Múltiples reglas de comisión** - Básica (5%), Media (7.5%), Alta (10%)
- ✅ **Resumen ejecutivo** - Total de ventas y comisiones del período
- ✅ **Detalle expandible** - Ver ventas individuales por vendedor

### 💰 Reglas de Comisión Actualizadas:
| Rango de Ventas | Porcentaje | Estrategia | Descripción |
|----------------|------------|------------|-------------|
| $0 - $600 | 6.0% | 🟢 Comisión Básica | Vendedores nuevos |
| $601 - $800 | 8.0% | 🟡 Comisión Media | Rendimiento estándar |
| $801 - $1,000 | 10.0% | 🟠 Comisión Alta | Buen desempeño |
| $1,001+ | 15.0% | 🚀 Comisión Premium | Excelencia en ventas |

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

## 🎯 Mejoras Recientes (v1.2.0)

### ✨ Nuevas Funcionalidades Backend:
- 🔧 **Middleware de errores centralizado** con logging estructurado
- 📝 **Documentación completa** en código con JSDoc
- ✅ **Validaciones mejoradas** con rango de fechas y límites
- 🛡️ **Manejo de errores robusto** con respuestas consistentes
- 📊 **Logging de desarrollo** para debugging
- 🚀 **CORS configurado** para múltiples entornos
- 📈 **Scripts npm mejorados** para build y desarrollo

### 🎨 Rediseño Frontend Completo:
- 🌈 **Paleta de colores moderna** (azul, verde, naranja, morado)
- 💫 **Animaciones suaves** y transiciones elegantes
- 📱 **Diseño responsive** optimizado para móviles
- 🎯 **Interfaz intuitiva** perfecta para aprendizaje
- ⚡ **Performance optimizada** con CSS limpio

##  Principios SOLID Aplicados

#### 1. Single Responsibility Principle (SRP)
Cada clase tiene una responsabilidad única:
- **ComisionService**: Solo calcula comisiones
- **ValidacionService**: Solo valida parámetros de entrada  
- **VentaService**: Solo maneja filtrado de ventas
- **VentaRepository**: Solo maneja acceso a datos

#### 2. Dependency Inversion Principle (DIP)
- Uso de interfaces para abstraer dependencias
- Controller depende de abstracciones, no implementaciones concretas
- Inyección de dependencias en constructores

typescript
// El controller depende de la interfaz, no de la implementación
constructor(private ventaRepo: IVentaRepository) {}

 Patrones de Diseño Implementados

1. Strategy Pattern
Diferentes estrategias para cálculo de comisiones según el monto:

### Reglas de Comisión:
| Rango de Ventas | Porcentaje | Nombre |
|----------------|------------|---------|
| $0 - $600 | 6.0% | Comisión Básica |
| $602 - $800 | 8% | Comisión Media |
| $800 - $1000 | 10.0% | Comisión Alta |
| $1000+ | 15.0% | Comisión Premium |


// Las estrategias son intercambiables
const strategy = ComisionFactory.crearEstrategia(monto);
const comision = strategy.calcular(monto);

2. Factory Pattern
Creación automática de la estrategia correcta según el monto de venta:

Centraliza la lógica de selección de estrategia
Facilita agregar nuevas reglas de comisión
Mantiene el código limpio y extensible

 Estructura Refactorizada
```
backend/src/
├── interfaces/          # DIP - Abstracciones
│   ├── IVentaRepository.ts
│   └── IComisionStrategy.ts
├── strategies/          # Strategy Pattern
│   ├── ComisionBasica.ts
│   ├── ComisionMedia.ts
│   └── ComisionAlta.ts
├── factories/           # Factory Pattern
│   └── ComisionFactory.ts
├── services/            # SRP - Responsabilidades separadas
│   ├── ComisionService.ts
│   ├── ValidacionService.ts
│   └── VentaService.ts
├── repositories/        # DIP - Acceso a datos
│   └── VentaRepository.ts
└── routes/             # Solo coordinación
    └── ventas.routes.ts
```
 Beneficios Obtenidos

Mantenibilidad: Código más fácil de modificar y extender
Testabilidad: Cada componente se puede probar por separado
Escalabilidad: Fácil agregar nuevas reglas de comisión
Claridad: Responsabilidades bien definidas
Reutilización: Componentes independientes y reutilizables

 Aprendizaje del Taller
Este proyecto aplica los conceptos de arquitectura y patrones de diseño aprendidos en el taller formativo, demostrando:

Separación clara de responsabilidades
Uso efectivo de interfaces para desacoplamiento
Implementación práctica de patrones de diseño
Código mantenible y extensible

##  Enlaces del Proyecto

- **🔗 Repositorio GitHub:** https://github.com/Ptrickill/MINICORE-Sistema-Comisiones
- **� Diseño:** Estilo moderno, simple y colorido para aprendizaje
- **🚀 Demo Local Backend:** http://localhost:3001
- **💻 Demo Local Frontend:** http://localhost:3000

##  Documentación MVC + Stack Tecnológico

### Documentación Oficial:
- **Node.js:** https://nodejs.org/en/docs/
- **Express.js MVC:** https://expressjs.com/en/starter/generator.html
- **TypeScript:** https://www.typescriptlang.org/docs/
- **React:** https://react.dev/
- **React + TypeScript:** https://react-typescript-cheatsheet.netlify.app/

##  Autor

**Danny (Ptrickill)**  
 **Contacto:** [Tu email]  
 **Repositorio:** https://github.com/Ptrickill/MINICORE-Sistema-Comisiones  
 **Fecha:** Octubre 2025  
 **Proyecto:** Sistema de Comisiones con Diseño Moderno y Colorido  

---
