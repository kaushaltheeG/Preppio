import IBaseModel from "./IBaseModel";

interface IGoogleDrive extends IBaseModel {
  userId: string;
  interviewSessionId: string;
  service: string;
  documentId: string;
}

export default IGoogleDrive;
