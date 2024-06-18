export default  (sales: { [t: string]: number }): number => {
    let result = 0
    for (const saleValue of Object.values(sales)) {
        result += Number(saleValue)
    }
    return result
}
