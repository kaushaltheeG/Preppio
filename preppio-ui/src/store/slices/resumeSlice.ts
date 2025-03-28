import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';
export interface ResumeState {
  content: string;
}

const initialState: ResumeState = {
  content: '',
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResume: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setResumeInitialState: () => {
      return { ...initialState };
    },
  },
});

// Selectors
export const getResume = (state: RootState) => state.resume.content;
export const hasResume = (state: RootState) => state.resume.content.length > 0;

export const { setResume, setResumeInitialState } = resumeSlice.actions;
export default resumeSlice.reducer;
