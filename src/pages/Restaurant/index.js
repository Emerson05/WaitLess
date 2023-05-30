import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';


export default function Restaurant({ route }) {
  const { restaurant } = route.params;
  const [capacity, setCapacity] = useState({ total: 0, occupied: 0 });
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const randomTotal = Math.floor(Math.random() * 100) + 1;
    const randomOccupied = Math.floor(Math.random() * (randomTotal + 1));
    setCapacity({ total: randomTotal, occupied: randomOccupied });
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
      <Image source={require('../../img/logo.png')} style={styles.image} />
      <Text style={styles.name}>{restaurant.name}</Text>

      <View style={styles.capacityContainer}>
        <Text style={styles.capacityText}>
          Capacidade: {capacity.occupied} / {capacity.total}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={openDatePicker}>
        <Text style={styles.buttonText}>Selecionar Data</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.selectedDate}>{date ? date.toDateString() : ''}</Text>

      <TouchableOpacity style={styles.button} onPress={openTimePicker}>
        <Text style={styles.buttonText}>Selecionar Hora</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Text style={styles.selectedTime}>{time}</Text>

      <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
        <Text style={styles.reserveButtonText}>Reservar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1C6750',
  },
  capacityContainer: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  capacityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C6750',
  },
  image: {
    width: 210,
    height: 50,
    marginBottom: 20,
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
  selectedDate: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  selectedTime: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  reserveButton: {
    backgroundColor: '#1C6750',
    width: 143,
    height: 45,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  reserveButtonText: {
    alignSelf: 'center',
    color: '#FFFF',
  },
});
