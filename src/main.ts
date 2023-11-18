
import { readFileSync } from 'fs';
import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import mongoose from 'mongoose';

import { resolvers } from './resolvers.js';
import { APIContext, getAPIContext } from './context.js';

dotenv.config();
const PORT = process.env.GRANTHPAL_PORT;
const MONGODB_URI = process.env.GRANTHPAL_MONGODB_URI;

await mongoose.connect(MONGODB_URI);

const app = express();
const httpServer = http.createServer(app);

const typeDefs = readFileSync('schema.gql').toString();
const server = new ApolloServer<APIContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => getAPIContext(req),
  }),
);

await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
console.log(`Listening on port: ${PORT}`);