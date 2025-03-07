import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

interface JobRequest {
  description: string;
}

const router = Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/questions', async (req: Request<{}, {}, JobRequest>, res: Response) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    // improve the prompt to get the best results
    const analysis = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that analyzes job descriptions and 5 behavioral and 5 technical questions that are relevant to the job description.',
        },
        {
          role: 'user',
          content: description,
        },
      ],
    });

    const message = analysis.choices[0].message.content;

    return res.json(message);
  } catch (error) {
    console.error('Error analyzing job:', error);
    return res.status(500).json({ error: 'Failed to analyze job description' });
  }
});

export default router; 