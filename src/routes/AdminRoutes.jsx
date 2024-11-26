import DashboardPage from '@/pages/AdminPages/DashboardPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Route, Routes } from 'react-router';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path='/dashboard' element={<DashboardPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
export default AdminRoutes;
