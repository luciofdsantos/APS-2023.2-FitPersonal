import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';
import { MouseEventHandler } from 'react';

export namespace TypeButton {
  export type Button = {
    text?: string;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'text' | 'outlined' | 'contained';
    startIcon?: ReactNode;
    backgroundColor?: string;
    iconColor?: string;
    border?: string;
  };

  export type CustomButtonProps = {
    style?: SxProps<Theme>;
    text: string;
    href?: string;
  };

  export type GroupButtonsProps = {
    buttons: Button[];
    onClick?: MouseEventHandler<HTMLButtonElement>;
    style?: SxProps<Theme>;
    boxShadow?: boolean;
  };
}
