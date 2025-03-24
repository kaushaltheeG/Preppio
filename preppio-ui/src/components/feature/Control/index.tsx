import React from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getFormState } from "../../../store/slices/appSlice";
import { Box } from '@mui/material';
import UserInputs from "./UserInputs";
import Questions from "../Questions";
import Tabs from "./Tabs";
import ExpandedQuestion from "../Questions/ExpandedQuestion";
import { getQuestions } from "../../../store/slices/interviewSlice";

const Control: React.FC = () => {
  const formState = useAppSelector(getFormState);
  const questions = useAppSelector(getQuestions);

  const renderControlComponent = React.useCallback(() => {
    switch (formState) {
      case 'userInputs':
        return <UserInputs />;
      case 'questions':
        return <Questions />;
      default:
        // [TODO] - improve this logic
        const expandedQuestionKey = formState.split('Question')[1];
        const expandedQuestion = questions[Number(expandedQuestionKey) - 1];
        if (expandedQuestion) {
          return <ExpandedQuestion question={expandedQuestion} />;
        }
        if (!questions.length) {
          return <Questions />;
        }
        return <UserInputs />;
    }
  }, [formState, questions]);

  return (
    <div className="flex flex-col h-full">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs formState={formState} />
      </Box>
      {renderControlComponent()}
    </div>
  );
};

export default Control;
