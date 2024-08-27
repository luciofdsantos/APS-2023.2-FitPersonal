import React, { createContext, useState, useContext, ReactNode } from 'react';
import {
  Snackbar,
  Alert as MuiAlert,
  SnackbarCloseReason
} from '@mui/material';

interface CustomAlertProps {
  showAlert: (
    type: 'success' | 'error' | 'warning' | 'info',
    message: string
  ) => void;
}

const CustomAlertContext = createContext<CustomAlertProps | undefined>(
  undefined
);

interface AlertProviderProps {
  children: ReactNode;
}

export default function AlertProvider({ children }: AlertProviderProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>(
    'success'
  );
  const [message, setMessage] = useState('');

  const handleClose = (
    event?: Event | React.SyntheticEvent,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const showAlert = (
    type: 'success' | 'error' | 'warning' | 'info',
    message: string
  ) => {
    setType(type);
    setMessage(message);
    setOpen(true);
  };

  return (
    <CustomAlertContext.Provider value={{ showAlert }}>
      {children}
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          sx={{ mt: 5 }}
        >
          <MuiAlert
            onClose={handleClose}
            severity={type}
            elevation={6}
            variant="filled"
          >
            {message}
          </MuiAlert>
        </Snackbar>
      </div>
    </CustomAlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(CustomAlertContext);
  if (!context) {
    throw new Error('Erro ao usar o Alert');
  }
  return context;
}
