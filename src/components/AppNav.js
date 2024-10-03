import { NavLink } from 'react-router-dom';
import styles from './AppNav.module.css';
const AppNav = () => {
  return (
    <div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to='cities'>Cities</NavLink>
          </li>

          <li>
            <NavLink to='countries'>Countries</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AppNav;
