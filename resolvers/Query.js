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

module.exports = {
  artists,
  artist,
  albums,
  tracks
}