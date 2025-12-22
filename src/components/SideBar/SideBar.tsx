import { Text } from '@chakra-ui/react';
import { CiImport } from 'react-icons/ci';
import { MdKeyboardArrowRight } from 'react-icons/md';

import './SideBar.css';

interface SideBarProps {
  navItems: string[];
}

function SideBar({ navItems }: SideBarProps) {
  return (
    <div className="sidebar-container">
      <Text className="sidebar-header">OSRS Bank Tabs</Text>
      <div className="sidebar-items">
        <ul>
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item.replaceAll(' ', '')}`}>
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
