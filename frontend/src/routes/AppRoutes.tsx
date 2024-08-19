import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Treinos from '../screens/Treinos';
import NovoTreino from '../screens/Treinos/Novo';
import EditarTreino from '../screens/Treinos/Editar';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treinos" element={<Treinos />} />
        <Route path="/novo-treino" element={<NovoTreino />} />
        <Route path="/editar-treino" element={<EditarTreino />} />
      </Routes>
    </Router>
  );
}
