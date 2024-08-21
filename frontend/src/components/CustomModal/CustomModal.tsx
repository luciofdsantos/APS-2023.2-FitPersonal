import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, TextField, Grid } from '@mui/material';
import React from 'react';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave?: () => void; // Função opcional para salvar os dados
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, title, children, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        {onSave && (
          <Button onClick={onSave} color="primary">
            Salvar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;

