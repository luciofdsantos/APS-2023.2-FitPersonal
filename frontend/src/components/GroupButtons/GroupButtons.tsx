import { ReactNode, MouseEventHandler } from 'react';
import { Button, SxProps, Theme, Box } from '@mui/material';

type GroupButtonsProps = {
  buttons: {
    text?: string;
    href?: string;
    variant?: 'text' | 'outlined' | 'contained';
    startIcon?: ReactNode;
    backgroundColor?: string;
    iconColor?: string;
  }[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: SxProps<Theme>;
};

export default function GroupButtons({
  buttons,
  style,
  onClick
}: GroupButtonsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        ...style
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          pb: 2
        }}
      >
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant || 'contained'}
            href={button.href}
            onClick={onClick}
            startIcon={button.startIcon}
            sx={{
              ml: index > 0 ? 3 : 0,
              backgroundColor: button.backgroundColor || '#6842FF',
              color: button.iconColor || '#FFFFFF',
              '&:hover': {
                backgroundColor:
                  button.backgroundColor || 'rgba(104, 66, 255, 0.8)'
              }
            }}
          >
            {button.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
