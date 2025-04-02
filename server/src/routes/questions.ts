import { Router, Request, Response } from 'express';
import { SupabaseClient } from '@supabase/supabase-js';
import { createAuthMiddleware } from '../middleware/auth';
import QuestionService from '../services/QuestionService';
const createQuestionsRouter = (supabase: SupabaseClient) => {
  const router = Router();
  const authMiddleware = createAuthMiddleware(supabase);
  const questionService = new QuestionService(supabase);

  router.post('/update/:id', authMiddleware, async (req: Request, res: Response): Promise<any> => {
    const userId = req.user.id;
    const questionId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' }); 
    }

    if (!questionId) {
      return res.status(400).json({ error: 'Question ID is required' });
    }

    try {
      const question = await questionService.updateQuestion(req.body);
      return res.status(200).json(question);
    } catch (error) {
      console.error('Error updating question:', error);
      return res.status(500).json({ error: 'Failed to update question' });
    }
  });
  
  return router;
};

export default createQuestionsRouter;
