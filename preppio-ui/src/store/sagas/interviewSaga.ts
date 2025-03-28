import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getInterviewQuestions, getInterviewSessions, IGetQuestionsResponse, IInterviewSession } from '../../services/interview/api';
import { analyzeRequest, analyzeSuccess, analyzeFailure, setInterviewSessions, fetchInterviewSessions } from '../slices/interviewSlice';
import { getJobDescription } from '../slices/jobDescriptionSlice';
import { getResume } from '../slices/resumeSlice';
import { getInterviewType, getInterviewerPosition, getExtraInformation } from '../slices/tuneSlice';
import { setFormState } from '../slices/appSlice';
import { setSession } from '../slices/authSlice';

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

export function* interviewSaga() {
  yield takeLatest(analyzeRequest.type, analyzeInterviewSaga);
  yield takeLatest(fetchInterviewSessions.type, getInterviewSessionsSaga);
  yield takeLatest(setSession.type, getInterviewSessionsSaga);
}
