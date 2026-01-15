import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interface para definir o formato do Payload do Token
interface TokenPayload {
  id: number;
  role: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const { authorization } = req.headers;

  // 1. Verificar se o header Authorization foi enviado
  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // 2. O formato geralmente é "Bearer TOKEN_GIGANTE"
  // Vamos separar para pegar só o token
  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Erro no formato do token' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  // 3. Verificar se o token é válido
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    // 4. Salvar o ID e ROLE do usuário dentro da requisição
    const { id, role } = decoded as TokenPayload;
    
    // @ts-ignore 
    req.userId = id;
    // @ts-ignore
    req.userRole = role;

    return next(); 
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};