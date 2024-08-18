import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

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
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

  export type CustomButtonProps = {
    style?: SxProps<Theme>;
    text: string;
    href?: string;
  };

  export type GroupButtonsProps = {
    buttons: Button[];
    style?: SxProps<Theme>;
    boxShadow?: boolean;
  };
}
