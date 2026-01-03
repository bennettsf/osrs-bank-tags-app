import './App.css';

import NavBar from './components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
