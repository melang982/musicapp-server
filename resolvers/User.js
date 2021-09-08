function playlists(parent, args, context) {
  return context.prisma.user.findUnique({
    where: {
      id: parent.id
    }
  }).playlists()
}


module.exports = {
  playlists
}