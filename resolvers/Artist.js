function albums(parent, args, context) {
  return context.prisma.artist.findUnique({
    where: {
      id: parent.id
    }
  }).albums()
}

async function tracks(parent, args, context) {
  const foundAlbums = await context.prisma.album.findMany({
    where: {
      artistId: parent.id
    }
  });

  const albumIds = foundAlbums.map((x) => x.id);

  const tracks = await context.prisma.track.findMany({
    where: {
      albumId: {
        in: albumIds
      }
    },
    take: 8
  });

  return tracks;
}

async function userStars(parent, args, context) {
  const { userId } = context;

  if (userId) {
    const stars = await context.prisma.user.findUnique({
      where: {
        id: userId
      }
    }).stars();

    //console.log(stars);

    return (stars.map((x) => x.id)).includes(parent.id);
  }

  return null;
}

module.exports = {
  albums,
  tracks,
  userStars
}