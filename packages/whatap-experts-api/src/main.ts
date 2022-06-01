import { ApolloServer } from 'apollo-server';

import { environment } from './environment';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

(async function main() {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    introspection: environment.apollo.introspection,
  });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
