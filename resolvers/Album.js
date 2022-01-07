async function tracks(parent, args, context) {
  let tracks = await context.prisma.album.findUnique({
    where: {
      id: parent.id
    }
  }).tracks();

  tracks = tracks.sort((a, b) => a.number - b.number);

  return tracks;
}

function artist(parent, args, context) {
  return context.prisma.artist.findUnique({
    where: {
      id: parent.artistId
    }
  })
}

module.exports = {
  tracks,
  artist
}