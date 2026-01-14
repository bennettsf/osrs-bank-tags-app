import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li className="home">
          <Link to="/"> OSRS Bank Tags </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/import">
            {' '}
            <p>Import Bank Tab</p>
          </Link>
        </li>
        <li>
          <Link to="/favorites">My Favorites</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
