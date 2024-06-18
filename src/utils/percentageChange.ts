
export const calcPercent = (current: number, last: number): number => {
    const result =  ((current == 0 && last == 0) ? 0 : Math.floor(
        Math.abs(Math.min(last, current) / Math.max(last, current) * 100)
    ))
    return last > current ? -result : result
}