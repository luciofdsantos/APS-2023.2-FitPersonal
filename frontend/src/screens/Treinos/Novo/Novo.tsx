import { GroupButtons, CustomLayout } from '../../../components';
import Dashboard from '@mui/icons-material/Dashboard';

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

export default function Novo() {
  return (
    <CustomLayout appBarText="Treinos" items={items}>
      <GroupButtons
        buttons={[{ text: 'Salvar' }, { text: 'Voltar', href: '/treinos' }]}
      />
    </CustomLayout>
  );
}
