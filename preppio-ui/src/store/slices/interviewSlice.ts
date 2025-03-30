import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAnalysis, IQuestion, IGetQuestionsResponse } from '../../services/interview/api';
import { RootState } from '../types';
import { InterviewContentType } from '../../services/googledrive/api';
import { IInterviewSession } from '../../services/interview/api';
export interface IInterviewState {
  interviewSessions: IInterviewSession[];
  analysis: IAnalysis;
  company: string;
  error: string | null;
  isLoading: boolean;
  interviewerPosition: string;
  interviewType: string;
  jobTitle: string;
  questions: IQuestion[];
  userId: string;
  interviewSessionId: string;
}


const initialState: IInterviewState = {
  interviewSessions: [],
  analysis: {
    strengthAreas: [],
    gapAreas: [],
    recommendedFocus: [],
  },
  company: '',
  error: null,
  isLoading: false,
  interviewerPosition: '',
  interviewType: '',
  jobTitle: '',
  questions: [],
  userId: '',
  interviewSessionId: '',
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
      state.userId = action.payload.userId;
      state.interviewSessionId = action.payload.interviewSessionId;
    },
    analyzeFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateQuestionDataFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.questions = action.payload;
    },
    setAnalysis: (state, action: PayloadAction<IAnalysis>) => {
      state.analysis = action.payload;
    },
    setLoadingQuestions: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setInterviewSessions: (state, action: PayloadAction<IInterviewSession[]>) => {
      state.interviewSessions = action.payload;
    },
    setNewInterviewSession: (state) => {
      state.questions = [];
      state.analysis = {
        strengthAreas: [],
        gapAreas: [],
        recommendedFocus: [],
      };
      state.company = '';
      state.jobTitle = '';
      state.interviewerPosition = '';
      state.interviewType = '';
      state.interviewSessionId = '';
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
export const getQuestions = (state: RootState) => state.interview.questions;
export const getAnalysis = (state: RootState) => state.interview.analysis;
export const getIsLoadingQuestions = (state: RootState) => state.interview.isLoading;
export const getCompanyName = (state: RootState) => state.interview.company;
export const getJobTitle = (state: RootState) => state.interview.jobTitle;
export const getInterviewerPosition = (state: RootState) => state.interview.interviewerPosition;
export const getInterviewType = (state: RootState) => state.interview.interviewType;
export const getUserId = (state: RootState) => state.interview.userId;
export const getActiveInterviewSessionId = (state: RootState) => state.interview.interviewSessionId;
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
    userId: getUserId(state),
    interviewSessionId: getActiveInterviewSessionId(state),
  };
};
export const getInterviewSessions = (state: RootState) => state.interview.interviewSessions;

export const {
  setQuestions,
  setAnalysis,
  analyzeRequest,
  analyzeSuccess,
  analyzeFailure,
  setInterviewInitialState,
  setInterviewSessions,
  setNewInterviewSession,
  updateQuestionDataFailure,
  setLoadingQuestions,
} = interviewSlice.actions;

export default interviewSlice.reducer;
