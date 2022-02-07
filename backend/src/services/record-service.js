exports.updateBonus = (records) => {
    let sum;
    records.forEach((order) => {
        sum += order.bonus;
    })
    return sum;
}