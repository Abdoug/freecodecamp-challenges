function sym(...arugments) {
    try {
        const argumentsArray = arugments || [];
        const argumentsArrayLength = argumentsArray.length;
    
        if (argumentsArrayLength >= 2) {
            const currentArray = argumentsArray[0];
            const nextArray = argumentsArray[1];
            const restOfArray = argumentsArray.slice(2, argumentsArrayLength);
            const symArray = symetricByTwo(currentArray, nextArray);

            restOfArray.unshift(symArray);

            return sym(...restOfArray);
        }

        return [...new Set(arugments[0])];
    } catch (e) {
        console.log(e.message);
    }
}

const symetricByTwo = (firstArray, secondArray) => {
    let firstArrayElements = firstArray.filter((e, i) => !secondArray.includes(e))
    let secondArrayElements = secondArray.filter((e, i) => !firstArray.includes(e))

    return [...firstArrayElements, ...secondArrayElements];
}

// Testing the code
console.log(sym([1, 2, 3], [5, 2, 1, 4]));