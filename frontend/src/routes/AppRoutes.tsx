import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Treinos from '../screens/Treinos';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treinos" element={<Treinos />} />
      </Routes>
    </Router>
  );
}
