import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Header() {
  const navigation = useNavigation();

 return (
  
   <View style={styles.header}>
      <Image source={require('../../img/logo.png')} style={styles.image} />
     
      <TouchableOpacity
        onPress={() =>navigation.navigate('Signin')}
        
      >
      
    </TouchableOpacity>

    <TouchableOpacity style={styles.logarBotao}
       onPress={() =>navigation.navigate('Login')}
    >
    
    </TouchableOpacity>

   </View>
  );
}

const styles = StyleSheet.create({
    header:{
      height: 120,
      backgroundColor: '#FFB573',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      paddingLeft: 15,
      paddingRight:15,
      shadowColor: 'green',
      borderBottomWidth: 0.2,
      elevation: 30
    },
    image:{ 
      marginTop: 35
    },

})