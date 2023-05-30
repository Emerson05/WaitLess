import React, { useEffect, useState }  from 'react';
import { View, Text , StyleSheet, TouchableOpacity} from 'react-native';

import Header from '../../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRoute, useNavigation} from '@react-navigation/native';

export default function Restaurant() {
  const { params } = useRoute();
  const [address, setAddres] = useState();
  const navigation = useNavigation();

  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [time, setTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  console.log(params);

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${params.latitude}&lon=${params.longitude}&format=json`
    ).then(async (request) => {
      const data = await request.json();

      setAddres(data);
     
    });
  }, []);

  const handleReservation = () => {
    navigation.navigate('Login');
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate && selectedDate >= new Date()) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
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

        <View style={styles.reserve}>
          <Text style={styles.subtitle2}>Faça sua reserva já</Text>

          <TouchableOpacity style={styles.button} onPress={openDatePicker}>
            <Text style={styles.Text}>Selecionar Data</Text>
          </TouchableOpacity>

          {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            />
           )}

          

          <TouchableOpacity style={styles.button} onPress={openTimePicker}>
          <Text style={styles.Text}>Selecionar Hora</Text>
          </TouchableOpacity>

          {showTimePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
           />
          )}

          
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login' )}>
          <Text style={styles.Text}>Reservar</Text>
          </TouchableOpacity>
          <View style={styles.datetime}>
          <Text style={styles.selectedDate}>{date ? date.toDateString() : ''}</Text>
          <Text style={styles.selectedTime}>{time}</Text>
          </View>
      </View>

  </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB573',
    padding: 20
  },
  row:{
    flexDirection: 'row'
  },
  title:{
    color: '#1C6750',
    fontSize: 26,
    fontWeight: 'bold'
  },
  subtitle:{
    color: '#1C6750',
    fontSize: 18,
    fontWeight: 'bold',
  
  },
  section:{
    color:'#1C6750',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 20,
    justifyContent: 'center'
  },
  Text:{
    color: '#1C6750',
    fontSize: 16,
  },
  button:{
    width: 160,
    height: 55,
    backgroundColor: '#E24141',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 25
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
  datetime:{
    flexDirection: 'row'
  },
  selectedDate: {
    fontSize: 16,
    marginTop: 10,
  },
  selectedTime: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10
  },
});