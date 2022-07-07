function bubbleSort(array) {
    const arrayLength = array.length

    for (let i = 0; i < arrayLength; i++) {
        const nextIteration = i + 1;

        if (nextIteration === arrayLength) continue

        const currentElement = array[i]
        const nextElement = array[nextIteration];

        if (currentElement > nextElement) {
        array[i] = nextElement
        array[i + 1] = currentElement

        return bubbleSort(array)
        }
    }

    return array;
}

bubbleSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92])