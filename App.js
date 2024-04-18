import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Image, Text, SearchBar } from 'react-native-elements';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      setPokemonList(response.data.results);
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderPokemonCards = () => {
    return filteredPokemonList.map((pokemon) => (
      <Card key={pokemon.name} containerStyle={styles.card}>
        <Card.Title style={styles.name}>{pokemon.name}</Card.Title>
        <Image
          source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonIdFromUrl(pokemon.url)}.png` }}
          style={styles.image}
        />
      </Card>
    ));
  };
  
  // Función para extraer el ID del Pokémon de la URL
  const extractPokemonIdFromUrl = (url) => {
    const idRegex = /\/(\d+)\//;
    const match = url.match(idRegex);
    if (match && match[1]) {
      return match[1];
    } else {
      return '';
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar
        placeholder="Search Pokemon..."
        onChangeText={handleSearch}
        value={searchText}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchInput}
      />
      <View style={styles.row}>{renderPokemonCards()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  searchInput: {
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default App;
