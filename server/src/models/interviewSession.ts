import Base from './base';
import IInterviewSession from '../interfaces/models/IInterviewSession';

class InterviewSession extends Base<IInterviewSession> {
  private _userId: string;
  private _company: string;
  private _jobTitle: string;
  private _interviewerPosition: string;
  private _interviewType: string;

  constructor(obj: IInterviewSession) {
    super(obj);
    this._userId = obj.userId;
    this._company = obj.company;
    this._jobTitle = obj.jobTitle;
    this._interviewerPosition = obj.interviewerPosition;  
    this._interviewType = obj.interviewType;
  }

  get userId() {
    return this._userId;
  }

  set userId(userId: string) {
    this._userId = userId;
  }

  get company() {
    return this._company;
  }

  set company(company: string) {
    this._company = company;
  }

  get jobTitle() {
    return this._jobTitle;
  }

  set jobTitle(jobTitle: string) {
    this._jobTitle = jobTitle;
  }

  get interviewerPosition() {
    return this._interviewerPosition;
  }

  set interviewerPosition(interviewerPosition: string) {
    this._interviewerPosition = interviewerPosition;
  }

  get interviewType() {
    return this._interviewType;
  }

  set interviewType(interviewType: string) {
    this._interviewType = interviewType;
  }
}

export default InterviewSession;

