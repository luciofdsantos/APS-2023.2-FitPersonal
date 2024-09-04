import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import React from 'react';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
}

export default function CustomModal({
  open,
  onClose,
  title,
  children,
  onSave
}: CustomModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title.toUpperCase()}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" sx={{ color: '#fff' }}>
          Cancelar
        </Button>
        {onSave && (
          <Button onClick={onSave} variant="contained">
            Salvar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
