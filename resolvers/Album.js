function tracks(parent, args, context) {
  return context.prisma.album.findUnique({
    where: {
      id: parent.id
    }
  }).tracks()
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