import { drive_v3 } from '@googleapis/drive'; 
import { docs_v1 } from '@googleapis/docs';
import { IInterviewSessionWithQuestions } from './IInterviewService';

export interface IInsertGoogleDocParams {
  newDoc: drive_v3.Schema$File;
  interviewContent: IInterviewSessionWithQuestions;
}

export interface IInsertGoogleDocObject {
  url: string;
  documentId: string;
  userId: string;
  interviewSessionId: string;
  service: string;
}

export interface ICreateGoogleDocParams {
  title: string;
}

export interface ICreateGoogleDocRequestObject {
  requests: docs_v1.Schema$Request[];
  newIndex: number;
}

export interface ICreateGoogleDocBackgroundRequestParams {
  company: string;
  jobTitle: string;
  interviewType: string;
  interviewerPosition: string;
  currentIndex: number;
}

export interface ICreateGoogleDocAnalysisRequestParams {
  analysis: IInterviewSessionWithQuestions['analysis'];
  currentIndex: number;
}

interface IGoogleDriveService {
  createGoogleDoc(params: ICreateGoogleDocParams): Promise<drive_v3.Schema$File>;
  insertGoogleDocToDrive(params: IInsertGoogleDocParams): Promise<IInsertGoogleDocObject>;
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
