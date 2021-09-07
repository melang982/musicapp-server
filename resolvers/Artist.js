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
    }
  });


  return tracks;
}

module.exports = {
  albums,
  tracks
}