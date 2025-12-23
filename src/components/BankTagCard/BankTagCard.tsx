import { Button, Text } from '@chakra-ui/react';
import './BankTagCard.css';
import type { BankTagData } from '@/types';
import { FaRegCopy } from 'react-icons/fa6';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { useState } from 'react';

interface BankTagCardProps {
  data: BankTagData;
}

function BankTagCard({ data }: BankTagCardProps) {
  const [likedItems, setLikedItems] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem(`liked`) || '[]')
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(data.tagString);
  };

  const handleLike = (tagId: string) => {
    if (likedItems.includes(tagId)) {
      const updatedItems = likedItems.filter((id: string) => id !== tagId);
      setLikedItems(updatedItems);
      localStorage.setItem(`liked`, JSON.stringify(updatedItems));
    } else {
      const updatedItems = [...likedItems, tagId];
      setLikedItems(updatedItems);
      localStorage.setItem(`liked`, JSON.stringify(updatedItems));
    }
  };

  const isLiked = likedItems.includes(data.tagId);

  return (
    <div className="bank-tag-card">
      <Text className="unselectable-text">{data.tagName}</Text>
      <div className="card-footer">
        <Button onClick={handleCopy} className="copy-button">
          Import String <FaRegCopy />
        </Button>
        {isLiked ? (
          <IoMdHeart onClick={() => handleLike(data.tagId)} className="like-button" />
        ) : (
          <IoMdHeartEmpty onClick={() => handleLike(data.tagId)} className="like-button" />
        )}
      </div>
    </div>
  );
}

export default BankTagCard;
