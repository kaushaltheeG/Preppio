import { Request, Response, NextFunction } from 'express';
import { SupabaseClient } from '@supabase/supabase-js';

const createRequestLimitMiddleware = (supabase: SupabaseClient, limit: number = 10) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== 'production') {
      return next();
    }

    const user = req.user;
    const { count } = await supabase
      .from('interview_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString())

    if (count && count >= limit) {
      return res.status(429).json({ error: 'Reached Daily Limit of 10 Interview Sessions' });
    }

    next();
  }
}

export default createRequestLimitMiddleware;
