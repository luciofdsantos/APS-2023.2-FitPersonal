import {
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TypeItem } from 'src/types';

export default function ListItems({ items, open }: TypeItem.ListItemsProps) {
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
