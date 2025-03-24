import { Accordion, AccordionSummary, Typography, Chip, Box, Tooltip } from '@mui/material';
import { IQuestion } from '../../../services/interview/api';
import React from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setOpenTabs, setFormState } from '../../../store/slices/appSlice';
interface IQuestionProps {
  questionObject: IQuestion;
  id: number;
}

const Question: React.FC<IQuestionProps> = ({ questionObject, id }) => {
  const { question, type, difficulty, topic } = questionObject;
  const dispatch = useAppDispatch();
  
  const handleExpand = React.useCallback(() => {
    dispatch(setOpenTabs(`Question ${id}`));
    dispatch(setFormState(`Question ${id}`));
  }, [dispatch, id])

  return (
    <Tooltip title="Click to expand question" placement="right">
      <Accordion className="rounded-lg border border-gray-200" onClick={handleExpand}>
        <AccordionSummary className="flex gap-2">
          <Typography component="h6" variant="h6" className="pr-4">
            {`${id}. ${question}`}
          </Typography>
          <Box className="flex gap-4">
            <Chip label={type} color="primary" variant="outlined" />
            <Chip label={difficulty} color="secondary" variant="outlined" />
            <Chip label={topic} color="info" variant="outlined" />
          </Box>
        </AccordionSummary>
      </Accordion>
    </Tooltip>
  );
};

export default Question;
