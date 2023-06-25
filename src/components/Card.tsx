import React, {ReactElement, useContext} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {CardType} from '../types';
import {GameContext} from '../GameContext';
import defaultCardImage from '../../images/tileImages/09_YaraPrideLogo.png';

const Card = ({card}: {card: CardType}): ReactElement => {
  const {handleFlip, choiceOne, choiceTwo} = useContext(GameContext);

  const onPress = () => {
    if (card.canFlip) {
      handleFlip(card);
    }
  };

  const isFlipped =
    card.id === choiceOne?.id || card.id === choiceTwo?.id || !card.canFlip;

  const cardImage = isFlipped ? card.image : defaultCardImage;

  return (
    <TouchableOpacity
      disabled={!card.canFlip || (Boolean(choiceTwo) && Boolean(choiceOne))}
      style={styles.card}
      onPress={onPress}>
      <Image style={styles.image} source={cardImage} />
    </TouchableOpacity>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: windowHeight * 0.2, // Set height to 20% of the screen height.
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Card;
