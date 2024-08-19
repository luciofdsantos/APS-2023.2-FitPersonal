import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { TypeButton } from 'src/types';

export default function CustomButton({
  style,
  text,
  href = '#'
}: TypeButton.CustomButtonProps) {
  return (
    <Button variant="contained" component={RouterLink} sx={style} to={href}>
      {text}
    </Button>
  );
}
