import { Link } from "react-router-dom";
import css from "../styles/SideBar.module.css";
import useUserStore from "../stores/UserStore";

export default function SideBar() {
  const { user, logout } = useUserStore();

  return (
    <section className={css.sidebar}>
      <nav>
        <Link to={"/"}>Main</Link>
        <Link to={"/trips"}>My trips</Link>
      </nav>
      <hr />
      <p className={css.profile_top}>Profile</p>
      <div>
        <p className={css.username}>{user!.username}</p>
        <p className={css.email}>{user!.email}</p>
      </div>
      <button className={css.logout_btn} onClick={logout}>
        Logout
      </button>
    </section>
  );
}
