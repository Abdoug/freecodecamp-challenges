function updateInventory(arr1, arr2) {
    const existingNames = arr1.map(e => e[1])
    const resultArray = arr1

    for (let i = 0; i < arr2.length; i++) {
        const secondQty = arr2[i][0]
        const secondName = arr2[i][1]

        if (existingNames.includes(secondName)) {
            const getEntry = resultArray.filter(e => e[1] === secondName)[0];
            
            if (getEntry[0] !== secondQty) getEntry[0] += secondQty
        } else {
            resultArray.push(arr2[i])
        }
    }

    return resultArray.sort((a, b) => {
            const firstElement = a[1][0]
            const secondElement = b[1][0] 

            if (firstElement > secondElement) return 1;
            if (firstElement < secondElement) return -1;

            return 0;
        });
}

// Example inventory lists
var curInv = [[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]];

var newInv = [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]];

updateInventory(curInv, newInv);