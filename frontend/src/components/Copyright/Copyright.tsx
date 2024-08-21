import { Fragment } from 'react';
import { Link, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material';

export type Copyright = {
  style?: SxProps<Theme>;
};

export default function Copyright({ style }: Copyright) {
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
