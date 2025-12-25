import { Link } from "react-router-dom";
import css from "../styles/MainPage.module.css";

export default function MainPage() {
  return (
    <main className={css.container}>
      <h1 className={css.header}>Welcome to Travel Planning Service</h1>

      <p className={css.description}>
        Plan your trips, organize places by day, and collaborate with others —
        all in one simple and intuitive interface.
      </p>

      <Link to="/trips" className={css.primaryBtn}>
        View my trips
      </Link>
    </main>
  );
}
