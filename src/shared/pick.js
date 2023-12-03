const pick = (obj, keys) => {
  const finalObj = {}
  for (const key of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key].length) {
        console.log('true')
        finalObj[key] = obj[key]
      }
    }
  }

  return finalObj
}

module.exports = pick
