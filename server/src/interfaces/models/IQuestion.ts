import IBaseModel from "../models/IBaseModel";


export interface IQuestion extends IBaseModel {
  userId: string;
  question: string;
  type: string;
  difficulty: string;
  topic: string;
  notes: string;
  relevance: string;
  followUp: string[];
  keyPoints: string[];
  skillsAssessed: string[];
  interviewSessionId: string;
}

export default IQuestion;
