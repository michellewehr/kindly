module.exports = {
  checkLikesCount: (number, type) => {
    if (number > 1) {
      return `${number} likes!`;
    } else if (number === 1) {
      return `${number} like!`;
    } else {
      return `Be the first to Like this!`;
    }
  },
};
