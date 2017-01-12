function randomInRange (N, sampleSize) {
    const array = Array.from(Array(N).keys());

    return randomSample(array, sampleSize);
}

function randomSample (arr, sampleSize) {
    const copy = arr.slice(0);
    let n = copy.length;
    let x; // Random
    let temp;
    let count = 0;

    while (n !== 0 && count < sampleSize) {
        x = Math.floor(Math.random() * n);
        n--;

        temp = copy[n];
        copy[n] = copy[x]
        copy[x] = temp;
        count++;
    }

    return copy.slice(-sampleSize);
}

function shuffleArray (arr) {
    const copy = arr.slice(0);
    let n = copy.length;
    let x; // Random
    let temp;
    let count = 0;

    while (n !== 0) {
        x = Math.floor(Math.random() * n);
        n--;

        temp = copy[n];
        copy[n] = copy[x]
        copy[x] = temp;
    }

    return copy;
}

module.exports = {
    randomInRange,
    shuffleArray,
};
