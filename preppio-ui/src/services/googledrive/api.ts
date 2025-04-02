import { IInterviewSessionWithQuestions } from '../interview/api';
import { api } from '../utils';
// export type InterviewContentType = Omit<IGetQuestionsResponse, 'serializedLexicalEditorState'>;
export interface ICreateAndSaveDocumentParams {
  title: string;
  accessToken: string;
  interviewContent: IInterviewSessionWithQuestions;
}

export interface ICreateAndSaveDocumentResponse {
  url: string;
  documentId: string;
}

export const createAndSaveDocument = async (params: ICreateAndSaveDocumentParams): Promise<ICreateAndSaveDocumentResponse> => {
  const response = await api.post(`/api/googledrive/create-save-doc`, params);
  return response.data;
};
