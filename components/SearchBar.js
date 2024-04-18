import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const SearchBarComponent = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleChangeText = (text) => {
    setSearchText(text);
    handleSearch(text);
  };

  return (
    <View style={styles.searchContainer}>
      <Icon name="search" type="material" color="#000" />
      <TextInput
        placeholder="Search Pokémon..."
        value={searchText}
        onChangeText={handleChangeText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});

export default SearchBarComponent;
