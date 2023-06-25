import React, {useContext, VFC} from 'react';
import {FlatList, View} from 'react-native';
import {GameContext} from '../GameContext';
import Card from './Card';

const GameBoard: VFC = () => {
  const {cards} = useContext(GameContext);

  return (
    <View>
      {/* FlatList used here just to make it easier to render the cards in a grid. */}
      {/* It's perfectly fine to use just a View and map over the cards array. */}
      <FlatList
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        data={cards}
        renderItem={({item}) => <Card card={item} key={item.id} />}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

export default GameBoard;
