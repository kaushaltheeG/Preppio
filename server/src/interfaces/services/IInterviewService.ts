import { IPromptProps } from "./IGPTService";
import { SupabaseClient } from "@supabase/supabase-js";
import IGPTService from "./IGPTService";
import IInterviewSession from "../models/IInterviewSession";
import IQuestion from "../models/IQuestion";
import IAnalysis from "../models/IAnalysis";
import IInterviewSessionInput from "../models/IInterviewSessionInput";

export interface ICreateInterviewQuestionPrompt {
  jobDescription: string;
  resume: string;
  extraNotes?: string;
  interviewType: string;
  interviewerPosition: string;
  userId: string;
}

export interface InterviewServiceParams {
  supabase: SupabaseClient;
  gptService: IGPTService;
}

export interface IInterviewSessionWithQuestions extends IInterviewSession {
  questions: IQuestion[];
  analysis: IAnalysis;
}

export interface ICreateInterviewSession {
  userId: string;
  company: string;
  jobTitle: string;
  interviewType: string;
  interviewerPosition: string;
}

export interface ICreateInterviewSessionInput {
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

interface IInterviewService {
  createInterviewQuestionsPrompt(interviewRequest: ICreateInterviewQuestionPrompt): IPromptProps;
  createInterviewSession(interviewRequest: ICreateInterviewQuestionPrompt): Promise<IInterviewSessionWithQuestions>;
  createTextFileFilePathAndContent(interviewContent: IInterviewSessionWithQuestions): { filePath: string, content: string };
  getUsersInterviewSessions(userId: string): Promise<IInterviewSession[]>;
  getPopulatedInterviewSession(userId: string, interviewSessionId: string): Promise<IGetPopulatedInterviewSessionResponse>;
  insertInterviewSession(interviewRequest: ICreateInterviewSession): Promise<IInterviewSession>;
  insertInterviewSessionInput(interviewRequest: ICreateInterviewSessionInput): Promise<IInterviewSessionInput>;
}

export default IInterviewService;
