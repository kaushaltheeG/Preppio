import { SupabaseClient } from "@supabase/supabase-js";
import IAnalysis from "../interfaces/models/IAnalysis";
import IAnalysisService from "../interfaces/services/IAnalysisService";
import Analysis from "../models/analysis";

class AnalysisService implements IAnalysisService {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async insertAnalysis(analysisDto: IAnalysis): Promise<IAnalysis> {
    const analysis = new Analysis(analysisDto);
    const { data, error } = await this.supabase.from('analysis').insert(analysis.toSupabase()).select().single();
    if (error) {
      throw new Error(error.message);
    }
    return Analysis.fromSupabase(data);
  }
}

export default AnalysisService;
