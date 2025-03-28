import axios from 'axios';
import { API_URL } from '../utils';
import { store } from '../../store';
import { getSessionToken } from '../../store/slices/authSlice';

export interface IGetInterviewQuestionsRequest {
  jobDescription: string;
  resume: string;
  interviewType: string;
  interviewerPosition: string;
  extraInformation: string;
}

export interface IQuestion {
  id?: string;
  userId: string;
  question: string;
  type: string;
  difficulty: string;
  topic: string;
  notes?: string;
  relevance: string;
  followUp: string[];
  keyPoints: string[];
  skillsAssessed: string[];
  interviewSessionId: string;
}

export interface IAnalysis {
  strengthAreas: string[],
  gapAreas: string[],
  recommendedFocus: string[],
}

export interface IInterviewSession {
  id: string;
  userId: string;
  company: string;
  jobTitle: string;
  interviewerPosition: string;
  interviewType: string;
  createdAt: string;
  updatedAt: string;
}
export interface IGetQuestionsResponse {
  company: string;
  jobTitle: string;
  interviewType: string;
  interviewerPosition: string;
  questions: IQuestion[];
  analysis: IAnalysis;
  userId: string;
  interviewSessionId: string;
}

export interface IInterviewSessionInput {
  id: string;
  userId: string;
  interviewSessionId: string;
  resume: string;
  jobDescription: string;
  interviewType: string;
  interviewerPosition: string;
  extraInformation: string;
}
export interface IGetPopulatedInterviewSessionResponse extends IGetQuestionsResponse {
  resume: string;
  jobDescription: string;
  extraInformation: string;
}
export interface ISerializedEditorState {
  root: {
    htmlContent: string;
  };
}

export const getInterviewQuestions = async (requestBody: IGetInterviewQuestionsRequest): Promise<IGetQuestionsResponse | null> => {
  try {
    const accessToken = getSessionToken(store.getState());
    if (!accessToken) {
      throw new Error('User not authenticated');
    }

    const response = await axios.post<IGetQuestionsResponse>(
      `${API_URL}/api/interview/questions`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getInterviewSessions = async (): Promise<IInterviewSession[]> => {
  try {
    const accessToken = getSessionToken(store.getState());
    if (!accessToken) {
      throw new Error('User not authenticated');
    }
    const response = await axios.get<IInterviewSession[]>(
      `${API_URL}/api/interview/user/sessions`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getPopulatedInterviewSession = async (interviewSessionId: string): Promise<IGetPopulatedInterviewSessionResponse | null> => {
  try {
    const accessToken = getSessionToken(store.getState());
    if (!accessToken) {
      throw new Error('User not authenticated');
    }

    const response = await axios.get<IGetPopulatedInterviewSessionResponse>(
      `${API_URL}/api/interview/user/sessions/${interviewSessionId}/populate`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
