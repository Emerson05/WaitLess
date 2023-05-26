import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };

    fetch('http://192.168.0.89:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.validacao) {
          // Login bem-sucedido
          navigation.navigate('First');
        } else {
          // Credenciais inválidas
          setErrorMessage('Email ou senha Invalida.');
        }
      })
      .catch(error => {
        // Ocorreu um erro durante a autenticação
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../img/logo.png')} style={styles.logo} />

      <View>
        <Text style={styles.Text}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.Text}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.Textocadastrar}>
          Não possui uma conta? Cadastre-se
        </Text>
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
    fontStyle: 'italic',
  },
  logo: {},
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
  logo: {
    marginBottom: 30,
  },
  Textocadastrar: {
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 16,
    color: '#1C6750',
  },
});
