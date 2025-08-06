import AdminLayout from "@/components/shared/admin-layout";
import Availability from "@/features/courses/components/Edit/components/Availability";
import Basics from "@/features/courses/components/Edit/components/Basics";
import Curriculum from "@/features/courses/components/Edit/components/Curriculum";
import Goals from "@/features/courses/components/Edit/components/Goals";
import Pricing from "@/features/courses/components/Edit/components/Pricing";
import Promotions from "@/features/courses/components/Edit/components/Promotions";
import Admin from "@/pages";
import Courses from "@/pages/courses";
import CreateCourse from "@/pages/courses/create";
import ManageCourse from "@/pages/courses/manage";
import Paths from "@/pages/paths";
import NewAddPath from "@/pages/paths/create";
import Users from "@/pages/users";
import { Route } from "react-router-dom";

export const adminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route index element={<Admin />} />
    <Route path="users" element={<Users />} />
    <Route path="profile" element={<div>Profile Page</div>} />
    <Route path="settings" element={<div>Settings Page</div>} />
    <Route path="paths">
      <Route index element={<Paths />} />
      <Route path="create" element={<NewAddPath />} />
    </Route>
    <Route path="courses">
      <Route index element={<Courses />} />
      <Route path="create" element={<CreateCourse />} />
      <Route path=":slug/manage" element={<ManageCourse />}>
        <Route index path="goals" element={<Goals />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="availability" element={<Availability />} />
        <Route path="basics" element={<Basics />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="curriculum" element={<Curriculum />} />
      </Route>
    </Route>
  </Route>
);
