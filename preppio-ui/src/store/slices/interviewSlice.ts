import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAnalysis, IQuestion, IGetQuestionsResponse, ISerializedEditorState } from '../../services/interview/api';
import { RootState } from '../../store';

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

const initialState: IInterviewState = {
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
  serializedLexicalEditorState: {
    root: {
      htmlContent: '',
    },
  },
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
