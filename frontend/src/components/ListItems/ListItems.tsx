import {
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export type Item = {
  text: string;
  Icon: React.ElementType;
  path: string;
};

export type ListItemsProps = {
  items: Item[];
  open: boolean;
};

export default function ListItems({ items, open }: ListItemsProps) {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <Grid item xs={12} md={8} lg={9}>
      {items.map((item, index) => (
        <ListItemButton key={index} onClick={() => handleClick(item.path)}>
          <ListItemIcon>
            <item.Icon />
          </ListItemIcon>
          {open && <ListItemText primary={item.text} />}
        </ListItemButton>
      ))}
    </Grid>
  );
}
