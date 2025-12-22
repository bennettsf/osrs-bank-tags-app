import { Button } from '@chakra-ui/react';
import './BankTagCard.css';
import type { BankTagData } from '@/types';
import { FaRegCopy } from 'react-icons/fa6';

interface BankTagCardProps {
  data: BankTagData;
}

function BankTagCard({ data }: BankTagCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(data.tagString);
  };

  return (
    <div className="bank-tag-card">
      {data.tagName}
      <Button onClick={handleCopy} className="copy-button">
        Import String <FaRegCopy />
      </Button>
    </div>
  );
}

export default BankTagCard;
