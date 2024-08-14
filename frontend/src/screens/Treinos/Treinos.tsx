import { CustomCard, CustomLayout } from '../../components';
import Dashboard from '@mui/icons-material/Dashboard';
import Grid from '@mui/material/Grid';

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

export default function Treinos() {
  return (
    <CustomLayout appBarText="Treinos" items={items}>
      <Grid container spacing={3}>
        {/* Map de vários cards */}
        <Grid item xs={12} md={8} lg={4}>
          <CustomCard
            title="Supino inclinado com barra reta"
            items={[
              { label: 'Séries', value: '4x10-12' },
              { label: 'Intervalo', value: '60s' }
            ]}
            style={{
              backgroundColor: '#1F2229',
              borderRadius: '16px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          />
        </Grid>

        <Grid item xs={12} md={8} lg={4}>
          <CustomCard
            title="Supino inclinado com barra reta"
            items={[
              { label: 'Séries', value: '4x10-12' },
              { label: 'Intervalo', value: '60s' }
            ]}
            style={{
              backgroundColor: '#1F2229',
              borderRadius: '16px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          />
        </Grid>

        <Grid item xs={12} md={8} lg={4}>
          <CustomCard
            title="Supino inclinado com barra reta"
            items={[
              { label: 'Séries', value: '4x10-12' },
              { label: 'Intervalo', value: '60s' }
            ]}
            style={{
              backgroundColor: '#1F2229',
              borderRadius: '16px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          />
        </Grid>

        <Grid item xs={12} md={8} lg={4}>
          <CustomCard
            title="Supino inclinado com barra reta"
            items={[
              { label: 'Séries', value: '4x10-12' },
              { label: 'Intervalo', value: '60s' }
            ]}
            style={{
              backgroundColor: '#1F2229',
              borderRadius: '16px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          />
        </Grid>

        <Grid item xs={12} md={8} lg={4}>
          <CustomCard
            title="Supino inclinado com barra reta"
            items={[
              { label: 'Séries', value: '4x10-12' },
              { label: 'Intervalo', value: '60s' }
            ]}
            style={{
              backgroundColor: '#1F2229',
              borderRadius: '16px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          />
        </Grid>

        <Grid item xs={12} md={8} lg={4}>
          <CustomCard
            title="Supino inclinado com barra reta"
            items={[
              { label: 'Séries', value: '4x10-12' },
              { label: 'Intervalo', value: '60s' }
            ]}
            style={{
              backgroundColor: '#1F2229',
              borderRadius: '16px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          />
        </Grid>
      </Grid>
    </CustomLayout>
  );
}
