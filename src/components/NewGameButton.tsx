import {Button} from 'react-native';
import React, {ReactElement, useContext} from 'react';
import {GameContext} from '../GameContext';

const NewGameButton = (): ReactElement => {
  const {resetGame} = useContext(GameContext);
  return <Button onPress={resetGame} title="New Game" />;
};
export default NewGameButton;
