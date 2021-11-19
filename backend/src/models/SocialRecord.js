/**
 * this model specifies the format to exchange socialrecordsdata with the frontend and store it in mongoDB
 * @param {string} competence
 * @param {Number} targetValue
 * @param {Number} actualValue
 * @param {Number} bonus
 * @param {string} remark
 */
class SocialRecord{
    constructor(competence, targetValue, actualValue, bonus, remark) {
        this.competence = competence;
        this.targetValue = targetValue;
        this.actualValue = actualValue;
        this.bonus = bonus;
        this.remark = remark;
    }
}

module.exports = SocialRecord;