import React from "react";
import Input from "../../ui/Input";
import TextBox from "../../ui/TextBox";

const Tune: React.FC = () => {
  const [extraInformation, setExtraInformation] = React.useState('');
  const [interviewType, setInterviewType] = React.useState('');
  const [interviewerPosition, setInterviewerPosition] = React.useState('');
  return (
    <div className="flex flex-col gap-2">
      {/* interview type | interviewer's position */}
      <div className="flex flex-row gap-2">
        <Input placeholder="Type of Interview" value={interviewType} onChange={setInterviewType} />
        <Input placeholder="Interviewer's Position" value={interviewerPosition} onChange={setInterviewerPosition} />
      </div>
      {/* extra information */}
      <TextBox placeholder="Extra Information" value={extraInformation} onChange={setExtraInformation} />
    </div>
  );
};

export default Tune;
