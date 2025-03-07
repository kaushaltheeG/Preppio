import { Router, Request, Response } from 'express';
import GPTService from '../services/GPTService';
import InterviewService from '../services/InterviewService';

interface InterviewRequest {
  jobDescription: string;
  resume: string;
  extraNotes?: string;
  interviewType: string;
  interviewerPosition: string;
}

const router = Router();
const gptService = new GPTService();
const interviewService = new InterviewService(gptService);

router.post('/questions', async (req: Request<{}, {}, InterviewRequest>, res: Response) => {
  try {
    const { jobDescription, resume, extraNotes, interviewType, interviewerPosition } = req.body;

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
     const questions = await interviewService.getQuestions({
      jobDescription,
      resume,
      extraNotes,
      interviewType,
      interviewerPosition,
    });

    return res.json(questions);
  } catch (error) {
    console.error('Error analyzing job:', error);
    return res.status(500).json({ error: 'Failed to analyze job description' });
  }
});

export default router; 