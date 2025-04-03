import { call, put, select, takeLatest } from 'redux-saga/effects';
import { createGoogleDriveDocument, setGoogleDocumentData, setGoogleDocumentError, setLastCreatedDocument } from '../slices/googleDriveSlice';
import { createAndSaveDocument, ICreateAndSaveDocumentResponse } from '../../services/googledrive/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { getGoogleAccessToken } from '../slices/authSlice';
import { getInterviewContent } from '../slices/interviewSlice';
// import { refreshGooglePermissions } from '../../services/auth/api';
// import { checkSession } from '../slices/authSlice';
import { IInterviewSessionWithQuestions } from '@/services/interview/api';


function* createGoogleDriveDocumentSaga(action: PayloadAction<{ title: string }>) {
  try {
    const { title } = action.payload;
    let accessToken: string = yield select(getGoogleAccessToken);
    const interviewContent: IInterviewSessionWithQuestions = yield select(getInterviewContent);

    // Refresh access not found, user isn't logged in
    // if (!accessToken) {
    // yield call(refreshGooglePermissions);
    // yield put(checkSession());  
    // const accessToken: string = yield select(getGoogleAccessToken);
    // console.log('accessToken', accessToken);
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response: ICreateAndSaveDocumentResponse = yield call(
      createAndSaveDocument,
      { title, accessToken, interviewContent }
    );
    yield put(setLastCreatedDocument(new Date().getTime())); 
    yield put(setGoogleDocumentData({
      url: response.url,
      documentId: response.documentId,
      isLoading: false,
      error: null,
      lastCreatedDocument: new Date().getTime(),
    }));

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred within the google drive saga';
    yield put(setGoogleDocumentError(errorMessage));
  }
}

export function* googleDriveSaga() {
  yield takeLatest(createGoogleDriveDocument.type, createGoogleDriveDocumentSaga);
}
