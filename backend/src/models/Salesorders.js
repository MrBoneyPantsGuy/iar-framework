class Salesorders {
    constructor(salesorderId, customerId, employeeId, itemsHooverGo, itemsHooverClean) {
        this._id = salesorderId;
        this.customerId = customerId;
        this.employeeId = employeeId;
        this.itemsHooverGo = itemsHooverGo;
        this.itemsHooverClean = itemsHooverClean;
    }
}

module.exports = Salesorders;