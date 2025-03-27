import IBaseModel from "../models/IBaseModel";

export interface IInterviewSession extends IBaseModel {
  userId: string;
  company: string;
  jobTitle: string;
  interviewerPosition: string;
  interviewType: string;
}

export default IInterviewSession;
