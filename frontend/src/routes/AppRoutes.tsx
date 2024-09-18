import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alunos from '../screens/Alunos';
import CadastroUsuario from '../screens/CadastroUsuario';
import EditarNovo from '../screens/Treinos/EditarNovo';
import EditarNovoPlano from '../screens/PlanosAlimentares/EditarNovo';
import EditarNovoVinculado from '../screens/Treinos/EditarNovo';
import EditarPerfil from '../screens/CadastroUsuario/Perfil';
import LoginUsuario from '../screens/LoginUsuario';
import PlanosAlimentares from '../screens/PlanosAlimentares';
import PlanosAlimentaresVinculados from '../screens/PlanosAlimentares';
import Treinos from '../screens/Treinos';
import TreinosVinculados from '../screens/Treinos';

import RoutesAluno from './RoutesAluno';
import RoutesLogin from './RoutesLogin';
import RoutesProfissional from './RoutesProfissional';

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
          <Route
            path="/planos-alimentares-aluno-vinculado/:idAluno"
            element={<PlanosAlimentaresVinculados vinculado={true} />}
          />
          <Route
            path="/planos-alimentares-aluno-vinculado/novo"
            element={<EditarNovoPlano vinculado={true} />}
          />
          <Route
            path="/planos-alimentares-aluno-vinculado/:id"
            element={<EditarNovoPlano vinculado={true} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
