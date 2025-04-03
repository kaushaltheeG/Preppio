import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getInterviewSessions, getPopulatedInterviewSession, IInterviewSession, IGetPopulatedInterviewSessionResponse, IQuestion, IInterviewSessionWithQuestions, createInterviewQuestions, downloadTxtFileApi } from '../../services/interview/api';
import {
  analyzeRequest,
  analyzeSuccess,
  analyzeFailure, 
  getInputJobDescription,
  getInputResume,
  getInputInterviewType,
  getInputInterviewerPosition,
  getInputExtraInformation,
  setInterviewSessions,
  fetchInterviewSessions,
  fetchInterviewSession,
  updateQuestionDataFailure,
  setLoadingQuestions,
  setInputInterviewType,
  setInputInterviewerPosition,
  setInputExtraInformation,
  setInputJobDescription,
  setInputResume,
  getInterviewContent,
  downloadAsTxtFile
} from '../slices/interviewSlice';
import { setFormState } from '../slices/appSlice';
import { getSessionToken, setSession } from '../slices/authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { updateQuestion } from '../../services/questions/api';
import { updateQuestionData } from '../slices/interviewSlice';

function* analyzeInterviewSaga() {
  try {
    const accessToken: string = yield select(getSessionToken);
    if (!accessToken) {
      throw new Error('Login to Generate Potential Interview Questions!');
    }
    const resume: string = yield select(getInputResume);
    if (resume === '') {
      throw new Error('Resume is required');
    }
    const jobDescription: string = yield select(getInputJobDescription);
    if (jobDescription === '') {
      throw new Error('Job description is required');
    }
    const interviewType: string = yield select(getInputInterviewType);
    if (interviewType === '') {
      throw new Error('Interview type is required');
    }
    const interviewerPosition: string = yield select(getInputInterviewerPosition);
    if (interviewerPosition === '') {
      throw new Error('Interviewer position is required');
    }
    const extraInformation: string = yield select(getInputExtraInformation);

    const response: IInterviewSessionWithQuestions = yield call(createInterviewQuestions, {
      jobDescription,
      resume,
      interviewType,
      interviewerPosition,
      extraInformation,
    }, accessToken);

    yield put(analyzeSuccess(response));
    yield put(setFormState('questions'));
    yield call(getInterviewSessionsSaga);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred within the interview saga';
    yield put(analyzeFailure(errorMessage));
  }
}

function* getInterviewSessionsSaga() {
  const interviewSessions: IInterviewSession[] = yield call(getInterviewSessions);
  yield put(setInterviewSessions(interviewSessions));
}

function* getPopulatedInterviewSessionSaga(action: PayloadAction<{ interviewSessionId: string }>) {
  const interviewSession: IGetPopulatedInterviewSessionResponse | null = yield call(getPopulatedInterviewSession, action.payload.interviewSessionId);
  if (interviewSession === null) {
    throw new Error('Failed to get interview session');
  }
  yield put(analyzeSuccess(interviewSession));
  yield put(setInputInterviewType(interviewSession.interviewType));
  yield put(setInputInterviewerPosition(interviewSession.interviewerPosition));
  yield put(setInputExtraInformation(interviewSession.extraInformation));
  yield put(setInputJobDescription(interviewSession.jobDescription));
  yield put(setInputResume(interviewSession.resume));
}

function* updateQuestionDataSaga(action: PayloadAction<{ question: IQuestion }>) {
  try {
    yield put(setLoadingQuestions(true));
    const question: IQuestion = yield call(updateQuestion, action.payload.question);
    if (question === null) {
      throw new Error('Failed to update question');
    }
    yield put(fetchInterviewSession({ interviewSessionId: question.interviewSessionId }));
    yield put(setLoadingQuestions(false));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred within the update question data saga';
    yield put(updateQuestionDataFailure(errorMessage));
  }
}

function* downloadInterviewTxtSaga() {
  try {
    const interviewContent: IInterviewSessionWithQuestions = yield select(getInterviewContent);
    yield call(downloadTxtFileApi, interviewContent);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred within the download interview txt saga';
    console.error(errorMessage);
  }
}

export function* interviewSaga() {
  yield takeLatest(analyzeRequest.type, analyzeInterviewSaga);
  yield takeLatest(fetchInterviewSessions.type, getInterviewSessionsSaga);
  yield takeLatest(fetchInterviewSession.type, getPopulatedInterviewSessionSaga);
  yield takeLatest(setSession.type, getInterviewSessionsSaga);
  yield takeLatest(updateQuestionData.type, updateQuestionDataSaga);
  yield takeLatest(downloadAsTxtFile.type, downloadInterviewTxtSaga);
}
