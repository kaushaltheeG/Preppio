import OpenAI from "openai";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

interface IPromptProps {
  messages: ChatCompletionCreateParamsBase['messages'];
  model: ChatCompletionCreateParamsBase['model'];
  temperature?: ChatCompletionCreateParamsBase['temperature'];
  max_tokens?: ChatCompletionCreateParamsBase['max_tokens'];
  response_format?: ChatCompletionCreateParamsBase['response_format'];
}

class GPTService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async prompt(promptObj: IPromptProps) {
    for (const arg in promptObj) {
      if (arg === undefined) {
        delete promptObj[arg];
      }
    }
    const response = await this.openai.chat.completions.create(promptObj);

    return response;
  }
}

export default GPTService;
