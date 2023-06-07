import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.header}>
      <Image source={require('../../img/logo.png')} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Buscar um Restautante"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 180,
    backgroundColor: '#FFB573',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: 'green',
    borderBottomWidth: 0.2,
    elevation: 30,
  },
  image: {
    marginTop: 40,
   
  },
  input: {
    borderRadius: 25,
    width: 320,
    height: 40,
    backgroundColor: '#FFF',
    paddingLeft: 20,
    marginTop: 10,
  },
});
