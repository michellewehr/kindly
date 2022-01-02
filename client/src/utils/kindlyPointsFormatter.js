module.exports = {
  checkKindlyPoints: number => {
    if (number > 1) {
      return `You have ${number} kindly points!`
    } else if (number === 1) {
      return `You have ${number} kindly point!`
    } else {
      return `Be kind and participate to earn kindly points!`
    }
  }
}
