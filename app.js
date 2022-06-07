import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';

import graphQlSchema from './graphql/schema/index.js';
import graphQlResolvers from './graphql/resolvers/index.js';
import isAuth from './middleware/is-auth.js';

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

app.use(isAuth);

mongoose
  .connect(
   `mongodb+srv://jonabsfx:XwLsbt7KfaxjCoUZ@database.m0skrmk.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });