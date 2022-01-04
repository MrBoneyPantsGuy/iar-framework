/**
 * this model specifies the format to exchange salesmandata with the frontend and store it in mongoDB
 * @param {string} productname
 * @param {string} client
 * @param {string} clientRanking
 * @param {number} itemsSold
 * @param {number} bonus
 * @param {string} remark
 */
class OrderRecord {
    constructor(productname, client, clientRanking, itemsSold, bonus, remark) {
        this.productname = productname;
        this.client = client;
        this.clientRanking = clientRanking;
        this.itemsSold = itemsSold;
        this.bonus = bonus;
        this.remark = remark;
    }
}

module.exports = OrderRecord;