/**
 * 🛡️ Middleware de Manejo de Errores
 * 
 * Centraliza el manejo de errores de toda la aplicación
 * Proporciona respuestas consistentes y logs estructurados
 * 
 * @author Danny (Ptrickill)
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express';

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    timestamp: string;
    path: string;
    method: string;
  };
  details?: any;
}

/**
 * Middleware principal de manejo de errores
 */
export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  
  const timestamp = new Date().toISOString();
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Log del error
  console.error(`❌ Error [${timestamp}]:`, {
    message: err.message,
    stack: isDevelopment ? err.stack : '***',
    path: req.path,
    method: req.method,
    body: req.body
  });

  // Preparar respuesta de error
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message: err.message || 'Error interno del servidor',
      code: err.code || 'INTERNAL_ERROR',
      timestamp,
      path: req.path,
      method: req.method
    }
  };

  // Añadir detalles solo en desarrollo
  if (isDevelopment) {
    errorResponse.details = {
      stack: err.stack,
      originalError: err
    };
  }

  // Determinar código de estado
  const statusCode = err.statusCode || err.status || 500;
  
  res.status(statusCode).json(errorResponse);
};

/**
 * Middleware para rutas no encontradas
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message: `Ruta no encontrada: ${req.method} ${req.path}`,
      code: 'ROUTE_NOT_FOUND',
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method
    }
  };

  res.status(404).json(errorResponse);
};

/**
 * Wrapper para funciones async que captura errores automáticamente
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};