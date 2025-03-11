import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAnalysis, IQuestion, IGetQuestionsResponse } from '../../services/interview/api';
import { RootState } from '../../store';

export interface IInterviewState {
  analysis: IAnalysis;
  error: string | null;
  isLoading: boolean;
  questions: IQuestion[];
}

const initialState: IInterviewState = {
  analysis: {
    strengthAreas: [],
    gapAreas: [],
    recommendedFocus: [],
  },
  error: null,
  isLoading: false,
  questions: [],
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
  },
});

// Selectors
export const getQuestions = (state: RootState) => state.interview.questions;
export const getAnalysis = (state: RootState) => state.interview.analysis;
export const getIsLoadingQuestions = (state: RootState) => state.interview.isLoading;

export const { setQuestions, setAnalysis, analyzeRequest, analyzeSuccess, analyzeFailure } = interviewSlice.actions;
export default interviewSlice.reducer;
