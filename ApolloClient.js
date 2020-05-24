import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';


const BASE_URL = 'http://localhost:4000';

const httpLink = new HttpLink({
    uri: BASE_URL
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()  //What is InmemoryCache
});

export default client;