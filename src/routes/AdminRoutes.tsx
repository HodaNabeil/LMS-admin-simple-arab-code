import { Route } from 'react-router-dom';
import AdminLayout from '@/components/shared/admin-layout';
import { lazyLoad } from './lazyLoadHelper';

const Admin = lazyLoad(() => import('@/pages'));
const Users = lazyLoad(() => import('@/pages/users'));
const Courses = lazyLoad(() => import('@/pages/courses'));
const Paths = lazyLoad(() => import('@/pages/paths'));
const CreateNewPath = lazyLoad(() => import('@/pages/paths/create'));
const ManagePath = lazyLoad(() => import('@/pages/paths/[pathSlug]/manage'));
const Orders = lazyLoad(() => import('@/pages/orders'));
const CreateOrder = lazyLoad(() => import('@/pages/orders/create'));
const Availability = lazyLoad(() => import('@/pages/courses/[slug]/manage/availability'));
const Basics = lazyLoad(() => import('@/pages/courses/[slug]/manage/basics'));
const Curriculum = lazyLoad(() => import('@/pages/courses/[slug]/manage/curriculum'));
const Goals = lazyLoad(() => import('@/pages/courses/[slug]/manage/goals'));
const Promotions = lazyLoad(() => import('@/pages/courses/[slug]/manage/promotions'));
const CreateCourse = lazyLoad(() => import('@/pages/courses/create'));
const ManageLayout = lazyLoad(() => import('@/features/courses/manage/components/ManageLayout'));
const Pricing = lazyLoad(() => import('@/pages/courses/[slug]/manage/pricing'));
const Statistics = lazyLoad(() => import('@/pages/analytics/statistics'));
const Tracks = lazyLoad(() => import('@/pages/tracks'));
const CreateNewTrack = lazyLoad(() => import('@/pages/tracks/create'));
const ManageTrack = lazyLoad(() => import('@/pages/tracks/[trackSlug]/manage'));
const Coupons = lazyLoad(() => import('@/pages/coupons'));
const CreateCouponPage = lazyLoad(() => import('@/pages/coupons/create'));
const ManageCoupon = lazyLoad(() => import('@/pages/coupons/[couponId]/manage'));
const Payment = lazyLoad(() => import('@/pages/payment/payment'));
const Reviews = lazyLoad(() => import('@/pages/reviews/index'));
const CreateReview = lazyLoad(() => import('@/pages/reviews/create'));

export const adminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route index element={Admin} />
    <Route path="users" element={Users} />
    <Route path="coupons">
      <Route index element={Coupons} />
      <Route path="create" element={CreateCouponPage} />
      <Route path=":couponId/manage" element={ManageCoupon} />
    </Route>

    <Route path="profile" element={<div>Profile Page</div>} />
    <Route path="settings">
      <Route path="payment" element={Payment} />
    </Route>

    <Route path="paths">
      <Route index element={Paths} />
      <Route path="create" element={CreateNewPath} />
      <Route path=":pathSlug/manage" element={ManagePath} />
    </Route>

    <Route path="orders">
      <Route index element={Orders} />
      <Route path="create" element={CreateOrder} />
    </Route>

    <Route path="courses">
      <Route index element={Courses} />
      <Route path="create" element={CreateCourse} />
      <Route path=":slug/manage" element={ManageLayout}>
        <Route index path="goals" element={Goals} />
        <Route path="pricing" element={Pricing} />
        <Route path="availability" element={Availability} />
        <Route path="basics" element={Basics} />
        <Route path="promotions" element={Promotions} />
        <Route path="curriculum" element={Curriculum} />
      </Route>
      <Route path=":slug/reviews" element={Reviews} />
      <Route path=":slug/reviews/create" element={CreateReview} />
    </Route>

    <Route path="tracks">
      <Route index element={Tracks} />
      <Route path="create" element={CreateNewTrack} />
      <Route path=":trackSlug/manage" element={ManageTrack} />
    </Route>
    <Route path="analytics/general" element={Statistics} />
  </Route>
);
