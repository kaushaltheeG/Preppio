import React from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button } from '@mui/material';
import Resume from './../Resume';
import JobDescription from '../JobDescription';
import Tune from '../Tune';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { analyzeRequest } from '../../../store/slices/interviewSlice';

const UserInputs: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleGenerate = React.useCallback(() => {
    dispatch(analyzeRequest());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full">
        <Accordion defaultExpanded={true}>
          <AccordionSummary>
            <Typography component="h2" variant="h6">
              Input Resume
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Resume />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary>
            <Typography component="h2" variant="h6">
              Input Job Description
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <JobDescription />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary>
            <Typography component="h2" variant="h6">
              Extra Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Tune />
          </AccordionDetails>
        </Accordion>
      </div>
      <Button variant="contained" className="w-full mt-8" color="primary" onClick={handleGenerate}>Generate</Button>
    </div>
  );
};

export default UserInputs;
