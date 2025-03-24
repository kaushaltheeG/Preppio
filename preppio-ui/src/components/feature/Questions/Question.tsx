import { Accordion, AccordionSummary, Typography, AccordionDetails, AccordionActions, Button, Chip } from '@mui/material';
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
    <Accordion>
      <AccordionSummary>
        <Typography component="h2" variant="h6">
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="flex gap-2">
          <Chip label={type} color="primary" variant="outlined" />
          <Chip label={difficulty} color="secondary" variant="outlined" />
          <Chip label={topic} color="info" variant="outlined" />
      </AccordionDetails>
      <AccordionActions>
        <Button variant="contained" color="primary" onClick={handleExpand}>
          Expand
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default Question;
