import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';

export interface TuneState {
  interviewType: string;
  interviewerPosition: string;
  extraInformation: string;
}

const initialState: TuneState = {
  interviewType: '',
  interviewerPosition: '',
  extraInformation: '',
};

export const tuneSlice = createSlice({
  name: 'tune',
  initialState,
  reducers: {
    setInterviewType: (state, action: PayloadAction<string>) => {
      state.interviewType = action.payload;
    },
    setInterviewerPosition: (state, action: PayloadAction<string>) => {
      state.interviewerPosition = action.payload;
    },
    setExtraInformation: (state, action: PayloadAction<string>) => {
      state.extraInformation = action.payload;
    },
    setTuneInitialState: () => {
      return { ...initialState };
    },
  },
});

// Selectors
export const getInterviewType = (state: RootState) => state.tune.interviewType;
export const getInterviewerPosition = (state: RootState) => state.tune.interviewerPosition;
export const getExtraInformation = (state: RootState) => state.tune.extraInformation;
export const hasRequiredTuneInformation = (state: RootState) => {
  return Boolean(
    state.tune.interviewType &&
    state.tune.interviewerPosition
  );
};

export const {
  setInterviewType,
  setInterviewerPosition,
  setExtraInformation,
  setTuneInitialState,
} = tuneSlice.actions;
export default tuneSlice.reducer;
