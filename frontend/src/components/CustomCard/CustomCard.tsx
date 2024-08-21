import { Card, CardContent, Typography, Box } from '@mui/material';
import GroupButtons from '../GroupButtons';
import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface Button {
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
  items: {
    label: string;
    value: React.ReactNode;
  }[];
  style?: SxProps<Theme>;
  buttons?: Button[];
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
        borderRadius: '16px',
        boxShadow: 3,
        overflow: 'hidden',
        minWidth: 300,
        maxWidth: 400,
        margin: 2
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: '#6842FF',
            fontSize: '24px',
            fontWeight: 'bold'
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
          {items.map((item, index) => (
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
