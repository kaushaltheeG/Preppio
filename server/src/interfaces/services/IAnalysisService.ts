import IAnalysis from "../models/IAnalysis";

interface IAnalysisService {
  insertAnalysis(analysis: IAnalysis): Promise<IAnalysis>;
}

export default IAnalysisService;
