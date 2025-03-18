import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

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
    setJobDescriptionInitialState: () => {
      return { ...initialState };
    },
  },
});

// Selectors
export const getJobDescription = (state: RootState) => state.jobDescription.content;

export const { setJobDescription, setJobDescriptionInitialState } = jobDescriptionSlice.actions;
export default jobDescriptionSlice.reducer;
