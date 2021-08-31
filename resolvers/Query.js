function artists (parent, args, context)  {
  return context.prisma.artist.findMany()
}

function artist (parent, args, context) {
  return context.prisma.artist.findUnique({ where: { id: args.id }})
}

module.exports = { artists, artist }
