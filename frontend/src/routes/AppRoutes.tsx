import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Treinos from '../screens/Treinos';
<<<<<<< HEAD
import PlanosAlimentares from '../screens/PlanosAlimentares';
=======
import NovoTreino from '../screens/Treinos/Novo';
import EditarTreino from '../screens/Treinos/Editar';
>>>>>>> 2e8308b51189c33ed7336b7adc7d63aa0c2fea3f

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treinos" element={<Treinos />} />
<<<<<<< HEAD
        <Route path="/planos-alimentares" element={<PlanosAlimentares />} />
=======
        <Route path="/novo-treino" element={<NovoTreino />} />
        <Route path="/editar-treino" element={<EditarTreino />} />
>>>>>>> 2e8308b51189c33ed7336b7adc7d63aa0c2fea3f
      </Routes>
    </Router>
  );
}
