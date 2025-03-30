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
        const expandedQuestionKey = formState.split('Q')[1];
        const expandedQuestion = questions[Number(expandedQuestionKey) - 1];
        if (expandedQuestion) {
          console.log('expandedQuestion', expandedQuestion);
          return <ExpandedQuestion questionObject={expandedQuestion} />;
        }
        if (questions.length !== 0) {
          return <Questions questions={questions} />;
        }
        return <UserInputs />;
    }
  }, [formState, questions, googleDocUrl]);

  return (
    <div className={`flex ${formState === 'iframe' ? 'flex-row' : 'flex-col'} h-full`}>
      <Box sx={{ 
        borderLeft: formState === 'iframe' ? 1 : 0,
        borderBottom: formState !== 'iframe' ? 1 : 0,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: formState === 'iframe' ? 'column' : 'row',
        height: formState === 'iframe' ? '100%' : 'auto',
        width: formState === 'iframe' ? 'auto' : '100%'
      }}
      className={`${formState === 'iframe' ? 'order-2' : ''}`}
      >
        <Tabs 
          formState={formState} 
          hasQuestions={Boolean(questions.length)} 
          orientation={formState === 'iframe' ? 'vertical' : 'horizontal'}
        />
      </Box>
      <div className={`${formState === 'iframe' ? 'flex-1, order-1, w-full' : 'h-full'}`}>
        {renderControlComponent()}
      </div>
    </div>
  );
};

export default Control;
