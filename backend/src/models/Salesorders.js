class Salesorders {
    constructor(salesorderId, customername, clientRankingNumber, salesmanId, itemsHooverGo, itemsHooverClean, year) {
        this._id = salesorderId;
        this.customername = customername;
        this.clientRankingNumber = clientRankingNumber
        this.salesmanId = salesmanId;
        this.itemsHooverGo = itemsHooverGo;
        this.itemsHooverClean = itemsHooverClean;
        this.year = year;
    }
}

module.exports = Salesorders;