const Query = require('./resolvers/Query')
const Artist = require('./resolvers/Artist')
const Album = require('./resolvers/Album')

const fs = require('fs');
const path = require('path');

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { ApolloServer } = require('apollo-server');

const resolvers = {
  Query,
  Artist,
  Album
};

const apolloServer = new ApolloServer({
  typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
resolvers,
context: {
    prisma,
  }
})

apolloServer
  .listen(4000)
  .then(({ url }) =>
    console.log(`Apollo Server is running on ${url}`)
  );

const express = require('express');


const app = express();
app.use(express.static('public'))
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const ss = require('socket.io-stream');


io.on('connection', (client) => {
  console.log('a user connected');

  const stream = ss.createStream();
  client.on('track', (id) => {
    console.log('track ' + id);
    const fileName = id + '.wav';
    const filePath = path.resolve(__dirname, 'private', fileName);

    const stat = fs.statSync(filePath);
    const readStream = fs.createReadStream(filePath);
    // pipe stream with response stream
    readStream.pipe(stream);
    ss(client).emit('track-stream', stream, { stat });
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
