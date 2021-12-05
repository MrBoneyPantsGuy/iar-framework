class Salesorders {
    constructor(salesorderId, customername, clientRankingNumber, governmentId, itemsHooverGo, itemsHooverClean, year) {
        this._id = salesorderId;
        this.customername = customername;
        this.clientRankingNumber = clientRankingNumber
        this.governmentId = governmentId;
        this.itemsHooverGo = itemsHooverGo;
        this.itemsHooverClean = itemsHooverClean;
        this.year = year;
    }
}

module.exports = Salesorders;