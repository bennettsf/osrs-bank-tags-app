import BankTagContent from '@/components/BankTagContent/BankTagContent';
import SideBar from '@/components/SideBar/SideBar';
import './HomePage.css';
import { useState } from 'react';
import { TagsEnum } from '@/types';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const navItems = ['', ...TagsEnum.options];

  return (
    <div className="home-container">
      <SideBar
        navItems={navItems} // '' represents 'All Tags'
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BankTagContent selectedCategory={selectedCategory} />
    </div>
  );
}

export default HomePage;
