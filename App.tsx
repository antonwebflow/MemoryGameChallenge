import React from 'react';
import {SafeAreaView} from 'react-native';
import {GameProvider} from './src/GameContext';
import GameBoard from './src/components/GameBoard';
import NewGameButton from './src/components/NewGameButton';

const App = () => {
  return (
    <SafeAreaView>
      <GameProvider>
        <NewGameButton />
        <GameBoard />
      </GameProvider>
    </SafeAreaView>
  );
};

export default App;
