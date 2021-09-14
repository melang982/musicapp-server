const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId, addToBlackList } = require('../utils')

async function addToPlaylist(parent, args, context, info) {
  const { userId } = context;

  await context.prisma.playlistTracks.create({
    data: {
      playlistId: args.playlistId,
      trackId: args.trackId
    }
  });

  return 'success';
}

async function addStar(parent, args, context, info) {
  const { userId } = context;
  await context.prisma.user.update({
    where: { id: userId },
    data: {
      stars: {
        connect: {
          id: args.id
        }
      }
    }
  });

  return 'success';
}

async function removeStar(parent, args, context, info) {
  const { userId } = context;
  await context.prisma.user.update({
    where: { id: userId },
    data: {
      stars: {
        disconnect: {
          id: args.id
        }
      }
    }
  });

  return 'success';
}

async function signup(parent, args, context, info) {

  const password = await bcrypt.hash(args.password, 10)

  const user = await context.prisma.user.create({ data: { ...args, password } })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  const options = {
    maxAge: 1000 * 60 * 60 * 24, //expires in a day
    httpOnly: true, // cookie is only accessible by the server
    //secure: true, //on HTTPS
  };

  const cookie = context.res.cookie('token', token, options);

  return user;
}

async function login(parent, args, context, info) {
  //console.log('LOGIN');
  const user = await context.prisma.user.findUnique({ where: { email: args.email } })

  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)

  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  const options = {
    maxAge: 1000 * 60 * 60 * 24, //expires in a day
    httpOnly: true, // cookie is only accessible by the server
    //secure: true, //on HTTPS
  };

  const cookie = context.res.cookie('token', token, options);
  //console.log(user);
  return user;
}

function logout(parent, args, context, info) {
  //console.log('LOGOUT');
  const token = context.cookies.token;
  if (token) addToBlackList(token);

  const options = {
    maxAge: 1000 * 60 * 60 * 24, //expires in a day
    httpOnly: true, // cookie is only accessible by the server
    //secure: true, //on HTTPS
  };
  const cookie = context.res.cookie('token', '', options);

  return 'success';
}

async function createPlaylist(parent, args, context, info) {
  //console.log('CREATE PLAYLIST');
  //console.log(context.cookies);

  const { userId } = context;
  const playlists = await context.prisma.user.findUnique({ where: { id: userId } }).playlists();

  const playlist = await context.prisma.playlist.create({
    data: {
      title: 'My Playlist #' + (playlists.length + 1),
      createdBy: { connect: { id: userId } }
    }
  });

  return playlist;
}

module.exports = {
  signup,
  login,
  logout,
  createPlaylist,
  addToPlaylist,
  addStar,
  removeStar
}