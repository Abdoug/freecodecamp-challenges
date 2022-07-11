function quickSort(origArray) {
    const arrayLength = origArray.length
    const pivotIndex = Math.floor(arrayLength / 2)
    const pivotElement = origArray[pivotIndex]
    let leftArray = []
    let rightArray = []
    
    if (!arrayLength) return []
  
    for (let i = 0; i < pivotIndex; i++) {
      const leftElement = origArray[i]
      const rightIndex = arrayLength - 1 - i
      const rightElement = origArray[rightIndex]
  
      // Begin check left side
      if (leftElement <= pivotElement) {
        leftArray.push(leftElement)
      } else {
        rightArray.push(leftElement)
      }
  
      // Continue if we have reached the pivot
      if (pivotIndex === rightIndex) continue
  
      // Begin check right side
      if (rightElement >= pivotElement) {
        rightArray.push(rightElement)
      } else {
        leftArray.push(rightElement)
      }
    }
  
    return [...quickSort(leftArray), pivotElement, ...quickSort(rightArray)]
  }
  
  quickSort([10, 1, 5, 3])