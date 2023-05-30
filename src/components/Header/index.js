import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Header() {
  const navigation = useNavigation();

 return (
  
   <View style={styles.header}>
    <Image source={require('../../img/logo.png')} style={styles.image} />

   </View>
  );
}

const styles = StyleSheet.create({
    header:{
      height: 80,
      backgroundColor: '#FFB573',
      alignItems: 'center',
      justifyContent:'center',
      paddingLeft: 15,
      paddingRight:15,
      shadowColor: 'green',
      borderBottomWidth: 0.2,
      elevation: 30
    },
    input:{ 
      borderRadius: 25,
      width: 320,
      height: 40, 
      backgroundColor: '#FFFF',
      paddingLeft: 20,
      marginTop:25,
      marginLeft: 20
    },

    lupa:{
      height:30,
      marginTop:30,
      width:20

    },
  
   
 
})