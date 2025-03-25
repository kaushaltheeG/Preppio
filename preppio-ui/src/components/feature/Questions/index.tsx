import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getIsLoadingQuestions } from '../../../store/slices/interviewSlice';
import Question from './Question';
import { IQuestion } from '../../../services/interview/api';
interface IQuestionsProps {
  questions: IQuestion[];
}

const Questions: React.FC<IQuestionsProps> = ({ questions }) => {
  const isLoadingQuestions = useAppSelector(getIsLoadingQuestions);

  if (isLoadingQuestions) {
    return <div>Loading...</div>;
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
