import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Treinos from '../screens/Treinos';
import PlanosAlimentares from '../screens/PlanosAlimentares';
import EditarNovo from '../screens/Treinos/EditarNovo';
import EditarNovoPlano from '../screens/PlanosAlimentares/EditarNovo';
import LoginUsuario from '../screens/LoginUsuario';
import CadastroUsuario from '../screens/CadastroUsuario';
import RoutesProfissional from './RoutesProfissional';
import Alunos from '../screens/Alunos';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginUsuario />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/treinos" element={<Treinos />} />
        <Route path="/treinos/novo" element={<EditarNovo />} />
        <Route path="/treinos/:id" element={<EditarNovo />} />
        <Route path="/planos-alimentares" element={<PlanosAlimentares />} />
        <Route path="/planos-alimentares/novo" element={<EditarNovoPlano />} />
        <Route path="/planos-alimentares/:id" element={<EditarNovoPlano />} />

        <Route element={<RoutesProfissional />}>
          <Route path="/alunos" element={<Alunos />} />
        </Route>
      </Routes>
    </Router>
  );
}
