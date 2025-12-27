import { Link } from "react-router-dom";
import useUserStore from "../stores/UserStore";

export default function SideBar() {
  const { user, logout } = useUserStore();

  return (
    <section className="w-50 fixed top-0 bottom-0 left-0 right-auto overflow-y-auto bg-white shadow-(--shadow) py-4 px-4">
      <nav className="flex flex-col gap-2">
        <Link to={"/"} className="interact bg-blue-50 py-0.5 px-2 text-blue-800">Main</Link>
        <Link to={"/trips"} className="interact bg-blue-50 py-0.5 px-2 text-blue-800">My trips</Link>
      </nav>
      <hr className="my-4"/>
      <p className="text-(--muted) text-xs">Profile</p>
      <div>
        <p className="text-sm text-black">{user!.username}</p>
        <p className="text-xs text-black font-semibold">{user!.email}</p>
      </div>
      <button className="interact text-sm border-blue-300 hover:border-(--blue) mt-2 text-(--blue) py-0.5 w-full" onClick={logout}>
        Logout
      </button>
    </section>
  );
}
