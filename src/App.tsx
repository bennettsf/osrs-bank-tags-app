import './App.css';

import Nav from './components/Nav/Nav';
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
