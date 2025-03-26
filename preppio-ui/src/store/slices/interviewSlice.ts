import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAnalysis, IQuestion, IGetQuestionsResponse, ISerializedEditorState } from '../../services/interview/api';
import { RootState } from '../../store';
import { InterviewContentType } from '../../services/googledrive/api';

export interface IInterviewState {
  analysis: IAnalysis;
  company: string;
  error: string | null;
  isLoading: boolean;
  interviewerPosition: string;
  interviewType: string;
  jobTitle: string;
  questions: IQuestion[];
  serializedLexicalEditorState: ISerializedEditorState;
}



const mockData: IGetQuestionsResponse = {
  "company": "Cohere",
  "jobTitle": "Software Engineer",
  "interviewType": "culture",
  "interviewerPosition": "Head of HR",
  "questions": [
      {
          "question": "Can you describe a situation where you had to adapt quickly to changing priorities in a fast-paced environment? How did you manage your tasks?",
          "type": "behavioral",
          "difficulty": "intermediate",
          "topic": "Adaptability",
          "relevance": "This question assesses the candidate's ability to work in fast-paced environments, a key requirement of the role.",
          "followUp": [
              "What specific strategies did you use to stay organized?",
              "How did your team respond to the changes?"
          ],
          "keyPoints": [
              "Experience in Agile practices",
              "Ability to prioritize under pressure"
          ],
          "skillsAssessed": [
              "adaptability",
              "time management"
          ]
      },
      {
          "question": "Tell us about a time you collaborated with researchers or non-technical stakeholders to build a solution. What challenges did you face?",
          "type": "behavioral",
          "difficulty": "intermediate",
          "topic": "Collaboration",
          "relevance": "This question evaluates the candidate's experience in collaborating with cross-functional teams, crucial for the role.",
          "followUp": [
              "How did you ensure that everyone was on the same page?",
              "What tools did you use to facilitate communication?"
          ],
          "keyPoints": [
              "Cross-functional collaboration experience",
              "Communication skills"
          ],
          "skillsAssessed": [
              "collaboration",
              "communication"
          ]
      },
      {
          "question": "What approaches do you take to write minimal dependency code and ensure robustness in low-resource environments?",
          "type": "technical",
          "difficulty": "advanced",
          "topic": "Code Quality",
          "relevance": "This question tests the candidate's understanding of writing efficient code, a critical part of the job description.",
          "followUp": [
              "Can you give an example of a project where you implemented these practices?",
              "What challenges did you encounter while optimizing code?"
          ],
          "keyPoints": [
              "Experience with low-resource optimization",
              "Understanding of code quality principles"
          ],
          "skillsAssessed": [
              "coding",
              "performance optimization"
          ]
      },
      {
          "question": "How have you incorporated user feedback into your development process in past projects?",
          "type": "behavioral",
          "difficulty": "intermediate",
          "topic": "User-Centric Development",
          "relevance": "Understanding user needs is critical for delivering high-quality software.",
          "followUp": [
              "Can you provide an example of a significant change you made based on user feedback?",
              "How do you prioritize which feedback to act on?"
          ],
          "keyPoints": [
              "User feedback integration",
              "Prioritization skills"
          ],
          "skillsAssessed": [
              "user empathy",
              "iteration"
          ]
      },
      {
          "question": "What does diversity and inclusion mean to you in a workplace, and how do you contribute to it?",
          "type": "cultural",
          "difficulty": "basic",
          "topic": "Diversity and Inclusion",
          "relevance": "This question aligns with the company's commitment to diversity and inclusion.",
          "followUp": [
              "Have you been involved in any initiatives aimed at promoting inclusivity?",
              "How do you ensure diverse perspectives are considered in your work?"
          ],
          "keyPoints": [
              "Understanding of D&I importance",
              "Personal contributions to D&I"
          ],
          "skillsAssessed": [
              "cultural awareness",
              "teamwork"
          ]
      },
      {
          "question": "Discuss a project where you had to optimize performance?",
          "type": "technical",
          "difficulty": "intermediate",
          "topic": "Performance Optimization",
          "relevance": "This question evaluates the candidate's experience with optimizing applications, relevant to the role's responsibilities.",
          "followUp": [
              "What tools or metrics did you use to measure performance improvements?",
              "How did you identify the bottlenecks?"
          ],
          "keyPoints": [
              "Experience with performance metrics",
              "Problem-solving skills"
          ],
          "skillsAssessed": [
              "performance analysis",
              "critical thinking"
          ]
      },
      {
          "question": "Can you explain a time when you had to resolve a critical production incident? What was your approach to troubleshooting?",
          "type": "behavioral",
          "difficulty": "advanced",
          "topic": "Incident Management",
          "relevance": "This question assesses the candidate's ability to handle high-pressure situations and ensure continuity.",
          "followUp": [
              "How did you communicate with your team during the incident?",
              "What measures did you implement to prevent future incidents?"
          ],
          "keyPoints": [
              "Crisis management experience",
              "Communication under pressure"
          ],
          "skillsAssessed": [
              "problem-solving",
              "communication"
          ]
      },
      {
          "question": "What motivates you to work on projects that have a significant impact on society, such as deploying AGI?",
          "type": "cultural",
          "difficulty": "basic",
          "topic": "Mission-Driven Work",
          "relevance": "This question aligns with the company's mission to deliver impactful software.",
          "followUp": [
              "Can you share any specific experiences that shaped this motivation?",
              "How do you stay engaged with your work over time?"
          ],
          "keyPoints": [
              "Alignment with company mission",
              "Intrinsic motivation for impactful work"
          ],
          "skillsAssessed": [
              "passion",
              "commitment"
          ]
      },
      {
          "question": "How do you approach continuous learning and keeping up with advancements in technology, especially in AI and software development?",
          "type": "cultural",
          "difficulty": "basic",
          "topic": "Growth Mindset",
          "relevance": "This question assesses the candidate's commitment to personal and professional growth, important in a rapidly evolving field.",
          "followUp": [
              "What resources do you find most helpful?",
              "How do you apply new knowledge to your work?"
          ],
          "keyPoints": [
              "Commitment to professional development",
              "Adaptability to technological changes"
          ],
          "skillsAssessed": [
              "self-motivation",
              "adaptability"
          ]
      }
  ],
  "analysis": {
      "strengthAreas": [
          "Full stack development experience",
          "Experience with performance optimization"
      ],
      "gapAreas": [
          "Specific experience with AGI deployment",
          "Experience in extremely low-resource environments"
      ],
      "recommendedFocus": [
          "Explore experience with AGI or similar technologies",
          "Discuss approaches to working in constrained environments"
      ]
  },
  serializedLexicalEditorState: {
    root: {
      htmlContent: '',
    },
  }
};

const initialState: IInterviewState = {
  analysis: mockData.analysis,
  company: mockData.company,
  error: null,
  isLoading: false,
  interviewerPosition: mockData.interviewerPosition,
  interviewType: mockData.interviewType,
  jobTitle: mockData.jobTitle,
  questions: mockData.questions,
  serializedLexicalEditorState: mockData.serializedLexicalEditorState,
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    analyzeRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    analyzeSuccess: (state, action: PayloadAction<IGetQuestionsResponse>) => {
      state.isLoading = false;
      state.error = null;
      state.questions = action.payload.questions;
      state.analysis = action.payload.analysis;
      state.company = action.payload.company;
      state.jobTitle = action.payload.jobTitle;
      state.interviewerPosition = action.payload.interviewerPosition;
      state.interviewType = action.payload.interviewType;
      state.serializedLexicalEditorState = action.payload.serializedLexicalEditorState;
    },
    analyzeFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.questions = action.payload;
    },
    setAnalysis: (state, action: PayloadAction<IAnalysis>) => {
      state.analysis = action.payload;
    },
    setSerializedLexicalEditorState: (state, action: PayloadAction<ISerializedEditorState>) => {
      state.serializedLexicalEditorState = action.payload;
    },
    setInterviewInitialState: () => {
      return { ...initialState };
    },
  },
});

// Selectors
export const getQuestions = (state: RootState) => state.interview.questions;
export const getAnalysis = (state: RootState) => state.interview.analysis;
export const getIsLoadingQuestions = (state: RootState) => state.interview.isLoading;
export const getSerializedLexicalEditorState = (state: RootState) => state.interview.serializedLexicalEditorState;
export const getCompanyName = (state: RootState) => state.interview.company;
export const getJobTitle = (state: RootState) => state.interview.jobTitle;
export const getInterviewerPosition = (state: RootState) => state.interview.interviewerPosition;
export const getInterviewType = (state: RootState) => state.interview.interviewType;
export const getInterviewContent = (state: RootState): InterviewContentType => {
  const questions = getQuestions(state);
  const analysis = getAnalysis(state);
  const company = getCompanyName(state);
  const jobTitle = getJobTitle(state);
  const interviewerPosition = getInterviewerPosition(state);
  const interviewType = getInterviewType(state);

  return {
    questions,
    analysis,
    company,
    jobTitle,
    interviewerPosition,
    interviewType,
  };
};

export const {
  setQuestions,
  setAnalysis,
  setSerializedLexicalEditorState,
  analyzeRequest,
  analyzeSuccess,
  analyzeFailure,
  setInterviewInitialState,
} = interviewSlice.actions;

export default interviewSlice.reducer;
