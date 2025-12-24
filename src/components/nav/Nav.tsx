import './Nav.css';
import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="nav-bar">
      <Text className="nav-logo nav-button">
        <Link to="/">OSRS Bank Tags </Link>
      </Text>
      <nav className="nav-container">
        <ul>
          <li>
            <Link to="/create" className="nav-import-button nav-button">
              Import Bank Tab
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
