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
    FlatList
} from 'react-native';
import RoundedButton from '../components/RoundedButton';
import Coin from '../components/Coin';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


//Queries 
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

//Mutations
const ADD_COIN =gql`
  mutation AddCoin($symbol:String!){
    addCoin(symbol:$symbol){
      name
      symbol
      price
      imageUrl
      favorite
    }
    
  }
`;

const REMOVE_COIN =gql`
  mutation RemoveCoin($symbol:String!){
    removeCoin(symbol:$symbol){
      name
      symbol
      price
      imageUrl
      favorite
    }
    
  }
`;

export default function CoinDetail({ route, navigation }) {

   //CoinDetail is our new route
// params are being passed from the HomeScreen 
// params avalible to routes    
// [] houses mutations
// {} houses query
    const { data, refetch } = useQuery(FETCH_FAVORITES);

//    The useMutation result is a tuple ( [] ) with a mutate function in the first 
//    position and an object representing the mutation result in the second position
//    TUPLE
//      v
const [addCoin] = useMutation(ADD_COIN);
const [removeCoin] = useMutation(REMOVE_COIN);

    const { params } = route;
    const { coin } = params;
    const {symbol, name, price, imageUrl} = coin;
 // data.favorites.find(coin => coin.symbol == symbol) - if we find one bitcoin that matches our current coin we consider ita favorite              
  const isFavorite = data && data.favorites && data.favorites.find(coin => coin.symbol == symbol);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={{uri: imageUrl}} />
                <Text numberOfLines={1} style={styles.text}>
                  {symbol} - {name}
                </Text>
                  <RoundedButton
                    text={isFavorite ? `Remove ${name}` : `save ${name}`}
                    textColor="white"
                    backgroundColor="skyblue"
                    onPress={() => {
                      if (isFavorite) {
                    // call our mutation query REMOVE_COIN
                        removeCoin({ variables: { symbol } })
                        //handle new action, refetch FETCH_FAVORITES
                        .then(() => refetch())
                        .catch(err => console.log(err)) 
                      } else {
                        // call our mutation query ADD_COIN   
                        addCoin({ variables: { symbol } })
                           //handle new action, refetch FETCH_FAVORITES
                        .then(() => refetch())
                        .catch(err => console.log(err))
                      }
                    }}
                //    icon={<Ionicons name="md-checkmark-circle" size={20} color={primaryColor} style={styles.saveIcon} />}
                  />
               
            </View>
            <View style={styles.statRow}>
                <Text style={styles.text} numberOfLines={1}>Price</Text>
                <Text style={styles.text} numberOfLines={1}>{price}</Text>
            </View>


            <View style={styles.statsContainer}>
              {!!data && !!data.favorites && (
                <FlatList 
                data={data.favorites}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({item, index}) => (
                  <Coin 
                  coin={item}
                  // navigate to the current screen (Detail) but change its parameters with the item we selected 
                  onPress={() => navigation.navigate('Detail', {coin: item})}
                  />
                )}
                />
              )}
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
    fontSize: 22,
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

   