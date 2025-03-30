import IQuestion from '../interfaces/models/IQuestion';
import { SupabaseClient } from '@supabase/supabase-js';
import Question from '../models/question';

class QuestionService {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async insertQuestion(questionDto: IQuestion): Promise<IQuestion> {
    const question = new Question(questionDto);
    const { data, error } = await this.supabase.from('questions').insert(question.toSupabase()).select().single();
    if (error) {
      throw new Error(error.message);
    }
    return Question.fromSupabase(data);
  }

  async updateQuestion(questionDto: IQuestion): Promise<IQuestion> {
    const question = new Question(questionDto);
    const { data, error } = await this.supabase.from('questions').update(question.toSupabase()).eq('id', question.id).select().single();
    if (error) {
      throw new Error(error.message);
    }
    return Question.fromSupabase(data);
  }
}

export default QuestionService;
