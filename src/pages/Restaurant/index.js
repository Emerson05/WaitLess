import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { format, isBefore, isWeekend } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import moment from 'moment';

export default function Restaurant() {
  const { params } = useRoute();
  const [address, setAddres] = useState();
  const navigation = useNavigation();

  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [time, setTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [randomCapacity1, setRandomCapacity1] = useState(0);
  const [randomCapacity2, setRandomCapacity2] = useState(0);

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${params.latitude}&lon=${params.longitude}&format=json`
    ).then(async (request) => {
      const data = await request.json();

      setAddres(data);
    });

    generateRandomCapacity();
  }, []);

  const generateRandomCapacity = () => {
    const minCapacity = 0;
    const maxCapacity = 100;

    const newRandomCapacity1 = Math.floor(Math.random() * (maxCapacity - minCapacity + 1)) + minCapacity;
    const newRandomCapacity2 = Math.floor(Math.random() * (maxCapacity - newRandomCapacity1 + 1)) + newRandomCapacity1;

    setRandomCapacity1(newRandomCapacity1);
    setRandomCapacity2(newRandomCapacity2);
  };

  const handleReservation = () => {
    navigation.navigate('Login');
    generateRandomCapacity();
  };
  const currentDate = new Date();
  const maximumDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());





  
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };
  
  const formatDate = (date) => {
    if(date){
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }
  return '';
  };


  const minTimeParts = params.hours.split(' - ')[0].split(':');
  const maxTimeParts = params.hours.split(' - ')[1].split(':');
  const minHour = parseInt(minTimeParts[0]);
  const minMinute = parseInt(minTimeParts[1]);
  const maxHour = parseInt(maxTimeParts[0]);
  const maxMinute = parseInt(maxTimeParts[1]);

  const handleTimeChange = (event, selectedTime) => {
    if (event.type !== 'dismissed' && selectedTime) {
      const selectedDateTime = new Date(selectedTime);
      const minTime = new Date();
      minTime.setHours(minHour, minMinute, 0);
      const maxTime = new Date();
      maxTime.setHours(maxHour, maxMinute, 0); 
  
      if (selectedDateTime < minTime) {
        setTime(null);
        const formattedMinMinute = minMinute.toString().padStart(2, '0');
        Alert.alert('Horário inválido', `Selecione um horário posterior a ${minHour}:${formattedMinMinute}`);
      } else if (selectedDateTime > maxTime) {
        setTime(null);
        const formattedMaxMinute = maxMinute.toString().padStart(2, '0');
        Alert.alert('Horário inválido', `Selecione um horário anterior a ${maxHour}:${formattedMaxMinute}`);
      } else {
        setTime(selectedDateTime);
      }
    }
  
    setShowTimePicker(false);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const openTimePicker = () => {
    setShowTimePicker(true);
  };

  return (

  <View style={styles.container}> 

    <Text style={styles.title} >{params.name}</Text>
    <Text style={styles.section} >Descrição</Text>
    <Text style={styles.subtitle} >{params.description}</Text>

    <Text style={styles.section} >Endereço</Text>

    <Text style={styles.Text} >{address?.address.road},
      <Text style={[styles.Text, styles.row]} > {address?.address.city}.</Text>
    </Text>

    <Text style={[styles.Text, styles.row]} >{address?.address.postcode},
      <Text style={styles.Text} > {address?.address.state}.</Text>
    </Text>
                                                                              
    <Text style={styles.section} >Contato</Text>
    <Text style={styles.Text} >{params.contact}</Text>

    <Text style={styles.section} >Horário de Funcionamento</Text>
    <Text style={styles.Text} >{params.hours}</Text>

    <Text style={styles.section} >Lotação</Text>
    <Text style={styles.Text}>{randomCapacity1}/{randomCapacity2}</Text>

    <View style={styles.reserve}>
      <Text style={styles.subtitle2}>Faça sua reserva já</Text>

      <MaterialCommunityIcons name='calendar-month' size={50} marginTop= {10}>
        <TouchableOpacity style={styles.button} onPress={openDatePicker}>
          <Text style={styles.Text}>Selecionar Data</Text>
        </TouchableOpacity>
      </MaterialCommunityIcons>

          {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            locale='pt-BR'
            minimumDate={new Date()}
            maximumDate={maximumDate}
            disabledDates={(date) => isDateDisabled(date)}
            onChange={handleDateChange}
            />
           )}

      <MaterialCommunityIcons name='clock-edit' size={50} marginTop= {10}>
        <TouchableOpacity style={styles.button} onPress={openTimePicker}>
          <Text style={styles.Text}>Selecionar Hora</Text>
        </TouchableOpacity>
      </MaterialCommunityIcons>

          {showTimePicker && (
          <DateTimePicker
            value={time || new Date()}
            mode="time"
            display="default"
            minimumDate={new Date()}
            onChange={handleTimeChange}
           />
          )}
          
      <MaterialCommunityIcons name='food-turkey' size={50} marginTop= {10}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login' )}>
          <Text style={styles.Text}>Reservar</Text>
        </TouchableOpacity>
      </MaterialCommunityIcons>

          
          <Text style={styles.selectedDate}>{date ? `Sua reserva é dia ${formatDate(date)}` : ''}</Text>
          <Text style={styles.selectedTime}>{time ? `Às ${format(time, 'HH:mm')} horas` : ''}</Text>
          </View>
    

  </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    padding: 10
  },
  row:{
    flexDirection: 'row'
  },
  title:{
    color: '#1C6750',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:70,

  },
  subtitle:{
    color: '#1C6750',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:20,

  
  },
  section:{
    color:'#1C6750',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 35,
    justifyContent: 'center'
  },
  Text:{
    color: '#1C6750',
    fontSize: 16,
  },
  button:{
    width: 150,
    height: 50,
    backgroundColor: '#BAC9C5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    
  },
  reserve:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  subtitle2:{
    color: '#1C6750',
    fontSize: 18,
    fontWeight: 'bold',
  },

  selectedDate: {
    justifyContent: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  selectedTime: {
    fontSize: 16,
    marginTop: 10,
  },
});