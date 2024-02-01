import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={styles.navWrapper}>
      <span>Movie App</span>
      <div className={styles.pageNavigation}>
        <Link to="/">
          <span>Users</span>
        </Link>
        <Link to="/video">
          <span> Video</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
