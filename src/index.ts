import '@babel/polyfill';
import * as dotenv from 'dotenv';
dotenv.config();
import createApolloServer from './graphql/createApolloServer';

// eslint-disable-next-line no-console
console.log('Starting GraphQL Server');

const server = createApolloServer();

server.listen(process.env.PORT).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀  Server ready at ${subscriptionsUrl}`);
});
