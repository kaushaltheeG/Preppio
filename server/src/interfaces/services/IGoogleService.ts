import { drive_v3 } from '@googleapis/drive'; 
import { docs_v1 } from '@googleapis/docs';
import { IGetQuestionsResponse } from './IInterviewService';


export type InterviewContentType = Omit<IGetQuestionsResponse, 'serializedLexicalEditorState'>;
export interface IInsertGoogleDocParams {
  newDoc: drive_v3.Schema$File;
  interviewContent: InterviewContentType;
}

export interface IInsertGoogleDocObject {
  url: string;
  documentId: string;
}

export interface ICreateGoogleDocParams {
  title: string;
}

export interface ICreateGoogleDocRequestObject {
  requests: docs_v1.Schema$Request[];
  newIndex: number;
}

export interface ICreateGoogleDocBackgroundRequestObject {
  company: string;
  jobTitle: string;
  interviewType: string;
  interviewerPosition: string;
  currentIndex: number;
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
