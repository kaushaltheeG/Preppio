import { IBaseModel } from "../../models/base";

interface IInterviewSession extends IBaseModel {
  userId: string;
  company: string;
  jobTitle: string;
  interviewType: string;
  interviewerPosition: string;
}

export default IInterviewSession;
