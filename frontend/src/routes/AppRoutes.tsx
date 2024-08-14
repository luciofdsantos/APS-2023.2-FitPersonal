import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Treinos from '../screens/Treinos';
import PlanosAlimentares from '../screens/PlanosAlimentares';
import NovoTreino from '../screens/Treinos/Novo';
import EditarTreino from '../screens/Treinos/Editar';
import EditarPlanoAlimentar from '../screens/PlanosAlimentares/Editar';
import NovoPlanoAlimentar from '../screens/PlanosAlimentares/Novo';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treinos" element={<Treinos />} />
        <Route path="/planos-alimentares" element={<PlanosAlimentares />} />
        <Route path="/novo-treino" element={<NovoTreino />} />
        <Route path="/editar-treino" element={<EditarTreino />} />
        <Route path="/novo-plano-alimentar" element={<NovoPlanoAlimentar />} />
        <Route path="/editar-plano-alimentar" element={<EditarPlanoAlimentar />} />
      </Routes>
    </Router>
  );
}
