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
  serializedLexicalEditorState: ISerializedEditorState;
}

interface IQuestion {
  question: string;
  type: string;
  difficulty: string;
  topic: string;
  relevance: string;
  followUp: string[],
  keyPoints: string[],
  skillsAssessed: string[],
}

interface IAnalysis {
  strengthAreas: string[],
  gapAreas: string[],
  recommendedFocus: string[],
}

export interface ISerializedEditorState {
  root: {
    children: {
      type: string;
      children: {
        text: string;
        format?: number;
      }[];
    }[];
  };
}


interface IInterviewService {
  createInterviewQuestionsPrompt(interviewRequest: ICreateInterviewQuestionPrompt): IPromptProps;
  getAnalysis(interviewRequest: ICreateInterviewQuestionPrompt): Promise<IGetQuestionsResponse>;
}

export default IInterviewService;
