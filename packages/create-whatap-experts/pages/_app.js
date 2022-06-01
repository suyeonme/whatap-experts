import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
