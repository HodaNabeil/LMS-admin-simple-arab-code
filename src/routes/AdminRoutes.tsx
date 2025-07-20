import AdminLayout from "@/components/shared/admin-layout";
import Availability from "@/features/courses/components/Edit/components/Availability";
import Basics from "@/features/courses/components/Edit/components/Basics";
import Goals from "@/features/courses/components/Edit/components/Goals";
import Pricing from "@/features/courses/components/Edit/components/Pricing";
import Promotions from "@/features/courses/components/Edit/components/Promotions";
import Admin from "@/pages";
import Courses from "@/pages/courses";
import CreateCourse from "@/pages/courses/create";
import EditCourse from "@/pages/courses/edit";

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
      <Route path="create" element={<CreateCourse />}></Route>
      <Route path=":slug/manage" element={<EditCourse />}>
        <Route index path="goals" element={<Goals  />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="availability" element={<Availability />} />
        <Route path="basics" element={<Basics />} />
        <Route path="promotions" element={<Promotions />} />
      </Route>
    </Route>
  </Route>
);
