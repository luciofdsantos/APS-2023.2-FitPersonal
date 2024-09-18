import {
  Card,
  CardContent,
  Typography,
  Box,
  SxProps,
  Theme
} from '@mui/material';
import React, { ReactNode } from 'react';
import GroupButtons from '../GroupButtons';

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
}

interface CustomCardProps {
  title: string;
  items?: {
    label: string;
    value: React.ReactNode;
  }[];
  style?: SxProps<Theme>;
  buttons?: ButtonProps[];
}

export default function CustomCard({
  title,
  items,
  style,
  buttons
}: CustomCardProps) {
  return (
    <Card
      sx={{
        ...style,
        borderRadius: '8px'
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: '#6842FF',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: 0
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          {items?.map((item, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                color: '#FFFFFF',
                fontSize: '16px'
              }}
            >
              <strong>{item.label}:</strong> {item.value}
            </Typography>
          ))}
        </Box>

        {buttons && (
          <Box sx={{ mt: 2 }}>
            <GroupButtons buttons={buttons} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
