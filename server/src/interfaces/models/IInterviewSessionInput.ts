import IBaseModel from "./IBaseModel";

export interface IInterviewSessionInput extends IBaseModel {
  userId: string;
  interviewSessionId: string;
  resume: string;
  jobDescription: string;
  interviewType: string;
  interviewerPosition: string;
  extraInformation: string;
}

export default IInterviewSessionInput;
