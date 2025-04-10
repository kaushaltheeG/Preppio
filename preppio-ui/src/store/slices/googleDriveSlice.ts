import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';

export interface IGoogleDocumentData {
  url: string;
  documentId: string;
  isLoading: boolean;
  error: string | null;
  lastCreatedDocument: number;
}
export interface GoogleDriveState {
  documents: IGoogleDocumentData;
} 

const initialState: GoogleDriveState = {
  documents: {
    url: '',
    documentId: '',
    isLoading: false,
    lastCreatedDocument: 0,
    error: null,
  },
};

const googleDriveSlice = createSlice({
  name: 'googleDrive',
  initialState,
  reducers: {
    setGoogleDocumentData: (state, action: PayloadAction<IGoogleDocumentData>) => {
      state.documents = action.payload;
    },
    setGoogleDocumentError: (state, action: PayloadAction<string>) => {
      state.documents.error = action.payload;
    },
    createGoogleDriveDocument: (state, action: PayloadAction<{ title: string }>) => {
      state.documents.isLoading = true;
    },
    setLastCreatedDocument: (state, action: PayloadAction<number>) => {
      state.documents.lastCreatedDocument = action.payload;
    },
    setGoogleDriveInitialState: () => {
      return { ...initialState };
    },
  },
});

// Selectors
export const getGoogleDriveDocuments = (state: RootState) => state.googleDrive.documents;
export const getGoogleDocUrl = (state: RootState) => state.googleDrive.documents.url;
export const getGoogleDriveDocumentId = (state: RootState) => state.googleDrive.documents.documentId;
export const isCreatingGoogleDriveDocumentSelector = (state: RootState) => state.googleDrive.documents.isLoading;
export const getGoogleDriveError = (state: RootState) => state.googleDrive.documents.error;

// Actions
export const { setGoogleDocumentData, setGoogleDocumentError, createGoogleDriveDocument, setLastCreatedDocument, setGoogleDriveInitialState } = googleDriveSlice.actions;
export const gainGoogleDrivePermission = createAction('googleDrive/gainGoogleDrivePermission');

export default googleDriveSlice.reducer;
