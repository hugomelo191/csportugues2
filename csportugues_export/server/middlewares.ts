import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para verificar se o utilizador tem privilégios de administrador
 */
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  
  return res.status(403).json({ message: "Acesso negado. Permissões de administrador necessárias." });
}

/**
 * Middleware para verificar se o utilizador está autenticado
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  
  return res.status(401).json({ message: "Não autorizado" });
}