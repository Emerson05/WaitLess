import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

export default function Signin() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    const userData = {
      fullName: fullName,
      email: email,
      password: password,
    };

    fetch('http://192.168.0.89:3000/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.validacao) {
          setErrorMessage('Email já cadastrado.');
        } else {
          // Navegue para a tela de login ou execute outras ações, se necessário
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        // Ocorreu um erro ao salvar o cadastro
        console.error(error);
      });
    
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../img/logo.png')} style={styles.logo} />

      <View>
        <Text style={styles.Text}> Nome Completo</Text>
        <TextInput style={styles.input} value={fullName} onChangeText={text => setFullName(text)} />
        <Text style={styles.Text}> Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={text => setEmail(text)} />
        <Text style={styles.Text}> Senha</Text>
        <TextInput style={styles.input} value={password} onChangeText={text => setPassword(text)} secureTextEntry />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

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
  },
  logo: {
    marginBottom: 30,
  },
  input: {
    borderRadius: 25,
    width: 300,
    height: 55,
    backgroundColor: '#BAC9C5',
    paddingLeft: 20,
    margin: 8,
  },
  Text: {
    marginLeft: 20,
    fontSize: 18,
    color: '#1C6750',
  },
  button: {
    backgroundColor: '#1C6750',
    width: 143,
    height: 45,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFFF',
  },
});
