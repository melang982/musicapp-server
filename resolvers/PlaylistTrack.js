function track(parent, args, context) {
  return context.prisma.track.findUnique({
    where: {
      id: parent.trackId
    }
  });
}


module.exports = {
  track
}