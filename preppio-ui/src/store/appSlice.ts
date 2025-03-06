import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface AppState {
  isLoading: boolean;
  errorMessage: string;
  formState: 'jobDescription' | 'resume' | 'questions';
}

const initialState: AppState = {
  isLoading: false,
  errorMessage: '',
  formState: 'resume',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFormState: (state, action: PayloadAction<AppState['formState']>) => {
      state.formState = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<AppState['isLoading']>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<AppState['errorMessage']>) => {
      state.errorMessage = action.payload;
    },
  },
});

// Selectors
export const selectFormState = (state: RootState) => state.app.formState;
export const selectIsLoading = (state: RootState) => state.app.isLoading;
export const selectErrorMessage = (state: RootState) => state.app.errorMessage;
export const onJobDescription = (state: RootState) => state.app.formState === 'jobDescription';
export const onResume = (state: RootState) => state.app.formState === 'resume';
export const onQuestions = (state: RootState) => state.app.formState === 'questions';

export const { setFormState, setIsLoading, setErrorMessage } = appSlice.actions;
export default appSlice.reducer;
