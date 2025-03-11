import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getQuestions, getIsLoadingQuestions } from '../../../store/slices/interviewSlice';
import Question from './Question';

const Questions: React.FC = () => {
  const questions = useAppSelector(getQuestions);
  const isLoadingQuestions = useAppSelector(getIsLoadingQuestions);

  if (isLoadingQuestions) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-4'>
      {questions.map((questionObject, index) => (
        <Question key={index} questionObject={questionObject} />
      ))}
    </div>
  );
}

export default Questions;
