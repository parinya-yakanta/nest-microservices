import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

export function correlationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const correlationId =
    (req.headers['x-correlation-id'] as string) ?? randomUUID();

  req.headers['x-correlation-id'] = correlationId;
  res.setHeader('x-correlation-id', correlationId);

  next();
}