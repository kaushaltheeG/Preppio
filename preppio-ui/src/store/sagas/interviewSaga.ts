import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getInterviewQuestions, getInterviewSessions, getPopulatedInterviewSession, IGetQuestionsResponse, IInterviewSession, IGetPopulatedInterviewSessionResponse, IQuestion } from '../../services/interview/api';
import { analyzeRequest, analyzeSuccess, analyzeFailure, setInterviewSessions, fetchInterviewSessions, fetchInterviewSession, updateQuestionDataFailure, setLoadingQuestions, setQuestions } from '../slices/interviewSlice';
import { getJobDescription, setJobDescription } from '../slices/jobDescriptionSlice';
import { getResume, setResume } from '../slices/resumeSlice';
import { getInterviewType, getInterviewerPosition, getExtraInformation, setInterviewerPosition, setExtraInformation, setInterviewType } from '../slices/tuneSlice';
import { setFormState } from '../slices/appSlice';
import { setSession } from '../slices/authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { updateQuestion } from '../../services/questions/api';
import { updateQuestionData } from '../slices/interviewSlice';

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
  yield put(setInterviewType(interviewSession.interviewType));
  yield put(setInterviewerPosition(interviewSession.interviewerPosition));
  yield put(setExtraInformation(interviewSession.extraInformation));
  yield put(setJobDescription(interviewSession.jobDescription));
  yield put(setResume(interviewSession.resume));
  yield put(setQuestions(interviewSession.questions));
  yield put(analyzeSuccess(interviewSession));
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
