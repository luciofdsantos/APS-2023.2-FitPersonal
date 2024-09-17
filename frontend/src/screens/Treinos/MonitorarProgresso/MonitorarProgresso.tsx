import { CustomLayout } from '../../../components/index';
import { Grid } from '@mui/material';

export default function MonitorarProgresso() {
  return (
    <CustomLayout appBarText="Monitora Progresso">
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
      </Grid>
    </CustomLayout>
  );
}
