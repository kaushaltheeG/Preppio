import React from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { analyzeRequest, getIsLoadingQuestions, getInputResume, getInputJobDescription, hasRequiredInterviewInformation, getQuestions } from '../store/slices/interviewSlice';
import { setFormState } from '../store/slices/appSlice';

const useUserInputHook = () => {
  const dispatch = useAppDispatch();
  const hasResumeEntered = Boolean(useAppSelector(getInputResume));
  const hasJobDescriptionEntered = Boolean(useAppSelector(getInputJobDescription));
  const hasRequiredTuneInfo = useAppSelector(hasRequiredInterviewInformation);
  const isGeneratingQuestions = useAppSelector(getIsLoadingQuestions);
  const questions = useAppSelector(getQuestions);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const isGenerateButtonDisabled = React.useMemo(() => (
    !hasResumeEntered || !hasJobDescriptionEntered || !hasRequiredTuneInfo || questions.length > 0
  ), [hasResumeEntered, hasJobDescriptionEntered, hasRequiredTuneInfo, questions]);

  const handleGenerate = React.useCallback(() => {
    dispatch(setFormState('questions'));
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
