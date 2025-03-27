import IGPTService, { IPromptProps } from "../interfaces/services/IGPTService";
import IInterviewService, { ICreateInterviewQuestionPrompt, IGetQuestionsResponse, ICreateInterviewSession, IAnalysis } from "../interfaces/services/IInterviewService";
import { SupabaseClient } from "@supabase/supabase-js";
import IInterviewSession from "../interfaces/models/IInterviewSession";
import InterviewSession from "../models/interviewSession";
import IQuestionService from "../interfaces/services/IQuestionService";
import IQuestion from "../interfaces/models/IQuestion";

class InterviewService implements IInterviewService {
  private gptService: IGPTService;
  private supabase: SupabaseClient;
  private questionService: IQuestionService;

  constructor(gptService: IGPTService, supabase: SupabaseClient, questionService: IQuestionService) {
    this.gptService = gptService;
    this.supabase = supabase;
    this.questionService = questionService;
  }

  async insertInterviewSession(interviewRequest: ICreateInterviewSession): Promise<IInterviewSession> {
    const interviewSession = new InterviewSession(interviewRequest);
    const { data, error } = await this.supabase.from('interview_sessions').insert(interviewSession.toSupabase()).select().single();
    if (error) {
      throw new Error(error.message);
    }

    return InterviewSession.fromSupabase(data);
  }

  async createInterviewSession(interviewRequest: ICreateInterviewQuestionPrompt): Promise<IGetQuestionsResponse> {
    const prompt = this.createInterviewQuestionsPrompt(interviewRequest);
    const response = await this.gptService.promptModel(prompt);
    if (!response || !response.choices[0].message.content) {
      throw new Error('No response from GPT');
    }

    const aiResponse = this.gptService.cleanResponse<IGetQuestionsResponse>(response.choices[0].message.content);

    // insert interview session data
    const interviewSessionDto = {
      userId: interviewRequest.userId,
      company: aiResponse.company,
      jobTitle: aiResponse.jobTitle,
      interviewType: aiResponse.interviewType,
      interviewerPosition: aiResponse.interviewerPosition,
    }
    const interviewSessionData = await this.insertInterviewSession(interviewSessionDto);
    if (!interviewSessionData.id) {
      throw new Error('Interview session was not created');
    }
    const questionPromises = [];
    for (const question of aiResponse.questions) {
      questionPromises.push(this.questionService.insertQuestion({ ...question, interviewSessionId: interviewSessionData.id, userId: interviewRequest.userId }));
    }
    const questions = await Promise.all(questionPromises);
    const analysis = aiResponse.analysis;
    // add questions and analysis insert


    return this.createInterviewSessionResponse(questions, analysis, interviewSessionData);
  }

  createInterviewSessionResponse(questions: IQuestion[], analysis: IAnalysis, interviewSessionData: IInterviewSession): IGetQuestionsResponse {
    return {
      company: interviewSessionData.company,
      jobTitle: interviewSessionData.jobTitle,
      interviewType: interviewSessionData.interviewType,
      interviewerPosition: interviewSessionData.interviewerPosition,
      questions,
      analysis,
      userId: interviewSessionData.userId,
      interviewSessionId: interviewSessionData.id!
    }
  }

  createInterviewQuestionsPrompt(interviewRequest: ICreateInterviewQuestionPrompt): IPromptProps {
    return {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert ${interviewRequest.interviewType} interviewer at this company found in this job description: ${interviewRequest.jobDescription} , with the role of ${interviewRequest.interviewerPosition}.
            Your task is to generate relevant ${interviewRequest.interviewType} interview questions based on the company, job description and candidate's resume.

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

            Format response always as JSON:
            {
              "company": "The company name",
              "jobTitle": "The job title",
              "interviewType": "The type of interview",
              "interviewerPosition": "The position of the interviewer",
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
                "recommendedFocus": ["focus1", "focus2"],
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
