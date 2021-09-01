function tracks (parent, args, context) {
  return context.prisma.album.findUnique({ where: { id: parent.id } }).tracks()
}

module.exports = { tracks }
