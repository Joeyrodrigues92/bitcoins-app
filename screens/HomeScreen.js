import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from 'react-native';
import Coin from '../components/Coin';

import { MonoText } from '../components/StyledText';


//DUMMY DATA

const coins = [{
  "id": 1,
  "name": "Bitcoin",
  "symbol": "BTC",
  "price": "$ 1,012.49",
  "imageUrl":"https://www.cryptocompare.com/media/19633/btc.png"
},
{
  "id": 2,
  "name": "Ethereum",
  "symbol": "ETH",
  "price": "$ 186.49",
  "imageUrl":"https://www.cryptocompare.com/media/20646/eth_logo.png",
},
{
  "id": 3,
  "name": "Litecoin",
  "symbol": "LTC",
  "price": "$ 72.52",
  "imageUrl": "https://www.cryptocompare.com/media/35309662/ltc.png"
}];


// FlatList - ideal for rendering long lists of data
// Features: 
//    Auto-scroll
//    Index support
//    Immutable data source

export default function HomeScreen(props) {
  // ONpress method will handle Navigation
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={coins}
        // KeyExtractor expects a str returned
        keyExtractor={(item, index) => {
          return `${index}`;
        }}     
        renderItem={(coin, index) => {
          const {item} = coin;
{/*         Every time we press on coin we navigate to Detail screen, and pass coin as a param({ coin: item }) */}
            return <Coin coin={item} onPress={() => navigation.navigate('Detail', {coin: item})} />   
          } 
        } 
      />
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: "Home",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 85
  },
});