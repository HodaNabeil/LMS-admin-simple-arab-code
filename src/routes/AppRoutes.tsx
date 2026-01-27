import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { adminRoutes } from './AdminRoutes';
import { PublicRoute } from '@/components/shared/guard-route';
import { lazyLoad } from './lazyLoadHelper';

const Login = lazyLoad(() => import('@/pages/auth/login'));
const NotFound = lazyLoad(() => import('@/pages/not-found'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route
          index
          element={
            <PublicRoute>
              {Login}
            </PublicRoute>
          }
        />
        {adminRoutes}
      </Route>
      <Route path="*" element={NotFound} />
    </>
  )
);
