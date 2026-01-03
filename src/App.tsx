import './App.css';

import Nav from './components/NavBar/Nav';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
