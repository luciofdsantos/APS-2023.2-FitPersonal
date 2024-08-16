import { Card, CardContent, Typography, Box } from '@mui/material';
import GroupButtons from '../GroupButtons';
import { TypeCard } from 'src/types';

export default function CustomCard({
  title,
  items,
  style,
  buttons
}: TypeCard.CustomCardProps) {
  return (
    <Card sx={style}>
      <CardContent sx={{ marginBottom: '-10px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: '#6842FF', fontSize: '20px' }}
            >
              {title}
            </Typography>
            {items.map((item, index) => (
              <Typography
                key={index}
                variant="body2"
                color="text.secondary"
                sx={{ color: '#FFFFFF' }}
              >
                {item.label}: {item.value}
              </Typography>
            ))}
          </Box>
          {buttons && (
            <Box sx={{ ml: 2, mt: 2 }}>
              <GroupButtons buttons={buttons} />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
