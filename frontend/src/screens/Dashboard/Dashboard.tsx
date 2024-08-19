import { CustomLayout } from '../../components';
import FitnessCenter from '@mui/icons-material/FitnessCenter';

const items = [{ text: 'Treinos', Icon: FitnessCenter, path: '/treinos' }];

export default function Treinos() {
  return (
    <CustomLayout appBarText="Dashboard" items={items}>
      Teste
    </CustomLayout>
  );
}
