import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getIsLoadingQuestions, getInputError, setSessionInputsError } from '../../../store/slices/interviewSlice';
import Question from './Question';
import { IQuestion } from '../../../services/interview/api';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setFormState } from '../../../store/slices/appSlice';
import LoadingQuestion from './LoadingQuestion';
import ErrorMessage from '../../ui/ErrorMessageCard';
import { Button } from '@mui/material';

interface IQuestionsProps {
  questions: IQuestion[];
}

const Questions: React.FC<IQuestionsProps> = ({ questions }) => {
  const isLoadingQuestions = useAppSelector(getIsLoadingQuestions);
  const generateQuestionError = useAppSelector(getInputError);
  const dispatch = useAppDispatch();

  const onGetPotentialQuestions = React.useCallback(() => {
    dispatch(setFormState('userInputs'));
  }, [dispatch]);

  const onTryAgain = React.useCallback(() => {
    dispatch(setSessionInputsError(''));
    dispatch(setFormState('userInputs'));
  }, [dispatch]);

  if (isLoadingQuestions) {
    return (
      <div className="flex flex-col gap-2 pt-2">
        {[...Array(10)].map((_, index) => (
          <LoadingQuestion key={index} />
        ))}
      </div>
    );
  }

  if (generateQuestionError) {
    return (
      <ErrorMessage
        title="Error Generating Questions"
        message={generateQuestionError}
      >
        <Button
          onClick={onTryAgain}
          variant="outlined"
          color="primary"
          sx={{ 
            px: 3,
            py: 1,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              variant: 'contained',
              color: 'primary',
            }
          }}
        >
          Try Again
        </Button>
      </ErrorMessage>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col pt-8 items-center h-full gap-4">
        <Button
          onClick={onGetPotentialQuestions}
          variant="outlined"
          color="primary"
          sx={{ 
            px: 3,
            py: 1,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2
            }
          }}
        >
          Generate Potential Questions
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 pt-2'>
      {questions.map((questionObject, index) => (
        <Question key={index} questionObject={questionObject} id={index + 1} />
      ))}
    </div>
  );
}

export default Questions;
