import { api } from '../utils';
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

export interface IInterviewSessionWithQuestions extends IInterviewSession {
  questions: IQuestion[];
  analysis: IAnalysis;
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
export interface IGetPopulatedInterviewSessionResponse extends IInterviewSessionWithQuestions {
  resume: string;
  jobDescription: string;
  extraInformation: string;
}
export interface ISerializedEditorState {
  root: {
    htmlContent: string;
  };
}

export const createInterviewQuestions = async (requestBody: IGetInterviewQuestionsRequest, accessToken: string): Promise<IGetQuestionsResponse | null> => {
  try {
    const response = await api.post<IGetQuestionsResponse>(
      `/api/interview/questions`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error || 'Failed to generate potential interview questions');
  }
};

export const getInterviewSessions = async (): Promise<IInterviewSession[]> => {
  try {
    const accessToken = getSessionToken(store.getState());
    if (!accessToken) {
      throw new Error('User not authenticated');
    }
    const response = await api.get<IInterviewSession[]>(
      `/api/interview/user/sessions`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPopulatedInterviewSession = async (interviewSessionId: string): Promise<IGetPopulatedInterviewSessionResponse | null> => {
  try {
    const accessToken = getSessionToken(store.getState());
    if (!accessToken) {
      throw new Error('User not authenticated');
    }

    const response = await api.get<IGetPopulatedInterviewSessionResponse>(
      `/api/interview/user/sessions/${interviewSessionId}/populate`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const downloadTxtFileApi = async (interviewContent: IInterviewSessionWithQuestions): Promise<void> => {
  const accessToken = getSessionToken(store.getState());
  if (!accessToken) {
    throw new Error('User not authenticated');
  }

  try {
    const response = await api.post('/api/interview/download/txt', { interviewContent }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      responseType: 'blob'
    });
    const blob = new Blob([response.data], { type: 'text/plain' });
    // Generate a URL for the Blob
    const fileUrl = window.URL.createObjectURL(blob);
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'interview.txt'); // Set the desired file name
    
    // Append the anchor to the DOM and simulate a click
    document.body.appendChild(link);
    link.click();
    // Clean up by removing the anchor and revoking the Blob URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(fileUrl);
  } catch (error: any) {
    throw new Error(error.response.data.error || 'Failed to download txt');
  }
};
