require('../../services/env');

import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import startDB from './src/db';
import schema from './src/graphql/schema';
import loadFactory from './test/loadFactory';

const startApp = async () => {
  /*
    Set up your express app & any custom routes
  */
  const app:any = express();


  app.get('/hello', (req, res) => {
    res.send('world');
  });


  /*
    Set up your DB
  */
  const db = await startDB();


  app.db = db;

  /*
    Set up your graphql server
  */
  const apollo = new ApolloServer({
    schema,
    context: async (/* { req } */) => ({
      // EXAMPLE: Auth
      // authScope: get(req.headers.authorization),
      // EXAMPLE: Database
      db,
      // EXAMPLE: Stub Context
      // useStubResolver: process.env.USE_STUBS ? true : false,
    }),
    tracing: true,
  });

  apollo.applyMiddleware({ app });

  return app;

}

export const appWithFactory = async () => {
  const app = await startApp();
  app.factory = await loadFactory(app.db);

  return app;
}

export default startApp;
