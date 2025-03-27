import { IPromptProps } from "./IGPTService";

export interface ICreateInterviewQuestionPrompt {
  jobDescription: string;
  resume: string;
  extraNotes?: string;
  interviewType: string;
  interviewerPosition: string;
}

export interface IGetQuestionsResponse {
  company: string;
  jobTitle: string;
  interviewType: string;
  interviewerPosition: string;
  questions: IQuestion[];
  analysis: IAnalysis;
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

interface IInterviewService {
  createInterviewQuestionsPrompt(interviewRequest: ICreateInterviewQuestionPrompt): IPromptProps;
  getAnalysis(interviewRequest: ICreateInterviewQuestionPrompt): Promise<IGetQuestionsResponse>;
}

export default IInterviewService;
