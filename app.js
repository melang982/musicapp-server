const Query = require('./resolvers/Query')
const Artist = require('./resolvers/Artist')
const Album = require('./resolvers/Album')
const Track = require('./resolvers/Track')
const Playlist = require('./resolvers/Playlist')
const PlaylistTrack = require('./resolvers/PlaylistTrack')
const User = require('./resolvers/User')
const Mutation = require('./resolvers/Mutation')

const { getUserId } = require('./utils');

const fs = require('fs');
const path = require('path');

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cookieParser = require('cookie-parser');

const resolvers = {
  Query,
  Artist,
  Album,
  Track,
  Playlist,
  PlaylistTrack,
  User,
  Mutation
};

async function startServer() {
  const app = express();
  app.use(cookieParser());

  app.use(express.static('public'))
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  const apolloServer = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
    context: ({ req }) => {
      return {
        ...req,
        prisma,
        userId: req && req.cookies ? getUserId(req.cookies.token) : null
        //userId: req && req.headers.authorization ? getUserId(req) : null
      }
    }
  })

  await apolloServer.start();

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };
  apolloServer.applyMiddleware({ app, cors: corsOptions, path: '/graphql' });

  const http = require('http');
  const server = http.createServer(app);

  const { Server } = require('socket.io');
  const io = new Server(server);

  const ss = require('socket.io-stream');

  io.on('connection', (client) => {
    console.log('a user connected');

    const stream = ss.createStream();
    client.on('track', (albumId, index) => {
      console.log('album ' + albumId + ' track ' + index);
      const fileName = albumId + '/' + index + '.wav';
      const filePath = path.resolve(__dirname, 'private', fileName);

      try {
        const stat = fs.statSync(filePath);
        const readStream = fs.createReadStream(filePath);

        // pipe stream with response stream
        readStream.pipe(stream);
        ss(client).emit('track-stream', stream, { stat });
      } catch (error) {
        console.error(error);
      }
    });
  });

  server.listen(4000, () => {
    console.log('listening on *:4000');
  });
}

startServer();