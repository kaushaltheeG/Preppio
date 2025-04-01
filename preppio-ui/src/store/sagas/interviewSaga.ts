import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getInterviewQuestions, getInterviewSessions, getPopulatedInterviewSession, IInterviewSession, IGetPopulatedInterviewSessionResponse, IQuestion, IInterviewSessionWithQuestions } from '../../services/interview/api';
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
  setInputResume
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
      yield put(analyzeFailure('Login to Generate Potential Interview Questions!'));
      return;
    }
    const resume: string = yield select(getInputResume);
    if (resume === '') {
      yield put(analyzeFailure('Resume is required'));
      return;
    }
    const jobDescription: string = yield select(getInputJobDescription);
    if (jobDescription === '') {
      yield put(analyzeFailure('Job description is required'));
      return;
    }
    const interviewType: string = yield select(getInputInterviewType);
    if (interviewType === '') {
      yield put(analyzeFailure('Interview type is required'));
      return;
    }
    const interviewerPosition: string = yield select(getInputInterviewerPosition);
    if (interviewerPosition === '') {
      yield put(analyzeFailure('Interviewer position is required'));
      return;
    }
    const extraInformation: string = yield select(getInputExtraInformation);

    const response: IInterviewSessionWithQuestions | null = yield call(getInterviewQuestions, {
      jobDescription,
      resume,
      interviewType,
      interviewerPosition,
      extraInformation,
    }, accessToken);
    if (response === null) {
      throw new Error('Failed to generate potential interview questions');
    }
    console.log('hit')
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

export function* interviewSaga() {
  yield takeLatest(analyzeRequest.type, analyzeInterviewSaga);
  yield takeLatest(fetchInterviewSessions.type, getInterviewSessionsSaga);
  yield takeLatest(fetchInterviewSession.type, getPopulatedInterviewSessionSaga);
  yield takeLatest(setSession.type, getInterviewSessionsSaga);
  yield takeLatest(updateQuestionData.type, updateQuestionDataSaga);
}
