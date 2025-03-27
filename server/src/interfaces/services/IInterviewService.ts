import { IPromptProps } from "./IGPTService";
import { SupabaseClient } from "@supabase/supabase-js";
import IGPTService from "./IGPTService";
import IInterviewSession from "../models/IInterviewSession";
import IQuestion from "../models/IQuestion";
import IAnalysis from "../models/IAnalysis";

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

export interface ICreateInterviewSession {
  userId: string;
  company: string;
  jobTitle: string;
  interviewType: string;
  interviewerPosition: string;
}

interface IInterviewService {
  createInterviewQuestionsPrompt(interviewRequest: ICreateInterviewQuestionPrompt): IPromptProps;
  createInterviewSession(interviewRequest: ICreateInterviewQuestionPrompt): Promise<IGetQuestionsResponse>;
  getUsersInterviewSessions(userId: string): Promise<IInterviewSession[]>;
  insertInterviewSession(interviewRequest: ICreateInterviewSession): Promise<IInterviewSession>;
}

export default IInterviewService;
