import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Image } from 'react-native-elements';

const PokemonCard = ({ name, imageUrl }) => {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.name}>{name}</Card.Title>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginVertical: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});

export default PokemonCard;
