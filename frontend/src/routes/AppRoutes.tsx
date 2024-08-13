import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Treinos from '../screens/Treinos';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/treinos" element={<Treinos />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
