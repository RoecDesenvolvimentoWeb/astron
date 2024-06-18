export const getRandomArrayItem =  <O = unknown> (arr: O[]): O => {
    const sortedIndex = Math.round((Math.random() * (arr.length - 1)) + 0)
    return arr[sortedIndex]
}