import { SxProps, Theme } from '@mui/material';
import { TypeButton } from './TypeButton';

export namespace TypeCard {
  export type CustomCardProps = {
    title: string;
    items: {
      label: string;
      value: React.ReactNode;
    }[];
    style?: SxProps<Theme>;
    buttons?: TypeButton.Button[];
  };
}
