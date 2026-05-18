import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }));
      res.status(400).json({ success: false, error: { message: 'Validation failed', issues } });
      return;
    }
    req.body = result.data;
    next();
  };
