import React from 'react';
import IconButton from '@mui/material/IconButton';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Tooltip from '@mui/material/Tooltip';

interface OpenFileButtonProps {
  url: string;
  fontSize?: 'small' | 'medium' | 'large';
  tooltipTitle?: string;
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left';
}

const OpenFileButton: React.FC<OpenFileButtonProps> = ({ url, fontSize = 'medium', tooltipTitle = 'Open File', tooltipPlacement = 'right' }) => {
  const handleClick = React.useCallback(() => {
    window.open(url, '_blank');
  }, [url]);

  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
      <IconButton size={fontSize} onClick={handleClick}>
        <FileOpenIcon fontSize={fontSize} />
      </IconButton>
    </Tooltip>
  );
};

export default OpenFileButton;
