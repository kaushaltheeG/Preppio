import OpenAI from "openai";
import { ChatCompletion } from "openai/resources/chat/completions";
import IGPTService, { IPromptProps } from "../interfaces/services/IGPTService";
class GPTService implements IGPTService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async promptModel(promptObj: IPromptProps): Promise<ChatCompletion> {
    for (const arg in promptObj) {
      if (arg === undefined) {
        delete promptObj[arg];
      }
    }
    const response = await this.openai.chat.completions.create(promptObj);

    return response;
  }

  cleanResponse(response: string): string {
    try {
      const cleaned = response
        .replace(/\\n/g, '')
        .replace(/\\/g, '')
        .replace(/"{/g, '{')
        .replace(/}"/g, '}');
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Error parsing response:', error);
      throw new Error('Failed to parse GPT response');
    }
  }
}

export default GPTService;
