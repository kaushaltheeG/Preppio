import { IQuestion } from '@/services/interview/api';
import React from 'react';

interface IQuestionProps {
  questionObject: IQuestion;
}

const Question: React.FC<IQuestionProps> = ({ questionObject }) => {
  const { question } = questionObject;
  return (
    <div>
      <h1>{question}</h1>
    </div>
  );
};

export default Question;
