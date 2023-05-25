import React from 'react';
import { View, Text,Image, StyleSheet,TextInput, TouchableOpacity,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import Header from '../../components/Header';

export default function Login() {
  const navigation = useNavigation();
 return (
  <View style={styles.container}>


 
      <Image 
        source={require('../../img/logo.png')}
        style={styles.logo}
      />
       
      <View>
          <Text style={styles.Text}> Email</Text>
          <TextInput style={styles.input}></TextInput>
          <Text style={styles.Text}> Senha</Text>
          <TextInput style={styles.input}></TextInput>

      </View>

      <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity   onPress={() =>navigation.navigate('Signin')} >
        <Text style={styles.Textocadastrar}>Não Possui uma conta ? Cadastre-se</Text>
      </TouchableOpacity>

    
     
      


      <StatusBar style="auto" />
      
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle:'italic',
  },
  logo:{
    
  },
  input:{ 
    borderRadius: 25,
    width: 300,
    height: 55, 
    backgroundColor: '#BAC9C5',
    paddingLeft: 20,
    margin:8,
    
  },
  Text:{
    marginLeft: 20,
    fontSize:18,
    color:'#1C6750',
   
  },
  button:{
    backgroundColor:'#1C6750',
    width:143,
    height:45,
    borderRadius: 20,
    display:'flex',
    justifyContent: 'center',
    marginTop: 25
  },
  buttonText:{
    alignSelf:'center',
    color:'#FFFF'
    

  },
   logo:{
    marginBottom:30
  },
  Textocadastrar:{
    marginTop:20,
    fontStyle:'italic',
    fontSize:16,
    color:'#1C6750',
    
  }

  
});