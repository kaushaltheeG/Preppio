import React from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getFormState } from "../../../store/slices/appSlice";
import { Box } from '@mui/material';
import UserInputs from "./UserInputs";
import Questions from "../Questions";
import Tabs from "./Tabs";


const Control: React.FC = () => {
  const formState = useAppSelector(getFormState);

  const renderControlComponent = React.useCallback(() => {
    switch (formState) {
      case 'userInputs':
        return <UserInputs />;
      case 'questions':
        return <Questions />;
      default:
        return null;
    }
  }, [formState]);

  return (
    <div className="flex flex-col h-full">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs formState={formState} />
      </Box>
      {renderControlComponent()}
    </div>
  );
};

export default Control;
