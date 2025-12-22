import { Input, InputGroup } from '@chakra-ui/react';
import './App.css';
import BankTagCard from './components/BankTagCard/BankTagCard';
import type { BankTagData } from './types';
import { LuSearch } from 'react-icons/lu';
import SideBar from './components/SideBar/SideBar';

const testData: BankTagData[] = [
  { tagName: 'Zulrah', tagString: 'hello!', tagTags: [] },
  { tagName: 'Muspah', tagString: '', tagTags: [] },
  { tagName: 'Vorkath', tagString: '', tagTags: [] },
  { tagName: 'Cerberus', tagString: '', tagTags: [] },
  { tagName: 'Alchemical Hydra', tagString: '', tagTags: [] },
  { tagName: 'Grotesque Guardians', tagString: '', tagTags: [] },
  { tagName: 'Farming', tagString: '', tagTags: [] },
  { tagName: 'Clue Scrolls', tagString: '', tagTags: [] },
  { tagName: 'Food', tagString: '', tagTags: [] },
  { tagName: 'Potions', tagString: '', tagTags: [] },
];

const testNav: string[] = [
  'All Tags',
  'Bosses',
  'Skilling',
  'Quests',
  'Minigames',
  'Miscellaneous',
  'Raids',
];

function App() {
  return (
    <>
      <div className="app-container">
        <SideBar navItems={testNav} />

        <div className="content-container">
          <InputGroup className="search-bar" startElement={<LuSearch />}>
            <Input placeholder="Search Tabs..." />
          </InputGroup>
          <div className="tags-container">
            {testData.map((tag) => (
              <BankTagCard key={tag.tagName} data={tag} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
