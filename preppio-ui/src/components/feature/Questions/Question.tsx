import { Tooltip } from '@mui/material';
import { IQuestion } from '../../../services/interview/api';
import React from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setOpenTabs, setFormState } from '../../../store/slices/appSlice';
import QuestionChips from './QuestionChips';

interface IQuestionProps {
  questionObject: IQuestion;
  id: number;
}

const Question: React.FC<IQuestionProps> = ({ questionObject, id }) => {
  const { question, type, difficulty, topic } = questionObject;

  const dispatch = useAppDispatch();
  
  const handleExpand = React.useCallback(() => {
    dispatch(setOpenTabs(`Q${id}`));
    dispatch(setFormState(`Q${id}`));
  }, [dispatch, id])

  return (
    <Tooltip title="Click to expand question" placement="bottom">
      <div className="
        flex
        gap-4
        items-center
        justify-between
        bg-white
        border
        border-gray-200
        shadow-sm p-2 rounded-md
        cursor-pointer
        hover:bg-gray-50
        transition-colors duration-200"
        onClick={handleExpand}
      >
        <span className='flex items-center justify-center min-w-[40px] text-xl font-semibold'>{id}.</span>
        <div className="flex-grow flex-start justify-center">
          {question}
        </div>
        <QuestionChips
          type={type}
          difficulty={difficulty}
          topic={topic}
          className="flex items-center justify-center pl-2 gap-2 ml-auto"
        />
      </div>
    </Tooltip>
  );
};

export default Question;
