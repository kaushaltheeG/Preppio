import React from 'react';
import { Box, Paper, Typography, Chip, List, ListItem, ListItemText, Card, CardContent, Stack, TextField } from '@mui/material';
import { IQuestion } from '@/services/interview/api';

interface IExpandedQuestionProps {
  question: IQuestion;
}

const ExpandedQuestion: React.FC<IExpandedQuestionProps> = ({ question }) => {

  return (
    <Box className="p-6 h-full overflow-y-auto">
      {/* Main Question Section */}
      <Paper elevation={1} className="p-6 mb-6 bg-blue-50">
        <Typography variant="h5" gutterBottom>
          {question.question}
        </Typography>
        <Box className="flex gap-2 mt-2">
          <Chip label={question.type} color="primary" variant="outlined" />
          <Chip label={question.difficulty} color="secondary" variant="outlined" />
          <Chip label={question.topic} color="info" variant="outlined" />
        </Box>
      </Paper>

      <Stack direction="row" spacing={3}>
        {/* Left Column */}
        <Stack spacing={2} sx={{ flex: 2 }}>
          {/* Relevance Section */}
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Relevance
              </Typography>
              <Typography variant="body1">
                {question.relevance}
              </Typography>
            </CardContent>
          </Card>

          {/* Follow-up Questions */}
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Follow-up Questions
              </Typography>
              <List>
                {question.followUp.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${index + 1}. ${item}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Key Points */}
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Key Points
              </Typography>
              <List>
                {question.keyPoints.map((point, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`• ${point}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Stack>

        {/* Right Column */}
        <Stack spacing={2} sx={{ flex: 1 }}>
          {/* Skills Section */}
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Skills Assessed
              </Typography>
              <Box className="flex flex-wrap gap-1">
                {question.skillsAssessed.map((skill) => (
                  <Chip 
                    key={skill} 
                    label={skill} 
                    size="small"
                    className="m-1"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Your Notes
              </Typography>
              <TextField
                multiline
                rows={8}
                fullWidth
                variant="outlined"
                placeholder="Add your notes here..."
                // value={notes}
                // onChange={(e) => setNotes(e.target.value)}
                className="mt-2"
              />
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ExpandedQuestion;
