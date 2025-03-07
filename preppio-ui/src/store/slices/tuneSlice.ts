import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TuneState {
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
  },
});

export const { setInterviewType, setInterviewerPosition, setExtraInformation } = tuneSlice.actions;
export default tuneSlice.reducer;
