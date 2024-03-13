import { Outlet } from "react-router-dom";
import ProtectedRoute from "../../utility/guard/protectedRoute";
import SideNavbar from "../sideNavbar/sideNavbar";
import "./layout.scss";

const Layout = () => {
  return (
    <ProtectedRoute>
      <div className="app">
        <SideNavbar className="app-sideNavbar" />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
