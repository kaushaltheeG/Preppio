import { drive_v3 } from '@googleapis/drive'; 
import { docs_v1 } from '@googleapis/docs';
import { IGetQuestionsResponse } from './IInterviewService';


export type InterviewContentType = Omit<IGetQuestionsResponse, 'serializedLexicalEditorState'>;
export interface IInsertGoogleDocParams {
  newDoc: drive_v3.Schema$File;
  htmlContent: string;
  interviewContent: InterviewContentType;
}

export interface IInsertGoogleDocObject {
  url: string;
  documentId: string;
  text: string;
  htmlContent: string;
}

export interface ICreateGoogleDocParams {
  title: string;
}

interface IGoogleDriveService {
  createGoogleDoc(params: ICreateGoogleDocParams): Promise<drive_v3.Schema$File>;
  insertGoogleDoc(params: IInsertGoogleDocParams): Promise<IInsertGoogleDocObject>;
}

export interface ICreateClientObject {
  driveV3Client: drive_v3.Drive;
  docsV1Client: docs_v1.Docs;
}

export interface IGoogleDriveServiceFactory {
  createClient(accessToken: string): ICreateClientObject;
  createGoogleDriveService(accessToken: string): IGoogleDriveService;
}

export default IGoogleDriveService;
