import { Accordion, AccordionSummary, Typography, AccordionDetails, AccordionActions, Button } from '@mui/material';
import { IQuestion } from '../../../services/interview/api';
import React from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setOpenTabs } from '../../../store/slices/appSlice';
interface IQuestionProps {
  questionObject: IQuestion;
  id: number;
}

const Question: React.FC<IQuestionProps> = ({ questionObject, id }) => {
  const { question, } = questionObject;
  const dispatch = useAppDispatch();
  
  const handleExpand = React.useCallback(() => {
    dispatch(setOpenTabs(`Question ${id}`));
  }, [dispatch, id])

  return (
    <Accordion>
      <AccordionSummary>
        <Typography component="h2" variant="h6">
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component="p" variant="body1">
          {`Topic: ${questionObject.topic}`}
        </Typography>
        <Typography component="p" variant="body1">
          {`Relevance: ${questionObject.relevance}`}
        </Typography>
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
