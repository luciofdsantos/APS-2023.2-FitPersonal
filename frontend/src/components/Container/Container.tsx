import React from 'react';
import { Paper, PaperProps } from '@mui/material';

interface ContainerProps extends PaperProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '24px',
        margin: '16px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default Container;
