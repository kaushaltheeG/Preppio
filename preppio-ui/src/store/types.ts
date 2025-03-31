import { AppState } from './slices/appSlice';
import { AuthState } from './slices/authSlice';
import { GoogleDriveState } from './slices/googleDriveSlice';
// import { JobDescriptionState } from './slices/jobDescriptionSlice';
import { IInterviewState } from './slices/interviewSlice';
// import { ResumeState } from './slices/resumeSlice';
// import { TuneState } from './slices/tuneSlice';

export interface RootState {
  app: AppState;
  auth: AuthState;
  googleDrive: GoogleDriveState;
  // jobDescription: JobDescriptionState;
  interview: IInterviewState;
  // resume: ResumeState;
  // tune: TuneState;
} 