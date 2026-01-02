import type { BankTagData } from '@/types';
import { Input, InputGroup } from '@chakra-ui/react';
import BankTagCard from '../BankTagCard/BankTagCard';
import { LuSearch } from 'react-icons/lu';
import './BankTagContent.css';

const testData: BankTagData[] = [
  { tagId: '1', tagName: 'Zulrah', tagString: 'hello!', tagTags: [] },
  { tagId: '2', tagName: 'Muspah', tagString: '', tagTags: [] },
  { tagId: '3', tagName: 'Vorkath', tagString: '', tagTags: [] },
  { tagId: '4', tagName: 'Cerberus', tagString: '', tagTags: [] },
  { tagId: '5', tagName: 'Alchemical Hydra', tagString: '', tagTags: [] },
  { tagId: '6', tagName: 'Grotesque Guardians', tagString: '', tagTags: [] },
  { tagId: '7', tagName: 'Farming', tagString: '', tagTags: [] },
  { tagId: '8', tagName: 'Clue Scrolls', tagString: '', tagTags: [] },
  { tagId: '9', tagName: 'Food', tagString: '', tagTags: [] },
  { tagId: '10', tagName: 'Potions', tagString: '', tagTags: [] },
];

function BankTagContent() {
  return (
    <div className="content-container" style={{ gridArea: 'content' }}>
      <InputGroup className="search-bar" startElement={<LuSearch />}>
        <Input placeholder="Search Tabs..." />
      </InputGroup>
      <div className="tags-container">
        {testData.map((tag) => (
          <BankTagCard key={tag.tagName} data={tag} />
        ))}
      </div>
    </div>
  );
}

export default BankTagContent;
