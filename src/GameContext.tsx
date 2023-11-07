import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ComponentType,
} from 'react';
import {shuffleArray} from './utils/shuffleArray';
import {CardType, GameContextType} from './types';
import nTester from '../images/tileImages/01_Yara-NTester.png';
import yaraTera from '../images/tileImages/02_YaraTera.png';
import yaraBela from '../images/tileImages/03_YaraBela.png';
import yaraVita from '../images/tileImages/04_YaraVita.png';

export const GameContext = createContext<GameContextType>(
  {} as GameContextType,
);

const cardImages: Record<string, any> = {
  nTester,
  yaraTera,
  yaraBela,
  yaraVita,
};

const keys = Object.keys(cardImages);

const cardArray = keys
  .flatMap(key => {
    return Array(2).fill({
      image: cardImages[key],
      isFlipped: false,
      canFlip: true,
      imageName: key,
    });
  })
  .map((card, i) => ({...card, id: `card-${i}`}));

export const GameProvider: ComponentType = ({children}) => {
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);

  const [cards, setCards] = useState<CardType[]>([]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    setCards(shuffleArray(cardArray));
    resetTurn();
  }, []);

  const resetGame = useCallback(() => {
    setCards(shuffleArray(cardArray));
    resetTurn();
  }, []);

  const handleFlip = useCallback(
    (card: CardType) => {
      if (choiceOne?.id !== card.id) {
        if (choiceOne) {
          setChoiceTwo(card);
        } else {
          setChoiceOne(card);
        }
      }
    },
    [choiceOne],
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (choiceOne && choiceTwo && choiceOne.id !== choiceTwo.id) {
      if (choiceOne.imageName === choiceTwo.imageName) {
        setCards(prev =>
          prev.map(card => {
            return card.imageName === choiceOne.imageName
              ? {...card, canFlip: false}
              : card;
          }),
        );
        resetTurn();
      } else {
        timeoutId = setTimeout(() => resetTurn(), 2000);
      }
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [choiceOne, choiceTwo]);

  const value = useMemo(() => {
    return {
      cards,
      handleFlip,
      resetGame,
      choiceOne,
      choiceTwo,
    };
  }, [cards, handleFlip, resetGame, choiceOne, choiceTwo]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
