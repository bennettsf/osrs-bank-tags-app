import { Text } from '@chakra-ui/react';
import { CiImport } from 'react-icons/ci';
import { MdKeyboardArrowRight } from 'react-icons/md';

import './SideBar.css';
import { useState } from 'react';

interface SideBarProps {
  navItems: string[];
}

function SideBar({ navItems }: SideBarProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    setSelected(item);
  };
  return (
    <div className="sidebar-container">
      <Text className="sidebar-header">OSRS Bank Tabs</Text>
      <div className="sidebar-items">
        <ul>
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.replaceAll(' ', '')}`}
                onClick={() => handleSelect(item)}
                className={selected === item ? 'selected' : ''}
              >
                {item}
                <MdKeyboardArrowRight />
              </a>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <a href="#AllTags">
              Import Bank Tab
              <CiImport />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
