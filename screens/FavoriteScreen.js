import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Coin from '../components/Coin';
import { MonoText } from '../components/StyledText';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

//queries
const FETCH_FAVORITES =gql`
  query {
    favorites {
      name
      price
      symbol
      imageUrl
      favorite
    }
  }
`;



export default function HomeScreen({ navigation }) {

  const { data, error } = useQuery(FETCH_FAVORITES, {
    fetchPolicy:'cache-and-network'
  });


  if(!data || !data.favorites || error){
    console.log(error)
    return <ActivityIndicator styel={{ ...StyleSheet.absoluteFillObject }} />
  }


  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data.favorites}
        keyExtractor={(item, index) => {
          return `${index}`;
        }}     
        renderItem={(coin, index) => {
          const {item} = coin;
            return <Coin 
            coin={item} 
            onPress={() => navigation.navigate('Detail', {coin: item})} />   
        }}
      />
    </View>
  );
}

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