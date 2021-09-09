function tracks(parent, args, context) {
  return context.prisma.playlist.findUnique({
    where: {
      id: parent.id
    }
  }).tracks()
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