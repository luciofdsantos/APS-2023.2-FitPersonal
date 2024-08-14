import { GroupButtons, CustomLayout } from '../../../components';
import Dashboard from '@mui/icons-material/Dashboard';

const items = [{ text: 'Dashboard', Icon: Dashboard, path: '/' }];

export default function Editar() {
  return (
    <CustomLayout appBarText="Planos Alimentares" items={items}>
      <GroupButtons
        buttons={[
          { text: 'Salvar' },
          { text: 'Voltar', href: '/planos-alimentares' }
        ]}
      />
    </CustomLayout>
  );
}
