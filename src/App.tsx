import './App.css';
import BankTagContent from './components/BankTagContent/BankTagContent';
import SideBar from './components/SideBar/SideBar';

const testNav: string[] = [
  'All Tags',
  'Bosses',
  'Skilling',
  'Quests',
  'Minigames',
  'Raids',
  'Miscellaneous',
];

function App() {
  return (
    <>
      <div className="app-container">
        <SideBar navItems={testNav} />
        <BankTagContent />
      </div>
    </>
  );
}

export default App;
