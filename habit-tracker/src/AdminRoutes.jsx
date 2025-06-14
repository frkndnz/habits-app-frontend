import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import AdminLayout from './pages/admin/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import { BlogList } from './components/admin/blogs/BlogList';
import { BlogCreate } from './components/admin/blogs/BlogCreate';



export const AdminRoutes = (
  <>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<Users/>} />
      <Route path="blogs"  >
        <Route index element={<BlogList/>}/>
        <Route path="create" element={<BlogCreate/>}/>
        </Route>
    </Route>
  </>
);