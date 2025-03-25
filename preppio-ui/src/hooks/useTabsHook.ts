import React from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { getOpenTabsArray, setFormState, closeOpenTab, FormState } from '../store/slices/appSlice';

const useTabsHook = (formState: FormState) => {
  const dispatch = useAppDispatch();
  const openTabs = useAppSelector(getOpenTabsArray);

  const tabStyle = React.useMemo(() => ({
    minHeight: '32px',
    height: '32px',
    padding: '6px 16px',
    justifyContent: 'center',
    '&.Mui-selected': {
      backgroundColor: '#e8f0fe',
      color: '#1a73e8',
      borderRadius: '4px 4px 0 0',
      '& .MuiTab-wrapper': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    '&:hover': {
      backgroundColor: '#f1f3f4',
      borderRadius: '4px 4px 0 0'
    },
    '& .MuiTab-wrapper': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }), []);

  

  const onQuestionsFormState = React.useMemo(() => formState === 'questions', [formState]);
  const onIframeFormState = React.useMemo(() => formState === 'iframe', [formState]);

  const handleTabChange = React.useCallback((_event: React.SyntheticEvent, newValue: FormState) => {
    dispatch(setFormState(newValue));
  }, [dispatch]);

  const hanldeCloseTab = React.useCallback((id: string) => {
    dispatch(closeOpenTab(id));
    dispatch(setFormState('questions'));
  }, [dispatch]);

  return {
    tabStyle,
    openTabs,
    dispatch,
    onQuestionsFormState,
    onIframeFormState,
    handleTabChange,
    hanldeCloseTab,
    formState,
  }
}

export default useTabsHook;
