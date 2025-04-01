import React from 'react';
import { useAppSelector } from './useAppSelector';
import { getIsMobileView } from '../store/slices/appSlice';
import { useAppDispatch } from './useAppDispatch';
import { setIsMobileView } from '../store/slices/appSlice';

const useViewPortHook = () => {
  const isMobileView = useAppSelector(getIsMobileView);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const checkMobileView = () => {
      dispatch(setIsMobileView(window.innerWidth < 768));
    };

    // Initial check
    checkMobileView();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobileView);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobileView);
  }, [dispatch]);

  return {
    isMobileView,
    isDesktopView: !isMobileView,
  };
};

export default useViewPortHook;
