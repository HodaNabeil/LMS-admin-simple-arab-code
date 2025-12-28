import AdminLayout from '@/components/shared/admin-layout';
import Admin from '@/pages';
import Courses from '@/pages/courses';
import Paths from '@/pages/paths';
import CreateNewPath from '@/pages/paths/create';
import ManagePath from '@/pages/paths/[pathSlug]/manage';
import Orders from '@/pages/orders';
import Users from '@/pages/users';
import { Route } from 'react-router-dom';
import Availability from '@/pages/courses/[slug]/manage/availability';
import Basics from '@/pages/courses/[slug]/manage/basics';
import Curriculum from '@/pages/courses/[slug]/manage/curriculum';
import Goals from '@/pages/courses/[slug]/manage/goals';
import Promotions from '@/pages/courses/[slug]/manage/promotions';
import CreateCourse from '@/pages/courses/create';
import ManageLayout from '@/features/courses/manage/components/ManageLayout';
import Pricing from '@/pages/courses/[slug]/manage/pricing';

export const adminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route index element={<Admin />} />
    <Route path="users" element={<Users />} />
    <Route path="profile" element={<div>Profile Page</div>} />
    <Route path="settings" element={<div>Settings Page</div>} />
    <Route path="paths">
      <Route index element={<Paths />} />
      <Route path="create" element={<CreateNewPath />} />
      <Route path=":pathSlug/manage" element={<ManagePath />} />
    </Route>
    <Route path="courses" element={<Courses />} />
    <Route path="orders" element={<Orders />} />
    <Route path="courses">
      <Route index element={<Courses />} />
      <Route path="create" element={<CreateCourse />} />
      <Route path=":slug/manage" element={<ManageLayout />}>
        <Route path="goals" element={<Goals />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="availability" element={<Availability />} />
        <Route path="basics" element={<Basics />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="curriculum" element={<Curriculum />} />
      </Route>
    </Route>
  </Route>
);
