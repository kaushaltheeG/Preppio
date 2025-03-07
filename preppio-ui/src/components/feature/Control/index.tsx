import React from "react";
import Button from "../../ui/Button";
import { setFormState } from "../../../store/slices/appSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
const Control: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleResumeClick = () => {
    dispatch(setFormState('resume'));
  };

  const handleJobClick = () => {
    dispatch(setFormState('jobDescription'));
  };

  const handleGenerateClick = () => {
    dispatch(setFormState('questions'));
  };

  return (
    <div className="flex flex-col gap-2">
      <Button key={1} variant="primary" size="md" onClick={handleResumeClick}>Resume</Button>
      <Button key={2} variant="primary" size="md" onClick={handleJobClick}>Job</Button>
      <Button key={3} variant="primary" size="md" onClick={handleGenerateClick}>Generate</Button>
    </div>
  );
};

export default Control;
