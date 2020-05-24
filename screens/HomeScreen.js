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


// FlatList - ideal for rendering long lists of data
// Features: 
//    Auto-scroll
//    Index support
//    Immutable data source

const BITCOINS_QUERY = gql`
  query Bitcoins($offset: Int, $limit: Int) {
    bitcoins(offset: $offset, limit: $limit) {
      name
      imageUrl
      symbol
      price
    }
  }
`;

export default function HomeScreen(props) {
  // ONpress method will handle Navigation
  const { navigation } = props;

  const { data, fetchMore, error } = useQuery(BITCOINS_QUERY, {
    // Hard coding arugument data to be used as arguments for our graphql Query
    variables:{
      offset: 0,
      limit: 10,
    },
    fetchPolicy:'cache-and-network'
 //    FETCH POLICY is an option which allows you to specify how you want your component to interact with the Apollo data cache.   
//      -This fetch policy will have Apollo first trying to read data from your cache.
//      -If all the data needed to fulfill your query is in the cache then that data will be returned
  });

  if(!data || !data.bitcoins || error){
    console.log(error)
    return <ActivityIndicator styel={{ ...StyleSheet.absoluteFillObject }} />
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data.bitcoins}
        // KeyExtractor expects a str returned
        keyExtractor={(item, index) => {
          return `${index}`;
        }}     
        renderItem={(coin, index) => {
          const {item} = coin;
          // Every time we press on coin we navigate to Detail screen, and pass coin as a param({ coin: item }) 
            return <Coin 
            coin={item} 
            onPress={() => navigation.navigate('Detail', {coin: item})} />   
        }}
        //this will, determin how was user can scroll, till we fetch more coins
        onEndReachedThreshold={0.9}
          // Render more coins as user scrolls
        onEndReached={() => {
          // fetchMore, a hook responsible for fetching the next page of coins
          fetchMore({
            variables:{
              // current list of bitcoins
              offset: data.bitcoins.length
            },
            // prev - previous state of data
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;

            //   {}, is our target, the obj we will modify
            //  other arguments, are our source, which has the data to modify our target

            // we assign the previous state
            // and concatenate our previous state of coins with the new coins we just fetched
          
              return Object.assign({}, prev, {
                bitcoins: [...prev.bitcoins, ...fetchMoreResult.bitcoins]
              })
            }
          })
        }}
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