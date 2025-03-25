import React from 'react';
import { Box, Chip } from '@mui/material';

interface QuestionChipsProps {
  type: string;
  difficulty: string;
  topic: string;
  className?: string;
}

const QuestionChips: React.FC<QuestionChipsProps> = ({ type, difficulty, topic, className }) => {
  const typeLabel = React.useMemo(() => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }, [type]);

  const difficultyLabel = React.useMemo(() => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  }, [difficulty]);

  const topicLabel = React.useMemo(() => {
    return topic.charAt(0).toUpperCase() + topic.slice(1);
  }, [topic]);

  return (
    <Box className={className}>
      <Chip label={typeLabel} color="primary" variant="outlined" />
      <Chip label={difficultyLabel} color="secondary" variant="outlined" />
      <Chip label={topicLabel} color="info" variant="outlined" />
    </Box>
  );
};

export default QuestionChips;
