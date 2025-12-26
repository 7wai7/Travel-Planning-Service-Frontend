import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import TripModal from "../components/TripModal";

function Layout() {
  return (
    <>
      <SideBar />
      <main className="page-content">
        <Outlet />
      </main>
      <TripModal />
    </>
  );
}

export default Layout;
