import IGPTService, { IPromptProps } from "../interfaces/services/IGPTService";
import { ICreateInterviewQuestionPrompt } from "../interfaces/services/IInterviewService";


class InterviewService {
  private gptService: IGPTService;

  constructor(gptService: IGPTService) {
    this.gptService = gptService;
  }

  async getQuestions(interviewRequest: ICreateInterviewQuestionPrompt) {
    const prompt = this.createInterviewQuestionsPrompt(interviewRequest);
    const response = await this.gptService.promptModel(prompt);
    return this.gptService.cleanResponse(response.choices[0].message.content || '');
  }

  createInterviewQuestionsPrompt(interviewRequest: ICreateInterviewQuestionPrompt): IPromptProps {
    return {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert ${interviewRequest.interviewType} interviewer at a top tech company, with the role of ${interviewRequest.interviewerPosition}.
            Your task is to generate relevant interview questions based on the job description and candidate's resume.

            Context to consider:
            - Interview Type: ${interviewRequest.interviewType}
            - Interviewer Position: ${interviewRequest.interviewerPosition}
            - Additional Context: ${interviewRequest.extraNotes || 'None provided'}

            Generate 10 highly relevant questions that:
            - Match the specific interview type
            - Align with both the job requirements and candidate's background
            - Are appropriate for the candidate's experience level
            - Focus on areas where the candidate's experience matches job requirements
            - Include follow-up points for deeper discussion

            Format response as JSON:
            {
              "questions": [
                {
                  "question": "The main question text",
                  "type": "technical|system_design|behavioral|cultural",
                  "difficulty": "basic|intermediate|advanced",
                  "topic": "Main topic being tested",
                  "relevance": "Why this question is relevant to the job and candidate",
                  "followUp": ["Follow-up question 1", "Follow-up question 2"],
                  "keyPoints": ["Key point 1", "Key point 2"],
                  "skillsAssessed": ["skill1", "skill2"]
                }
              ],
              "analysis": {
                "strengthAreas": ["area1", "area2"],
                "gapAreas": ["gap1", "gap2"],
                "recommendedFocus": "Primary area to focus questioning"
              }
            }`
        },
        {
          role: 'user',
          content: `
            Job Description:
            ${interviewRequest.jobDescription}

            Candidate's Resume:
            ${interviewRequest.resume}

            Additional Notes:
            ${interviewRequest.extraNotes || 'None provided'}
            `,
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 3000,
    };
  }

}

export default InterviewService;
