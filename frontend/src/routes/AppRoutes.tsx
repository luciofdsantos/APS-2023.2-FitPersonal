import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Treinos from '../screens/Treinos';
import PlanosAlimentares from '../screens/PlanosAlimentares';
import EditarNovo from '../screens/Treinos/EditarNovo';
import EditarNovoPlano from '../screens/PlanosAlimentares/EditarNovo';
import CadastroUsuario from '../screens/CadastroUsuario';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CadastroUsuario />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/treinos" element={<Treinos />} />
        <Route path="/treinos/novo" element={<EditarNovo />} />
        <Route path="/treinos/:id" element={<EditarNovo />} />
        <Route path="/planos-alimentares" element={<PlanosAlimentares />} />
        <Route path="/planos-alimentares/novo" element={<EditarNovoPlano />} />
        <Route path="/planos-alimentares/:id" element={<EditarNovoPlano />} />
      </Routes>
    </Router>
  );
}
