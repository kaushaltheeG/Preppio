import IGPTService, { IPromptProps } from "../interfaces/services/IGPTService";
import IInterviewService, { ICreateInterviewQuestionPrompt, IGetQuestionsResponse, ISerializedEditorState } from "../interfaces/services/IInterviewService";
import { JSDOM } from 'jsdom';

class InterviewService implements IInterviewService {
  private gptService: IGPTService;

  constructor(gptService: IGPTService) {
    this.gptService = gptService;
  }

  async getAnalysis(interviewRequest: ICreateInterviewQuestionPrompt): Promise<IGetQuestionsResponse> {
    const prompt = this.createInterviewQuestionsPrompt(interviewRequest);
    const response = await this.gptService.promptModel(prompt);
    if (!response || !response.choices[0].message.content) {
      throw new Error('No response from GPT');
    }

    const analysis = this.gptService.cleanResponse<IGetQuestionsResponse>(response.choices[0].message.content);
    analysis.serializedLexicalEditorState = this.formatLexicalEditorContent(analysis);

    return analysis;
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

  private formatLexicalEditorContent(data: IGetQuestionsResponse): ISerializedEditorState {
    const { company, jobTitle, interviewType, interviewerPosition, questions, analysis } = data;
    const htmlContent = `
      <article>
        <h1>Potential ${company} Interview Questions</h1>
  
        <section>
          <h3>Interview Background</h3>
            <p>
              <span><u>Company</u>:</span>
              <span>${company}</span><br />
              <span><u>Job Title/Position</u>:</span>
              <span>${jobTitle}</span><br />
              <span><u>Interview Type</u>:</span>
              <span>${interviewType}</span><br />
              <span><u>Interviewer's Position</u>:</span>
              <span>${interviewerPosition}</span>
            </p>
        </section>
        <br />

        <section>
          <h3>Potential Interview Questions:</h3>
            <dl>
              ${questions.map((q, index) => `
                <p><strong>${index + 1}. ${q.question}</strong></p>
                <p>
                  <span><u>Type</u>:</span>
                  <span>${q.type}</span><br />
                  <span><u>Difficulty</u>:</span>
                  <span>${q.difficulty}</span><br />
                  <span><u>Topic</u>:</span>
                  <span>${q.topic}</span><br />
                </p>
                <u>Key Points:</u>
                <ul>
                  ${q.keyPoints.map(point => `<li>${point}</li>`).join('')}
                </ul>
                <br />
                `).join('')}
            </dl>
        </section>
        <br />

        <section>
          <h3>Analysis:</h3>
          <dl>
            <p>
              <span><u>Strength Areas</u>:</span>
              <span>${analysis.strengthAreas.join(', ')}</span><br />
              <span><u>Gap Areas</u>:</span>
              <span>${analysis.gapAreas.join(', ')}</span><br />  
              <span><u>Recommended Focus</u>:</span>
              <span>${analysis.recommendedFocus.join(', ')}</span>
            </p>
          </dl>
        </section>
      </article>
    `.trim();
  
    return {
      root: {
        htmlContent,
      },
    };
  }

  private cleanHtml(html: string): string {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const cleanNode = (node: Node) => {
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if (child.nodeType === 3 && child.nodeValue?.trim() === '') {
          node.removeChild(child);
          i--;
        } else if (child.nodeType === 1) {
          cleanNode(child);
        }
      }
    };

    cleanNode(doc.body);
    return doc.body.innerHTML;
  }

}

export default InterviewService;
