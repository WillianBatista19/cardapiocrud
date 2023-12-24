import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Login from './components/Login/Login';
import Register from './components/Registro/Register';
import Empresa from './components/Empresa/Empresa';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;