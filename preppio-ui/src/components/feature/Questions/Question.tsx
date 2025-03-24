import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import { IQuestion } from '../../../services/interview/api';
import React from 'react';

interface IQuestionProps {
  questionObject: IQuestion;
}

const Question: React.FC<IQuestionProps> = ({ questionObject }) => {
  const { question } = questionObject;
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
          {`Difficulty: ${questionObject.difficulty}`}
        </Typography>
        <Typography component="p" variant="body1">
          {`Relevance: ${questionObject.relevance}`}
        </Typography>
        <Typography component="p" variant="body1">
          {`Follow-up: ${questionObject.followUp.join(', ')}`}
        </Typography>
        <Typography component="p" variant="body1">
          {`Key Points: ${questionObject.keyPoints.join(', ')}`}
        </Typography>
        <Typography component="p" variant="body1">
          {`Skills Assessed: ${questionObject.skillsAssessed.join(', ')}`}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Question;
