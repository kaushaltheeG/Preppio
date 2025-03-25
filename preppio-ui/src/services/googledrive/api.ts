import axios from 'axios';
import { API_URL } from '../utils';
import { IGetQuestionsResponse } from '../interview/api';

export type InterviewContentType = Omit<IGetQuestionsResponse, 'serializedLexicalEditorState'>;
export interface ICreateAndSaveDocumentParams {
  title: string;
  accessToken: string;
  interviewContent: InterviewContentType;
}

export interface ICreateAndSaveDocumentResponse {
  url: string;
  documentId: string;
}

export const createAndSaveDocument = async (params: ICreateAndSaveDocumentParams): Promise<ICreateAndSaveDocumentResponse> => {
  const response = await axios.post(`${API_URL}/api/googledrive/create-save-doc`, params);
  return response.data;
};


