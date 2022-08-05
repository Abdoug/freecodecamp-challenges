function binarySearch(searchList, value, arrayPath = []) {
  const arrayLength = searchList.length
  const arrayMiddleIndex = Math.floor((arrayLength - 1) / 2)
  const middle = searchList[arrayMiddleIndex]

  arrayPath.push(middle)

  if (middle == value) return arrayPath

  if (middle < value) return binarySearch(searchList.splice(arrayMiddleIndex + 1, arrayLength), value, arrayPath)

  if (middle > value) return binarySearch(searchList.splice(0, arrayMiddleIndex), value, arrayPath)

  return "Value Not Found";
}

console.log(binarySearch([0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 49, 70], 0))