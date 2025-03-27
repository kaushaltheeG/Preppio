import { Router, Request, Response } from 'express';
import GoogleDriveServiceFactory from '../services/GoogleDriveService';
import IGoogleDriveService from '../interfaces/services/IGoogleService';
import { SupabaseClient } from '@supabase/supabase-js';


const createGoogleDriveRouter = (supabase: SupabaseClient) => {
  const router = Router();

  router.post('/create-save-doc', async (req: Request, res: Response) => {
    const { title } = req.body;
    const { accessToken } = req.body;
    const { interviewContent } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!accessToken) {
      return res.status(400).json({ error: 'Access token is required' });
    }
    if (!interviewContent) {
      return res.status(400).json({ error: 'Interview content is required' });
    }

    try {
      const googleDriveService: IGoogleDriveService = GoogleDriveServiceFactory.createGoogleDriveService(accessToken, supabase);
      const newDoc = await googleDriveService.createGoogleDoc({ title });
      const result = await googleDriveService.insertGoogleDocToDrive({ newDoc, interviewContent });

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error creating and saving document to google drive:', error);
      return res.status(500).json({ error: 'Failed creating and saving document to google drive' });
    }  
  });

  return router;
}

export default createGoogleDriveRouter;
