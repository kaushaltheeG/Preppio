import React from 'react';
import { useAppDispatch } from './useAppDispatch';
import { hasResume } from '../store/slices/resumeSlice';
import { hasJobDescription } from '../store/slices/jobDescriptionSlice';
import { hasRequiredTuneInformation } from '../store/slices/tuneSlice';
import { useAppSelector } from './useAppSelector';
import { analyzeRequest, getIsLoadingQuestions } from '../store/slices/interviewSlice';

const useUserInputHook = () => {
  const dispatch = useAppDispatch();
  const hasResumeEntered = useAppSelector(hasResume);
  const hasJobDescriptionEntered = useAppSelector(hasJobDescription);
  const hasRequiredTuneInfo = useAppSelector(hasRequiredTuneInformation);
  const isGeneratingQuestions = useAppSelector(getIsLoadingQuestions);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const isGenerateButtonDisabled = React.useMemo(() => (
    !hasResumeEntered || !hasJobDescriptionEntered || !hasRequiredTuneInfo
  ), [hasResumeEntered, hasJobDescriptionEntered, hasRequiredTuneInfo]);

  const handleGenerate = React.useCallback(() => {
    dispatch(analyzeRequest());
  }, [dispatch]);

  const handleResumeTab = React.useCallback(() => {
    setSelectedTab(0);
  }, [setSelectedTab]);

  const handleJobDescriptionTab = React.useCallback(() => {
    setSelectedTab(1);
  }, [setSelectedTab]);

  const handleTuneTab = React.useCallback(() => {
    setSelectedTab(2);
  }, [setSelectedTab]);

  return {
    hasResumeEntered,
    hasJobDescriptionEntered,
    hasRequiredTuneInfo,
    isGeneratingQuestions,
    isGenerateButtonDisabled,
    selectedTab,
    setSelectedTab,
    handleGenerate,
    handleResumeTab,
    handleJobDescriptionTab,
    handleTuneTab,
  }
};

export default useUserInputHook;
