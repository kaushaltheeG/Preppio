-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Interview Sessions table
CREATE TABLE interview_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  company TEXT NOT NULL,
  job_title TEXT NOT NULL,
  interview_type TEXT NOT NULL,
  interviewer_position TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  type TEXT NOT NULL,
  difficulty TEXT,
  question TEXT NOT NULL,
  notes TEXT,
  skills TEXT[],  -- Array of skills
  follow_up_questions TEXT[],  -- Array of follow-up questions
  interview_session_id UUID NOT NULL REFERENCES interview_sessions(id) ,
  key_points TEXT[],  -- Array of key points
  skills_assessed TEXT[],  -- Array of assessed skills
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Analysis table
CREATE TABLE analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  interview_session_id UUID NOT NULL REFERENCES interview_sessions(id),
  strength_areas TEXT[],  -- Array of strength areas
  gap_areas TEXT[],      -- Array of gap areas
  recommended_focus TEXT[],  -- Array of recommended focus areas
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Google Drive table
CREATE TABLE google_drive (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  interview_session_id UUID NOT NULL REFERENCES interview_sessions(id),
  service TEXT NOT NULL,  -- drive, sheets, etc.
  document_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Add indexes for better query performance
CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_questions_interview_session_id ON questions(interview_session_id);
CREATE INDEX idx_interview_sessions_user_id ON interview_sessions(user_id);
CREATE INDEX idx_analysis_interview_session_id ON analysis(interview_session_id);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update the updated_at column
CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON questions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interview_sessions_updated_at
  BEFORE UPDATE ON interview_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analysis_updated_at
  BEFORE UPDATE ON analysis
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
