import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function List(props) {

    const navigation = useNavigation();

 return (
   <View>
    <View style={styles.ViewImg}>
        <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
        <Image
        source={props.data.img}
        style={styles.ImgLoja}
        resizeMode='cover'
        />
        </TouchableOpacity>
        <View style={styles.info}>
            <Text style={styles.NomeLoja}>{props.data.nome}</Text>
            <Text style={styles.NomeLoja}>{props.data.avaliacao}</Text>
            <Text style={styles.NomeLoja}>{props.data.descricao}</Text>
            <Text style={styles.NomeLoja}>{props.data.lotacao}</Text>
        </View>   
    </View>

   </View>
  );
}

const styles = StyleSheet.create({
    ViewImg:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: 10,
        
    },
    ImgLoja:{
        width: 140,
        height: 100,
        borderRadius: 25,
    },
    NomeLoja:{      
        fontSize: 18,
        paddingLeft: 10,
    },

})