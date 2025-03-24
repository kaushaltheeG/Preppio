import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getInterviewQuestions, IGetQuestionsResponse } from '../../services/interview/api';
import { analyzeRequest, analyzeSuccess, analyzeFailure } from '../slices/interviewSlice';
import { getJobDescription } from '../slices/jobDescriptionSlice';
import { getResume } from '../slices/resumeSlice';
import { getInterviewType, getInterviewerPosition, getExtraInformation } from '../slices/tuneSlice';
import { setFormState } from '../slices/appSlice';

function* analyzeInterview() {
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
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(analyzeFailure(errorMessage));
  }
}

export function* interviewSaga() {
  yield takeLatest(analyzeRequest.type, analyzeInterview);
}
