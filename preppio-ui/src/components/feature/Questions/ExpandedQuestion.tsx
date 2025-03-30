import React from 'react';
import { Box, Paper, Typography, Chip, Card, CardContent, Stack, TextField, Button, CircularProgress } from '@mui/material';
import { IQuestion } from '../../../services/interview/api';
import QuestionChips from './QuestionChips';
import { getIsLoadingQuestions, updateQuestionData } from '../../../store/slices/interviewSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';

interface IExpandedQuestionProps {
  questionObject: IQuestion;
}

const ExpandedQuestion: React.FC<IExpandedQuestionProps> = ({ questionObject }) => {
  const { followUp, notes, question, type, difficulty, topic, relevance, skillsAssessed, keyPoints } = questionObject;
  const [localNotes, setLocalNotes] = React.useState(notes || '');
  
  // Update local notes when prop changes
  React.useEffect(() => {
    setLocalNotes(notes || '');
  }, [notes]);

  const dispatch = useAppDispatch();
  const isSavingNotes = useAppSelector(getIsLoadingQuestions);

  const handleAddToNotes = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalNotes(e.target.value);
  }, []);

  const handleSaveNotes = React.useCallback(() => {
    if (localNotes.trim() === (notes || '').trim()) return;
    
    dispatch(updateQuestionData({ 
      question: { 
        ...questionObject, 
        notes: localNotes.trim() 
      } 
    }));
  }, [dispatch, questionObject, localNotes, notes]);

  const hasNotesChanged = React.useMemo(() => {
    return localNotes.trim() !== (notes || '').trim();
  }, [localNotes, notes]);

  const renderFollowUpQuestions = React.useCallback(() => {
    return(
      <CardContent>
        <Typography component="span" color="primary">
          Follow-up Questions
        </Typography>
          {followUp.map((item, index) => (
            <div key={index} className='flex flex-row gap-2'>
              <span>{index + 1}.</span>
              <span>{item}</span>
            </div>
          ))}
      </CardContent>
    );
  }, [followUp]);

  const renderNotesSection = React.useCallback(() => {
    return(
      <CardContent className='flex flex-col gap-2'>
        <Typography component="span" color="primary">
          Notes
        </Typography>
        <TextField
          multiline
          rows={8}
          fullWidth
          variant="outlined"  
          value={localNotes}
          onChange={handleAddToNotes}
          placeholder="Add your notes here..."
        />
        <div className='flex flex-row justify-end gap-2'>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveNotes}
            disabled={!hasNotesChanged || isSavingNotes}
            sx={{ width: '120px' }}
          >
            <Box className="flex items-center justify-center gap-2 w-full">
              {isSavingNotes ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span>Saving...</span>
                </>
              ) : (
                'Save'
              )}
            </Box>
          </Button>
        </div>
      </CardContent>
    );
  }, [localNotes, handleAddToNotes, handleSaveNotes, hasNotesChanged, isSavingNotes]);

  const renderRelevanceSection = React.useCallback(() => {
    return(
      <CardContent>
        <Typography component="span" color="primary">
          Relevance
        </Typography>
        <Typography>
          {relevance}
        </Typography>
      </CardContent>
    );
  }, [relevance]);

  const renderSkillsAssessedSection = React.useCallback(() => {
    return(
      <CardContent>
        <Typography component="span" color="primary">
          Skills Assessed
        </Typography>
        <Box className="flex flex-wrap gap-1">
          {skillsAssessed.map((skill) => (
            <Chip 
              key={skill} 
              label={skill} 
              size="small"
              className="m-1"
            />
          ))}
        </Box>
      </CardContent>
    );
  }, [skillsAssessed]);

  const renderKeyPointsSection = React.useCallback(() => {
    return(
      <CardContent>
        <Typography component="span" color="primary">
          Key Points
        </Typography>
        {keyPoints.map((point, index) => (
          <div key={index} className='flex flex-row gap-2'>
            <span>•</span>
            <span>{point}</span>
          </div>
        ))}
      </CardContent>
    );
  }, [keyPoints]);

  return (
    <Box className="pt-2">
      {/* Main Question Section */}
      <Paper elevation={1} className="p-6 mb-6 bg-blue-50">
        <Typography variant="h6">
          {question}
        </Typography>
        <QuestionChips
          type={type}
          difficulty={difficulty}
          topic={topic}
          className="flex gap-2 mt-2"
        />
      </Paper>

      <Stack direction="row" spacing={3}>
        {/* Left Column */}
        <Stack spacing={2} sx={{ flex: 2 }}>
          <Card>
            {renderFollowUpQuestions()}
          </Card>
          <Card>
            {renderNotesSection()}
          </Card>
        </Stack>

        {/* Right Column */}
        <Stack spacing={2} sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Card className="mb-4">
            {renderRelevanceSection()}
          </Card>
          <Card className="mb-4">
            {renderSkillsAssessedSection()}
          </Card>
          <Card className="mb-4">
            {renderKeyPointsSection()}
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ExpandedQuestion;
