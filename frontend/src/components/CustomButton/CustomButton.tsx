import { SxProps, Button, Theme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type CustomButtonProps = {
  style?: SxProps<Theme>;
  text: string;
  href?: string;
};

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
