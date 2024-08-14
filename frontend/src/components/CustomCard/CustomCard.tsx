import {
  Card,
  CardContent,
  Typography,
  SxProps,
  Theme,
  CardActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GroupButtons from '../GroupButtons';

type CustomCardProps = {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
  editLink?: string;
  style?: SxProps<Theme>;
};

export default function CustomCard({ title, items, style, editLink = '/editar-treino' }: CustomCardProps) {
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
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <GroupButtons
          buttons={[
            {
              startIcon: <EditIcon />,
              backgroundColor: 'transparent',
              iconColor: '#6842FF',
              href: editLink
            }
          ]}
        />
      </CardActions>
    </Card>
  );
}
