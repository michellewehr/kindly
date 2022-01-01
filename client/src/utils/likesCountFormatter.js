module.exports = {
  checkLikesCount: (number, type) => {
    if (number > 1) {
      return `This ${type} has ${number} likes!`
    } else if (number === 1) {
      return `This ${type} has ${number} like!`
    } else {
      return `Be the first to Like this ${type}!`
    }
  }
}

