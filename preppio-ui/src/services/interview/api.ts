import axios from 'axios';
import { API_URL } from '../utils';

export interface IGetInterviewQuestionsRequest {
  jobDescription: string;
  resume: string;
  interviewType: string;
  interviewerPosition: string;
  extraInformation: string;
}

export interface IQuestion {
  question: string;
  type: string;
  difficulty: string;
  topic: string;
  relevance: string;
  followUp: string[],
  keyPoints: string[],
  skillsAssessed: string[],
}

export interface IAnalysis {
  strengthAreas: string[],
  gapAreas: string[],
  recommendedFocus: string[],
}

export interface IGetQuestionsResponse {
  company: string;
  jobTitle: string;
  interviewType: string;
  interviewerPosition: string;
  questions: IQuestion[];
  analysis: IAnalysis;
  serializedLexicalEditorState: ISerializedEditorState;
}

export interface ISerializedEditorState {
  root: {
    htmlContent: string;
  };
}

export const getInterviewQuestions = async (requestBody: IGetInterviewQuestionsRequest): Promise<IGetQuestionsResponse | null> => {
  try {
    const response = await axios.post<IGetQuestionsResponse>(`${API_URL}/api/interview/questions`,  requestBody);
    return response.data;
  } catch (error) {
    return null;
  }
};
