import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JobDescriptionState {
  content: string;
}

const initialState: JobDescriptionState = {
  content: '',
};

export const jobDescriptionSlice = createSlice({
  name: 'jobDescription',
  initialState,
  reducers: {
    setJobDescription: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { setJobDescription } = jobDescriptionSlice.actions;
export default jobDescriptionSlice.reducer;
