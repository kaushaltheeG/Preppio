import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const { setResume } = resumeSlice.actions;
export default resumeSlice.reducer;
