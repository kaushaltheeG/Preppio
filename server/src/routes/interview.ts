import { Router, Request, Response } from 'express';
import GPTService from '../services/GPTService';
import InterviewService from '../services/InterviewService';
import { SupabaseClient } from '@supabase/supabase-js';
import { createAuthMiddleware } from '../middleware/auth';
import QuestionService from '../services/QuestionService';
import AnalysisService from '../services/AnalysisService';
import createRequestLimitMiddleware from '../middleware/requestLimit';
import path from 'path';
import fs from 'fs';

interface InterviewRequest {
  jobDescription: string;
  resume: string;
  extraNotes?: string;
  interviewType: string;
  interviewerPosition: string;
}

const createInterviewRouter = (supabase: SupabaseClient) => {
  const router: Router = Router();
  const gptService = new GPTService();
  const questionService = new QuestionService(supabase);
  const analysisService = new AnalysisService(supabase);
  const interviewService = new InterviewService(gptService, supabase, questionService, analysisService);
  const authMiddleware = createAuthMiddleware(supabase);
  const requestLimitMiddleware = createRequestLimitMiddleware(supabase);

  router.get('/user/sessions', authMiddleware, async (req: Request, res: Response): Promise<any> => {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const interviewSessions = await interviewService.getUsersInterviewSessions(userId);
      return res.json(interviewSessions);
    } catch (error) {
      console.error('Error getting interview sessions:', error);
      return res.status(500).json({ error: 'Failed to get interview sessions' });
    }
  });

  router.get('/user/sessions/:id/populate', authMiddleware, async (req: Request, res: Response): Promise<any> => {
    const userId = req.user.id; 
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const interviewSessionId = req.params.id;
    if (!interviewSessionId) {
      return res.status(400).json({ error: 'Interview session ID is required' });
    }
    try {
      const interviewSession = await interviewService.getPopulatedInterviewSession(userId, interviewSessionId);
      return res.json(interviewSession);
    } catch (error) {
      console.error('Error getting interview session:', error);
      return res.status(500).json({ error: 'Failed to get interview session' });
    } 
  });
  

  router.post('/questions', authMiddleware, requestLimitMiddleware, async (req: Request<{}, {}, InterviewRequest>, res: Response): Promise<any> => {
    const { jobDescription, resume, extraNotes, interviewType, interviewerPosition } = req.body;
    const userId = req.user.id;
    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }
    if (!resume) {
      return res.status(400).json({ error: 'Resume is required' });
    } 
    if (!interviewType) {
      return res.status(400).json({ error: 'Interview type is required' });
    }
    if (!interviewerPosition) {
      return res.status(400).json({ error: 'Interviewer position is required' });
    }

    try {
      const analysis = await interviewService.createInterviewSession({
        jobDescription,
        resume,
        extraNotes,
        interviewType,
        interviewerPosition,
        userId,
      });

      return res.json(analysis);
    } catch (error) {
      console.error('Error analyzing job:', error);
      return res.status(500).json({ error: 'Failed to analyze job description' });
    }
  });

  router.post('/download/txt', authMiddleware, async (req: Request, res: Response): Promise<any> => {
    const { interviewContent } = req.body;

    if (!interviewContent) {
      return res.status(400).json({ error: 'Interview content is required' });
    }

    try {
    const { filePath, content } = interviewService.createTextFileFilePathAndContent(interviewContent);

    // Write content to the file
    fs.writeFileSync(filePath, content, 'utf8');

    // Send the file for download
    res.download(filePath, 'interview.txt', (err) => {
      // Clean up the temporary file after sending it
      fs.unlinkSync(filePath);

      if (err) {
        console.error('Error during file download:', err);
        return res.status(500).json({ error: 'Failed to download txt' });
      }
    });
    } catch (error) {
      console.error('Error downloading txt:', error);
      return res.status(500).json({ error: `Failed to download txt: ${error}` });
    }
    
  });

  return router;
}

export default createInterviewRouter;
