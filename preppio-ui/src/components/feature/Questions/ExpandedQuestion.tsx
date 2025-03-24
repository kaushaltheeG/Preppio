import React from 'react';
import { Box, Paper, Typography, Chip, List, ListItem, ListItemText, Card, CardContent, Stack, TextField } from '@mui/material';
import { IQuestion } from '@/services/interview/api';

interface IExpandedQuestionProps {
  questionObject: IQuestion;
}

const ExpandedQuestion: React.FC<IExpandedQuestionProps> = ({ questionObject }) => {
  const { followUp, notes, question, type, difficulty, topic, relevance, skillsAssessed, keyPoints } = questionObject;
  const [localNotes, setLocalNotes] = React.useState(notes);

  const renderFollowUpQuestions = React.useCallback(() => {
    return(
      <CardContent>
        <Typography variant="h6" color="primary">
          Follow-up Questions
        </Typography>
        <List>
          {followUp.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${index + 1}. ${item}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    );
  }, [followUp]);

  const renderNotesSection = React.useCallback(() => {
    return(
      <CardContent className="h-full">
        <Typography variant="h6" color="primary">
          Your Notes
        </Typography>
        <TextField
          multiline
          rows={8}
          fullWidth
          variant="outlined"  
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          className="h-full"
        />
      </CardContent>
    );
  }, [localNotes, setLocalNotes]);

  const renderRelevanceSection = React.useCallback(() => {
    return(
      <CardContent>
        <Typography variant="h6" color="primary">
          Relevance
        </Typography>
        <Typography variant="body1">
          {relevance}
        </Typography>
      </CardContent>
    );
  }, [relevance]);

  const renderSkillsAssessedSection = React.useCallback(() => {
    return(
      <CardContent>
        <Typography variant="h6" color="primary">
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
        <Typography variant="h6" color="primary">
          Key Points
        </Typography>
        <List>
          {keyPoints.map((point, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${point}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    );
  }, [keyPoints]);

  return (
    <Box className="p-6 h-full">
      {/* Main Question Section */}
      <Paper elevation={1} className="p-6 mb-6 bg-blue-50">
        <Typography variant="h5">
          {question}
        </Typography>
        <Box className="flex gap-2 mt-2">
          <Chip label={type} color="primary" variant="outlined" />
          <Chip label={difficulty} color="secondary" variant="outlined" />
          <Chip label={topic} color="info" variant="outlined" />
        </Box>
      </Paper>

      <Stack direction="row" spacing={3} className="h-full">
        {/* Left Column */}
        <Stack spacing={2} sx={{ flex: 2 }}>
          <Card>
            {renderFollowUpQuestions()}
          </Card>
          <Card className="h-full pb-8">
            {renderNotesSection()}
          </Card>
        </Stack>

        {/* Right Column */}
        <Stack spacing={2} sx={{ flex: 1 }}>
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
