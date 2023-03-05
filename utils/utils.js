const Utils = {
  // Converts the search content to achieve diacritic insensitive search
  convertSearchContent (input) {
    const accents = {
      a: 'àáâãä',
      c: 'ç',
      e: 'èéêë',
      i: 'ìíî',
      o: 'òóôõö',
      u: 'ùúûü'
    }
    const chars = /[aceiou]/g

    return input.replace(chars, (c) => {
      return '[' + c + accents[c] + ']'
    })
  }
}

export default Utils
