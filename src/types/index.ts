export interface CardType {
  id: string;
  image: string;
  isFlipped: boolean;
  canFlip: boolean;
  imageName: string;
}

export interface GameContextType {
  cards: CardType[];
  handleFlip: (card: CardType) => void;
  resetGame: () => void;
  choiceOne: CardType | null;
  choiceTwo: CardType | null;
}
