import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Treinos from '../screens/Treinos';
import PlanosAlimentares from '../screens/PlanosAlimentares';
import NovoPlanoAlimentar from '../screens/PlanosAlimentares/EditarNovo';
import EditarNovo from '../screens/Treinos/EditarNovo';
import EditarNovoPlano from '../screens/PlanosAlimentares/EditarNovo';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treinos" element={<Treinos />} />
        <Route path="/novo-treino/novo" element={<EditarNovo />} />
        <Route path="/editar-treino/:id" element={<EditarNovo />} />
        <Route
          path="/editar-plano-alimentar/:id"
          element={<EditarNovoPlano />}
        />
      </Routes>
    </Router>
  );
}
