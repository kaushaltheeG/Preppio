import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
interface ResumeState {
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
  },
});

// Selectors
export const getResume = (state: RootState) => state.resume.content;

export const { setResume } = resumeSlice.actions;
export default resumeSlice.reducer;
