import React, { useState } from 'react';
// Optional: try the useRoute() hook to recieve params.
// import { useRoute } from '@react-navigation/native'; 
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';

export default function CoinDetail({ route }) {

   //CoinDetail is our new route
// we infer route is part of prop
// params are being passed from the HomeScreen 
    const { params } = route;
    const { coin } = params;
    const {
        symbol,
        name,
        price,
        imageUrl,
    } = coin;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={{uri: imageUrl}} />
                <Text numberOfLines={1} style={styles.text}>{symbol} - {name}</Text>
            </View>
            <View style={styles.statsContainer}>
                <ScrollView>
                    <View style={styles.statRow}>
                        <Text style={styles.stat} numberOfLines={1}>Price</Text>
                        <Text style={styles.stat} numberOfLines={1}>{price}</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flex: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#161616',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  statsContainer: {
    flex: 62,
    backgroundColor: '#161616',
  },
  statRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

   