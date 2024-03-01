"use client"

import Card from "@/components/ui/card"
import { AnimatePresence } from 'framer-motion';
import { CardData } from '@/types';
import { cardData } from '@/utils/data';
import { useState } from 'react';

export default function LinkUp() {
    const [cards, setCards] = useState<CardData[]>(cardData);
    const [rightSwipe, setRightSwipe] = useState(0);
    const [leftSwipe, setLeftSwipe] = useState(0);
  
    const activeIndex = cards.length - 1;
    const removeCard = (id: number, action: 'right' | 'left') => {
      setCards((prev) => prev.filter((card) => card.id !== id));
      if (action === 'right') {
        setRightSwipe((prev) => prev + 1);
      } else {
        setLeftSwipe((prev) => prev + 1);
      }
    };
    return (
        <div className="relative flex h-screen w-full items-end justify-center overflow-hidden bg-white text-textGrey">
          <AnimatePresence>
            {cards.length ? (
              cards.map((card) => (
                <Card
                  key={card.id}
                  data={card}
                  active={card.id === activeIndex}
                  removeCard={removeCard}
                />
              ))
            ) : (
              <h2 className="absolute z-10 self-center text-center text-2xl font-bold text-textGrey ">
                Excessive swiping can be injurious to health!
                <br />
                Come back tomorrow for more
              </h2>
            )}
          </AnimatePresence>
        </div>
      );
}