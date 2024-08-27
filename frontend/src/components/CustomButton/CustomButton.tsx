import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { SxProps, Theme } from '@mui/material';

interface CustomButtonProps {
  style?: SxProps<Theme>;
  text: string;
  href?: string;
}

export default function CustomButton({
  style,
  text,
  href = '#'
}: CustomButtonProps) {
  return (
    <Button variant="contained" component={RouterLink} sx={style} to={href}>
      {text}
    </Button>
  );
}
