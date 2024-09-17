import { Button, Box, SxProps, Theme } from '@mui/material';
import React, { ReactNode } from 'react';

interface ButtonProps {
  text?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  startIcon?: ReactNode;
  backgroundColor?: string;
  iconColor?: string;
  border?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  noShow?: boolean;
}

interface GroupButtonsProps {
  buttons: ButtonProps[];
  style?: SxProps<Theme>;
  boxShadow?: boolean;
  height?: string;
}

export default function GroupButtons({
  buttons,
  style,
  boxShadow = false,
  height = '100%'
}: GroupButtonsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height,
        overflow: 'hidden',
        ...style
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          pt: 2,
          pb: 2,
          gap: '1rem'
        }}
      >
        {buttons.map(
          (button, index) =>
            !button.noShow && (
              <Button
                key={index}
                variant={button.variant || 'contained'}
                href={button.href}
                type={button.type}
                onClick={button.onClick}
                startIcon={button.startIcon}
                sx={{
                  backgroundColor: button.backgroundColor || '#6842FF',
                  color: button.iconColor || '#FFFFFF',
                  boxShadow: boxShadow
                    ? '0 4px 6px rgba(0, 0, 0, 0.1)'
                    : 'none',
                  '&:hover': {
                    backgroundColor:
                      button.backgroundColor || 'rgba(104, 66, 255, 0.8)',
                    boxShadow: boxShadow
                      ? '0 4px 6px rgba(0, 0, 0, 0.1)'
                      : 'none'
                  }
                }}
              >
                {button.text}
              </Button>
            )
        )}
      </Box>
    </Box>
  );
}
