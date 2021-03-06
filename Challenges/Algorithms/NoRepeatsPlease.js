let getAllPermutations = str => {
    if (str.length < 2) return str;

    let permutations = [];

    [...str].map((e1, i1) => {
      let restStr = str.slice(0, i1) + str.slice(i1 + 1, str.length);

      [...getAllPermutations(restStr)].map((e2, i2) => {
        permutations.push(e1 + e2);
      });
    });

    return permutations;
  };

  let countNoRepeats = array => {
    if (typeof array === "string" && array.length === 1) return 1;
    let counter = 0;

    array.map((e1, i1) => {
      let status = true;

      [...e1].map((e2, i2) => {
        if (e2 === e1[i2 + 1]) status = false;
      });

      if (status) counter++;
    });

    return counter;
  };

  let permAlone = str => {
    return countNoRepeats(getAllPermutations(str));
  };

  console.log(permAlone("aab"));