import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import AdminLayout from './pages/admin/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import { BlogList } from './components/admin/blogs/BlogList';
import { BlogCreate } from './components/admin/blogs/BlogCreate';

import RequireAuthAdmin from './components/RequireAuthAdmin';
import { AdminFeedbackPage } from './pages/admin/AdminFeedbackPage';
import Logs from './pages/admin/Logs';


export const AdminRoutes = (
  <>
    <Route element={<RequireAuthAdmin />}>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path='feedbacks' element={<AdminFeedbackPage/>}></Route>
        <Route path="blogs"  >
          <Route index element={<BlogList />} />
          <Route path="create" element={<BlogCreate />} />
          <Route path="edit/:id" element={<BlogCreate />} />

        </Route>
        <Route path='logs'>
          <Route index element={<Logs/>}></Route>
        </Route>
      </Route>
    </Route>
  </>
);