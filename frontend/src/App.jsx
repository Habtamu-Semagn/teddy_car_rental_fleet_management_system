import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Placeholder Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UploadDocs from './pages/UploadDocs';
import Agreement from './pages/Agreement';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';

import Logout from './pages/Logout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogout from './pages/admin/AdminLogout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload-docs" element={<UploadDocs />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* Admin Routes - could be separate layout but sharing for now */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/logout" element={<AdminLogout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
