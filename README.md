# 🚀 MINICORE - Sistema de Comisiones de Ventas

Tutorial filtrado por fechas React + Node.js + TypeScript. En este video se explica lo básico para crear un proyecto MVC con React y Node.js desde cero y adicional se muestra como filtrar y calcular comisiones dentro de un rango de fechas.

## 🎥 Video Explicativo
[Enlace al video en YouTube/Loom - **AQUÍ VA EL LINK CUANDO LO SUBAS**]

## 🏗️ Arquitectura MVC

### Backend (Node.js + TypeScript + Express)
- **Models:** Interfaces TypeScript para Vendedor, Ventas y Reglas 
- **Views:** Respuestas JSON de la API REST
- **Controllers:** Controladores en las rutas para manejar requests y lógica de negocio

### Frontend (React + TypeScript)
- **Components:** Filtros de fecha, tabla de vendedores, cálculo de comisiones
- **Services:** Integración con API backend
- **Types:** Interfaces TypeScript compartidas

## 🚀 Tecnologías Utilizadas
- **Backend:** Node.js + TypeScript + Express.js (Patrón MVC)
- **Frontend:** React + TypeScript + CSS moderno
- **Base de Datos:** Datos simulados (preparado para SQL Server)
- **Deploy:** Railway (Backend) + Vercel (Frontend)

## ⚡ Funcionalidad CORE - Filtrado de Comisiones por Fechas

### 🎯 Características principales:
- ✅ **Filtrado por rango de fechas** - Selecciona período específico
- ✅ **Filtrado por vendedor** - Opción de vendedor específico o todos
- ✅ **Cálculo automático de comisiones** - Basado en reglas de negocio
- ✅ **Múltiples reglas de comisión** - Básica (5%), Media (7.5%), Alta (10%)
- ✅ **Resumen ejecutivo** - Total de ventas y comisiones del período
- ✅ **Detalle expandible** - Ver ventas individuales por vendedor

### 📊 Reglas de Comisión:
| Rango de Ventas | Porcentaje | Nombre |
|----------------|------------|---------|
| $0 - $1,000 | 5.0% | Comisión Básica |
| $1,000 - $5,000 | 7.5% | Comisión Media |
| $5,000+ | 10.0% | Comisión Alta |

## ⚙️ Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

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

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información del proyecto |
| GET | `/api/health` | Estado del servidor |
| GET | `/api/vendedores` | Listar vendedores |
| GET | `/api/ventas` | Listar ventas |
| GET | `/api/reglas` | Listar reglas de comisión |
| GET | `/api/ventas/comisiones` | **CORE:** Calcular comisiones por fecha |

### 🎯 Endpoint Principal (Funcionalidad CORE):
```bash
# Todas las comisiones en un período
GET /api/ventas/comisiones?fecha_inicio=2024-06-01&fecha_fin=2024-06-30

# Comisiones de un vendedor específico
GET /api/ventas/comisiones?fecha_inicio=2024-06-01&fecha_fin=2024-06-30&vendedor_id=1
```

**Respuesta ejemplo:**
```json
{
  "success": true,
  "message": "🎯 MINICORE - Comisiones calculadas exitosamente",
  "data": [
    {
      "vendedor": {
        "id": 1,
        "nombre": "Juan Pérez",
        "email": "juan.perez@email.com"
      },
      "ventas": [...],
      "total_ventas": 4200.00,
      "comision_total": 315.00,
      "regla_aplicada": {
        "nombre": "Comisión Media",
        "porcentaje_comision": 7.5
      }
    }
  ],
  "resumen": {
    "total_vendedores": 3,
    "total_comision_general": 850.00
  }
}
```

## 🗄️ Estructura del Proyecto

```
MINICORE/
├── backend/                    # Node.js + TypeScript + Express (MVC)
│   ├── src/
│   │   ├── controllers/        # Controladores MVC (en routes)
│   │   ├── models/            # Modelos de datos (TypeScript interfaces)
│   │   ├── routes/            # Rutas de la API (Controllers)
│   │   │   ├── vendedor.routes.ts
│   │   │   ├── ventas.routes.ts    # ⚡ CORE: Cálculo de comisiones
│   │   │   └── reglas.routes.ts
│   │   ├── types/             # Interfaces TypeScript
│   │   └── app.ts             # Configuración Express
│   ├── package.json
│   └── .env
│
├── frontend/                  # React + TypeScript
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   │   ├── ComisionCalculator.tsx  # ⚡ CORE Component
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

## 🌐 Enlaces del Proyecto

- **🔗 Repositorio GitHub:** [https://github.com/tu-usuario/MINICORE-Sistema-Comisiones](https://github.com/tu-usuario/MINICORE-Sistema-Comisiones)
- **🎥 Video Explicativo:** [YouTube/Loom - AGREGAR LINK]
- **🚀 Demo Backend:** [Railway - AGREGAR LINK]
- **💻 Demo Frontend:** [Vercel - AGREGAR LINK]

## 📚 Documentación MVC + Stack Tecnológico

### Documentación Oficial:
- **Node.js:** https://nodejs.org/en/docs/
- **Express.js MVC:** https://expressjs.com/en/starter/generator.html
- **TypeScript:** https://www.typescriptlang.org/docs/
- **React:** https://react.dev/
- **React + TypeScript:** https://react-typescript-cheatsheet.netlify.app/

### Videos/Tutoriales de Referencia:
- **React + TypeScript Tutorial:** [Agregar link del video que usaste]
- **Node.js MVC Pattern:** [Agregar link del video que usaste]
- **Express.js + TypeScript:** [Agregar link del video que usaste]

## 🎯 Casos de Uso - Demostración

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

## 📊 Estado del Proyecto

- ✅ **Backend MVC completo** - API REST funcionando
- ✅ **Frontend React completo** - Interfaz moderna y responsive  
- ✅ **Funcionalidad CORE** - Filtrado por fechas implementado
- ✅ **Integración completa** - Frontend ↔ Backend
- ✅ **Datos simulados** - Sistema funcional sin BD
- ✅ **Deploy preparado** - Listo para Railway + Vercel
- 🔄 **Video explicativo** - En proceso
- 🔄 **SQL Server** - Opcional (funciona con simulados)

## 👨‍💻 Autor

**Carlos Ochoa**  
📧 **Contacto:** carlos.ochoa@udla.edu.ec | carlos.ochoa@gmail.com  
🎓 **Universidad:** UDLA  
📅 **Fecha:** Junio 2025  
📝 **Proyecto:** Sistema de Comisiones con Patrón MVC  

---

### 📋 Notas Técnicas

- **Patrón MVC:** Implementado con separación clara de responsabilidades
- **Datos simulados:** 3 vendedores, 7 ventas, 3 reglas de comisión
- **API RESTful:** Endpoints bien estructurados con responses JSON
- **TypeScript:** Tipado fuerte en frontend y backend
- **Responsive:** Funciona en desktop y móvil
- **CORS configurado:** Frontend puede consumir backend sin problemas

**Sistema listo para producción y demostración académica.** 🚀