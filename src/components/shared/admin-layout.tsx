import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <aside>Sidebar {/** it will be separate component */}</aside>
      <Outlet />
    </>
  );
}

export default AdminLayout;
