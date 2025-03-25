import React from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getFormState } from "../../../store/slices/appSlice";
import { Box } from '@mui/material';
import UserInputs from "./UserInputs";
import Questions from "../Questions";
import Tabs from "./Tabs";
import ExpandedQuestion from "../Questions/ExpandedQuestion";
import { getQuestions } from "../../../store/slices/interviewSlice";
import { getGoogleDocUrl } from "../../../store/slices/googleDriveSlice";
import EmbeddedView from "../GoogleDrive/EmbeddedView";

const Control: React.FC = () => {
  const formState = useAppSelector(getFormState);
  const questions = useAppSelector(getQuestions);
  const googleDocUrl = useAppSelector(getGoogleDocUrl);

  const renderControlComponent = React.useCallback(() => {
    switch (formState) {
      case 'userInputs':
        return <UserInputs />;
      case 'questions':
        return <Questions questions={questions} />;
      case 'iframe':
        return <EmbeddedView url={googleDocUrl} />;
      default:
        // [TODO] - improve this logic
        const expandedQuestionKey = formState.split('Question')[1];
        const expandedQuestion = questions[Number(expandedQuestionKey) - 1];
        if (expandedQuestion) {
          return <ExpandedQuestion questionObject={expandedQuestion} />;
        }
        if (questions.length !== 0) {
          return <Questions questions={questions} />;
        }
        return <UserInputs />;
    }
  }, [formState, questions, googleDocUrl]);

  return (
    <div className="flex flex-col h-full">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs formState={formState} hasQuestions={Boolean(questions.length)} />
      </Box>
      {renderControlComponent()}
    </div>
  );
};

export default Control;
