import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Treinos from '../screens/Treinos';
import EditarNovo from '../screens/Treinos/EditarNovo';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treinos" element={<Treinos />} />
        <Route path="/novo-treino/novo" element={<EditarNovo />} />
        <Route path="/editar-treino/:id" element={<EditarNovo />} />
      </Routes>
    </Router>
  );
}
