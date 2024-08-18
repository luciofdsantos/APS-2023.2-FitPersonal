import { Button, Box } from '@mui/material';
import { TypeButton } from 'src/types';

export default function GroupButtons({
  buttons,
  style,
  boxShadow = false
}: TypeButton.GroupButtonsProps) {
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
          pt: 2,
          pb: 2
        }}
      >
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant || 'contained'}
            href={button.href}
            type={button.type}
            onClick={button.onClick}
            startIcon={button.startIcon}
            sx={{
              ml: index > 0 ? 3 : 0,
              backgroundColor: button.backgroundColor || '#6842FF',
              color: button.iconColor || '#FFFFFF',
              boxShadow: boxShadow ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
              '&:hover': {
                backgroundColor:
                  button.backgroundColor || 'rgba(104, 66, 255, 0.8)',
                boxShadow: boxShadow ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
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
