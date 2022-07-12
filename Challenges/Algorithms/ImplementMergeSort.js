function mergeSort(array) {
    const arrayLength = array.length
    const pivotIndex = Math.floor(arrayLength / 2)

    if (arrayLength <= 1) return array

    const leftArray = array.splice(0, pivotIndex)
    const rightArray = array

    return merge(mergeSort(leftArray), mergeSort(rightArray));
}
  
function merge(firstArray, secondArray) {
    const sortedArray = []

    while (firstArray.length && secondArray.length) {
        if (firstArray[0] <= secondArray[0]) {
            sortedArray.push(firstArray.shift())
        } else {
            sortedArray.push(secondArray.shift())
        }
    }

    return [...sortedArray, ...firstArray, ...secondArray]
}
  
mergeSort([10, 2, 1, 6, 3, 9, 7])