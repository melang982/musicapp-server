function tracks(parent, args, context) {
  return context.prisma.album.findUnique({
    where: {
      id: parent.id
    }
  }).tracks()
}

/*async function artist(parent, args, context) {
  const artist = await context.prisma.artist.findUnique({
    where: {
      id: parent.artistId
    }
  });

  console.log(artist.name);
  return artist.name;
}*/

module.exports = {
  tracks,
  //artist
}