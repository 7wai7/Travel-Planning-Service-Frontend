import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import TripModal from "../components/TripModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";

function Layout() {
  return (
    <>
      <SideBar />
      <main className="ml-55 py-6 px-8 w-full flex flex-col">
        <Outlet />
      </main>
      <TripModal />
      <ConfirmDialog />
    </>
  );
}

export default Layout;
