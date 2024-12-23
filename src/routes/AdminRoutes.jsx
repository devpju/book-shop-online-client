import AdminLayout from '@/components/layouts/AdminLayout';
import BooksManagerPage from '@/pages/AdminPages/BooksManagerPage';
import CreateBookPage from '@/pages/AdminPages/BooksManagerPage/CreateBookPage';
import UpdateBookPage from '@/pages/AdminPages/BooksManagerPage/UpdateBookPage';
import CategoriesManagerPage from '@/pages/AdminPages/CategoriesManagerPage';
import DashboardPage from '@/pages/AdminPages/DashboardPage';
import OrdersManagerPage from '@/pages/AdminPages/OrdersManagerPage';
import DetailOrderPage from '@/pages/AdminPages/OrdersManagerPage/DetailOrderPage';
import ReviewsManagerPage from '@/pages/AdminPages/ReviewsManagerPage';
import UsersManagerPage from '@/pages/AdminPages/UsersManagerPage';
import DetailUserPage from '@/pages/AdminPages/UsersManagerPage/DetailUserPage';
import VouchersManagerPage from '@/pages/AdminPages/VouchersManagerPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Route, Routes } from 'react-router';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/users' element={<UsersManagerPage />} />
        <Route path='/users/:slug' element={<DetailUserPage />} />
        <Route path='/vouchers' element={<VouchersManagerPage />} />
        <Route path='/reviews' element={<ReviewsManagerPage />} />
        <Route path='/orders' element={<OrdersManagerPage />} />
        <Route path='/orders/:orderId' element={<DetailOrderPage />} />
        <Route path='/books' element={<BooksManagerPage />} />
        <Route path='/books/create-new-book' element={<CreateBookPage />} />
        <Route path='/books/update-book' element={<UpdateBookPage />} />
        <Route path='/categories' element={<CategoriesManagerPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
export default AdminRoutes;
