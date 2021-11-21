/**
 * this model specifies the format to exchange performancerecorddata with the frontend and store it in mongoDB
 * @param {string} _recordId
 * @param {string} salesmanId
 * @param {Array} socialRecords
 * @param {Array} ordersRecords
 * @param {Number} totalBonusA
 * @param {Number} totalBonusB
 * @param {string} remark
 */

class PerformanceRecord {
    constructor(recordId, employeeId, socialRecords, ordersRecords, totalBonusA, totalBonusB, remark) {
        this._id = recordId;
        this.employeeId = employeeId;
        this.socialRecords = socialRecords;
        this.ordersRecords = ordersRecords;
        this.totalBonusA = totalBonusA;
        this.totalBonusB = totalBonusB;
        this.remark = remark;
    }
}

module.exports = PerformanceRecord;