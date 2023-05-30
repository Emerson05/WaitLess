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
        longitude: -34.89940581682921
      },
      {
        name: 'O Pátio cafe ',
        latitude: -8.050416430574648, 
        longitude: -8.050416430574648,
      },

      {
        name: 'Restaurante Xodó Nordestino',
        latitude: -8.071338631737113, 
        longitude: -34.92736750154064,
        description: 'xodo do nordeste comida caseira delicia',
        contact: 8128282828
      },

      {
        name: 'Ponte Nova',
        latitude: -8.045725413575653, 
        longitude: -34.89472385377168
      },
      {
        name: 'Restaurante La Suíça ',
        latitude: -8.057623477746816,
        longitude: -34.885680143336835 
      },

      {
        name: 'Restaurante Leite',
        latitude:  -8.064446616593981, 
        longitude: -34.88045026291869
      },
      {
        name: 'Recanto da Ilha',
        latitude:  -8.065129469721954,
        longitude:  -34.894035455699246
      },
      {
        name: 'Restaurante Miúra ',
        latitude: -8.057153527817967, 
        longitude: -34.902877865890716,
      },

      {
        name: 'Tá Danado de Bom',
        latitude:-8.076984271529266,  
        longitude: -34.917950845280025,
        description: 'Comida danada de bom baiana delicia',
        contact: 8192929292
      },

      {
        name: 'Dona Salsa',
        latitude:  -8.063712091253322, 
        longitude: -34.89682728652962
      },
      {
        name: 'Cais Restaurante',
        latitude: -8.063655368554688, 
        longitude: -34.89569590556093
      },

      {
        name: 'Restaurante Mamulengo',
        latitude:   -8.063563534920352, 
        longitude:  -34.89411001173292
      },

      {
        name: 'Bar do Céu',
        latitude:  -8.059636390249812, 
        longitude: -34.89125463884226
      },

      {
        name: 'Hora Extra Bar e Comedoria',
        latitude:  -8.06093806786088,
        longitude: -34.88863775482893
      },
      {
        name: 'Bar Do Vizinho ',
        latitude: -8.063302463209553,
        longitude:  -34.888218644332156
      },

      {
        name: 'Morgana Bar',
        latitude:   -8.058229091611665, 
        longitude:  -34.88551657994887
      },
      {
        name: 'Lisbela e Prisioneiros Bar',
        latitude:  -8.061982602975418, 
        longitude:  -34.887795805953424
      },
      {
        name: 'Bar Restaurante Santa Cruz ',
        latitude:  -8.062029894858004,
        longitude: -34.88754151427333
      },

      {
        name: 'Aquarios Pub',
        latitude:  -8.059258467600046, 
        longitude: -34.89240275798854
      },

      {
        name: 'Pajubar',
        latitude:  -8.059309612144833, 
        longitude: -34.891499861842135
      },
      {
        name: 'Bar Chora Menino',
        latitude:  -8.059274150782027,
        longitude: -34.89422908110454
      },

      {
        name: 'Aconchego do Matuto',
        latitude:    -8.061913555178839,
        longitude:   -34.89510317164414
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
