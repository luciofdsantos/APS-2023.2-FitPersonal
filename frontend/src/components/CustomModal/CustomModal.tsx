import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';

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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
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
}
