import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { enableMapSet } from 'immer';

enableMapSet();

export type FormState = 'questions' | 'userInputs';

interface AppState {
  isLoading: boolean;
  errorMessage: string;
  formState: FormState;
  openTabs: Set<string>;
}

const initialState: AppState = {
  isLoading: false,
  errorMessage: '',
  formState: 'userInputs',
  openTabs: new Set(),
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
    setOpenTabs: (state, action: PayloadAction<string>) => {
      state.openTabs.add(action.payload);
    },
    closeOpenTab: (state, action: PayloadAction<string>) => {
      state.openTabs.delete(action.payload);
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
export const getOpenTabs = (state: RootState) => state.app.openTabs;
export const getOpenTabsArray = (state: RootState) => Array.from(state.app.openTabs);

export const { setFormState, setIsLoading, setErrorMessage, setOpenTabs, closeOpenTab, setAppInitialState } = appSlice.actions;
export default appSlice.reducer;
