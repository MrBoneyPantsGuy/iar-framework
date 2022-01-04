/**
 * this model specifies the format to exchange performancerecorddata with the frontend and store it in mongoDB
 * @param {string} _recordId
 * @param {string} employeeId
 * @param {Array} socialRecords
 * @param {Array} orderRecords
 * @param {Number} totalBonusA
 * @param {Number} totalBonusB
 * @param {string} remark
 */

class PerformanceRecord {
    constructor(recordId, year, employeeId, socialRecords, orderRecords, totalBonusA, totalBonusB, remark) {
        this._id = recordId;
        this.year = year;
        this.employeeId = employeeId;
        this.socialRecords = socialRecords;
        this.orderRecords = orderRecords;
        this.totalBonusA = totalBonusA;
        this.totalBonusB = totalBonusB;
        this.remark = remark;
    }
}

module.exports = PerformanceRecord;