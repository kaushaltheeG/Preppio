import axios from 'axios';
import { API_URL } from '../utils';

interface IGetInterviewQuestionsRequest {
  jobDescription: string,
  resume: string,
  extraNotes: string,
  interviewType: string,
  interviewerPosition: string
}

export interface IGetQuestionsResponse {
  company: string;
  jobTitle: string;
  interviewType: string;
  interviewerPosition: string;
  questions: IQuestion[];
  analysis: IAnalysis;
}

interface IQuestion {
  question: string;
  type: string;
  difficulty: string;
  topic: string;
  relevance: string;
  followUp: string[],
  keyPoints: string[],
  skillsAssessed: string[],
}

interface IAnalysis {
  strengthAreas: string[],
  gapAreas: string[],
  recommendedFocus: string[],
}

export const getInterviewQuestions = async (requestBody: IGetInterviewQuestionsRequest): Promise<IGetQuestionsResponse> => {
  const response = await axios.post<IGetQuestionsResponse>(`${API_URL}/api/interview/questions`, requestBody);
  return response.data;
};
