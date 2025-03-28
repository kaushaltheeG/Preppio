import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getInterviewQuestions, getInterviewSessions, getPopulatedInterviewSession, IGetQuestionsResponse, IInterviewSession, IGetPopulatedInterviewSessionResponse } from '../../services/interview/api';
import { analyzeRequest, analyzeSuccess, analyzeFailure, setInterviewSessions, fetchInterviewSessions, fetchInterviewSession } from '../slices/interviewSlice';
import { getJobDescription, setJobDescription } from '../slices/jobDescriptionSlice';
import { getResume, setResume } from '../slices/resumeSlice';
import { getInterviewType, getInterviewerPosition, getExtraInformation, setInterviewerPosition, setExtraInformation, setInterviewType } from '../slices/tuneSlice';
import { setFormState } from '../slices/appSlice';
import { setSession } from '../slices/authSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* analyzeInterviewSaga() {
  try {
    const jobDescription: string = yield select(getJobDescription);
    const resume: string = yield select(getResume);
    const interviewType: string = yield select(getInterviewType);
    const interviewerPosition: string = yield select(getInterviewerPosition);
    const extraInformation: string = yield select(getExtraInformation);

    const response: IGetQuestionsResponse | null = yield call(getInterviewQuestions, {
      jobDescription,
      resume,
      interviewType,
      interviewerPosition,
      extraInformation,
    });
    if (response === null) {
      throw new Error('Failed to get interview questions');
    }
    
    yield put(analyzeSuccess(response));
    yield put(setFormState('questions'));
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
  yield put(setFormState('questions'));
  yield put(setInterviewType(interviewSession.interviewType));
  yield put(setInterviewerPosition(interviewSession.interviewerPosition));
  yield put(setExtraInformation(interviewSession.extraInformation));
  yield put(setJobDescription(interviewSession.jobDescription));
  yield put(setResume(interviewSession.resume));
}

export function* interviewSaga() {
  yield takeLatest(analyzeRequest.type, analyzeInterviewSaga);
  yield takeLatest(fetchInterviewSessions.type, getInterviewSessionsSaga);
  yield takeLatest(fetchInterviewSession.type, getPopulatedInterviewSessionSaga);
  yield takeLatest(setSession.type, getInterviewSessionsSaga);
}
