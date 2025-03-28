import IInterviewSessionInput from "../interfaces/models/IInterviewSessionInput";
import Base from "./base";

class InterviewSessionInput extends Base<IInterviewSessionInput> {
  private _userId: string;
  private _interviewSessionId: string;
  private _resume: string;
  private _jobDescription: string;
  private _interviewType: string;
  private _interviewerPosition: string;
  private _extraInformation: string;

  constructor(data: IInterviewSessionInput) {
    super(data);
    this._userId = data.userId;
    this._interviewSessionId = data.interviewSessionId;
    this._resume = data.resume;
    this._jobDescription = data.jobDescription;
    this._interviewType = data.interviewType;
    this._interviewerPosition = data.interviewerPosition;
    this._extraInformation = data.extraInformation;
  }

  get userId() {
    return this.userId;
  }

  set userId(userId: string) {
    this.userId = userId;
  }

  get interviewSessionId() {
    return this._interviewSessionId;
  }

  set interviewSessionId(interviewSessionId: string) {
    this._interviewSessionId = interviewSessionId;
  }

  get resume() {
    return this._resume;
  }

  set resume(resume: string) {
    this._resume = resume;
  }

  get jobDescription() {
    return this._jobDescription;
  }

  set jobDescription(jobDescription: string) {
    this._jobDescription = jobDescription;
  }

  get interviewType() {
    return this._interviewType;
  }

  set interviewType(interviewType: string) {
    this._interviewType = interviewType;
  }

  get interviewerPosition() {
    return this._interviewerPosition;
  }

  set interviewerPosition(interviewerPosition: string) {
    this._interviewerPosition = interviewerPosition;
  }

  get extraInformation() {
    return this._extraInformation;
  }

  set extraInformation(extraInformation: string) {
    this._extraInformation = extraInformation;
  }
}

export default InterviewSessionInput; 
