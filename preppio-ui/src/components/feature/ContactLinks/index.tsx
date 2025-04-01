import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EmailIcon from '@mui/icons-material/Email';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const ContactLinks: React.FC = () => {
  return (
    <>
      <Tooltip title="Owner's LinkedIn" placement="right">
        <IconButton onClick={() => window.open('https://www.linkedin.com/in/kaushalsk/', '_blank')}>
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Report Issue" placement="right">
        <IconButton onClick={() => window.open('https://github.com/kaushaltheeG/Preppio/issues', '_blank')}>
          <ReportProblemIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Contact Us" placement="right">
        <IconButton onClick={() => window.open('mailto:kaushalsk09@gmail.com?subject=Preppio%20-%20Feedback%20or%20Issue', '_blank')}>
          <EmailIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default ContactLinks;
