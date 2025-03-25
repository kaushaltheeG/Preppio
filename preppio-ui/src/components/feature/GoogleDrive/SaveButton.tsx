import { Tooltip } from '@mui/material';
import React from 'react';
import IconButton from '@mui/material/IconButton';  
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

interface SaveButtonProps {
  onClick: () => void;
  fontSize?: 'small' | 'medium' | 'large';
  tooltipTitle?: string;
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left';
}

const SaveButton: React.FC<SaveButtonProps> = ({
  onClick,
  fontSize = 'medium',
  tooltipTitle = 'Save to your Google Drive',
  tooltipPlacement = 'right'
}) => {

  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
        <IconButton size={fontSize} onClick={onClick}>
          <DriveFileMoveIcon fontSize={fontSize} />
        </IconButton>
      </Tooltip>
  );
};

export default SaveButton;
