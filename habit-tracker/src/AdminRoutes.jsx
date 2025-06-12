import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import AdminLayout from './pages/admin/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
export const AdminRoutes = (
  <>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<Users/>} />
      <Route path="settings"  />
    </Route>
  </>
);