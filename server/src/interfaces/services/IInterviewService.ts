import { IPromptProps } from "./IGPTService";
import { SupabaseClient } from "@supabase/supabase-js";
import IGPTService from "./IGPTService";
import IInterviewSession from "../models/IInterviewSession";

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
  interviewSession: IInterviewSession;
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
  insertInterviewSession(interviewRequest: ICreateInterviewSession): Promise<IInterviewSession>;
}

export default IInterviewService;
