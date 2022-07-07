function pairwise(arr, arg) {
    const usedIndexes = []
    const arrayLength = arr.length
    let result = 0;

    for (let i = 0; i < arrayLength; i++) {
        for (let j = 0; j < arrayLength; j++) {
            if (i === j) continue;

            if (usedIndexes.includes(i) || usedIndexes.includes(j)) continue;

            const sum = arr[i] + arr[j]

            if (sum === arg) {
                usedIndexes.push(i)
                usedIndexes.push(j)

                result += (i + j);
            }
        }
    }

    return result;
}

pairwise([1,4,2,3,0,5], 7);