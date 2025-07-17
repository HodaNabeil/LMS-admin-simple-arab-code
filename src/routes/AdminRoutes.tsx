import AdminLayout from "@/components/shared/admin-layout";
import Admin from "@/pages";
import Courses from "@/pages/courses";
import CreateCourse from "@/pages/courses/create";
import EditCourse from "@/pages/courses/Edit";
import Goals from "@/pages/courses/Goals";
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
        <Route index path="goals" element={<Goals />} />
        <Route path="lessons" element={<div>Manage Lessons</div>} />
        <Route path="quizzes" element={<div>Manage Quizzes</div>} />
        <Route path="assignments" element={<div>Manage Assignments</div>} />
        <Route path="discussions" element={<div>Manage Discussions</div>} />
        <Route path="announcements" element={<div>Manage Announcements</div>} />
        <Route path="resources" element={<div>Manage Resources</div>} />
      </Route>


      
    </Route>
  </Route>
);

