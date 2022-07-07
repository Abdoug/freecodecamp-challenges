function selectionSort(array) {
    const arrayLength = array.length
    const resultArray = []

    for (let i = 0; i < arrayLength; i++) {
        const minValue = Math.min(...array)
        
        array.splice(array.indexOf(minValue), 1);
        
        resultArray.push(minValue)
    }

    return resultArray;
}

selectionSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92])