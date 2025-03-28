CREATE TABLE interview_session_inputs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  interview_session_id UUID NOT NULL REFERENCES interview_sessions(id),
  resume TEXT NOT NULL,
  job_description TEXT NOT NULL,
  interview_type TEXT NOT NULL,
  interviewer_position TEXT NOT NULL,
  extra_information TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TRIGGER update_interview_session_inputs_updated_at
  BEFORE UPDATE ON interview_session_inputs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
