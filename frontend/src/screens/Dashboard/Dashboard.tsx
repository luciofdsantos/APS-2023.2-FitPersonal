import { CustomLayout } from '../../components';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import FoodBank from '@mui/icons-material/FoodBank';

const items = [
  { text: 'Treinos', Icon: FitnessCenter, path: '/treinos' },
  { text: 'Planos Alimentares', Icon: FoodBank, path: '/planos-alimentares' }
];

export default function Treinos() {
  return (
    <CustomLayout appBarText="Dashboard" items={items}>
      Teste
    </CustomLayout>
  );
}
