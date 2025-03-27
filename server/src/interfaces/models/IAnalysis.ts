import IBaseModel from "./IBaseModel";

interface IAnalysis extends IBaseModel {
  userId: string;
  interviewSessionId: string;
  strengthAreas: string[];
  gapAreas: string[];
  recommendedFocus: string[];
}

export default IAnalysis;
