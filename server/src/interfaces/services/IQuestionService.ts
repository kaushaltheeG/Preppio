import IQuestion from "../models/IQuestion";

interface IQuestionService {
  insertQuestion(questionDto: IQuestion): Promise<IQuestion>;
}

export default IQuestionService;

