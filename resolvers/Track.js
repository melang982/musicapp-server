function album(parent, args, context) {
  return context.prisma.album.findUnique({
    where: {
      id: parent.albumId
    }
  })
}

async function artist(parent, args, context) {

  const trackAlbum = await context.prisma.album.findUnique({
    where: {
      id: parent.albumId
    }
  });

  const trackArtist = await context.prisma.artist.findUnique({
    where: {
      id: trackAlbum.artistId
    }
  });

  return trackArtist.name;
}

module.exports = {
  album,
  artist
}