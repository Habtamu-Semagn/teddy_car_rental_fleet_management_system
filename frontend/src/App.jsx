import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
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
import AdminCars from './pages/admin/AdminCars';
import AdminEmployees from './pages/admin/AdminEmployees';
import AdminPackages from './pages/admin/AdminPackages';
import AdminFinancials from './pages/admin/AdminFinancials';
import AdminLogout from './pages/admin/AdminLogout';

// Employee Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeCars from './pages/employee/EmployeeCars';
import EmployeePackages from './pages/employee/EmployeePackages';
import EmployeeReports from './pages/employee/EmployeeReports';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="teddy-ui-theme">
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

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/cars" element={<AdminCars />} />
          <Route path="/admin/employees" element={<AdminEmployees />} />
          <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/financials" element={<AdminFinancials />} />
          <Route path="/admin/logout" element={<AdminLogout />} />

          {/* Employee Routes */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/cars" element={<EmployeeCars />} />
          <Route path="/employee/packages" element={<EmployeePackages />} />
          <Route path="/employee/reports" element={<EmployeeReports />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
