import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAnalysis, IQuestion, IInterviewSessionWithQuestions } from '../../services/interview/api';
import { RootState } from '../types';
import { IInterviewSession } from '../../services/interview/api';
export interface IInterviewState {
  sessions: IInterviewSession[];
  activeSession: {
    data: IInterviewSessionWithQuestions;
    error: string | Error | null;
    isLoading: boolean;
  };
  sessionInputs: {
    resume: string;
    jobDescription: string;
    interviewType: string;
    interviewerPosition: string;
    extraInformation: string;
    error: string | Error | null;
    isLoading: boolean;
  }
}


const initialState: IInterviewState = {
  activeSession: {
    data: {
      id: '',
      userId: '',
      company: '',
      jobTitle: '',
      interviewerPosition: '',
      interviewType: '',
      questions: [],
      analysis: {
        strengthAreas: [],
        gapAreas: [],
        recommendedFocus: [],
      },
      createdAt: '',
      updatedAt: '',
    },
    error: null,
    isLoading: false,
  },
  sessions: [],
  sessionInputs: {
    resume: '',
    jobDescription: '',
    interviewType: '',
    interviewerPosition: '',
    extraInformation: '',
    error: null,
    isLoading: false,
  },
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    analyzeRequest: (state) => {
      state.sessionInputs.isLoading = true;
      state.sessionInputs.error = null;
    },
    analyzeSuccess: (state, action: PayloadAction<IInterviewSessionWithQuestions>) => {
      state.sessionInputs.isLoading = false;
      console.log('action.payload', action.payload);
      state.activeSession.data = action.payload;
      console.log('state.activeSession', state.activeSession);
    },
    analyzeFailure: (state, action: PayloadAction<string>) => {
      state.sessionInputs.isLoading = false;
      state.sessionInputs.error = action.payload;
    },
    updateQuestionDataFailure: (state, action: PayloadAction<string>) => {
      state.activeSession.isLoading = false;
      state.activeSession.error = action.payload;
    },
    setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.activeSession.data.questions = action.payload;
    },
    setAnalysis: (state, action: PayloadAction<IAnalysis>) => {
      state.activeSession.data.analysis = action.payload;
    },
    setLoadingQuestions: (state, action: PayloadAction<boolean>) => {
      state.activeSession.isLoading = action.payload;
    },
    setInterviewSessions: (state, action: PayloadAction<IInterviewSession[]>) => {
      state.sessions = action.payload;
    },
    setNewInterviewSession: (state) => {
      state.activeSession.data.questions = [];
      state.activeSession.data.analysis = {
        strengthAreas: [],
        gapAreas: [],
        recommendedFocus: [],
      };
      state.activeSession.data.company = '';
      state.activeSession.data.jobTitle = '';
      state.activeSession.data.interviewerPosition = '';
      state.activeSession.data.interviewType = '';
      state.activeSession.data.id = '';
      state.sessionInputs.jobDescription = '';
      state.sessionInputs.interviewType = '';
      state.sessionInputs.interviewerPosition = '';
      state.sessionInputs.extraInformation = '';
    },
    setInputJobDescription: (state, action: PayloadAction<string>) => {
      state.sessionInputs.jobDescription = action.payload;
    },
    setInputResume: (state, action: PayloadAction<string>) => {
      state.sessionInputs.resume = action.payload;
    },
    setInputInterviewType: (state, action: PayloadAction<string>) => {
      state.sessionInputs.interviewType = action.payload;
    },
    setInputInterviewerPosition: (state, action: PayloadAction<string>) => {
      state.sessionInputs.interviewerPosition = action.payload;
    },
    setInputExtraInformation: (state, action: PayloadAction<string>) => {
      state.sessionInputs.extraInformation = action.payload;
    },
    setInterviewInitialState: () => {
      return { ...initialState };
    },
  },
});

// Actions
export const fetchInterviewSessions  = createAction('interview/fetchInterviewSessions');
export const fetchInterviewSession = createAction<{ interviewSessionId: string }>('interview/fetchInterviewSession');
export const updateQuestionData = createAction<{ question: IQuestion }>('interview/updateQuestionData');

// Selectors
export const getQuestions = (state: RootState) => state.interview.activeSession.data.questions;
export const getAnalysis = (state: RootState) => state.interview.activeSession.data.analysis;
export const getIsLoadingQuestions = (state: RootState) => state.interview.activeSession.isLoading;
export const getCompanyName = (state: RootState) => state.interview.activeSession.data.company;
export const getJobTitle = (state: RootState) => state.interview.activeSession.data.jobTitle;
export const getActiveInterviewerPosition = (state: RootState) => state.interview.activeSession.data.interviewerPosition;
export const getActiveInterviewType = (state: RootState) => state.interview.activeSession.data.interviewType;
export const getUserId = (state: RootState) => state.interview.activeSession.data.userId;
export const getActiveInterviewSessionId = (state: RootState) => state.interview.activeSession.data.id;
export const getInterviewContent = (state: RootState): IInterviewSessionWithQuestions => {
  const questions = getQuestions(state);
  const analysis = getAnalysis(state);
  const company = getCompanyName(state);
  const jobTitle = getJobTitle(state);
  const interviewerPosition = getActiveInterviewerPosition(state);
  const interviewType = getActiveInterviewType(state);

  return {
    questions,
    analysis,
    company,
    jobTitle,
    interviewerPosition,
    interviewType,
    userId: getUserId(state),
    id: getActiveInterviewSessionId(state),
    createdAt: getActiveInterviewSessionId(state),
    updatedAt: getActiveInterviewSessionId(state),
  };
};
export const getInterviewSessions = (state: RootState) => state.interview.sessions;
export const getSessionInputs = (state: RootState) => state.interview.sessionInputs;
export const hasRequiredInterviewInformation = (state: RootState) => {
  return Boolean(
    state.interview.sessionInputs.interviewType &&
    state.interview.sessionInputs.interviewerPosition &&
    state.interview.sessionInputs.jobDescription &&
    state.interview.sessionInputs.resume
  );
}
export const getInputJobDescription = (state: RootState) => state.interview.sessionInputs.jobDescription;
export const getInputResume = (state: RootState) => state.interview.sessionInputs.resume;
export const getInputInterviewType = (state: RootState) => state.interview.sessionInputs.interviewType;
export const getInputInterviewerPosition = (state: RootState) => state.interview.sessionInputs.interviewerPosition;
export const getInputExtraInformation = (state: RootState) => state.interview.sessionInputs.extraInformation;  

export const {
  setQuestions,
  setAnalysis,
  analyzeRequest,
  analyzeSuccess,
  analyzeFailure,
  setInputJobDescription,
  setInputResume,
  setInputInterviewType,
  setInputInterviewerPosition,
  setInputExtraInformation,
  setInterviewInitialState,
  setInterviewSessions,
  setNewInterviewSession,
  updateQuestionDataFailure,
  setLoadingQuestions,
} = interviewSlice.actions;

export default interviewSlice.reducer;
