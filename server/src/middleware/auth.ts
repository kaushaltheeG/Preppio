import { Request, Response, NextFunction } from 'express';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const createAuthMiddleware = (supabase: SupabaseClient) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Add the user to the request object for use in route handlers
    req.user = user;
    next();
  };
};
