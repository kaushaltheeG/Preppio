import React from 'react';
import { Avatar, Button, Popover } from '@mui/material';
import { User } from '@supabase/supabase-js';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { logoutUser } from '../../../store/slices/authSlice';


interface UserProfileProps {
  loggedInUser: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ loggedInUser }) => {
  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleLogout = React.useCallback(() => {
    dispatch(logoutUser());
    setOpen(false);
  }, [dispatch]);

  const handlePopoverToggle = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  
  return (
    <div>
      <Avatar src={loggedInUser?.user_metadata.avatar_url} onClick={handlePopoverToggle} ref={anchorEl}/>
      <Popover
        open={open}
        onClose={handlePopoverToggle}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className="flex flex-col gap-2 p-2">
          <Button variant="outlined" onClick={handlePopoverToggle}>Cancel</Button>
          <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
      </Popover>
    </div>
  );
};

export default UserProfile;