import React from "react";
import Input from "../../ui/Input";
import TextBox from "../../ui/TextBox";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { setInterviewType, setInterviewerPosition, setExtraInformation } from "../../../store/slices/tuneSlice";

const Tune: React.FC = () => {
  const dispatch = useAppDispatch();
  const { interviewType, interviewerPosition, extraInformation } = useAppSelector((state) => state.tune);

  const handleInterviewTypeChange = React.useCallback((value: string | React.ChangeEvent<HTMLInputElement>) => {
    const newValue = typeof value === 'string' ? value : value.target.value;
    dispatch(setInterviewType(newValue));
  }, [dispatch]);

  const handleInterviewerPositionChange = React.useCallback((value: string | React.ChangeEvent<HTMLInputElement>) => {
    const newValue = typeof value === 'string' ? value : value.target.value;
    dispatch(setInterviewerPosition(newValue));
  }, [dispatch]);

  const handleExtraInformationChange = React.useCallback((value: string | React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = typeof value === 'string' ? value : value.target.value;
    dispatch(setExtraInformation(newValue));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input placeholder="Type of Interview" value={interviewType} onChange={handleInterviewTypeChange} />
        <Input placeholder="Interviewer's Position" value={interviewerPosition} onChange={handleInterviewerPositionChange} />
      </div>
      <TextBox placeholder="Extra Information" value={extraInformation} onChange={handleExtraInformationChange} />
    </div>
  );
};

export default Tune;
