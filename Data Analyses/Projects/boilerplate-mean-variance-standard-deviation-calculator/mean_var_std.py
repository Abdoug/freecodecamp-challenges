import numpy as np

def calculate(list):
    if (len(list) != 9):
        raise ValueError("List must contain nine numbers.")

    # Reshape of given list
    numpyList = np.array(list).reshape(3, 3)

    mean = [(numpyList.mean(axis=0).tolist()), (numpyList.mean(axis=1).tolist()), (numpyList.flatten().mean())]

    var = [(numpyList.var(axis=0).tolist()), (numpyList.var(axis=1).tolist()), (numpyList.flatten().var())]

    std = [(numpyList.std(axis=0).tolist()), (numpyList.std(axis=1).tolist()), (numpyList.flatten().std())]

    max = [(numpyList.max(axis=0).tolist()), (numpyList.max(axis=1).tolist()), (numpyList.flatten().max())]

    min = [(numpyList.min(axis=0).tolist()), (numpyList.min(axis=1).tolist()), (numpyList.flatten().min())]

    sum = [(numpyList.sum(axis=0).tolist()), (numpyList.sum(axis=1).tolist()), (numpyList.flatten().sum())]

    calculations = {
        "mean": mean,
        "variance": var,
        "standard deviation": std,
        "max": max,
        "min": min,
        "sum": sum,
    }

    return calculations