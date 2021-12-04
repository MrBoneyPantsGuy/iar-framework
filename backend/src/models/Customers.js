/**
 * this model specifies the format to exchange customerdata from openCRX store it in mongoDB.
 * @param {string} salesmanId
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} employeeId
 * @param {string} department
 */
class Customers {
    constructor(id, name, accountRating) {
        this._id = id;
        this.name = name;
        this.accountRating = accountRating;
    }
}

module.exports = Customers;