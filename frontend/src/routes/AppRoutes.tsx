import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Treinos from '../screens/Treinos';
import PlanosAlimentares from '../screens/PlanosAlimentares';
import EditarPlanoAlimentar from '../screens/PlanosAlimentares/Editar';
import NovoPlanoAlimentar from '../screens/PlanosAlimentares/Novo';
import EditarNovo from '../screens/Treinos/EditarNovo';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treinos" element={<Treinos />} />
        <Route path="/planos-alimentares" element={<PlanosAlimentares />} />
        <Route path="/novo-plano-alimentar" element={<NovoPlanoAlimentar />} />
        <Route path="/editar-plano-alimentar" element={<EditarPlanoAlimentar />} />
        <Route path="/novo-treino" element={<EditarNovo />} />
        <Route path="/editar-treino/:id" element={<EditarNovo />} />
      </Routes>
    </Router>
  );
}
