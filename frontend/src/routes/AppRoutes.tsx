import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alunos from '../screens/Alunos';
import CadastroUsuario from '../screens/CadastroUsuario';
import EditarNovo from '../screens/Treinos/EditarNovo';
import EditarNovoPlano from '../screens/PlanosAlimentares/EditarNovo';
import LoginUsuario from '../screens/LoginUsuario';
import PlanosAlimentares from '../screens/PlanosAlimentares';
import Treinos from '../screens/Treinos';
import RoutesAluno from './RoutesAluno';
import RoutesProfissional from './RoutesProfissional';
import EditarPerfil from '../screens/CadastroUsuario/Perfil';
import RoutesLogin from './RoutesLogin';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginUsuario />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />

        <Route element={<RoutesLogin />}>
          <Route path="/editar-perfil" element={<EditarPerfil />} />
        </Route>

        <Route element={<RoutesAluno />}>
          <Route path="/treinos" element={<Treinos />} />
          <Route path="/treinos/novo" element={<EditarNovo />} />
          <Route path="/treinos/:id" element={<EditarNovo />} />
          <Route path="/planos-alimentares" element={<PlanosAlimentares />} />
          <Route
            path="/planos-alimentares/novo"
            element={<EditarNovoPlano />}
          />
          <Route path="/planos-alimentares/:id" element={<EditarNovoPlano />} />
        </Route>

        <Route element={<RoutesProfissional />}>
          <Route path="/alunos" element={<Alunos />} />
        </Route>
      </Routes>
    </Router>
  );
}
