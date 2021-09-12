function playlists(parent, args, context) {
  return context.prisma.user.findUnique({
    where: {
      id: parent.id
    }
  }).playlists()
}

function stars(parent, args, context) {
  return context.prisma.user.findUnique({
    where: {
      id: parent.id
    }
  }).stars()
}

module.exports = {
  playlists,
  stars
}