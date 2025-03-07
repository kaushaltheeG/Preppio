import { ChatCompletionCreateParamsBase, ChatCompletion } from "openai/resources/chat/completions";

export interface IPromptProps {
  messages: ChatCompletionCreateParamsBase['messages'];
  model: ChatCompletionCreateParamsBase['model'];
  temperature?: ChatCompletionCreateParamsBase['temperature'];
  max_tokens?: ChatCompletionCreateParamsBase['max_tokens'];
  response_format?: ChatCompletionCreateParamsBase['response_format'];
}

interface IGPTService {
  promptModel(promptObj: IPromptProps): Promise<ChatCompletion>;
  cleanResponse<T>(response: string): T;
}

export default IGPTService;
