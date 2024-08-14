import { Fragment } from 'react';
import { SxProps, Link, Theme, Typography } from '@mui/material';

type CopyrightProps = {
  style?: SxProps<Theme>;
};

export default function Copyright({ style }: CopyrightProps) {
  return (
    <Fragment>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={style}
      >
        {'Copyright © '}
        <Link color="inherit">FitPersonal</Link> {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Fragment>
  );
}
