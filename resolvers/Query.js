function artists(parent, args, context) {

  const where = args.filter ? {
    OR: [{
      name: {
        startsWith: args.filter
      }
    }],
  } : {};

  return context.prisma.artist.findMany({
    where
  })
}

function albums(parent, args, context) {

  const where = args.filter ? {
    OR: [{
      title: {
        startsWith: args.filter
      }
    }],
  } : {};

  return context.prisma.album.findMany({
    where
  })
}

function tracks(parent, args, context) {

  const where = args.filter ? {
    OR: [{
      title: {
        startsWith: args.filter
      }
    }],
  } : {};

  return context.prisma.track.findMany({
    where
  })
}


function artist(parent, args, context) {
  return context.prisma.artist.findUnique({
    where: {
      id: args.id
    }
  })
}

function album(parent, args, context) {
  return context.prisma.album.findUnique({
    where: {
      id: args.id
    }
  })
}

function playlist(parent, args, context) {
  return context.prisma.playlist.findUnique({
    where: {
      id: args.id
    }
  })
}

function user(parent, args, context) {
  const { userId } = context;

  if (userId)
    return context.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
  else return null;
}

module.exports = {
  artists,
  artist,
  album,
  playlist,
  user,
  albums,
  tracks
}