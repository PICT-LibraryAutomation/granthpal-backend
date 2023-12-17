
import http from 'http';
import fs from 'fs';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import pino from 'pino';

import { resolvers } from './resolvers.js';
import { APIContext, getAPIContext } from './context.js';
import { login } from './auth/login.js';
import { logout } from './auth/logout.js';
import { createUser } from './auth/createUser.js';

// Load .env file
dotenv.config();

// Initialize application logger
let Logger: pino.Logger;
if (process.env.GRANTHPAL_ENV === 'dev') {
  // Pretty-print in dev mode
  Logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
} else if (process.env.GRANTHPAL_ENV === 'prod') {
  // File-logger in prod mode
  Logger = pino(pino.destination({
    fsync: true,
    fd: fs.openSync('./logs.txt', 'a')
  }));
} else {
  // Exit if invalid mode provided
  pino().fatal('Invalid env mode provided');
  process.exit();
}

const PORT = process.env.GRANTHPAL_PORT || 5000;
const MONGO_URI = process.env.GRANTHPAL_MONGO_URI;
if (!MONGO_URI) {
  Logger.fatal('MongoDB URI not provided');
  process.exit();
}

// Connect to Database
try {
  await mongoose.connect(MONGO_URI);
  Logger.info('Connection established with Database');
} catch (e) {
  Logger.fatal(`Could not connect to the Database.\n${e}`);
  process.exit();
}

// Initialize HTTP-server
const app = express();
const httpServer = http.createServer(app);

// Initialize Apollo-Server
const typeDefs = fs.readFileSync('schema.gql').toString('utf8');
const server = new ApolloServer<APIContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// Use CORS, JSON Body-Parser and Cookie-Parser on all routes
app.use('*', cors<cors.CorsRequest>(), express.json(), cookieParser());

// Tell express to use apollo-server
app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req, res }) => await getAPIContext(req, res, Logger),
  }),
);

// Home-route
app.get('/', (req, res) => res.send('Rent Backend'));

// Authentication routes
app.post('/auth/login', login);
app.post('/auth/logout', logout);
app.post('/auth/create', createUser);

// Start listening
await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
Logger.info(`🚀 Server ready at http://localhost:${PORT}/`);