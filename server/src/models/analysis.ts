import IAnalysis from "../interfaces/models/IAnalysis";
import Base from "./base";

class Analysis extends Base<IAnalysis> {
  private _userId: string;
  private _interviewSessionId: string;
  private _strengthAreas: string[];
  private _gapAreas: string[];
  private _recommendedFocus: string[];

  constructor(data: IAnalysis) {
    super(data);
    this._userId = data.userId;
    this._interviewSessionId = data.interviewSessionId;
    this._strengthAreas = data.strengthAreas;
    this._gapAreas = data.gapAreas;
    this._recommendedFocus = data.recommendedFocus;
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

  get strengthAreas() {
    return this._strengthAreas;
  }

  set strengthAreas(strengthAreas: string[]) {
    this._strengthAreas = strengthAreas;
  }

  get gapAreas() {
    return this._gapAreas;
  }

  set gapAreas(gapAreas: string[]) {  
    this._gapAreas = gapAreas;  
  }

  get recommendedFocus() {
    return this._recommendedFocus;
  } 

  set recommendedFocus(recommendedFocus: string[]) {
    this._recommendedFocus = recommendedFocus;
  }
}
export default Analysis;
