import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RoutesProfissional from './RoutesProfissional';
import Alunos from '../screens/Alunos';
import TreinosVinculados from '../screens/Treinos';
import EditarNovoVinculado from '../screens/Treinos/EditarNovo';

import RoutesAluno from './RoutesAluno';
import Treinos from '../screens/Treinos';
import EditarNovo from '../screens/Treinos/EditarNovo';
import PlanosAlimentares from '../screens/PlanosAlimentares';
import EditarNovoPlano from '../screens/PlanosAlimentares/EditarNovo';

import RoutesLogin from './RoutesLogin';
import LoginUsuario from '../screens/LoginUsuario';
import CadastroUsuario from '../screens/CadastroUsuario';
import EditarPerfil from '../screens/CadastroUsuario/Perfil';

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
          <Route
            path="/treinos-aluno-vinculado/:idAluno"
            element={<TreinosVinculados vinculado={true} />}
          />
          <Route
            path="/treinos-aluno-vinculado/novo"
            element={<EditarNovoVinculado vinculado={true} />}
          />
          <Route
            path="/treinos-aluno-vinculado/:id"
            element={<EditarNovoVinculado vinculado={true} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
