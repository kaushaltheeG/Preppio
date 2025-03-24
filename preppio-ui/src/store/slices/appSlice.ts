import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface AppState {
  isLoading: boolean;
  errorMessage: string;
  formState: 'questions' | 'userInputs';
}

const initialState: AppState = {
  isLoading: false,
  errorMessage: '',
  formState: 'userInputs',
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
    setAppInitialState: () => {
      return { ...initialState };
    },
  },
});

// Selectors
export const getFormState = (state: RootState) => state.app.formState;
export const getIsLoading = (state: RootState) => state.app.isLoading;
export const getAppErrorMessage = (state: RootState) => state.app.errorMessage;
export const onQuestions = (state: RootState) => state.app.formState === 'questions';
export const onUserInputs = (state: RootState) => state.app.formState === 'userInputs';

export const { setFormState, setIsLoading, setErrorMessage, setAppInitialState } = appSlice.actions;
export default appSlice.reducer;
