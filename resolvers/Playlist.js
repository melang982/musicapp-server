function tracks(parent, args, context) {

  return context.prisma.playlistTracks.findMany({
    where: {
      playlistId: parent.id
    }
  });
}

function createdBy(parent, args, context) {
  return context.prisma.user.findUnique({
    where: {
      id: parent.createdById
    }
  })
}

module.exports = {
  tracks,
  createdBy
}