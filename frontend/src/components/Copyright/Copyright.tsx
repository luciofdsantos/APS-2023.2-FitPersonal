import { Fragment } from 'react';
import { Link, Typography } from '@mui/material';
import { TypeCopyright } from 'src/types';

export default function Copyright({ style }: TypeCopyright.Copyright) {
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
