import { CustomLayout } from '../../components';
import { FitnessCenter, FoodBank } from '@mui/icons-material';

export default function Treinos() {
  return (
    <CustomLayout
      appBarText="Dashboard"
      items={[
        { text: 'Treinos', Icon: FitnessCenter, path: '/treinos' },
        {
          text: 'Planos Alimentares',
          Icon: FoodBank,
          path: '/planos-alimentares'
        }
      ]}
    >
      Teste
    </CustomLayout>
  );
}
