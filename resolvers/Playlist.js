function tracks(parent, args, context) {
  return context.prisma.playlist.findUnique({
    where: {
      id: parent.id
    }
  }).tracks()
}


module.exports = {
  tracks
}