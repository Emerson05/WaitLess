import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import customPin from '../../img/pinres.png';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from 'expo-location';

import Header from '../../components/Header';

export default function First() {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const myRef = useRef();
  const navigation = useNavigation();

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);

      console.log('Localização atual:', currentPosition);
    }
  }

  async function fetchNearbyRestaurants() {
   
    const data  = [
      {
        name: 'Pizzaria Atlântico Graças',
        latitude: -8.04735455906393,
        longitude: -34.89940581682921,
        description: 'A Pizzaria Atlântico Graças oferece uma ampla variedade de pizzas deliciosas, preparadas com ingredientes frescos e de alta qualidade.' ,
        contact: '(81) 1234-5678',
        hours: '18:00 - 23:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
      },
      {
        name: 'O Pátio Café',
        latitude: -8.050416430574648,
        longitude: -8.050416430574648,
        description: 'O Pátio Café é um charmoso café localizado em um ambiente aconchegante e tranquilo. Nossos clientes desfrutam de uma variedade de opções de café, chás, sucos naturais e deliciosos lanches. Nosso cardápio inclui sanduíches, saladas frescas e opções vegetarianas, preparadas com ingredientes de alta qualidade. Além disso, temos uma seleção de bolos e sobremesas caseiras que certamente irão satisfazer seu paladar. Venha relaxar e desfrutar de momentos agradáveis no O Pátio Café!',
        contact: '(81) 9876-5432',
        hours: '08:00 - 18:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'],
      },

      {
        name: 'Restaurante Xodó Nordestino',
        latitude: -8.071338631737113, 
        longitude: -34.92736750154064,
        description: 'Lanches, sopas e pratos típicos da culinária nordestina, além de doces, em espaço simples com clima familiar.',
        contact: '(81)28282828',
        hours: '17:00 - 22:00',
        days: [
          'Segunda-feira',
          'Terça-feira',
          'Quarta-feira',
          'Quinta-feira',
          'Sexta-feira',
          'Sábado',
        ],
        capacity: '14/50'
      },

      {
        name: 'Tá Danado de Bom',
        latitude:-8.076984271529266,  
        longitude: -34.917950845280025,
        description: 'Comida danada de bom baiana delicia',
        contact: '(81)92929292',
        hours: '15:00 - 18:30',
        days: [
          'Segunda-feira',
          'Terça-feira',
          'Quarta-feira',
          'Quinta-feira',
          'Sexta-feira',
          'Sábado',
        ]
      },

      {
        name: 'Ponte Nova',
        latitude: -8.045725413575653,
        longitude: -34.89472385377168,
        description: 'O Restaurante Ponte Nova é famoso por suas deliciosas opções de frutos do mar. Localizado às margens de um belo rio, oferecemos um ambiente encantador para desfrutar de refeições memoráveis.',
        contact: '(81)92425292',
        hours: '11:30 - 23:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
      },
      {
        name: 'Restaurante La Suíça',
        latitude: -8.057623477746816,
        longitude: -34.885680143336835,
        description: 'O Restaurante La Suíça é conhecido por sua culinária suíça autêntica e atmosfera aconchegante. ',
        contact: '(81)92425292',
        hours: '10:30 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },
      {
        name: 'Restaurante Leite',
        latitude: -8.064446616593981,
        longitude: -34.88045026291869,
        description: 'O Restaurante Leite é conhecido por seus pratos tradicionais da culinária brasileira. ',
        contact: '(81)92425292',
        hours: '9:30 - 19:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },
      {
        name: 'Recanto da Ilha',
        latitude: -8.065129469721954,
        longitude: -34.894035455699246,
        description: 'O Recanto da Ilha é um restaurante especializado em frutos do mar frescos e saborosos. ',
        contact: '(81)92425292',
        hours: '11:30 - 21:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },
      {
        name: 'Restaurante Miúra',
        latitude: -8.057153527817967,
        longitude: -34.902877865890716,
        description: 'O Restaurante Miúra é conhecido por sua culinária japonesa autêntica e criativa. ',
        contact: '(81)92425292',
        hours: '12:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },

      {
        name: 'Dona Salsa',
        latitude:  -8.063712091253322, 
        longitude: -34.89682728652962,
        description: 'Sabor local autêntico. ',
        contact: '(81)92425292',
        hours: '12:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']

      },
      {
        name: 'Cais Restaurante',
        latitude: -8.063655368554688, 
        longitude: -34.89569590556093,
        description: 'Vista e sabores incríveis. ',
        contact: '(81)92425292',
        hours: '10:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },

      {
        name: 'Restaurante Mamulengo',
        latitude:   -8.063563534920352, 
        longitude:  -34.89411001173292,
        description: ' Comida regional tradicional.',
        contact: '(81)92425292',
        hours: '10:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },

      {
        name: 'Bar do Céu',
        latitude:  -8.059636390249812, 
        longitude: -34.89125463884226,
        description: 'Drinks e descontração.',
        contact: '(81)92425292',
        hours: '10:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },

      {
        name: 'Hora Extra Bar e Comedoria',
        latitude:  -8.06093806786088,
        longitude: -34.88863775482893,
        description: 'Petiscos e diversão.',
        contact: '(81)92425292',
        hours: '08:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },
      {
        name: 'Bar Do Vizinho ',
        latitude: -8.063302463209553,
        longitude:  -34.888218644332156,
        description: 'Comida e bebida caseiras.',
        contact: '(81)92425292',
        hours: '08:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },

      {
        name: 'Morgana Bar',
        latitude:   -8.058229091611665, 
        longitude:  -34.88551657994887,
        description: 'Coquetéis e charme',
        contact: '(81)92425292',
        hours: '11:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },
      {
        name: 'Lisbela e Prisioneiros Bar',
        latitude:  -8.061982602975418, 
        longitude:  -34.887795805953424,
        description: 'Música e drinks',
        contact: '(81)92425292',
        hours: '12:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },
      {
        name: 'Bar Restaurante Santa Cruz ',
        latitude:  -8.062029894858004,
        longitude: -34.88754151427333,
        description: 'Comida e bebida em harmonia.',
        contact: '(81)92425292',
        hours: '08:00 - 18:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },

      {
        name: 'Aquarios Pub',
        latitude:  -8.059258467600046, 
        longitude: -34.89240275798854,
        description: 'Música e coquetéis.',
        contact: '(81)92425292',
        hours: '09:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },

      {
        name: 'Pajubar',
        latitude:  -8.059309612144833, 
        longitude: -34.891499861842135,
        description: 'Ambiente descontraído.',
        contact: '(81)92425292',
        hours: '10:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },
      {
        name: 'Bar Chora Menino',
        latitude:  -8.059274150782027,
        longitude: -34.89422908110454,
        description: 'Noite animada',
        contact: '(81)92425292',
        hours: '18:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      },

      {
        name: 'Aconchego do Matuto',
        latitude:    -8.061913555178839,
        longitude:   -34.89510317164414,
        description: 'Petiscos e diversão.',
        contact: '(81)92425292',
        hours: '08:00 - 22:00',
        days: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
      }
    ];

    setRestaurants(data);
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyRestaurants();
    }
  }, [location]);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation(response);
        myRef.current?.animateCamera({
          center: response.coords,
        });
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      {location && (
        <MapView
          style={styles.map}
          ref={myRef}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />

          {restaurants.map((restaurant, index) => (
            <Marker
              pinColor='blue'
              key={index}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}
              image={customPin}
              title={restaurant.name}
              onPress={() => navigation.navigate('Restaurant',  restaurant )}
            />
          ))}

        
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
