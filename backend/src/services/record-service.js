exports.updateBonus = (records) => {
    let sum = 0;
    records.forEach((order) => {
        if(order.bonus !== null) {
            sum += order.bonus;
        }
    })
    return sum;
}

exports.calculateBonusForOrder = (order) => {
    return (5 - order.clientRanking) * order.itemsSold * 7;
}