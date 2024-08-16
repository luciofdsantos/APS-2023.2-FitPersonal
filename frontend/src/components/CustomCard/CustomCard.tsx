import { Card, CardContent, Typography, CardActions } from '@mui/material';
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
      <CardContent>
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
      </CardContent>
      {buttons && (
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <GroupButtons buttons={buttons} />
        </CardActions>
      )}
    </Card>
  );
}
