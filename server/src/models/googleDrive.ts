import IGoogleDrive from "../interfaces/models/IGoogleDrive";
import Base from "./base";

class GoogleDrive extends Base<IGoogleDrive> {
  private _userId: string;
  private _interviewSessionId: string;
  private _service: string;
  private _documentId: string;

  constructor(data: IGoogleDrive) {
    super(data);
    this._userId = data.userId;
    this._interviewSessionId = data.interviewSessionId;
    this._service = data.service;
    this._documentId = data.documentId;
  }

  get userId() {
    return this._userId;
  }

  set userId(userId: string) {
    this._userId = userId;
  }

  get interviewSessionId() {
    return this._interviewSessionId;
  }

  set interviewSessionId(interviewSessionId: string) {
    this._interviewSessionId = interviewSessionId;
  }

  get service() {
    return this._service;
  }

  set service(service: string) {
    this._service = service;
  }

  get documentId() {
    return this._documentId;
  }

  set documentId(documentId: string) {
    this._documentId = documentId;
  }
}

export default GoogleDrive;
